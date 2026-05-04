#!/usr/bin/env python3
"""
Crawl frebrico.pt catalog pages, match products to local SQLite by name,
and fill specifications column "Preço (€)" from <option value="id:price&euro;"> rows.

Run from repo root:
  python3 toinsert/sync_frebrico_pt_prices.py

Requires network. Uses DB_PATH env or data/frebrico.db.
"""
from __future__ import annotations

import difflib
import json
import re
import sqlite3
import time
import unicodedata
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = Path(__import__("os").environ.get("DB_PATH", str(ROOT / "data" / "frebrico.db")))
BASE = "https://www.frebrico.pt/"
PRICE_COL = "Preço (€)"
USER_AGENT = "Mozilla/5.0 (compatible; FrebricoSync/1.0; +local dev price sync)"

# Slugs excluded from greedy 1:1 match (no remote article / fuzzy pulls wrong PDP).
SLUG_SKIP_WEAK_MATCH = frozenset({"rede-sombra-90"})

# Force local slug -> (fam, id) on frebrico.pt when fuzzy match is wrong or ambiguous.
SLUG_REMOTE_OVERRIDE: Dict[str, Tuple[str, str]] = {
    "arame-galvanizado": ("74", "78"),  # Macio
    "arame-galvanizado-fino": ("74", "77"),
    "prego-redondo": ("165", "170"),
    "cabo-de-aco-galvanizado-plastificado": ("181", "182"),
    "cabo-de-aco-anti-giratorio": ("183", "187"),
    "cabo-de-aco-inox-inox-plastificado": ("179", "180"),
    # Forplast L.A. variants share one PDP (Ligeira / Média / Super in option labels).
    "forplast-ligeira": ("31", "298"),
    "forplast-media": ("31", "298"),
    "forplast-super": ("31", "298"),
    "rede-trefort": ("288", "293"),
    "painel-eletrosoldado": ("27", "28"),
}


def norm(s: str) -> str:
    t = "".join(
        c for c in unicodedata.normalize("NFD", (s or "").upper()) if unicodedata.category(c) != "Mn"
    )
    t = re.sub(r"[^A-Z0-9]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as r:
        # frebrico.pt serves ISO-8859-1; UTF-8 mis-decodes accents (ex.: "Média" → "M�dia")
        # and breaks filters / fuzzy matching on option labels.
        return r.read().decode("latin-1", "replace")


@dataclass
class RemoteProduct:
    fam: str
    pid: str
    title: str
    options: List[Tuple[str, str]]  # (label, price_str like "110.50")
    single_price: Optional[str]


OPTION_RE = re.compile(
    r'<option[^>]*value="(\d+):([0-9]+(?:[.,][0-9]+)?)&euro;"[^>]*>([^<]+)</option>', re.I
)
TITLE_RE = re.compile(r"<h2[^>]*>([^<]+)</h2>", re.I)
# Fallback: one price near label
SINGLE_PRICE_RE = re.compile(
    r'(?:id|class)=["\'][^"\']*label[^"\']*preco[^"\']*["\'][^>]*>[\s\S]*?([0-9]+[.,][0-9]+)\s*',
    re.I,
)


def parse_product_page(html: str) -> Tuple[str, List[Tuple[str, str]], Optional[str]]:
    t = TITLE_RE.search(html)
    title = t.group(1).strip() if t else ""
    opts: List[Tuple[str, str]] = []
    for m in OPTION_RE.finditer(html):
        price = m.group(2).replace(",", ".")
        label = m.group(3).strip()
        opts.append((label, price))
    if not opts:
        vals = re.findall(r'value="(\d+):([0-9]+(?:[.,][0-9]+)?)&euro;"', html)
        labels = re.findall(r"<option[^>]*>([^<]+)</option>", html)
        if vals and labels and len(vals) == len(labels):
            opts = [(labels[i].strip(), vals[i][1].replace(",", ".")) for i in range(len(vals))]
    single: Optional[str] = None
    if not opts:
        m2 = re.search(
            r'(?:label_preco|id=["\']label_preco["\'])[^>]*>[\s\n]*\s*([0-9]+[.,][0-9]+)\s*',
            html,
            re.I,
        )
        if m2:
            single = m2.group(1).replace(",", ".")
        else:
            m3 = re.search(r"([0-9]+[.,][0-9]+)\s*&euro;", html)
            if m3:
                single = m3.group(1).replace(",", ".")
    return title, opts, single


def collect_remote_index() -> List[RemoteProduct]:
    home = fetch(BASE)
    fams = set(re.findall(r"fam=(\d+)", home))
    pairs: set[Tuple[str, str]] = set()
    for fam in sorted(fams, key=int):
        url = f"{BASE}?zona=catalogos&fam={fam}"
        try:
            html = fetch(url)
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as e:
            print("skip fam", fam, e)
            continue
        for a, b in re.findall(r"fam=(\d+)&(?:amp;)?id=(\d+)", html):
            pairs.add((a, b))
        for a, b in re.findall(r"id=(\d+)&(?:amp;)?fam=(\d+)", html):
            pairs.add((b, a))
        time.sleep(0.04)

    out: List[RemoteProduct] = []
    for fam, pid in sorted(pairs, key=lambda x: (int(x[0]), int(x[1]))):
        url = f"{BASE}?zona=catalogos&fam={fam}&id={pid}"
        try:
            html = fetch(url)
        except Exception as e:
            print("skip product", url, e)
            continue
        title, options, single = parse_product_page(html)
        if not title and not options and not single:
            continue
        out.append(RemoteProduct(fam=fam, pid=pid, title=title or f"Product {pid}", options=options, single_price=single))
        time.sleep(0.04)
    return out


def score_pair(local_name: str, rp: RemoteProduct) -> float:
    nloc = norm(local_name)
    nt = norm(rp.title)
    if not nt:
        return 0.0
    s = difflib.SequenceMatcher(None, nloc, nt).ratio()
    if nloc and (nloc in nt or nt in nloc):
        s = max(s, 0.72)
    return s


def build_merged_cabo_galvanizado() -> RemoteProduct:
    """Site splits galvanized cables across 3 SKUs (fam 183): 1x19, 6x7, 6x19."""
    opts: List[Tuple[str, str]] = []
    for pid in ("186", "185", "184"):
        url = f"{BASE}?zona=catalogos&fam=183&id={pid}"
        html = fetch(url)
        _, o, _ = parse_product_page(html)
        opts.extend(o)
        time.sleep(0.04)
    return RemoteProduct("183", "186+185+184", "CABO DE AÇO GALVANIZADO", opts, None)


def assign_remotes(
    local_rows: List[Tuple[str, str]], remote: List[RemoteProduct]
) -> Dict[str, RemoteProduct]:
    """Greedy one-to-one assignment so two locals rarely steal the same frebrico PDP."""
    by_key: Dict[Tuple[str, str], RemoteProduct] = {(r.fam, r.pid): r for r in remote}
    out: Dict[str, RemoteProduct] = {}

    slugs = {s for s, _ in local_rows}
    if "cabo-de-aco-galvanizado" in slugs:
        out["cabo-de-aco-galvanizado"] = build_merged_cabo_galvanizado()

    for slug, _name in local_rows:
        if slug in out:
            continue
        if slug in SLUG_REMOTE_OVERRIDE:
            fam, pid = SLUG_REMOTE_OVERRIDE[slug]
            rp = by_key.get((fam, pid))
            if rp:
                out[slug] = rp

    used_keys = {(r.fam, r.pid) for r in out.values()}
    triples: List[Tuple[float, str, int]] = []
    for slug, name in local_rows:
        if slug in out:
            continue
        if slug in SLUG_SKIP_WEAK_MATCH:
            continue
        for ri, rp in enumerate(remote):
            k = (rp.fam, rp.pid)
            if k in used_keys:
                continue
            triples.append((score_pair(name, rp), slug, ri))
    triples.sort(key=lambda x: -x[0])

    assigned_slug = set(out.keys())
    for sc, slug, ri in triples:
        if slug in assigned_slug:
            continue
        if sc < 0.52:
            break
        rp = remote[ri]
        k = (rp.fam, rp.pid)
        if k in used_keys:
            continue
        out[slug] = rp
        used_keys.add(k)
        assigned_slug.add(slug)
    return out


def best_remote_match(local_name: str, remote: List[RemoteProduct]) -> Optional[RemoteProduct]:
    """Non-unique fallback when greedy leaves some locals unassigned."""
    best: Optional[RemoteProduct] = None
    best_score = 0.0
    for rp in remote:
        sc = score_pair(local_name, rp)
        if sc > best_score:
            best_score = sc
            best = rp
    if best_score < 0.52:
        return None
    return best


def euro_cell_from_dot(price_dot: str) -> str:
    """Store Portuguese-style decimal for ProductSpecs parser."""
    try:
        v = float(price_dot)
        return f"{v:.2f}".replace(".", ",")
    except ValueError:
        return price_dot.replace(".", ",")


def match_rows_to_options(
    row_labels: List[str], options: List[Tuple[str, str]]
) -> Dict[int, str]:
    """Map row index -> euro cell string."""
    if not options:
        return {}
    result: Dict[int, str] = {}
    used_opt = set()

    for i, lab in enumerate(row_labels):
        nl = norm(lab)
        best_j = -1
        best_sc = 0.0
        for j, (olab, price) in enumerate(options):
            if j in used_opt:
                continue
            no = norm(olab)
            sc = difflib.SequenceMatcher(None, nl, no).ratio()
            if nl and (nl in no or no in nl):
                sc = max(sc, 0.75)
            if sc > best_sc:
                best_sc = sc
                best_j = j
        if best_j >= 0 and best_sc >= 0.38:
            _, price = options[best_j]
            result[i] = euro_cell_from_dot(price)
            used_opt.add(best_j)

    # If same count and unmatched, pair by sorted label similarity (last resort)
    unmatched_rows = [i for i in range(len(row_labels)) if i not in result]
    unmatched_opts = [j for j in range(len(options)) if j not in used_opt]
    if len(unmatched_rows) == len(unmatched_opts) and len(unmatched_rows) > 0:
        row_order = sorted(
            unmatched_rows, key=lambda i: norm(row_labels[i])
        )
        opt_order = sorted(
            range(len(options)), key=lambda j: norm(options[j][0])
        )
        for ri, oj in zip(row_order, opt_order):
            if ri not in result and oj not in used_opt:
                result[ri] = euro_cell_from_dot(options[oj][1])
                used_opt.add(oj)
    return result


ROW_WIRE_MM_RE = re.compile(r"BWG\d+\s*([0-9]+)[.,]([0-9]+)\s*mm", re.I)
OPT_WIRE_MM_RE = re.compile(r"\(([0-9]+)[.,]([0-9]+)x", re.I)


def build_row_labels(rws: List[Any]) -> List[str]:
    """When every row shares the same first cell (ex.: PREGO REDONDO), match on all visible columns."""
    if not rws:
        return []
    first_cells = [str(r[0]).strip() if r and len(r) > 0 else "" for r in rws]
    if len(rws) > 1 and len(set(first_cells)) == 1 and first_cells[0]:
        return [" ".join(str(c).strip() for c in (row or []) if str(c).strip()) for row in rws]
    return [str(r[0]) if r else "" for r in rws]


def filter_options_for_slug(slug: str, options: List[Tuple[str, str]]) -> List[Tuple[str, str]]:
    """Fortplast L.A. Ligeira/Média/Super share fam 31 id 298 — filter option labels."""
    if slug == "forplast-ligeira":
        return [o for o in options if "LIGEIRA" in norm(o[0])]
    if slug == "forplast-media":
        return [o for o in options if "MEDIA" in norm(o[0])]
    if slug == "forplast-super":
        return [o for o in options if "SUPER" in norm(o[0])]
    return options


def wire_mm_from_row_label(lab: str) -> Optional[float]:
    m = ROW_WIRE_MM_RE.search(lab)
    if m:
        return float(m.group(1) + "." + m.group(2))
    return None


def wire_mm_from_option_label(lab: str) -> Optional[float]:
    m = OPT_WIRE_MM_RE.search(lab)
    if m:
        return float(m.group(1) + "." + m.group(2))
    return None


PAINEL_MESH_WIRE_ROW_RE = re.compile(
    r"(\d+)\s*x\s*(\d+)\s*x\s*([0-9]+)[.,]([0-9]+)\s*mm", re.I
)
PAINEL_MESH_WIRE_OPT_RE = re.compile(
    r"(\d+)\s*x\s*(\d+)\s*.*?[ØO]\s*([0-9]+)[.,]([0-9]+)", re.I
)


def match_painel_eletrosoldado_rows(
    row_labels: List[str], options: List[Tuple[str, str]]
) -> Dict[int, str]:
    """Local rows use '30x30x2,7 mm'; frebrico uses '30 x 30 Ø 2,70 …'. Match mesh + wire Ø, min price."""
    out: Dict[int, str] = {}
    for i, lab in enumerate(row_labels):
        m = PAINEL_MESH_WIRE_ROW_RE.search(lab)
        if not m:
            continue
        a, b = int(m.group(1)), int(m.group(2))
        w = float(m.group(3) + "." + m.group(4))
        prices: List[float] = []
        for olab, price in options:
            mo = PAINEL_MESH_WIRE_OPT_RE.search(olab)
            if not mo:
                continue
            oa, ob = int(mo.group(1)), int(mo.group(2))
            ow = float(mo.group(3) + "." + mo.group(4))
            if oa == a and ob == b and abs(ow - w) < 0.15:
                try:
                    prices.append(float(price))
                except ValueError:
                    pass
        if prices:
            out[i] = euro_cell_from_dot(str(min(prices)))
    return out


def match_prego_round_rows(row_labels: List[str], options: List[Tuple[str, str]]) -> Dict[int, str]:
    """Prego redondo: many SKUs per wire Ø — take minimum price per BWG row."""
    out: Dict[int, str] = {}
    for i, lab in enumerate(row_labels):
        w = wire_mm_from_row_label(lab)
        if w is None:
            continue
        prices: List[float] = []
        for olab, price in options:
            ow = wire_mm_from_option_label(olab)
            if ow is None:
                continue
            if abs(ow - w) < 0.06:
                try:
                    prices.append(float(price))
                except ValueError:
                    pass
        if prices:
            out[i] = euro_cell_from_dot(str(min(prices)))
    return out


def ensure_price_column(spec: Dict[str, Any]) -> None:
    cols: List[str] = list(spec.get("columns") or [])
    rows: List[List[str]] = [list(r) for r in (spec.get("rows") or [])]
    if PRICE_COL not in cols:
        cols = cols + [PRICE_COL]
        for r in rows:
            r.append("")
    else:
        idx = cols.index(PRICE_COL)
        for r in rows:
            while len(r) < len(cols):
                r.append("")
            if not (idx < len(r) and r[idx].strip()):
                if len(r) > idx:
                    r[idx] = r[idx] or ""
    spec["columns"] = cols
    spec["rows"] = rows


def main() -> None:
    print("Collecting frebrico.pt catalog index (may take ~2–3 min)...")
    remote = collect_remote_index()
    print("remote_products", len(remote))

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(
        """
        SELECT id, slug, name, price, specifications FROM products ORDER BY id
        """
    )
    rows_db = cur.fetchall()

    local_for_assign: List[Tuple[str, str]] = []
    for row in rows_db:
        spec_raw = row["specifications"] or "{}"
        try:
            spec = json.loads(spec_raw)
        except json.JSONDecodeError:
            continue
        rws = spec.get("rows")
        cols = spec.get("columns")
        if (
            isinstance(cols, list)
            and isinstance(rws, list)
            and rws
        ):
            local_for_assign.append((str(row["slug"]), str(row["name"])))

    remote_assign = assign_remotes(local_for_assign, remote)

    matched = 0
    updated = 0
    skipped_no_remote = 0
    skipped_no_table = 0
    report_lines: List[str] = []

    for row in rows_db:
        pid = row["id"]
        slug = row["slug"]
        name = row["name"]
        spec_raw = row["specifications"] or "{}"
        try:
            spec = json.loads(spec_raw)
        except json.JSONDecodeError:
            report_lines.append(f"{slug}\tJSON_ERROR")
            continue
        cols = spec.get("columns")
        rws = spec.get("rows")
        if not isinstance(cols, list) or not isinstance(rws, list) or not rws:
            skipped_no_table += 1
            report_lines.append(f"{slug}\tNO_SPEC_TABLE")
            continue

        rp = remote_assign.get(slug)
        if rp is None and str(slug) not in SLUG_SKIP_WEAK_MATCH:
            rp = best_remote_match(name, remote)
        if not rp:
            skipped_no_remote += 1
            report_lines.append(f"{slug}\tNO_REMOTE_MATCH\t{name}")
            continue
        matched += 1

        opts_list = list(rp.options)
        opts_list = filter_options_for_slug(str(slug), opts_list)
        row_labels = build_row_labels(rws)
        price_map: Dict[int, str] = {}

        if opts_list:
            price_map = match_rows_to_options(row_labels, opts_list)
        if not price_map and str(slug) == "prego-redondo" and opts_list:
            price_map = match_prego_round_rows(row_labels, opts_list)
        if not price_map and str(slug) == "painel-eletrosoldado" and opts_list:
            price_map = match_painel_eletrosoldado_rows(row_labels, opts_list)
        if (
            not price_map
            and str(slug).startswith("forplast-")
            and len(rws) == 1
            and opts_list
        ):
            try:
                mp = min(float(o[1]) for o in opts_list)
                price_map = {0: euro_cell_from_dot(str(mp))}
            except ValueError:
                pass
        if not price_map and rp.single_price:
            cell = euro_cell_from_dot(rp.single_price)
            for i in range(len(rws)):
                price_map[i] = cell

        if not price_map:
            report_lines.append(f"{slug}\tNO_PRICES_PARSED\t{rp.title}")
            continue

        ensure_price_column(spec)
        col_idx = list(spec["columns"]).index(PRICE_COL)
        new_rows: List[List[str]] = []
        for i, r in enumerate(spec["rows"]):
            nr = list(r)
            while len(nr) < len(spec["columns"]):
                nr.append("")
            if i in price_map:
                nr[col_idx] = price_map[i]
            new_rows.append(nr)
        spec["rows"] = new_rows

        prices_num: List[float] = []
        for i in range(len(new_rows)):
            if i in price_map:
                try:
                    prices_num.append(float(price_map[i].replace(",", ".")))
                except ValueError:
                    pass

        new_price = row["price"]
        if prices_num:
            new_price = min(prices_num)

        cur.execute(
            """
            UPDATE products
            SET specifications = ?, price = ?, updated_at = datetime('now')
            WHERE id = ?
            """,
            (json.dumps(spec, ensure_ascii=False), new_price, pid),
        )
        updated += 1
        report_lines.append(
            f"{slug}\tOK\t{rp.fam}/{rp.pid}\t{rp.title}\tprices:{len(price_map)}"
        )

    conn.commit()
    conn.close()

    rep_path = ROOT / "toinsert" / "frebrico_pt_price_sync_report.txt"
    rep_path.write_text("\n".join(report_lines), encoding="utf-8")
    print("matched", matched, "updated", updated)
    print("skipped_no_remote", skipped_no_remote, "skipped_no_table", skipped_no_table)
    print("report", rep_path)


if __name__ == "__main__":
    main()
