import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router";
import { useContentState } from "../../content/ContentContext";
import { putContent } from "../../content/api";
import { getDefault } from "../../content/defaults";
import { useToast } from "../components/Toast";
import { ImageUploadField } from "../components/ImageUploadField";

const page = "footer";

type LinkItem = { label: string; url: string };

const SECTIONS = [
  { key: "cta", title: "Call to Action", iconBg: "bg-[#313b2e]/8", fields: ["title", "description", "button"] as const, textarea: ["description"] as const },
  { key: "company", title: "Empresa", iconBg: "bg-blue-500/8", fields: ["logo", "name", "description"] as const, textarea: ["description"] as const },
  { key: "social", title: "Redes Sociais", iconBg: "bg-purple-500/8", fields: ["twitter", "facebook", "instagram", "linkedin"] as const, textarea: [] as const },
  { key: "bottom", title: "Rodapé", iconBg: "bg-amber-500/8", fields: ["copyright", "back_to_top"] as const, textarea: [] as const },
];

const LINK_COLUMNS = [
  { key: "links_loja", title: "Coluna Loja", iconBg: "bg-emerald-500/8" },
  { key: "links_empresa", title: "Coluna Empresa", iconBg: "bg-sky-500/8" },
  { key: "links_legais", title: "Coluna Links Legais", iconBg: "bg-violet-500/8" },
];

function parseLinkItems(raw: string | undefined): LinkItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => x && typeof (x as LinkItem).label === "string" && typeof (x as LinkItem).url === "string") as LinkItem[];
  } catch {
    return [];
  }
}

interface FooterEditorProps {
  embedded?: boolean;
}

export default function FooterEditor({ embedded = false }: FooterEditorProps) {
  const { content, refetch } = useContentState();
  const { toast } = useToast();
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Record<string, string>>>({});
  const [linkColumns, setLinkColumns] = useState<Record<string, LinkItem[]>>({});

  const getVal = (section: string, field: string) =>
    content[page]?.[section]?.[field] ?? getDefault(page, section, field) ?? "";

  useEffect(() => {
    const next: Record<string, Record<string, string>> = {};
    for (const { key, fields } of SECTIONS) {
      next[key] = {};
      for (const f of fields) {
        next[key][f] = getVal(key, f);
      }
    }
    for (const { key } of LINK_COLUMNS) {
      next[key] = { title: getVal(key, "title") };
    }
    setDrafts(next);
    const linkNext: Record<string, LinkItem[]> = {};
    for (const { key } of LINK_COLUMNS) {
      linkNext[key] = parseLinkItems(getVal(key, "items"));
    }
    setLinkColumns(linkNext);
  }, [content]);

  const saveSection = useCallback(
    async (sectionKey: string, draft: Record<string, string>) => {
      setSavingSection(sectionKey);
      try {
        for (const [field, value] of Object.entries(draft)) {
          await putContent(page, sectionKey, field, value, field === "items" ? "json" : "text");
        }
        await refetch();
        setSavedSection(sectionKey);
        setTimeout(() => setSavedSection(null), 2000);
        toast("Footer guardado com sucesso.");
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Erro ao guardar footer";
        toast(msg, "error");
      } finally {
        setSavingSection(null);
      }
    },
    [refetch, toast]
  );

  const setDraftField = useCallback((sectionKey: string, field: string, value: string) => {
    setDrafts((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [field]: value },
    }));
  }, []);

  const updateLinkItem = (colKey: string, index: number, patch: Partial<LinkItem>) => {
    setLinkColumns((prev) => ({
      ...prev,
      [colKey]: (prev[colKey] ?? []).map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }));
  };
  const addLinkItem = (colKey: string) => {
    setLinkColumns((prev) => ({ ...prev, [colKey]: [...(prev[colKey] ?? []), { label: "Novo link", url: "#" }] }));
  };
  const removeLinkItem = (colKey: string, index: number) => {
    setLinkColumns((prev) => ({ ...prev, [colKey]: (prev[colKey] ?? []).filter((_, i) => i !== index) }));
  };
  const moveLinkItem = (colKey: string, index: number, dir: "up" | "down") => {
    const list = linkColumns[colKey] ?? [];
    const next = [...list];
    const j = dir === "up" ? index - 1 : index + 1;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    setLinkColumns((prev) => ({ ...prev, [colKey]: next }));
  };

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
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Footer</h1>
          <p className="text-[14px] text-[#5a5a59] mt-1">CTA, empresa, redes sociais, colunas de links e rodapé. Pode adicionar, remover e reordenar links em cada coluna.</p>
        </div>
      )}

      <div className="max-w-2xl space-y-5">
        {LINK_COLUMNS.map(({ key: colKey, title, iconBg }) => {
          const items = linkColumns[colKey] ?? [];
          const titleVal = content[page]?.[colKey]?.title ?? getDefault(page, colKey, "title") ?? title;
          const draftTitle = drafts[colKey]?.title ?? titleVal;
          const isDirty =
            JSON.stringify(items) !== JSON.stringify(parseLinkItems(getVal(colKey, "items"))) ||
            draftTitle !== getVal(colKey, "title");
          const savePayload = { title: draftTitle, items: JSON.stringify(items) };
          return (
            <div key={colKey} className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
                  <svg className="w-4 h-4 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftField(colKey, "title", e.target.value)}
                  className="flex-1 text-[16px] font-semibold text-[#131313] bg-transparent border-b border-transparent hover:border-[#e5e5e3] focus:border-[#313b2e] focus:outline-none px-1"
                  placeholder="Título da coluna"
                />
                <button
                  type="button"
                  onClick={() => saveSection(colKey, savePayload)}
                  disabled={!isDirty || savingSection === colKey}
                  className="px-4 py-2 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  {savingSection === colKey ? "A guardar..." : savedSection === colKey ? "Guardado" : "Guardar secção"}
                </button>
              </div>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-[#e5e5e3] bg-[#fafaf9]">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateLinkItem(colKey, index, { label: e.target.value })}
                      placeholder="Texto"
                      className="flex-1 min-w-[100px] px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => updateLinkItem(colKey, index, { url: e.target.value })}
                      placeholder="/página ou https://..."
                      className="flex-1 min-w-[120px] px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveLinkItem(colKey, index, "up")} disabled={index === 0} className="p-2 rounded-lg border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-40" aria-label="Mover para cima">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                      </button>
                      <button type="button" onClick={() => moveLinkItem(colKey, index, "down")} disabled={index === items.length - 1} className="p-2 rounded-lg border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-40" aria-label="Mover para baixo">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <button type="button" onClick={() => removeLinkItem(colKey, index)} className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50" aria-label="Remover">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => addLinkItem(colKey)} className="w-full py-2.5 rounded-xl border border-dashed border-[#dcdcdc] text-[13px] font-medium text-[#5a5a59] hover:border-[#313b2e] hover:text-[#313b2e] transition-colors">
                  + Adicionar link
                </button>
              </div>
            </div>
          );
        })}
        {SECTIONS.map(({ key: sectionKey, title, iconBg, fields, textarea }) => {
          const draft = drafts[sectionKey] ?? {};
          const isDirty = fields.some((f) => (draft[f] ?? getVal(sectionKey, f)) !== getVal(sectionKey, f));

          return (
            <div key={sectionKey} className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
                  <svg className="w-4 h-4 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </div>
                <h2 className="text-[16px] font-semibold text-[#131313] flex-1">{title}</h2>
                <button
                  type="button"
                  onClick={() => saveSection(sectionKey, draft)}
                  disabled={!isDirty || savingSection === sectionKey}
                  className="px-4 py-2 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  {savingSection === sectionKey ? "A guardar..." : savedSection === sectionKey ? "Guardado" : "Guardar secção"}
                </button>
              </div>
              <div className={fields.length > 2 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"}>
                {fields.map((field) => (
                  <div key={field} className={field === "logo" ? "sm:col-span-2" : ""}>
                    {field === "logo" ? (
                      <ImageUploadField
                        label="Logo"
                        value={draft[field] ?? getVal(sectionKey, field)}
                        onChange={(path) => {
                          setDraftField(sectionKey, field, path);
                          saveSection(sectionKey, { ...draft, [field]: path });
                        }}
                        page="footer"
                        section="company"
                        hint="Imagem do logo no rodapé. Pode usar o mesmo do header."
                      />
                    ) : (
                      <>
                        <label className="block text-[13px] font-medium text-[#131313] mb-1.5 capitalize">{field}</label>
                        {textarea.includes(field) ? (
                          <textarea
                            value={draft[field] ?? getVal(sectionKey, field)}
                            onChange={(e) => setDraftField(sectionKey, field, e.target.value)}
                            placeholder={getDefault(page, sectionKey, field) ?? ""}
                            className="w-full px-4 py-3 border border-[#e5e5e3] rounded-xl text-[13px] min-h-[80px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 focus:outline-none transition-all resize-y"
                          />
                        ) : (
                          <input
                            type="text"
                            value={draft[field] ?? getVal(sectionKey, field)}
                            onChange={(e) => setDraftField(sectionKey, field, e.target.value)}
                            placeholder={getDefault(page, sectionKey, field) ?? ""}
                            className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 focus:outline-none transition-all"
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
