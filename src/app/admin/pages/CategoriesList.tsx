import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchCategories, deleteCategoryApi, type Category } from "../../api/shop";
import { useToast } from "../components/Toast";

export default function CategoriesList() {
  const [list, setList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategories();
      setList(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Remover categoria "${name}"?`)) return;
    setDeletingId(id);
    try {
      await deleteCategoryApi(id);
      await load();
      toast(`Categoria "${name}" removida.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao remover";
      toast(msg, "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Categorias</h1>
          <p className="text-[14px] text-[#5a5a59] mt-1">Gerir categorias de produtos (usadas na página Produtos, no menu e nas categorias).</p>
        </div>
        <Link
          to="/admin/categories/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Nova categoria
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="py-12 text-center text-[#5a5a59]">A carregar...</div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] p-12 text-center text-[#5a5a59]">
          Nenhuma categoria. <Link to="/admin/categories/new" className="text-[#313b2e] font-medium hover:underline">Criar a primeira</Link>.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e5e5e3] bg-[#fafaf9]">
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59]">Slug</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59]">Nome</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59]">Ordem</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59] text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b border-[#e5e5e3] hover:bg-[#fafaf9]">
                  <td className="px-4 py-3 text-[13px] font-mono text-[#131313]">{c.slug}</td>
                  <td className="px-4 py-3 text-[13px] text-[#131313]">{c.name}</td>
                  <td className="px-4 py-3 text-[13px] text-[#5a5a59]">{c.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/categories/${c.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#313b2e] hover:bg-[#313b2e]/10 rounded-lg transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id, c.name)}
                      disabled={deletingId === c.id}
                      className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === c.id ? "A remover..." : "Remover"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
