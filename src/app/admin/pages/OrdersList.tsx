import React from "react";
import { Link } from "react-router";
import { listAdminOrders, type AdminOrder } from "../../auth/authApi";
import { useAuth } from "../../auth/AuthContext";
import { getApiBase } from "../../content/api";

const PAGE_SIZE = 12;

function getStatusLabel(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (normalized === "pending") return "Pendente";
  if (normalized === "shipped") return "Enviada";
  if (normalized === "completed") return "Concluida";
  if (normalized === "canceled") return "Cancelada";
  return status;
}

function getStatusClassName(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (normalized === "completed") return "bg-emerald-100 text-emerald-800";
  if (normalized === "shipped") return "bg-blue-100 text-blue-800";
  if (normalized === "canceled") return "bg-red-100 text-red-800";
  return "bg-amber-100 text-amber-800";
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function firstOfYearIso() {
  return `${new Date().getFullYear()}-01-01`;
}

export default function OrdersList() {
  const { token } = useAuth();
  const [orders, setOrders] = React.useState<AdminOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const [exportFrom, setExportFrom] = React.useState(firstOfYearIso());
  const [exportTo, setExportTo] = React.useState(todayIso());
  const [exportLoading, setExportLoading] = React.useState(false);

  React.useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError("");
    void listAdminOrders(token)
      .then((rows) => setOrders(rows))
      .catch((e) => setError(e instanceof Error ? e.message : "Erro ao carregar encomendas."))
      .finally(() => setLoading(false));
  }, [token]);

  const statuses = React.useMemo(() => {
    const items = Array.from(new Set(orders.map((o) => o.status))).sort((a, b) => a.localeCompare(b));
    return items;
  }, [orders]);

  const filtered = React.useMemo(() => {
    const q = normalize(query);
    return orders.filter((order) => {
      const matchesStatus = statusFilter === "all" || normalize(order.status) === normalize(statusFilter);
      if (!matchesStatus) return false;
      if (!q) return true;
      const stack = [
        order.orderNumber,
        order.customerName,
        order.email,
        order.nif,
        String(order.id),
      ]
        .join(" ")
        .toLowerCase();
      return stack.includes(q);
    });
  }, [orders, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  React.useEffect(() => {
    setPage(1);
  }, [query, statusFilter]);

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handleExport = async () => {
    if (!token) return;
    setExportLoading(true);
    try {
      const url = `${getApiBase()}/api/orders/export?from=${encodeURIComponent(exportFrom)}&to=${encodeURIComponent(exportTo)}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Erro ao exportar encomendas.");
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `encomendas_${exportFrom}_${exportTo}.xlsx`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Erro ao exportar.");
    } finally {
      setExportLoading(false);
    }
  };

  const paged = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-[#131313]">Encomendas</h1>
        <p className="text-sm text-[#5a5a59] mt-1">Pesquisa, filtro por estado e histórico completo de encomendas.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por nº encomenda, cliente, email, NIF..."
            className="h-11 px-4 rounded-xl border border-[#dcdcdc] text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-3 rounded-xl border border-[#dcdcdc] text-sm bg-white"
          >
            <option value="all">Todos os estados</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(status)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-4 sm:p-5">
        <p className="text-sm font-medium text-[#131313] mb-3">Exportar para Excel</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#5a5a59]">De</label>
            <input
              type="date"
              value={exportFrom}
              onChange={(e) => setExportFrom(e.target.value)}
              className="h-11 px-3 rounded-xl border border-[#dcdcdc] text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#5a5a59]">Até</label>
            <input
              type="date"
              value={exportTo}
              onChange={(e) => setExportTo(e.target.value)}
              className="h-11 px-3 rounded-xl border border-[#dcdcdc] text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleExport}
            disabled={exportLoading}
            className="h-11 px-5 rounded-xl bg-[#313b2e] text-white text-sm font-semibold hover:bg-[#3d4937] transition-colors disabled:opacity-70 flex items-center gap-2"
          >
            {exportLoading ? (
              "A exportar..."
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Exportar .xlsx
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-[#5a5a59]">A carregar encomendas...</p>
        ) : error ? (
          <p className="p-6 text-sm text-red-700">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-[#5a5a59]">Sem resultados para os filtros aplicados.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] text-sm">
                <thead className="bg-[#f7f7f5] text-[#5a5a59]">
                  <tr>
                    <th className="text-left font-medium px-4 py-3">Encomenda</th>
                    <th className="text-left font-medium px-4 py-3">Cliente</th>
                    <th className="text-left font-medium px-4 py-3">Estado</th>
                    <th className="text-left font-medium px-4 py-3">Data</th>
                    <th className="text-right font-medium px-4 py-3">Total</th>
                    <th className="text-right font-medium px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((order) => (
                    <tr key={order.id} className="border-t border-[#efefef]">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#131313]">#{order.orderNumber}</p>
                        <p className="text-xs text-[#5a5a59]">ID {order.id}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[#131313]">{order.customerName || "-"}</p>
                        <p className="text-xs text-[#5a5a59]">{order.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusClassName(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#5a5a59]">
                        {new Date(order.createdAt).toLocaleDateString("pt-PT")}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[#131313]">
                        €{order.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/admin/orders/${order.id}`} className="text-[#313b2e] hover:underline">
                          Ver detalhe
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-[#efefef]">
              <p className="text-xs text-[#5a5a59]">
                A mostrar {(currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, filtered.length)} de {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-9 px-3 rounded-lg border border-[#dcdcdc] text-sm disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-sm text-[#5a5a59]">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-9 px-3 rounded-lg border border-[#dcdcdc] text-sm disabled:opacity-50"
                >
                  Seguinte
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
