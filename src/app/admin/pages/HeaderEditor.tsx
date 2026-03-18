import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router";
import { useContentState } from "../../content/ContentContext";
import { putContent } from "../../content/api";
import { getDefault } from "../../content/defaults";
import { useToast } from "../components/Toast";
import { ContentCategoriesPicker } from "../components/ContentCategoriesPicker";

const page = "header";

type NavItem = { label: string; url: string };

const defaultNavItems: NavItem[] = [
  { label: "Sobre Nós", url: "/about" },
  { label: "Produtos", url: "/products" },
  { label: "Contactos", url: "/contact" },
];

function parseNavItems(raw: string | undefined): NavItem[] {
  if (!raw) return defaultNavItems;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return defaultNavItems;
    return parsed.filter((x) => x && typeof x.label === "string" && typeof x.url === "string");
  } catch {
    return defaultNavItems;
  }
}

function getMobileCategoriesRaw(content: Record<string, Record<string, Record<string, string>>>, getDefaultVal: (s: string, f: string) => string): string {
  const raw = content[page]?.mobile?.categories ?? getDefaultVal("mobile", "categories");
  return typeof raw === "string" ? raw : "";
}

interface HeaderEditorProps {
  embedded?: boolean;
}

export default function HeaderEditor({ embedded = false }: HeaderEditorProps) {
  const { content, refetch } = useContentState();
  const { toast } = useToast();
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);
  const [mobileCategoriesJson, setMobileCategoriesJson] = useState("");

  const getVal = (section: string, field: string) =>
    content[page]?.[section]?.[field] ?? getDefault(page, section, field) ?? "";

  useEffect(() => {
    const navRaw = content[page]?.nav?.items ?? getDefault(page, "nav", "items") ?? "";
    setNavItems(parseNavItems(typeof navRaw === "string" ? navRaw : ""));
    setMobileCategoriesJson(getMobileCategoriesRaw(content, (s, f) => getDefault(page, s, f) ?? ""));
  }, [content]);

  const saveSection = useCallback(
    async (section: string, payload: Record<string, string>) => {
      setSavingSection(section);
      try {
        for (const [field, value] of Object.entries(payload)) {
          const type =
            field === "desktop" || field === "mobile" ? "image" : field === "items" || field === "categories" ? "json" : "text";
          await putContent(page, section, field, value, type);
        }
        await refetch();
        setSavedSection(section);
        setTimeout(() => setSavedSection(null), 2000);
        toast("Header guardado com sucesso.");
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Erro ao guardar header";
        toast(msg, "error");
      } finally {
        setSavingSection(null);
      }
    },
    [refetch, toast]
  );

  const updateNavItem = (index: number, patch: Partial<NavItem>) => {
    setNavItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const addNavItem = () => setNavItems((prev) => [...prev, { label: "Novo link", url: "/" }]);
  const removeNavItem = (index: number) => setNavItems((prev) => prev.filter((_, i) => i !== index));
  const moveNavItem = (index: number, dir: "up" | "down") => {
    const next = [...navItems];
    const j = dir === "up" ? index - 1 : index + 1;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    setNavItems(next);
  };

  const navPayload = { items: JSON.stringify(navItems) };
  const isNavDirty = JSON.stringify(navItems) !== JSON.stringify(parseNavItems(getVal("nav", "items")));
  const isMobileDirty = mobileCategoriesJson !== getMobileCategoriesRaw(content, (s, f) => getVal(s, f));

  const handleMobileCategoriesChange = useCallback((json: string) => {
    setMobileCategoriesJson(json);
  }, []);

  return (
    <div>
      {!embedded && (
        <div className="mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5a5a59] hover:text-[#313b2e] transition-colors mb-3 group"
          >
            <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Dashboard
          </Link>
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Header</h1>
          <p className="text-[14px] text-[#5a5a59] mt-1">Links da navegação e logótipo. Pode adicionar, remover e reordenar. As alterações aparecem no site após guardar.</p>
        </div>
      )}

      <div className="max-w-2xl space-y-5">
        <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/8 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <h2 className="text-[16px] font-semibold text-[#131313]">Navegação</h2>
            </div>
            <button
              type="button"
              onClick={() => saveSection("nav", navPayload)}
              disabled={!isNavDirty || savingSection === "nav"}
              className="px-4 py-2 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              {savingSection === "nav" ? "A guardar..." : savedSection === "nav" ? "Guardado" : "Guardar secção"}
            </button>
          </div>
          <div className="space-y-3">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-[#e5e5e3] bg-[#fafaf9]"
              >
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateNavItem(index, { label: e.target.value })}
                  placeholder="Texto do link"
                  className="flex-1 min-w-[120px] px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => updateNavItem(index, { url: e.target.value })}
                  placeholder="/página ou https://..."
                  className="flex-1 min-w-[140px] px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
                />
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveNavItem(index, "up")}
                    disabled={index === 0}
                    className="p-2 rounded-lg border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-40"
                    aria-label="Mover para cima"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveNavItem(index, "down")}
                    disabled={index === navItems.length - 1}
                    className="p-2 rounded-lg border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-40"
                    aria-label="Mover para baixo"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeNavItem(index)}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                    aria-label="Remover"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addNavItem}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#dcdcdc] text-[13px] font-medium text-[#5a5a59] hover:border-[#313b2e] hover:text-[#313b2e] transition-colors"
            >
              + Adicionar link
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/8 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                </svg>
              </div>
              <h2 className="text-[16px] font-semibold text-[#131313]">Categorias (menu mobile)</h2>
            </div>
            <button
              type="button"
              onClick={() => saveSection("mobile", { categories: mobileCategoriesJson })}
              disabled={!isMobileDirty || savingSection === "mobile"}
              className="px-4 py-2 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              {savingSection === "mobile" ? "A guardar..." : savedSection === "mobile" ? "Guardado" : "Guardar secção"}
            </button>
          </div>
          <ContentCategoriesPicker
            value={mobileCategoriesJson}
            onChange={handleMobileCategoriesChange}
            label="Categorias"
            hint="Selecione as categorias a mostrar no menu mobile. Use nome e descrição da categoria na loja."
            variant="full"
          />
        </div>
      </div>
    </div>
  );
}
