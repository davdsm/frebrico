import React, { useState } from "react";
import { Link } from "react-router";
import svgPaths from "../../../imports/svg-ksvalsn2ex";
import { getApiBase } from "../../content/api";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms: boolean;
}

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    acceptTerms: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!form.acceptTerms) {
      setErrorMsg("Deve aceitar os Termos e Condições para continuar.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`${getApiBase()}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Erro ao enviar mensagem.");
      }
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "", acceptTerms: false });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar mensagem.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col gap-6 w-full lg:w-[464px] rounded-2xl border border-[#dcdcdc] bg-[#fafaf9] p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#131313]">Mensagem enviada!</h3>
        <p className="text-base text-[#5a5a59]">Entraremos em contacto brevemente.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mx-auto text-sm text-[#313b2e] hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full lg:w-[464px]">
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div className="flex flex-col gap-4 w-full sm:w-[220px]">
          <label className="text-base font-medium leading-normal text-black/40">Nome</label>
          <input
            type="text"
            required
            placeholder="Nome"
            value={form.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className="h-12 w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-[220px]">
          <label className="text-base font-medium leading-normal text-black/40">Apelido</label>
          <input
            type="text"
            placeholder="Apelido"
            value={form.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="h-12 w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <label className="text-base font-medium leading-normal text-black/40">EMAIL</label>
        <input
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="h-12 w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <label className="text-base font-medium leading-normal text-black/40">Contacto Telefónico</label>
        <input
          type="tel"
          placeholder="+351 000 000 000"
          value={form.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="h-12 w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <label className="text-base font-medium leading-normal text-black/40">Mensagem</label>
        <textarea
          required
          placeholder="Mensagem"
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          className="h-[120px] w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors resize-none"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.acceptTerms}
          onChange={(e) => onChange("acceptTerms", e.target.checked)}
          className="mt-0.5 w-5 h-5 shrink-0 border-2 border-[#dcdcdc] rounded accent-[#313b2e]"
        />
        <span className="text-sm text-[#5a5a59] leading-snug">
          Li e aceito os{" "}
          <Link to="/terms" className="text-[#313b2e] underline hover:text-[#313b2e]/70">
            Termos e Condições
          </Link>{" "}
          e a{" "}
          <Link to="/privacy" className="text-[#313b2e] underline hover:text-[#313b2e]/70">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {errorMsg && <p className="text-sm text-red-700">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#313b2e] hover:bg-[#3d4937] transition-colors rounded-[40px] px-8 py-4 flex items-center justify-center gap-2.5 w-fit disabled:opacity-70"
      >
        <span className="text-base font-bold leading-normal text-white">
          {status === "loading" ? "A enviar..." : "Mandar Mensagem"}
        </span>
        <div className="w-6 h-6 shrink-0 flex items-center justify-center">
          <svg className="block size-full align-middle" fill="none" viewBox="0 0 16 16">
            <path d={svgPaths.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M5.66667 8H9.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p26542a40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </button>
    </form>
  );
}
