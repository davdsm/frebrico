import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { listAdminOrders, type AdminOrder } from "../../auth/authApi";
import { pricingApi } from "../api/pricingApi";

function getStatusLabel(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (normalized === "pending") return "Pendente";
  if (normalized === "shipped") return "Enviada";
  if (normalized === "completed") return "Concluida";
  if (normalized === "canceled") return "Cancelada";
  return status;
}

const quickLinks = [
  {
    to: "/admin/pages",
    label: "Páginas",
    description: "Editar conteúdo de cada página do site.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    color: "bg-[#313b2e]/8",
    iconColor: "text-[#313b2e]",
  },
  {
    to: "/admin/global/header",
    label: "Header",
    description: "Navegação, logótipo e menu principal.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: "bg-blue-500/8",
    iconColor: "text-blue-600",
  },
  {
    to: "/admin/global/footer",
    label: "Footer",
    description: "CTA, redes sociais e informações legais.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    color: "bg-purple-500/8",
    iconColor: "text-purple-600",
  },
  {
    to: "/admin/media",
    label: "Media",
    description: "Biblioteca de imagens por página e secção.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    color: "bg-amber-500/8",
    iconColor: "text-amber-600",
  },
];

export default function Dashboard() {
  const { user, token } = useAuth();
  const firstName = user?.email?.split("@")[0] ?? "Admin";
  const [orders, setOrders] = React.useState<AdminOrder[]>([]);
  const [pendingCustomers, setPendingCustomers] = React.useState(0);

  React.useEffect(() => {
    if (!token) return;
    void listAdminOrders(token).then((data) => setOrders(data.slice(0, 8))).catch(() => setOrders([]));
    void pricingApi
      .dashboard()
      .then((s) => setPendingCustomers(s.pending || 0))
      .catch(() => setPendingCustomers(0));
  }, [token]);

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313] mb-1.5">
          Olá, {firstName}
        </h1>
        <p className="text-[15px] text-[#5a5a59]">
          Gerir conteúdo, media e configurações do website.
        </p>
      </div>

      {pendingCustomers > 0 && (
        <Link
          to="/admin/customers?status=pending"
          className="mb-6 flex items-center justify-between gap-4 p-4 rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100/80 transition-colors"
        >
          <div>
            <p className="text-[14px] font-semibold text-amber-900">
              {pendingCustomers} conta{pendingCustomers === 1 ? "" : "s"} à espera de aprovação
            </p>
            <p className="text-[13px] text-amber-800/80 mt-0.5">
              Abrir Clientes → Pendentes para aprovar ou rejeitar.
            </p>
          </div>
          <span className="text-[13px] font-medium text-amber-900 whitespace-nowrap">Ver agora →</span>
        </Link>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map(({ to, label, description, icon, color, iconColor }) => (
          <Link
            key={to}
            to={to}
            className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#e5e5e3] hover:border-[#313b2e]/20 hover:shadow-[0_8px_24px_rgba(149,157,165,0.12)] transition-all duration-200"
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${color} flex items-center justify-center ${iconColor}`}>
              {icon}
            </div>
            <div className="min-w-0">
              <h2 className="text-[15px] font-semibold text-[#131313] mb-0.5 group-hover:text-[#313b2e] transition-colors">
                {label}
              </h2>
              <p className="text-[13px] text-[#5a5a59] leading-relaxed">{description}</p>
            </div>
            <svg className="w-4 h-4 text-[#5a5a59]/40 absolute top-5 right-5 group-hover:text-[#313b2e] group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Quick tip */}
      <div className="mt-8 p-5 rounded-2xl bg-[#313b2e]/[0.04] border border-[#313b2e]/10">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#313b2e] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <div>
            <p className="text-[13px] font-semibold text-[#313b2e] mb-0.5">Dica rápida</p>
            <p className="text-[13px] text-[#5a5a59] leading-relaxed">
              Use a secção <strong>Páginas</strong> para editar o conteúdo de cada página. As alterações ficam visíveis imediatamente no website.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-5 rounded-2xl bg-white border border-[#e5e5e3]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="text-lg font-semibold text-[#131313]">Ultimas encomendas</h2>
          <Link to="/admin/orders" className="text-sm text-[#313b2e] hover:underline">Ver todas</Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm text-[#5a5a59]">Sem encomendas registadas ainda.</p>
        ) : (
          <div className="space-y-2">
            {orders.map((order) => (
              <Link to={`/admin/orders/${order.id}`} key={order.id} className="rounded-xl border border-[#efefef] px-4 py-3 flex items-center justify-between gap-4 hover:border-[#cfd4ce] transition-colors">
                <div>
                  <p className="text-sm font-semibold text-[#131313]">#{order.orderNumber}</p>
                  <p className="text-xs text-[#5a5a59]">{order.customerName || order.email} • NIF {order.nif || "-"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#131313]">€{order.total.toFixed(2)}</p>
                  <p className="text-xs text-[#5a5a59]">{getStatusLabel(order.status)}</p>
                  <p className="text-xs text-[#5a5a59]">{new Date(order.createdAt).toLocaleDateString("pt-PT")}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
