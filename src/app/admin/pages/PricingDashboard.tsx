import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { pricingApi } from "../api/pricingApi";

export default function PricingDashboard() {
  const [stats, setStats] = useState<{
    groups: number;
    pending: number;
    approved: number;
    groupPrices: number;
    customerPrices: number;
  } | null>(null);
  const [audit, setAudit] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [s, a] = await Promise.all([pricingApi.dashboard(), pricingApi.audit(30)]);
        setStats(s);
        setAudit(a as Array<Record<string, unknown>>);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro");
      }
    })();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Preços por cliente</h1>
        <p className="text-[14px] text-[#5a5a59] mt-1">
          Hierarquia: preço individual → grupo → preço de catálogo. Qualquer pessoa pode registar-se; preços especiais
          só após aprovação.
        </p>
      </div>

      {error && <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {[
          { label: "Pendentes", value: stats?.pending, to: "/admin/customers?status=pending" },
          { label: "Aprovados", value: stats?.approved, to: "/admin/customers?status=approved" },
          { label: "Grupos", value: stats?.groups, to: "/admin/groups" },
          { label: "Preços grupo", value: stats?.groupPrices, to: "/admin/groups" },
          { label: "Preços individuais", value: stats?.customerPrices, to: "/admin/customers" },
        ].map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-white rounded-2xl border border-[#e5e5e3] p-4 hover:border-[#313b2e]/40 transition-colors"
          >
            <p className="text-[11px] uppercase tracking-wider text-[#5a5a59]">{c.label}</p>
            <p className="text-2xl font-semibold text-[#131313] mt-1">{stats ? c.value : "—"}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#e5e5e3] bg-[#fafaf9]">
          <h2 className="text-[13px] font-semibold text-[#131313]">Auditoria recente</h2>
        </div>
        {audit.length === 0 ? (
          <p className="p-6 text-[13px] text-[#5a5a59]">Sem alterações registadas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#e5e5e3]">
                  <th className="px-4 py-2 text-[#5a5a59] font-medium">Quando</th>
                  <th className="px-4 py-2 text-[#5a5a59] font-medium">Tipo</th>
                  <th className="px-4 py-2 text-[#5a5a59] font-medium">Produto</th>
                  <th className="px-4 py-2 text-[#5a5a59] font-medium">Variante</th>
                  <th className="px-4 py-2 text-[#5a5a59] font-medium">Antes → Depois</th>
                  <th className="px-4 py-2 text-[#5a5a59] font-medium">Por</th>
                </tr>
              </thead>
              <tbody>
                {audit.map((row) => (
                  <tr key={String(row.id)} className="border-b border-[#e5e5e3]">
                    <td className="px-4 py-2 text-[#5a5a59] whitespace-nowrap">
                      {String(row.created_at ?? "").replace("T", " ").slice(0, 19)}
                    </td>
                    <td className="px-4 py-2">{String(row.entity_type)}</td>
                    <td className="px-4 py-2">{String(row.product_name ?? row.product_id ?? "—")}</td>
                    <td className="px-4 py-2 font-mono text-[12px]">{String(row.variant_key || "—")}</td>
                    <td className="px-4 py-2">
                      {row.old_price ?? "—"} → {row.new_price ?? "—"}
                    </td>
                    <td className="px-4 py-2">{String(row.changed_by_email ?? "—")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
