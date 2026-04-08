import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { useCustomerAuth } from "../auth/CustomerAuthContext";
import { listCustomerOrders, type CustomerOrder, type CustomerProfile } from "../auth/customerAuthApi";

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

export default function AccountDashboard() {
  const { user, token, loading, logout, saveProfile } = useCustomerAuth();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [profile, setProfile] = useState<CustomerProfile>({
    name: "",
    address: "",
    region: "",
    district: "",
    locality: "",
    postalCode: "",
    phone: "",
    birthDate: "",
    nif: "",
  });

  useEffect(() => {
    if (!user) return;
    setProfile(user.profile);
  }, [user]);

  useEffect(() => {
    if (!token) return;
    void listCustomerOrders(token).then(setOrders).catch(() => setOrders([]));
  }, [token]);

  if (!loading && !user) return <Navigate to="/login?mode=customer&redirect=/account/dashboard" replace />;

  const onChange = (key: keyof CustomerProfile, value: string) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("");
    setSaving(true);
    try {
      await saveProfile(profile);
      setFeedback("Perfil atualizado com sucesso.");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Erro ao atualizar perfil.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <aside className="bg-white rounded-2xl border border-[#e6e6e6] p-6 h-fit">
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a6a6a] mb-2">Minha conta</p>
          <h1 className="text-xl font-semibold text-[#131313]">{user?.profile.name || user?.email}</h1>
          <p className="text-sm text-[#5a5a59] mt-1">{user?.email}</p>
          <Link
            to="/"
            className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-[#dcdcdc] px-4 py-2.5 text-sm font-medium text-[#313b2e] hover:bg-[#f7f7f5] transition-colors"
          >
            Voltar ao website
          </Link>
          <button onClick={logout} className="mt-5 text-sm text-[#8b2424] hover:underline">Terminar sessao</button>
        </aside>

        <main className="space-y-6">
          <section className="bg-white rounded-2xl border border-[#e6e6e6] p-6">
            <h2 className="text-lg font-semibold text-[#131313] mb-4">As minhas encomendas</h2>
            {orders.length === 0 ? (
              <p className="text-[#5a5a59] text-sm">Ainda nao existem encomendas nesta conta.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <Link to={`/account/orders/${order.id}`} key={order.id} className="rounded-xl border border-[#ececec] p-4 flex items-center justify-between hover:border-[#cfd4ce] transition-colors">
                    <div>
                      <p className="font-medium text-[#131313]">#{order.orderNumber}</p>
                      <p className="text-xs text-[#5a5a59]">{new Date(order.createdAt).toLocaleDateString("pt-PT")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#131313]">{order.total.toFixed(2)} EUR</p>
                      <p className="mt-1">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusClassName(order.status)}`}
                        >
                          Estado: {getStatusLabel(order.status)}
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white rounded-2xl border border-[#e6e6e6] p-6">
            <h2 className="text-lg font-semibold text-[#131313] mb-4">Morada e dados pessoais</h2>
            <form onSubmit={onSave} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="md:col-span-2 h-11 px-4 rounded-lg border border-[#dcdcdc]" value={profile.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Nome" />
              <input className="md:col-span-2 h-11 px-4 rounded-lg border border-[#dcdcdc]" value={profile.address} onChange={(e) => onChange("address", e.target.value)} placeholder="Morada" />
              <input className="h-11 px-4 rounded-lg border border-[#dcdcdc]" value={profile.region} onChange={(e) => onChange("region", e.target.value)} placeholder="Regiao" />
              <input className="h-11 px-4 rounded-lg border border-[#dcdcdc]" value={profile.district} onChange={(e) => onChange("district", e.target.value)} placeholder="Distrito" />
              <input className="h-11 px-4 rounded-lg border border-[#dcdcdc]" value={profile.locality} onChange={(e) => onChange("locality", e.target.value)} placeholder="Localidade" />
              <input className="h-11 px-4 rounded-lg border border-[#dcdcdc]" value={profile.postalCode} onChange={(e) => onChange("postalCode", e.target.value)} placeholder="Codigo Postal" />
              <input className="h-11 px-4 rounded-lg border border-[#dcdcdc]" value={profile.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="Telefone" />
              <input className="h-11 px-4 rounded-lg border border-[#dcdcdc]" type="date" value={profile.birthDate} onChange={(e) => onChange("birthDate", e.target.value)} />
              <input className="md:col-span-2 h-11 px-4 rounded-lg border border-[#dcdcdc]" value={profile.nif} onChange={(e) => onChange("nif", e.target.value)} placeholder="NIF" />
              <div className="md:col-span-2 flex items-center justify-between pt-2">
                <p className="text-sm text-[#5a5a59]">{feedback}</p>
                <button type="submit" disabled={saving} className="h-11 px-6 rounded-lg bg-[#313b2e] text-white font-semibold disabled:opacity-70">
                  {saving ? "A guardar..." : "Guardar dados"}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
