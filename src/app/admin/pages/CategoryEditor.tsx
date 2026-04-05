import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { fetchCategories, fetchCategoryById, createCategoryApi, updateCategoryApi, type Category } from "../../api/shop";
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
      }
      setLoading(false);
    })();
  }, [id, isNew]);

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
            placeholder="Ex: Vedações"
            className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#131313] mb-1.5">Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Ex: vedacoes (deixar vazio para gerar a partir do nome)"
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
    </div>
  );
}
