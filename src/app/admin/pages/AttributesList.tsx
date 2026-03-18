import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchAttributes, deleteAttributeApi, type Attribute } from "../../api/shop";
import { useToast } from "../components/Toast";

export default function AttributesList() {
  const [list, setList] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const attrs = await fetchAttributes();
      setList(attrs);
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
    if (!window.confirm(`Remover atributo "${name}"?`)) return;
    setDeletingId(id);
    try {
      await deleteAttributeApi(id);
      await load();
      toast(`Atributo "${name}" removido.`);
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
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Atributos</h1>
          <p className="text-[14px] text-[#5a5a59] mt-1">
            Atributos globais (ex.: Acabamento) com valores (nome + imagem). Associe aos produtos na edição do produto.
          </p>
        </div>
        <Link
          to="/admin/attributes/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo atributo
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="py-12 text-center text-[#5a5a59]">A carregar...</div>
      ) : list.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] p-12 text-center text-[#5a5a59]">
          Nenhum atributo.{" "}
          <Link to="/admin/attributes/new" className="text-[#313b2e] font-medium hover:underline">
            Criar o primeiro
          </Link>
          .
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e5e5e3] bg-[#fafaf9]">
                <th className="px-4 py-3 text-[12px] font-semibold text-[#5a5a59] uppercase tracking-wider">Nome</th>
                <th className="px-4 py-3 text-[12px] font-semibold text-[#5a5a59] uppercase tracking-wider">Slug</th>
                <th className="px-4 py-3 text-[12px] font-semibold text-[#5a5a59] uppercase tracking-wider">Valores</th>
                <th className="px-4 py-3 w-24 text-[12px] font-semibold text-[#5a5a59] uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((attr) => {
                let valueCount = 0;
                try {
                  const v = JSON.parse(attr.values || "[]");
                  valueCount = Array.isArray(v) ? v.length : 0;
                } catch {
                  // ignore
                }
                return (
                  <tr key={attr.id} className="border-b border-[#e5e5e3] last:border-0 hover:bg-[#fafaf9]">
                    <td className="px-4 py-3">
                      <Link to={`/admin/attributes/${attr.id}`} className="font-medium text-[#131313] hover:text-[#313b2e]">
                        {attr.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#5a5a59] font-mono">{attr.slug}</td>
                    <td className="px-4 py-3 text-[13px] text-[#5a5a59]">{valueCount} valor(es)</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/admin/attributes/${attr.id}`}
                        className="text-[13px] font-medium text-[#313b2e] hover:underline mr-3"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(attr.id, attr.name)}
                        disabled={deletingId === attr.id}
                        className="text-[13px] font-medium text-red-600 hover:underline disabled:opacity-50"
                      >
                        {deletingId === attr.id ? "A remover..." : "Remover"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
