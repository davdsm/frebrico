import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  deleteAdminOrder,
  getAdminOrderById,
  updateAdminOrderStatus,
  type AdminOrderDetail,
  type AdminOrderStatus,
} from "../../auth/authApi";
import { useAuth } from "../../auth/AuthContext";
import { resolveImageUrl } from "../../api/shop";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<AdminOrderDetail | null>(null);
  const [error, setError] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);
  const [statusSaving, setStatusSaving] = React.useState(false);

  const STATUS_OPTIONS: { value: AdminOrderStatus; label: string }[] = [
    { value: "pending", label: "Pendente" },
    { value: "shipped", label: "Enviada" },
    { value: "completed", label: "Concluída" },
    { value: "Canceled", label: "Cancelada" },
  ];

  React.useEffect(() => {
    if (!token || !id) return;
    void getAdminOrderById(token, Number(id))
      .then(setOrder)
      .catch((e) => setError(e instanceof Error ? e.message : "Erro ao carregar encomenda."));
  }, [token, id]);

  const handleStatusChange = async (next: AdminOrderStatus) => {
    if (!token || !id || !order) return;
    setStatusSaving(true);
    setError("");
    try {
      await updateAdminOrderStatus(token, Number(id), next);
      setOrder((prev) => (prev ? { ...prev, status: next } : prev));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao atualizar estado.");
    } finally {
      setStatusSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !id) return;
    const ok = window.confirm("Tem a certeza que quer eliminar esta encomenda?");
    if (!ok) return;
    setDeleting(true);
    setError("");
    try {
      await deleteAdminOrder(token, Number(id));
      navigate("/admin", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao eliminar encomenda.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#e5e5e3]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-[#131313]">Detalhe da encomenda</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm px-3 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
          >
            {deleting ? "A eliminar..." : "Eliminar encomenda"}
          </button>
          <Link to="/admin" className="text-sm text-[#313b2e] hover:underline">Voltar</Link>
        </div>
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {!error && !order && <p className="text-sm text-[#5a5a59]">A carregar...</p>}
      {order && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#efefef] p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-sm font-medium text-[#131313]">Estado</label>
              <select
                value={order.status}
                onChange={(e) => void handleStatusChange(e.target.value as AdminOrderStatus)}
                disabled={statusSaving}
                className="text-sm border border-[#dcdcdc] rounded-lg px-3 py-2 bg-white min-w-[180px] disabled:opacity-60"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
                {!STATUS_OPTIONS.some((o) => o.value === order.status) && (
                  <option value={order.status}>{order.status}</option>
                )}
              </select>
              {statusSaving && <span className="text-xs text-[#5a5a59]">A guardar...</span>}
            </div>
            <p className="font-semibold text-[#131313]">#{order.orderNumber}</p>
            <p className="text-sm text-[#5a5a59]">{order.customerName} • {order.email}</p>
            <p className="text-sm text-[#5a5a59]">NIF {order.nif} • {order.phone}</p>
            <p className="text-sm text-[#5a5a59]">{order.address}, {order.postalCode} {order.locality}</p>
            {order.observations && (
              <div className="mt-2 rounded-lg bg-[#f5f5f4] px-3 py-2">
                <p className="text-xs font-medium text-[#5a5a59] mb-1">Observações</p>
                <p className="text-sm text-[#131313] whitespace-pre-wrap">{order.observations}</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="rounded-xl border border-[#efefef] p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={resolveImageUrl(item.image)} alt={item.name} className="w-10 h-10 rounded object-cover" />
                  <p className="text-sm text-[#131313]">{item.name} • {item.variant} • x{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-[#131313]">€{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between">
            <p className="text-sm text-[#5a5a59]">Total</p>
            <p className="text-lg font-semibold text-[#131313]">€{order.total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
