import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  fetchCategories,
  fetchCategoryById,
  createCategoryApi,
  updateCategoryApi,
  fetchCategoryProductsApi,
  reorderCategoryProductsApi,
  resolveImageUrl,
  type Category,
  type Product,
} from "../../api/shop";
import { ImageUploadField } from "../components/ImageUploadField";
import { useToast } from "../components/Toast";

export default function CategoryEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !id || id === "new";

  const [categories, setCategories] = useState<Category[]>([]);
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [image, setImage] = useState("");
  const [iconSvg, setIconSvg] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isNew);

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const loadProducts = useCallback(async (categoryId: number) => {
    setProductsLoading(true);
    try {
      const list = await fetchCategoryProductsApi(categoryId);
      setProducts(list);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao carregar produtos";
      toast(msg, "error");
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    (async () => {
      const list = await fetchCategories();
      setCategories(list);
      if (isNew) {
        setLoading(false);
        return;
      }
      const numId = Number(id);
      if (!Number.isFinite(numId)) {
        setLoading(false);
        return;
      }
      const cat = await fetchCategoryById(numId);
      if (cat) {
        setSlug(cat.slug);
        setName(cat.name);
        setDescription(cat.description || "");
        setParentId(cat.parent_id);
        setImage((cat.image || "").trim());
        setIconSvg((cat.icon_svg || "").trim());
        setSortOrder(cat.sort_order);
        await loadProducts(numId);
      }
      setLoading(false);
    })();
  }, [id, isNew, loadProducts]);

  const persistOrder = async (ordered: Product[]) => {
    if (isNew || !id) return;
    const numId = Number(id);
    if (!Number.isFinite(numId)) return;
    setSavingOrder(true);
    try {
      const saved = await reorderCategoryProductsApi(
        numId,
        ordered.map((p) => p.id)
      );
      setProducts(saved);
      toast("Ordem dos produtos guardada.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao guardar ordem";
      toast(msg, "error");
      await loadProducts(numId);
    } finally {
      setSavingOrder(false);
    }
  };

  const moveProduct = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= products.length || to >= products.length) return;
    const next = [...products];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setProducts(next);
    void persistOrder(next);
  };

  const onDragStart = (index: number) => (e: React.DragEvent) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const onDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overIndex !== index) setOverIndex(index);
  };

  const onDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const from = dragIndex ?? Number(e.dataTransfer.getData("text/plain"));
    setDragIndex(null);
    setOverIndex(null);
    if (!Number.isFinite(from)) return;
    moveProduct(from, index);
  };

  const onDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (isNew) {
        await createCategoryApi({
          slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
          name,
          description,
          parent_id: parentId,
          image: image.trim(),
          icon_svg: iconSvg.trim(),
          sort_order: sortOrder,
        });
        toast(`Categoria "${name}" criada com sucesso.`);
      } else {
        await updateCategoryApi(Number(id), {
          slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
          name,
          description,
          parent_id: parentId,
          image: image.trim(),
          icon_svg: iconSvg.trim(),
          sort_order: sortOrder,
        });
        toast(`Categoria "${name}" guardada com sucesso.`);
      }
      navigate("/admin/categories", { replace: true });
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
          to="/admin/categories"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5a5a59] hover:text-[#313b2e] transition-colors mb-3"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Categorias
        </Link>
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">{isNew ? "Nova categoria" : "Editar categoria"}</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e5e5e3] p-6 max-w-xl space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-[#131313] mb-1.5">Nome *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nome da categoria"
            className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#131313] mb-1.5">Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="slug-da-categoria (deixe vazio para gerar automaticamente)"
            className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] font-mono bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#131313] mb-1.5">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none resize-y"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#131313] mb-1.5">Categoria pai</label>
          <select
            value={parentId ?? ""}
            onChange={(e) => setParentId(e.target.value === "" ? null : Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
          >
            <option value="">— Nenhuma (top-level) —</option>
            {categories.filter((c) => c.id !== (isNew ? undefined : Number(id))).map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.slug})</option>
            ))}
          </select>
        </div>
        <div>
          <ImageUploadField
            label="Imagem"
            value={image}
            onChange={setImage}
            page="categories"
            section="general"
            hint="A imagem é guardada em public/uploads/categories/general/."
          />
        </div>
        <div>
          <ImageUploadField
            label="Ícone da categoria"
            value={iconSvg}
            onChange={setIconSvg}
            page="categories"
            section={isNew ? "icons-new" : `cat-${id}`}
            listUploadsForWholePage
            hint="Ícone guardado nesta categoria (submenu Produtos e cartões na página Produtos). Novos ficheiros vão para a pasta desta categoria; a grelha mostra todos os ícones já carregados em Categorias para poder selecionar o correto."
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#131313] mb-1.5">Ordem</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
            className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || !name}
            className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-50 transition-colors"
          >
            {saving ? "A guardar..." : "Guardar"}
          </button>
          <Link
            to="/admin/categories"
            className="px-4 py-2.5 border border-[#e5e5e3] text-[13px] font-medium text-[#5a5a59] rounded-xl hover:bg-[#f5f5f4] transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>

      {!isNew && (
        <div className="mt-8 bg-white rounded-2xl border border-[#e5e5e3] p-6 max-w-2xl">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#131313]">Produtos nesta categoria</h2>
              <p className="text-[13px] text-[#5a5a59] mt-1">
                Arraste para cima ou para baixo para definir a ordem na página da categoria.
                {savingOrder ? " A guardar…" : ""}
              </p>
            </div>
            <span className="text-[12px] font-medium text-[#5a5a59] tabular-nums shrink-0">
              {products.length} produto{products.length === 1 ? "" : "s"}
            </span>
          </div>

          {productsLoading ? (
            <p className="text-[13px] text-[#5a5a59] py-6 text-center">A carregar produtos…</p>
          ) : products.length === 0 ? (
            <p className="text-[13px] text-[#5a5a59] py-6 text-center">
              Ainda não há produtos atribuídos a esta categoria.
            </p>
          ) : (
            <ul className="space-y-2">
              {products.map((p, index) => {
                const thumb = resolveImageUrl(p.image);
                const isDragging = dragIndex === index;
                const isOver = overIndex === index && dragIndex !== null && dragIndex !== index;
                return (
                  <li
                    key={p.id}
                    draggable={!savingOrder}
                    onDragStart={onDragStart(index)}
                    onDragOver={onDragOver(index)}
                    onDrop={onDrop(index)}
                    onDragEnd={onDragEnd}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 select-none transition-colors ${
                      isDragging
                        ? "opacity-50 border-[#313b2e] bg-[#313b2e]/[0.04]"
                        : isOver
                          ? "border-[#313b2e] bg-[#f5f5f4]"
                          : "border-[#e5e5e3] bg-[#fafaf9] hover:border-[#313b2e]/40"
                    } ${savingOrder ? "cursor-wait" : "cursor-grab active:cursor-grabbing"}`}
                  >
                    <span
                      className="text-[#9a9a98] shrink-0"
                      aria-hidden
                      title="Arrastar para reordenar"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="9" cy="7" r="1.5" />
                        <circle cx="15" cy="7" r="1.5" />
                        <circle cx="9" cy="12" r="1.5" />
                        <circle cx="15" cy="12" r="1.5" />
                        <circle cx="9" cy="17" r="1.5" />
                        <circle cx="15" cy="17" r="1.5" />
                      </svg>
                    </span>
                    <span className="w-7 text-[12px] font-semibold text-[#5a5a59] tabular-nums shrink-0">
                      {index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#e5e5e3] overflow-hidden shrink-0">
                      {thumb ? (
                        <img src={thumb} alt="" className="w-full h-full object-cover" draggable={false} />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-[#131313] truncate">{p.name}</p>
                      {p.slug ? (
                        <p className="text-[11px] text-[#9a9a98] font-mono truncate">{p.slug}</p>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        type="button"
                        disabled={savingOrder || index === 0}
                        aria-label="Mover para cima"
                        onClick={() => moveProduct(index, index - 1)}
                        className="w-7 h-7 rounded-md border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        disabled={savingOrder || index === products.length - 1}
                        aria-label="Mover para baixo"
                        onClick={() => moveProduct(index, index + 1)}
                        className="w-7 h-7 rounded-md border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        ▼
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
