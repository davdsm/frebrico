import React, { useState, useEffect } from "react";
import { fetchCategories, type Category } from "../../api/shop";

/** Stored in content for products/hero: { name, slug }[] */
export type CategoryItemSimple = { name: string; slug: string };

/** Stored in content for header/mobile: { title, slug, description }[] */
export type CategoryItemFull = { title: string; slug: string; description: string };

type Variant = "simple" | "full";

function parseStored(value: string, variant: Variant): (CategoryItemSimple | CategoryItemFull)[] {
  try {
    const raw = value?.trim();
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p: unknown) => {
      if (p && typeof p === "object" && "slug" in p) {
        const o = p as Record<string, unknown>;
        if (variant === "full") {
          return {
            title: String(o.title ?? o.name ?? ""),
            slug: String(o.slug ?? ""),
            description: String(o.description ?? ""),
          } as CategoryItemFull;
        }
        return {
          name: String(o.name ?? o.title ?? ""),
          slug: String(o.slug ?? ""),
        } as CategoryItemSimple;
      }
      return variant === "full"
        ? ({ title: "", slug: "", description: "" } as CategoryItemFull)
        : ({ name: "", slug: "" } as CategoryItemSimple);
    });
  } catch {
    return [];
  }
}

function toStored(
  items: (CategoryItemSimple | CategoryItemFull)[],
  variant: Variant
): string {
  return JSON.stringify(items, null, 2);
}

interface ContentCategoriesPickerProps {
  value: string;
  onChange: (json: string) => void;
  label?: string;
  hint?: string;
  /** "simple" => { name, slug } (e.g. products hero). "full" => { title, slug, description } (e.g. header mobile). */
  variant?: Variant;
}

export function ContentCategoriesPicker({
  value,
  onChange,
  label = "Categorias",
  hint,
  variant = "simple",
}: ContentCategoriesPickerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected = parseStored(value, variant);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCategories()
      .then((list) => {
        if (!cancelled) setCategories(list);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const addCategory = (c: Category) => {
    if (variant === "full") {
      const item: CategoryItemFull = {
        title: c.name,
        slug: c.slug,
        description: c.description || "",
      };
      const next = [...(selected as CategoryItemFull[]).filter((s) => s.slug !== c.slug), item];
      onChange(toStored(next, variant));
    } else {
      const item: CategoryItemSimple = { name: c.name, slug: c.slug };
      const next = [...(selected as CategoryItemSimple[]).filter((s) => s.slug !== c.slug), item];
      onChange(toStored(next, variant));
    }
    setDropdownOpen(false);
  };

  const removeAt = (index: number) => {
    const next = selected.filter((_, i) => i !== index);
    onChange(toStored(next, variant));
  };

  const move = (index: number, dir: "up" | "down") => {
    const j = dir === "up" ? index - 1 : index + 1;
    if (j < 0 || j >= selected.length) return;
    const next = [...selected];
    [next[index], next[j]] = [next[j], next[index]];
    onChange(toStored(next, variant));
  };

  const selectedSlugs = new Set(selected.map((s) => s.slug));
  const available = categories.filter((c) => !selectedSlugs.has(c.slug));

  const displayName = (item: CategoryItemSimple | CategoryItemFull) =>
    variant === "full" ? (item as CategoryItemFull).title : (item as CategoryItemSimple).name;

  return (
    <div>
      <label className="block text-[13px] font-medium text-[#131313] mb-1.5">{label}</label>
      {hint && <p className="text-[12px] text-[#5a5a59] mb-2">{hint}</p>}
      <div className="space-y-3">
        {selected.map((item, index) => (
          <div
            key={`${item.slug}-${index}`}
            className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-[#e5e5e3] bg-[#fafaf9]"
          >
            <div className="flex-1 min-w-[140px]">
              <span className="text-[13px] font-medium text-[#131313]">{displayName(item)}</span>
              <span className="text-[12px] text-[#5a5a59] ml-2 font-mono">{item.slug}</span>
              {variant === "full" && (item as CategoryItemFull).description && (
                <p className="text-[11px] text-[#5a5a59] mt-1 line-clamp-2">{(item as CategoryItemFull).description}</p>
              )}
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
          className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none text-left flex items-center justify-between"
        >
          <span className="text-[#5a5a59]">{loading ? "A carregar categorias..." : "Adicionar categoria da loja"}</span>
          <span className="text-[#5a5a59]">{dropdownOpen ? "▲" : "▼"}</span>
        </button>
        {dropdownOpen && !loading && (
          <>
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-[#e5e5e3] bg-white shadow-lg max-h-56 overflow-y-auto">
              {available.length === 0 ? (
                <div className="px-3 py-3 text-[12px] text-[#5a5a59]">Todas as categorias já foram adicionadas ou não há categorias na loja.</div>
              ) : (
                available.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => addCategory(c)}
                    className="block w-full text-left px-3 py-2.5 text-[13px] hover:bg-[#f5f5f4] border-b border-[#e5e5e3] last:border-0"
                  >
                    <span className="font-medium text-[#131313]">{c.name}</span>
                    <span className="text-[#5a5a59] ml-2 font-mono text-[11px]">{c.slug}</span>
                  </button>
                ))
              )}
            </div>
            <div className="fixed inset-0 z-[5]" aria-hidden onClick={() => setDropdownOpen(false)} />
          </>
        )}
      </div>
    </div>
  );
}
