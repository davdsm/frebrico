import React, { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useContentState } from "../../content/ContentContext";
import { putContent } from "../../content/api";
import { getDefault, defaults } from "../../content/defaults";
import { useToast } from "../components/Toast";
import { StructuredJsonField } from "../components/StructuredJsonField";
import { ContentProductsPicker } from "../components/ContentProductsPicker";
import { ContentCategoriesPicker } from "../components/ContentCategoriesPicker";
import { ImageUploadField } from "../components/ImageUploadField";

const PAGES: Record<string, string> = {
  home: "Home",
  about: "Sobre Nós",
  products: "Produtos",
  category: "Categoria",
  "product-detail": "Detalhe Produto",
  cart: "Carrinho",
  contact: "Contactos",
  login: "Login",
  register: "Registo",
  "recover-password": "Recuperar Password",
};

/** Optional display names for page sections in the sidebar (page -> sectionKey -> label). */
const SECTION_LABELS: Record<string, Record<string, string>> = {
  about: {
    seo: "SEO",
    hero: "Hero",
    content_tab1: "Conteúdo (Tab 1)",
    content_tab2: "Conteúdo (Tab 2)",
    content_tab3: "Conteúdo (Tab 3)",
    content_images: "Imagens da secção",
    solutions: "Soluções",
  },
  contact: {
    seo: "SEO",
    hero: "Hero",
    map: "Mapa e Moradas",
  },
};

function getSectionLabel(pageSlug: string, sectionKey: string): string {
  return SECTION_LABELS[pageSlug]?.[sectionKey] ?? sectionKey;
}

function getFieldType(defaultValue: string): string {
  const t = defaultValue.trim();
  return t.startsWith("[") || t.startsWith("{") ? "json" : t.length > 80 ? "textarea" : "text";
}

export default function PageEditor() {
  const { slug } = useParams<{ slug: string }>();
  const { content, refetch } = useContentState();
  const { toast } = useToast();
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sectionDraft, setSectionDraft] = useState<Record<string, string>>({});

  const pageSlug = slug ?? "home";
  const sectionKeys = Object.keys(defaults[pageSlug] ?? {});

  const getValue = useCallback(
    (section: string, field: string) => content[pageSlug]?.[section]?.[field] ?? getDefault(pageSlug, section, field) ?? "",
    [content, pageSlug]
  );

  const currentSection = selectedSection ?? sectionKeys[0];
  const sectionDef = defaults[pageSlug]?.[currentSection];

  useEffect(() => {
    if (!sectionDef) return;
    const draft: Record<string, string> = {};
    for (const key of Object.keys(sectionDef)) {
      draft[key] = getValue(currentSection, key);
    }
    setSectionDraft(draft);
  }, [currentSection, content, pageSlug, getValue, sectionDef]);

  const setDraftField = useCallback((field: string, value: string) => {
    setSectionDraft((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveSection = async () => {
    if (!sectionDef) return;
    setSavingSection(currentSection);
    try {
      for (const [field, value] of Object.entries(sectionDraft)) {
        const defaultValue = sectionDef[field] ?? "";
        await putContent(pageSlug, currentSection, field, value, getFieldType(defaultValue));
      }
      await refetch();
      setSavedSection(currentSection);
      setTimeout(() => setSavedSection(null), 2000);
      toast(`Secção "${currentSection}" guardada.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao guardar secção";
      toast(msg, "error");
    } finally {
      setSavingSection(null);
    }
  };

  const handleResetSection = useCallback(() => {
    if (!sectionDef) return;
    const draft: Record<string, string> = {};
    for (const key of Object.keys(sectionDef)) {
      draft[key] = getDefault(pageSlug, currentSection, key) ?? "";
    }
    setSectionDraft(draft);
  }, [sectionDef, pageSlug, currentSection]);

  if (!slug || !defaults[pageSlug]) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-[15px] text-[#5a5a59] mb-3">Página não encontrada.</p>
        <Link to="/admin/pages" className="text-[13px] font-medium text-[#313b2e] hover:underline underline-offset-2">
          Voltar a Páginas
        </Link>
      </div>
    );
  }

  const sectionFields = sectionDef
    ? Object.entries(sectionDef).map(([key, defaultValue]) => ({
        key,
        defaultValue,
        value: sectionDraft[key] ?? getValue(currentSection, key),
      }))
    : [];
  const isDirty =
    sectionDef &&
    Object.keys(sectionDef).some(
      (k) => (sectionDraft[k] ?? getValue(currentSection, k)) !== (content[pageSlug]?.[currentSection]?.[k] ?? getDefault(pageSlug, currentSection, k) ?? "")
    );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/admin/pages"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5a5a59] hover:text-[#313b2e] transition-colors mb-3 group"
        >
          <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Páginas
        </Link>
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">{PAGES[pageSlug] ?? pageSlug}</h1>
        <p className="text-[14px] text-[#5a5a59] mt-1">Editar conteúdo por secção. As alterações aparecem no site após guardar.</p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Section nav */}
        <div className="lg:w-52 shrink-0">
          <div className="bg-white rounded-2xl border border-[#e5e5e3] p-2 sticky top-6">
            <p className="text-[10px] font-semibold text-[#5a5a59]/80 uppercase tracking-[0.12em] px-3 py-2">Secções</p>
            {sectionKeys.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSelectedSection(sec)}
                className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-all ${
                  sec === currentSection
                    ? "bg-[#313b2e] text-white shadow-[0_2px_8px_rgba(49,59,46,0.18)]"
                    : "text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313]"
                }`}
              >
                {getSectionLabel(pageSlug, sec)}
              </button>
            ))}
          </div>
        </div>

        {/* Field editor */}
        <div className="flex-1 bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
            <div className="w-8 h-8 rounded-lg bg-[#313b2e]/8 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <h2 className="text-[16px] font-semibold text-[#131313] capitalize">{currentSection}</h2>
          </div>
          <div className="space-y-5">
            {sectionFields.map(({ key, value, defaultValue }) => (
              <FieldRow
                key={key}
                fieldKey={key}
                value={value}
                defaultValue={defaultValue}
                sectionKey={currentSection}
                pageSlug={pageSlug}
                onChange={(v) => setDraftField(key, v)}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#e5e5e3]">
            <button
              type="button"
              onClick={handleSaveSection}
              disabled={!isDirty || savingSection === currentSection}
              className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              {savingSection === currentSection ? "A guardar..." : savedSection === currentSection ? (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Guardado
                </span>
              ) : "Guardar secção"}
            </button>
            <button
              type="button"
              onClick={handleResetSection}
              className="px-4 py-2.5 border border-[#e5e5e3] text-[13px] font-medium text-[#5a5a59] rounded-xl hover:bg-[#f5f5f4] hover:text-[#131313] hover:border-[#dcdcdc] transition-all"
            >
              Repor secção
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentImagesListEditor({
  value,
  pageSlug,
  sectionKey,
  onChange,
  onItemChange,
  onRemoveSlot,
}: {
  value: string;
  pageSlug: string;
  sectionKey: string;
  onChange: (value: string) => void;
  onItemChange: (index: number, path: string) => void;
  onRemoveSlot: (index: number) => void;
}) {
  const parseItems = (raw: string): { path: string }[] => {
    try {
      const arr = JSON.parse(raw || "[]");
      return Array.isArray(arr) ? arr.map((x) => ({ path: typeof x?.path === "string" ? x.path : "" })) : [];
    } catch {
      return [];
    }
  };
  const items = parseItems(value);
  const minItems = 1;
  const displayItems = items.length >= minItems ? items : [{ path: "" }];

  const addSlot = () => {
    const next = [...parseItems(value), { path: "" }];
    onChange(JSON.stringify(next));
  };

  return (
    <div>
      <p className="text-[12px] text-[#5a5a59] mb-3">Carregue múltiplas imagens para esta secção. As imagens vão aparecer no slider desta área.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayItems.map((item, i) => (
          <div key={i} className="relative border border-[#e5e5e3] rounded-xl p-4 bg-[#fafaf9]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] font-medium text-[#131313]">Imagem {i + 1}</p>
              {displayItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveSlot(i)}
                  className="text-[11px] font-medium text-red-600 hover:text-red-700 hover:underline"
                  title="Eliminar esta imagem do carrossel"
                >
                  Eliminar slot
                </button>
              )}
            </div>
            <ImageUploadField
              label=""
              value={item.path}
              onChange={(p) => onItemChange(i, p)}
              page={pageSlug}
              section={sectionKey}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addSlot}
        className="mt-3 text-[12px] font-medium text-[#313b2e] hover:underline"
      >
        + Adicionar mais uma imagem
      </button>
    </div>
  );
}

const PRODUCT_SECTIONS = ["carousel", "grid", "related"];
const CATEGORIES_FIELD = "categories";
const CATEGORIES_HERO_SECTION = "hero";
const CATEGORIES_MOBILE_SECTION = "mobile";
const CONTENT_IMAGES_SECTION = "content_images";
const CONTENT_IMAGES_ITEMS_FIELD = "items";
const HOME_PAGE = "home";
const HERO_SECTION = "hero";
const HERO_IMAGES_FIELD = "images";
const FEATURES_SECTION = "features";
const FEATURES_IMAGE_FIELD = "image";
const ABOUT_PAGE = "about";
const SOLUTIONS_SECTION = "solutions";
const SOLUTIONS_ITEMS_FIELD = "items";
const ABOUT_HERO_IMAGE_FIELD = "image";
const CONTACT_PAGE = "contact";
const CONTACT_MAP_SECTION = "map";
const CONTACT_MAP_IMAGE_FIELD = "image";

type SolutionItemDraft = { number: string; title: string; description: string; image: string };

function parseSolutionsItems(raw: string): SolutionItemDraft[] {
  try {
    const arr = JSON.parse(raw || "[]");
    if (!Array.isArray(arr)) return [];
    return arr.map((x) => ({
      number: typeof x?.number === "string" ? x.number : "",
      title: typeof x?.title === "string" ? x.title : "",
      description: typeof x?.description === "string" ? x.description : "",
      image: typeof x?.image === "string" ? x.image : "",
    }));
  } catch {
    return [];
  }
}

function AboutSolutionsItemsEditor({
  value,
  pageSlug,
  onChange,
}: {
  value: string;
  pageSlug: string;
  onChange: (v: string) => void;
}) {
  const items = parseSolutionsItems(value);
  const displayItems = items.length ? items : [{ number: "", title: "", description: "", image: "" }];

  const updateItem = (index: number, partial: Partial<SolutionItemDraft>) => {
    const next = [...parseSolutionsItems(value)];
    while (next.length <= index) next.push({ number: "", title: "", description: "", image: "" });
    next[index] = { ...next[index], ...partial };
    onChange(JSON.stringify(next));
  };

  const addItem = () => {
    onChange(JSON.stringify([...parseSolutionsItems(value), { number: "", title: "", description: "", image: "" }]));
  };

  const removeItem = (index: number) => {
    const next = parseSolutionsItems(value).filter((_, i) => i !== index);
    onChange(JSON.stringify(next.length ? next : [{ number: "", title: "", description: "", image: "" }]));
  };

  return (
    <div className="space-y-4">
      <p className="text-[12px] text-[#5a5a59]">
        Edite cada solução: número, título, texto e imagem do cartão. As imagens são guardadas em <code className="text-[11px]">uploads/{pageSlug}/solutions/</code>.
      </p>
      {displayItems.map((item, i) => (
        <div key={i} className="border border-[#e5e5e3] rounded-xl p-4 bg-[#fafaf9] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold text-[#131313]">Solução {i + 1}</span>
            {displayItems.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-[11px] font-medium text-red-600 hover:text-red-700 hover:underline"
              >
                Eliminar item
              </button>
            )}
          </div>
          <div>
            <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Número (ex. 01/03)</label>
            <input
              type="text"
              value={item.number}
              onChange={(e) => updateItem(i, { number: e.target.value })}
              className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Título</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateItem(i, { title: e.target.value })}
              className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Descrição</label>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(i, { description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-white resize-y"
            />
          </div>
          <ImageUploadField
            label="Imagem do cartão"
            value={item.image}
            onChange={(p) => updateItem(i, { image: p })}
            page={pageSlug}
            section={SOLUTIONS_SECTION}
            hint="Imagem no topo do cartão na secção Soluções (Sobre Nós)."
          />
        </div>
      ))}
      <button type="button" onClick={addItem} className="text-[12px] font-medium text-[#313b2e] hover:underline">
        + Adicionar solução
      </button>
    </div>
  );
}

function FieldRow({
  fieldKey,
  value,
  defaultValue,
  sectionKey,
  pageSlug,
  onChange,
}: {
  fieldKey: string;
  value: string;
  defaultValue: string;
  sectionKey: string;
  pageSlug: string;
  onChange: (value: string) => void;
}) {
  const isJson = defaultValue.trim().startsWith("[") || defaultValue.trim().startsWith("{");
  const isLongText = defaultValue.length > 80 || (isJson && value.length > 80);
  const isProductsField = fieldKey === "products" && PRODUCT_SECTIONS.includes(sectionKey);
  const isCategoriesField =
    fieldKey === CATEGORIES_FIELD &&
    (sectionKey === CATEGORIES_HERO_SECTION || sectionKey === CATEGORIES_MOBILE_SECTION);
  const isContentImagesField =
    sectionKey === CONTENT_IMAGES_SECTION && fieldKey === CONTENT_IMAGES_ITEMS_FIELD;
  const isHomeHeroImagesField =
    pageSlug === HOME_PAGE && sectionKey === HERO_SECTION && fieldKey === HERO_IMAGES_FIELD;
  const isHomeFeaturesImageField =
    pageSlug === HOME_PAGE && sectionKey === FEATURES_SECTION && fieldKey === FEATURES_IMAGE_FIELD;
  const isAboutSolutionsItemsField =
    pageSlug === ABOUT_PAGE && sectionKey === SOLUTIONS_SECTION && fieldKey === SOLUTIONS_ITEMS_FIELD;
  /** About hero uses singular `image` (right column); Home hero uses plural `images` (carousel). */
  const isAboutHeroImageField =
    pageSlug === ABOUT_PAGE && sectionKey === HERO_SECTION && fieldKey === ABOUT_HERO_IMAGE_FIELD;
  const isContactMapImageField =
    pageSlug === CONTACT_PAGE && sectionKey === CONTACT_MAP_SECTION && fieldKey === CONTACT_MAP_IMAGE_FIELD;

  const parseItems = (raw: string): { path: string }[] => {
    try {
      const arr = JSON.parse(raw || "[]");
      return Array.isArray(arr) ? arr.map((x) => ({ path: typeof x?.path === "string" ? x.path : "" })) : [];
    } catch {
      return [];
    }
  };

  const updateItemPath = (index: number, path: string) => {
    const items = parseItems(value);
    while (items.length <= index) items.push({ path: "" });
    items[index] = { path };
    onChange(JSON.stringify(items));
  };

  const removeSlot = (index: number) => {
    const items = parseItems(value).filter((_, i) => i !== index);
    onChange(JSON.stringify(items.length ? items : [{ path: "" }]));
  };

  return (
    <div className="group">
      <label className="block text-[13px] font-medium text-[#131313] mb-1.5">{fieldKey}</label>
      {isContentImagesField || isHomeHeroImagesField ? (
        <ContentImagesListEditor
          value={value}
          pageSlug={pageSlug}
          sectionKey={sectionKey}
          onChange={onChange}
          onItemChange={updateItemPath}
          onRemoveSlot={removeSlot}
        />
      ) : isHomeFeaturesImageField ? (
        <ImageUploadField
          label="Imagem"
          value={value}
          onChange={onChange}
          page={pageSlug}
          section={sectionKey}
          hint="Imagem principal da secção 'Cada espaço tem desafios diferentes.'"
        />
      ) : isAboutHeroImageField ? (
        <ImageUploadField
          label="Imagem do hero"
          value={value}
          onChange={onChange}
          page={pageSlug}
          section={sectionKey}
          hint="Imagem à direita no topo da página Sobre Nós (mesmo campo que o site usa)."
        />
      ) : isContactMapImageField ? (
        <ImageUploadField
          label="Imagem do mapa/contactos"
          value={value}
          onChange={onChange}
          page={pageSlug}
          section={sectionKey}
          hint="Imagem de fundo da secção de mapa na página Contactos."
        />
      ) : isAboutSolutionsItemsField ? (
        <AboutSolutionsItemsEditor value={value} pageSlug={pageSlug} onChange={onChange} />
      ) : isProductsField ? (
        <ContentProductsPicker
          value={value}
          onChange={onChange}
          label="Produtos"
          hint="Selecione os produtos disponíveis na loja. Pode reordenar e definir um badge por produto."
        />
      ) : isCategoriesField ? (
        <ContentCategoriesPicker
          value={value}
          onChange={onChange}
          label="Categorias"
          hint="Selecione as categorias disponíveis na loja. Pode reordenar a lista."
          variant={sectionKey === CATEGORIES_MOBILE_SECTION ? "full" : "simple"}
        />
      ) : isJson ? (
        <StructuredJsonField
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          fieldKey={fieldKey}
          sectionKey={sectionKey}
        />
      ) : isLongText ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={defaultValue}
          className="w-full px-4 py-3 border border-[#e5e5e3] rounded-xl text-[13px] min-h-[100px] font-mono bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 focus:outline-none transition-all resize-y"
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={defaultValue}
          className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 focus:outline-none transition-all"
        />
      )}
    </div>
  );
}
