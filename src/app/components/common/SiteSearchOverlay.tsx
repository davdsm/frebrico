import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";
import {
  fetchSiteSearch,
  resolveImageUrl,
  type Category,
  type Product,
} from "../../api/shop";

type TabId = "all" | "products" | "categories";

type SiteSearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function SiteSearchOverlay({ open, onClose }: SiteSearchOverlayProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [tab, setTab] = useState<TabId>("all");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setDebouncedQ(q.trim()), 280);
    return () => window.clearTimeout(t);
  }, [q, open]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setDebouncedQ("");
    setTab("all");
    setProducts([]);
    setCategories([]);
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!debouncedQ) {
      setProducts([]);
      setCategories([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchSiteSearch(debouncedQ)
      .then((data) => {
        if (cancelled) return;
        setProducts(Array.isArray(data.products) ? data.products : []);
        setCategories(Array.isArray(data.categories) ? data.categories : []);
      })
      .catch(() => {
        if (!cancelled) {
          setProducts([]);
          setCategories([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQ, open]);

  const nProd = products.length;
  const nCat = categories.length;
  const nAll = nProd + nCat;

  const showCategories =
    tab === "all" || tab === "categories" ? categories : [];
  const showProducts = tab === "all" || tab === "products" ? products : [];

  const goFullSearch = () => {
    const t = q.trim();
    onClose();
    if (!t) navigate("/search");
    else navigate(`/search?q=${encodeURIComponent(t)}`);
  };

  const productHref = (p: Product) =>
    `/product/${encodeURIComponent(String(p.slug?.trim() || p.id))}`;

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 bg-black/20"
      role="dialog"
      aria-modal="true"
      aria-label="Pesquisa no site"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra tipo pill — igual ao estilo command palette */}
        <div className="flex items-center gap-3 rounded-full border border-[#e8e8e6] bg-white px-4 py-3 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 shrink-0 text-[#6b6b69]"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                goFullSearch();
              }
            }}
            placeholder="Pesquisar produtos, categorias, referências…"
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent text-[15px] text-[#131313] placeholder:text-[#9a9a98] outline-none"
            aria-label="Termo de pesquisa"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-[#7a7a78] hover:bg-black/[0.06] hover:text-[#131313]"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Painel de resultados */}
        <div className="rounded-2xl border border-[#ebebea] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col max-h-[min(60vh,440px)]">
          {/* Réplica compacta da pesquisa + tabs */}
          <div className="border-b border-[#f0f0ee] px-3 pt-3 pb-2 shrink-0">
            <div className="flex items-center gap-2 px-2 pb-2 text-sm text-[#6b6b69]">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <span className="truncate font-medium text-[#131313]">{debouncedQ || "…"}</span>
              {loading && <span className="text-xs text-[#9a9a98]">A pesquisar…</span>}
            </div>
            <div className="flex gap-1 p-1 rounded-xl bg-[#f4f4f2]">
              {(
                [
                  ["all", `Todos (${nAll})`, nAll],
                  ["products", `Produtos (${nProd})`, nProd],
                  ["categories", `Categorias (${nCat})`, nCat],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-all sm:text-sm ${
                    tab === id
                      ? "bg-white text-[#131313] shadow-sm"
                      : "text-[#6b6b69] hover:text-[#131313]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto flex-1 min-h-0 py-2">
            {!debouncedQ && (
              <p className="px-4 py-8 text-center text-sm text-[#9a9a98]">
                Escreva para ver produtos e categorias.
              </p>
            )}
            {debouncedQ && !loading && showCategories.length === 0 && showProducts.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-[#9a9a98]">
                Nenhum resultado para «{debouncedQ}».
              </p>
            )}

            {showCategories.length > 0 && (
              <div className="mb-2">
                <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#9a9a98]">
                  Categorias
                </p>
                <ul>
                  {showCategories.map((c) => (
                    <li key={c.id}>
                      <Link
                        to={`/category/${encodeURIComponent(c.slug)}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#fafaf9]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f2] text-[#313b2e]">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM3.75 15.75a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25z" />
                          </svg>
                        </span>
                        <span className="font-medium text-[#131313]">{c.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showProducts.length > 0 && (
              <div>
                <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#9a9a98]">
                  Produtos
                </p>
                <ul>
                  {showProducts.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={productHref(p)}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#fafaf9]"
                      >
                        <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f4f4f2]">
                          {p.image ? (
                            <img
                              src={resolveImageUrl(p.image)}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-[#c4c4c2]">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12V8.25z" />
                              </svg>
                            </span>
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium text-[#131313]">{p.name}</div>
                          {(p.type_label || p.badge) && (
                            <div className="truncate text-xs text-[#9a9a98]">{p.type_label || p.badge}</div>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {debouncedQ && !loading && (showProducts.length > 0 || showCategories.length > 0) && (
              <div className="border-t border-[#f0f0ee] px-4 py-2">
                <button
                  type="button"
                  onClick={goFullSearch}
                  className="flex w-full items-center gap-2 rounded-lg py-2 text-left text-sm font-medium text-[#313b2e] hover:bg-[#f4f4f2]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f4f2] text-lg leading-none">
                    +
                  </span>
                  <span>Ver todos os resultados para «{debouncedQ}»</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-[#f0f0ee] px-4 py-2.5 text-[11px] text-[#9a9a98]">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-[#e5e5e3] bg-[#fafaf9] px-1.5 py-0.5 font-sans text-[#5a5a59]">esc</kbd>
              fechar
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-[#e5e5e3] bg-[#fafaf9] px-1.5 py-0.5 font-sans text-[#5a5a59]">Enter</kbd>
              página de pesquisa
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
