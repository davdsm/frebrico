import React, { useState, useEffect, useMemo, useRef } from "react";
import { fetchProducts, type Product } from "../../api/shop";

const inputClass =
  "w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";

/** Item shape stored in content (carousel/grid/related). Site card uses id/slug, name, price, image, featured; badge optional (legacy). */
export type ContentProductItem = {
  id?: number;
  slug?: string;
  name: string;
  price: string | number;
  badge?: string;
  image?: string;
  featured?: number;
};

function parseStored(value: string): ContentProductItem[] {
  try {
    const raw = value?.trim();
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p: unknown) => {
      if (p && typeof p === "object" && "name" in p) {
        const o = p as Record<string, unknown>;
        return {
          id: typeof o.id === "number" ? o.id : undefined,
          slug: typeof o.slug === "string" ? o.slug : undefined,
          name: String(o.name ?? ""),
          price: typeof o.price === "number" ? String(o.price) : String(o.price ?? ""),
          badge: typeof o.badge === "string" ? o.badge : undefined,
          image: typeof o.image === "string" ? o.image : undefined,
          featured: typeof o.featured === "number" ? o.featured : undefined,
        };
      }
      return { name: "", price: "" };
    });
  } catch {
    return [];
  }
}

interface ContentProductsPickerProps {
  value: string;
  onChange: (json: string) => void;
  label?: string;
  hint?: string;
}

function matchesProductQuery(p: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (p.name.toLowerCase().includes(q)) return true;
  const slug = (p.slug ?? "").toLowerCase();
  if (slug && slug.includes(q)) return true;
  if (String(p.id).includes(q)) return true;
  return false;
}

export function ContentProductsPicker({ value, onChange, label = "Produtos", hint }: ContentProductsPickerProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pickerQuery, setPickerQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selected = parseStored(value);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts()
      .then((list) => {
        if (!cancelled) setProducts(list);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!dropdownOpen) setPickerQuery("");
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpen && !loading) searchInputRef.current?.focus();
  }, [dropdownOpen, loading]);

  const addProduct = (p: Product) => {
    const item: ContentProductItem = {
      id: p.id,
      slug: p.slug ?? undefined,
      name: p.name,
      price: String(p.price),
      badge: p.badge || undefined,
      image: p.image || undefined,
      featured: p.featured,
    };
    const next = [...selected.filter((s) => s.id !== p.id), item];
    onChange(JSON.stringify(next, null, 2));
    setDropdownOpen(false);
  };

  const removeAt = (index: number) => {
    const next = selected.filter((_, i) => i !== index);
    onChange(JSON.stringify(next, null, 2));
  };

  const updateBadge = (index: number, badge: string) => {
    const next = selected.map((item, i) => (i === index ? { ...item, badge: badge || undefined } : item));
    onChange(JSON.stringify(next, null, 2));
  };

  const move = (index: number, dir: "up" | "down") => {
    const j = dir === "up" ? index - 1 : index + 1;
    if (j < 0 || j >= selected.length) return;
    const next = [...selected];
    [next[index], next[j]] = [next[j], next[index]];
    onChange(JSON.stringify(next, null, 2));
  };

  const selectedIds = new Set(selected.map((s) => s.id).filter((id): id is number => id != null));
  const available = products.filter((p) => !selectedIds.has(p.id));
  const filteredAvailable = useMemo(
    () => available.filter((p) => matchesProductQuery(p, pickerQuery)),
    [available, pickerQuery]
  );

  return (
    <div>
      <label className="block text-[13px] font-medium text-[#131313] mb-1.5">{label}</label>
      {hint && <p className="text-[12px] text-[#5a5a59] mb-2">{hint}</p>}
      <div className="space-y-3">
        {selected.map((item, index) => (
          <div
            key={`${item.id ?? index}-${index}`}
            className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-[#e5e5e3] bg-[#fafaf9]"
          >
            <div className="flex-1 min-w-[140px]">
              <span className="text-[13px] font-medium text-[#131313]">{item.name}</span>
              <span className="text-[12px] text-[#5a5a59] ml-2">
                {typeof item.price === "number" ? item.price : item.price} €
              </span>
            </div>
            <div className="flex-1 min-w-[120px]">
              <input
                type="text"
                value={item.badge ?? ""}
                onChange={(e) => updateBadge(index, e.target.value)}
                placeholder="Badge"
                className={inputClass + " py-1.5 text-[12px]"}
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, "up")}
                disabled={index === 0}
                className="p-2 rounded-lg border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-40"
                aria-label="Mover para cima"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
              </button>
              <button
                type="button"
                onClick={() => move(index, "down")}
                disabled={index === selected.length - 1}
                className="p-2 rounded-lg border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-40"
                aria-label="Mover para baixo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                aria-label="Remover"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          disabled={loading}
          className={inputClass + " text-left flex items-center justify-between"}
        >
          <span className="text-[#5a5a59]">{loading ? "A carregar produtos..." : "Adicionar produto da loja"}</span>
          <span className="text-[#5a5a59]">{dropdownOpen ? "▲" : "▼"}</span>
        </button>
        {dropdownOpen && !loading && (
          <>
            <div className="absolute z-10 mt-1 w-full flex flex-col rounded-lg border border-[#e5e5e3] bg-white shadow-lg max-h-72 overflow-hidden">
              <div className="shrink-0 p-2 border-b border-[#e5e5e3] bg-white">
                <input
                  ref={searchInputRef}
                  type="search"
                  value={pickerQuery}
                  onChange={(e) => setPickerQuery(e.target.value)}
                  placeholder="Pesquisar por nome, slug ou ID…"
                  className={inputClass + " py-2"}
                  aria-label="Pesquisar produtos para adicionar"
                  autoComplete="off"
                />
              </div>
              <div className="min-h-0 max-h-52 overflow-y-auto">
                {available.length === 0 ? (
                  <div className="px-3 py-3 text-[12px] text-[#5a5a59]">
                    Todos os produtos já foram adicionados ou não há produtos na loja.
                  </div>
                ) : filteredAvailable.length === 0 ? (
                  <div className="px-3 py-3 text-[12px] text-[#5a5a59]">Nenhum produto corresponde à pesquisa.</div>
                ) : (
                  filteredAvailable.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => addProduct(p)}
                      className="block w-full text-left px-3 py-2.5 text-[13px] hover:bg-[#f5f5f4] border-b border-[#e5e5e3] last:border-0"
                    >
                      <span className="font-medium text-[#131313]">{p.name}</span>
                      <span className="text-[#5a5a59] ml-2">{p.price} €</span>
                      {p.slug ? (
                        <span className="block text-[11px] text-[#8a8a89] mt-0.5 font-mono">{p.slug}</span>
                      ) : null}
                    </button>
                  ))
                )}
              </div>
            </div>
            <div className="fixed inset-0 z-[5]" aria-hidden onClick={() => setDropdownOpen(false)} />
          </>
        )}
      </div>
    </div>
  );
}
