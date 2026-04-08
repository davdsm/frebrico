import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useCustomerAuth } from "../auth/CustomerAuthContext";

export default function AccountRegister() {
  const navigate = useNavigate();
  const { register } = useCustomerAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    region: "Portugal (Continental)",
    district: "",
    locality: "",
    postalCode: "",
    phone: "",
    birthDate: "",
    nif: "",
    acceptedPrivacyPolicy: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/account/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f7f5] flex">
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex lg:w-[44%] xl:w-1/2 bg-[#313b2e] relative overflow-hidden flex-col justify-between p-14"
      >
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full border border-white/10" />
        <div className="absolute -bottom-20 -left-20 w-[340px] h-[340px] rounded-full border border-white/10" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/10" />
        <Link to="/" className="inline-block z-10 relative">
          <img src="/logo.svg" alt="Frebrico" className="h-14 w-auto brightness-0 invert" />
        </Link>
        <div className="z-10 relative">
          <p className="text-white/60 text-sm font-medium uppercase tracking-[0.18em] mb-4">Nova conta</p>
          <h2 className="text-4xl xl:text-5xl font-semibold text-white leading-tight mb-6">
            Crie a sua<br />area reservada<br />em segundos.
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Guarde as suas moradas, acompanhe encomendas e simplifique o checkout em futuras compras.
          </p>
        </div>
        <div className="z-10 relative text-white/50 text-sm">Frebrico • Conta de cliente</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-10"
      >
        <div className="w-full max-w-[680px]">
          <h1 className="text-3xl font-semibold text-[#131313] mb-2">Registar conta de cliente</h1>
          <p className="text-[#5a5a59] mb-8">
            Use os mesmos dados para entrar em <Link to="/login?mode=customer" className="text-[#313b2e] font-medium hover:underline">/login</Link>.
          </p>

          {error && <div className="mb-6 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input className="md:col-span-2 h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="E-mail" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} required />
            <input className="md:col-span-2 h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="Palavra-passe" type="password" value={form.password} onChange={(e) => onChange("password", e.target.value)} required />
            <input className="md:col-span-2 h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="Nome" value={form.name} onChange={(e) => onChange("name", e.target.value)} required />
            <input className="md:col-span-2 h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="Morada" value={form.address} onChange={(e) => onChange("address", e.target.value)} required />
            <select className="md:col-span-2 h-12 px-4 rounded-xl border border-[#dcdcdc] bg-white" value={form.region} onChange={(e) => onChange("region", e.target.value)}>
              <option>Portugal (Continental)</option>
              <option>Madeira</option>
              <option>Acores</option>
            </select>
            <input className="h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="Distrito" value={form.district} onChange={(e) => onChange("district", e.target.value)} />
            <input className="h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="Localidade" value={form.locality} onChange={(e) => onChange("locality", e.target.value)} />
            <input className="h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="Cod. Postal" value={form.postalCode} onChange={(e) => onChange("postalCode", e.target.value)} required />
            <input className="h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="Telefone" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} required />
            <input className="h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="Data de nascimento" type="date" value={form.birthDate} onChange={(e) => onChange("birthDate", e.target.value)} />
            <input className="h-12 px-4 rounded-xl border border-[#dcdcdc]" placeholder="N.I.F." value={form.nif} onChange={(e) => onChange("nif", e.target.value)} />

            <label className="md:col-span-2 flex items-center gap-3 border-t border-dashed border-[#b7b7b7] pt-6 mt-2">
              <input type="checkbox" checked={form.acceptedPrivacyPolicy} onChange={(e) => onChange("acceptedPrivacyPolicy", e.target.checked)} required />
              <span className="text-[#3b3b3b]">Aceito a Politica de Privacidade ao me inscrever neste site.</span>
            </label>

            <div className="md:col-span-2 flex justify-between items-center">
              <Link to="/login?mode=customer" className="text-sm text-[#313b2e] hover:underline">
                Ja tem conta? Entrar
              </Link>
              <button type="submit" disabled={loading} className="min-w-[180px] h-12 rounded-xl bg-[#313b2e] hover:bg-[#3d4937] text-white font-semibold disabled:opacity-70">
                {loading ? "A criar..." : "Registar"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
