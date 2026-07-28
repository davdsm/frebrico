import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { pricingApi, type CustomerGroup, type PricingCustomer } from "../api/pricingApi";
import { useToast } from "../components/Toast";

export default function CustomersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const [list, setList] = useState<PricingCustomer[]>([]);
  const [groups, setGroups] = useState<CustomerGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [approveGroup, setApproveGroup] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const [customers, g] = await Promise.all([
        pricingApi.listCustomers(status || undefined),
        pricingApi.listGroups(false),
      ]);
      setList(customers);
      setGroups(g);
    } catch (e) {
      toast(e instanceof Error ? e.message : "Erro", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  const pendingCount = useMemo(() => list.filter((c) => c.approval_status === "pending").length, [list]);

  const setFilter = (s: string) => {
    if (s) setSearchParams({ status: s });
    else setSearchParams({});
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#131313]">Clientes</h1>
          <p className="text-[14px] text-[#5a5a59] mt-1">
            Registo aberto a todos. Aprovar para aplicar preços de grupo / individuais.
            {status === "" && pendingCount > 0 ? ` (${pendingCount} pendentes na lista)` : ""}
          </p>
        </div>
        <Link to="/admin/pricing" className="text-[13px] text-[#313b2e] hover:underline">
          Dashboard preços
        </Link>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { id: "", label: "Todos" },
          { id: "pending", label: "Pendentes" },
          { id: "approved", label: "Aprovados" },
          { id: "rejected", label: "Rejeitados" },
        ].map((f) => (
          <button
            key={f.id || "all"}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border ${
              status === f.id ? "bg-[#313b2e] text-white border-[#313b2e]" : "border-[#e5e5e3] text-[#5a5a59]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[#5a5a59]">A carregar...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#e5e5e3] bg-[#fafaf9]">
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Grupo</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b border-[#e5e5e3]">
                  <td className="px-4 py-3">
                    <p className="font-medium">{c.name || "—"}</p>
                    <p className="text-[12px] text-[#5a5a59]">{c.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                        c.approval_status === "approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : c.approval_status === "pending"
                            ? "bg-amber-50 text-amber-800"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {c.approval_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{c.group_name || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex flex-col items-end gap-1">
                      {c.approval_status === "pending" && (
                        <div className="flex items-center gap-2">
                          <select
                            className="text-[12px] border border-[#e5e5e3] rounded px-2 py-1"
                            value={approveGroup[c.id] ?? ""}
                            onChange={(e) => setApproveGroup((m) => ({ ...m, [c.id]: e.target.value }))}
                          >
                            <option value="">Sem grupo</option>
                            {groups.map((g) => (
                              <option key={g.id} value={g.id}>
                                {g.name}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className="text-emerald-700 font-medium hover:underline"
                            onClick={async () => {
                              const gid = approveGroup[c.id] ? Number(approveGroup[c.id]) : null;
                              await pricingApi.approveCustomer(c.id, gid);
                              toast("Cliente aprovado.");
                              await load();
                            }}
                          >
                            Aprovar
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:underline"
                            onClick={async () => {
                              const reason = window.prompt("Motivo (opcional):") || "";
                              await pricingApi.rejectCustomer(c.id, reason);
                              toast("Cliente rejeitado.");
                              await load();
                            }}
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                      <Link to={`/admin/customers/${c.id}`} className="text-[#313b2e] hover:underline">
                        Preços / detalhe
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <p className="p-6 text-[#5a5a59]">Nenhum cliente neste filtro.</p>}
        </div>
      )}
    </div>
  );
}
