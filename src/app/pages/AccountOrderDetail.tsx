import React from "react";
import { Link, Navigate, useParams } from "react-router";
import { useCustomerAuth } from "../auth/CustomerAuthContext";
import { getCustomerOrderById, type CustomerOrderDetail } from "../auth/customerAuthApi";
import { resolveImageUrl } from "../api/shop";

export default function AccountOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { token, loading, user } = useCustomerAuth();
  const [order, setOrder] = React.useState<CustomerOrderDetail | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!token || !id) return;
    void getCustomerOrderById(token, Number(id))
      .then(setOrder)
      .catch((e) => setError(e instanceof Error ? e.message : "Erro ao carregar encomenda."));
  }, [token, id]);

  if (!loading && !user) return <Navigate to="/login?mode=customer&redirect=/account/dashboard" replace />;

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#e6e6e6] p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-[#131313]">Detalhes da encomenda</h1>
          <Link to="/account/dashboard" className="text-sm text-[#313b2e] hover:underline">Voltar</Link>
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {!error && !order && <p className="text-sm text-[#5a5a59]">A carregar...</p>}
        {order && (
          <div className="space-y-5">
            <div className="rounded-xl border border-[#ececec] p-4">
              <p className="text-sm text-[#5a5a59]">Pedido #{order.orderNumber}</p>
              <p className="text-sm text-[#5a5a59]">{new Date(order.createdAt).toLocaleString("pt-PT")}</p>
              <p className="text-sm text-[#5a5a59] mt-1">NIF: {order.nif}</p>
            </div>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="rounded-xl border border-[#efefef] p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={resolveImageUrl(item.image)} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-[#131313]">{item.name}</p>
                      <p className="text-xs text-[#5a5a59]">{item.variant} • x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-[#131313]">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between">
              <p className="text-sm text-[#5a5a59]">Total</p>
              <p className="text-lg font-semibold text-[#131313]">€{order.total.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
