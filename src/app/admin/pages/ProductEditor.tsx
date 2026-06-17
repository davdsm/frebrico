import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  fetchCategories,
  fetchProducts,
  fetchProductByIdOrSlug,
  fetchAttributes,
  createProductApi,
  updateProductApi,
  type Attribute,
  type Category,
  type Product,
} from "../../api/shop";
import { ImageUploadField } from "../components/ImageUploadField";
import { AttributesPicker, type ProductAttributeGroup } from "../components/AttributesPicker";
import { DownloadsEditor, type DownloadItem } from "../components/DownloadsEditor";
import { SpecsTableEditor, type SpecsTableData } from "../components/SpecsTableEditor";
import { FaqsEditor, type FaqItem } from "../components/FaqsEditor";
import { useToast } from "../components/Toast";

const inputClass =
  "w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";
const labelClass = "block text-[13px] font-medium text-[#131313] mb-1.5";

function parseJsonArray<T>(value: unknown, fallback: T[]): T[] {
  if (value == null) return fallback;
  if (typeof value === "string") {
    const t = value.trim();
    if (!t) return fallback;
    try {
      const parsed = JSON.parse(t);
      return Array.isArray(parsed) ? (parsed as T[]) : fallback;
    } catch {
      return fallback;
    }
  }
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function parseVariantsPayload(raw: unknown): ProductAttributeGroup[] {
  const arr = parseJsonArray<Record<string, unknown>>(raw, []);
  if (arr.length === 0) return [];
  const first = arr[0];
  if (first && "attribute_id" in first && "attribute_name" in first && "values" in first) {
    return arr.map((x) => ({
      attribute_id: Number(x.attribute_id) || 0,
      attribute_name: String(x.attribute_name ?? ""),
      values: Array.isArray(x.values)
        ? (x.values as { name: string; image_url?: string }[]).map((v) => ({
            name: String(v?.name ?? ""),
            image_url: v?.image_url != null ? String(v.image_url) : undefined,
          }))
        : [],
    })) as ProductAttributeGroup[];
  }
  if (first && "name" in first) {
    const legacy = arr as { name: string; image_url?: string }[];
    return [{ attribute_id: 0, attribute_name: "Variante", values: legacy }];
  }
  return [];
}

function parseSpecificationsPayload(raw: unknown): SpecsTableData {
  if (raw == null) return { columns: [], rows: [] };
  let parsed: unknown;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw.trim() || "{}");
    } catch {
      return { columns: [], rows: [] };
    }
  } else {
    parsed = raw;
  }
  if (parsed && typeof parsed === "object" && "columns" in parsed && "rows" in parsed) {
    const p = parsed as { columns: unknown; rows: unknown };
    const cols = Array.isArray(p.columns) ? (p.columns as string[]).map(String) : [];
    const rws = Array.isArray(p.rows) ? (p.rows as unknown[]).map((r) => (Array.isArray(r) ? (r as unknown[]).map(String) : [])) : [];
    return { columns: cols, rows: rws };
  }
  if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object" && parsed[0] !== null) {
    const legacy = parsed as Record<string, unknown>[];
    const columns = ["Diâmetro (mm)", "Largura (mm)", "Comprimento (mm)", "Bordas", "ID", "Preço (€)"];
    const rows = legacy.map((row) => [
      String(row.diameter ?? ""),
      String(row.width ?? ""),
      String(row.length ?? ""),
      String(row.edges ?? ""),
      String(row.id ?? ""),
      String(row.price ?? ""),
    ]);
    return { columns, rows };
  }
  return { columns: [], rows: [] };
}

export default function ProductEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !id || id === "new";

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [typeLabel, setTypeLabel] = useState("");
  const [typeText, setTypeText] = useState("");
  const [availability, setAvailability] = useState("");
  const [attributeGroups, setAttributeGroups] = useState<ProductAttributeGroup[]>([]);
  const [attributeList, setAttributeList] = useState<Attribute[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [specifications, setSpecifications] = useState<SpecsTableData>({ columns: [], rows: [] });
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Load categories first and independently so the dropdown is always populated
      try {
        const categoriesRes = await fetchCategories();
        if (!cancelled) setCategories(Array.isArray(categoriesRes) ? categoriesRes : []);
      } catch (e) {
        if (!cancelled) {
          setCategories([]);
          toast("Não foi possível carregar as categorias.", "error");
        }
      }
      try {
        const attributesRes = await fetchAttributes();
        if (!cancelled) setAttributeList(Array.isArray(attributesRes) ? attributesRes : []);
      } catch {
        if (!cancelled) setAttributeList([]);
      }
      if (isNew) {
        setLoading(false);
        return;
      }
      const numId = Number(id);
      try {
        const product = await fetchProductByIdOrSlug(Number.isFinite(numId) ? numId : (id ?? ""));
        if (cancelled) return;
        if (product) {
          setName(product.name);
          setSlug(product.slug ?? "");
          setPrice(String(product.price));
          setFeatured(Boolean(product.featured));
          setImage(product.image ?? "");
          setImages(parseJsonArray<string>(product.images, []));
          setCategoryId(product.category_id);
          setDescription(product.description ?? "");
          setBadge(product.badge ?? "");
          setTypeLabel(product.type_label ?? "");
          setTypeText(product.type_text ?? "");
          setAvailability(product.availability ?? "");
          setAttributeGroups(parseVariantsPayload(product.variants));
          setDownloads(parseJsonArray(product.downloads, []));
          setSpecifications(parseSpecificationsPayload(product.specifications));
          setFaqs(parseJsonArray(product.faqs, []));
        }
      } catch {
        if (!cancelled) toast("Não foi possível carregar o produto.", "error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id, isNew, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload: Partial<Product> & { name: string } = {
        name: name.trim() || "Produto",
        slug: slug.trim() || null,
        price: Number(price) || 0,
        featured: featured ? 1 : 0,
        image: image.trim(),
        images: JSON.stringify(images),
        category_id: categoryId,
        description: description.trim(),
        badge: badge.trim(),
        type_label: typeLabel.trim(),
        type_text: typeText.trim(),
        availability: availability.trim(),
        variants: JSON.stringify(attributeGroups),
        downloads: JSON.stringify(downloads),
        specifications: JSON.stringify(specifications?.columns ? specifications : { columns: [], rows: [] }),
        related_product_ids: JSON.stringify([]),
        faqs: JSON.stringify(faqs),
      };
      if (isNew) {
        await createProductApi(payload);
        toast(`Produto "${name}" criado com sucesso.`);
      } else {
        await updateProductApi(Number(id), payload);
        toast(`Produto "${name}" guardado com sucesso.`);
      }
      navigate("/admin/products", { replace: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao guardar";
      setError(msg);
      toast(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  if (!isNew && loading) {
    return <div className="py-12 text-center text-[#5a5a59]">A carregar...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5a5a59] hover:text-[#313b2e] transition-colors mb-3"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Produtos
        </Link>
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">{isNew ? "Novo produto" : "Editar produto"}</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 min-w-0">
        <section className="bg-white rounded-2xl border border-[#e5e5e3] p-6 max-w-xl">
          <h2 className="text-lg font-semibold text-[#131313] mb-4">Básico</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Nome *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nome do produto" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Slug (URL)</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug-do-produto (opcional)" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Preço (€)</label>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded border-[#e5e5e3]" />
                  <span className="text-[13px] font-medium text-[#131313]">Destaque (ex.: carrossel)</span>
                </label>
              </div>
            </div>
            <div>
              <ImageUploadField
                label="Imagem"
                value={image}
                onChange={setImage}
                page="products"
                section="general"
                hint="A imagem é guardada em public/uploads/products/general/."
              />
            </div>
            <div>
              <label className={labelClass}>Categoria</label>
              <select
                value={categoryId ?? ""}
                onChange={(e) => setCategoryId(e.target.value === "" ? null : Number(e.target.value))}
                className={inputClass}
              >
                <option value="">— Nenhuma —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.slug})</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Descrição</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass + " resize-y"} />
            </div>
            <div>
              <label className={labelClass}>Badge (ex.: Destaque 🔥)</label>
              <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Texto curto" className={inputClass} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#e5e5e3] p-6 max-w-xl">
          <h2 className="text-lg font-semibold text-[#131313] mb-4">Página de detalhe</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Etiqueta do tipo (ex.: Tipo)</label>
              <input type="text" value={typeLabel} onChange={(e) => setTypeLabel(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Texto do tipo</label>
              <input type="text" value={typeText} onChange={(e) => setTypeText(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Disponibilidade (ex.: Disponível)</label>
              <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} className={inputClass} />
            </div>
            <div>
              <AttributesPicker
                value={attributeGroups}
                onChange={setAttributeGroups}
                attributeList={attributeList}
                productImages={[...new Set([...(image ? [image] : []), ...images])]}
                label="Atributos"
              />
            </div>
            <div>
              <DownloadsEditor value={downloads} onChange={setDownloads} label="Downloads" />
            </div>
            <div>
              <FaqsEditor value={faqs} onChange={setFaqs} label="FAQs" />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#e5e5e3] p-6 min-w-0">
          <SpecsTableEditor value={specifications} onChange={setSpecifications} label="Especificações" />
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-50 transition-colors"
          >
            {saving ? "A guardar..." : "Guardar"}
          </button>
          <Link to="/admin/products" className="px-4 py-2.5 border border-[#e5e5e3] text-[13px] font-medium text-[#5a5a59] rounded-xl hover:bg-[#f5f5f4] transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
