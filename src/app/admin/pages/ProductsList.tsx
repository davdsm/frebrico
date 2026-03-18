import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchProducts, fetchCategories, deleteProductApi, type Product, type Category } from "../../api/shop";
import { useToast } from "../components/Toast";

export default function ProductsList() {
  const [list, setList] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [products, cats] = await Promise.all([fetchProducts(), fetchCategories()]);
      setList(products);
      setCategories(cats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getCategoryName = (categoryId: number | null) => {
    if (categoryId == null) return "—";
    return categories.find((c) => c.id === categoryId)?.name ?? categoryId;
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Remover produto "${name}"?`)) return;
    setDeletingId(id);
    try {
      await deleteProductApi(id);
      await load();
      toast(`Produto "${name}" removido.`);
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
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Produtos</h1>
          <p className="text-[14px] text-[#5a5a59] mt-1">Gerir produtos (lista na página Produtos, carrossel, categorias e página de detalhe).</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Novo produto
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="py-12 text-center text-[#5a5a59]">A carregar...</div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] p-12 text-center text-[#5a5a59]">
          Nenhum produto. <Link to="/admin/products/new" className="text-[#313b2e] font-medium hover:underline">Criar o primeiro</Link>.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e5e5e3] bg-[#fafaf9]">
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59]">Nome</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59]">Categoria</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59]">Preço</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59]">Destaque</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#5a5a59] text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-b border-[#e5e5e3] hover:bg-[#fafaf9]">
                  <td className="px-4 py-3 text-[13px] text-[#131313]">{p.name}</td>
                  <td className="px-4 py-3 text-[13px] text-[#5a5a59]">{getCategoryName(p.category_id)}</td>
                  <td className="px-4 py-3 text-[13px] text-[#131313]">{Number(p.price).toFixed(2)} €</td>
                  <td className="px-4 py-3">{p.featured ? <span className="text-[12px] text-[#313b2e] font-medium">Sim</span> : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/products/${p.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#313b2e] hover:bg-[#313b2e]/10 rounded-lg transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={deletingId === p.id}
                      className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === p.id ? "A remover..." : "Remover"}
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
