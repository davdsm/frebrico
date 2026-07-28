import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { pricingApi, type CustomerGroup } from "../api/pricingApi";
import { useToast } from "../components/Toast";

export default function GroupsList() {
  const [list, setList] = useState<CustomerGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      setList(await pricingApi.listGroups(true));
    } catch (e) {
      toast(e instanceof Error ? e.message : "Erro", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await pricingApi.createGroup(name.trim(), description.trim());
      setName("");
      setDescription("");
      toast("Grupo criado.");
      await load();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Erro", "error");
    }
  };

  const toggleActive = async (g: CustomerGroup) => {
    try {
      await pricingApi.updateGroup(g.id, { active: !g.active });
      await load();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Erro", "error");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#131313]">Grupos de clientes</h1>
          <p className="text-[14px] text-[#5a5a59] mt-1">Ex.: Revendedores, Distribuidores, VIP.</p>
        </div>
        <Link to="/admin/pricing" className="text-[13px] text-[#313b2e] hover:underline">
          ← Dashboard preços
        </Link>
      </div>

      <form onSubmit={create} className="bg-white rounded-2xl border border-[#e5e5e3] p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[12px] font-medium mb-1">Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
            placeholder="Revendedores"
            required
          />
        </div>
        <div className="flex-[2] min-w-[200px]">
          <label className="block text-[12px] font-medium mb-1">Descrição</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
          />
        </div>
        <button type="submit" className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl">
          Criar grupo
        </button>
      </form>

      {loading ? (
        <p className="text-[#5a5a59]">A carregar...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#e5e5e3] bg-[#fafaf9]">
                <th className="px-4 py-3 text-[#5a5a59]">Nome</th>
                <th className="px-4 py-3 text-[#5a5a59]">Membros</th>
                <th className="px-4 py-3 text-[#5a5a59]">Estado</th>
                <th className="px-4 py-3 text-[#5a5a59] text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((g) => (
                <tr key={g.id} className="border-b border-[#e5e5e3]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#131313]">{g.name}</p>
                    {g.description && <p className="text-[12px] text-[#5a5a59]">{g.description}</p>}
                  </td>
                  <td className="px-4 py-3">{g.memberCount ?? 0}</td>
                  <td className="px-4 py-3">{g.active ? "Ativo" : "Inativo"}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link to={`/admin/groups/${g.id}`} className="text-[#313b2e] font-medium hover:underline">
                      Preços
                    </Link>
                    <button type="button" onClick={() => toggleActive(g)} className="text-[#5a5a59] hover:underline">
                      {g.active ? "Desativar" : "Ativar"}
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
