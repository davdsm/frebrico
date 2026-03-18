import React, { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

type Step = "email" | "sent";

export default function RecoverPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setStep("sent");
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f7f5] flex">
      {/* Left panel — branding */}
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
          <p className="text-white/60 text-sm font-medium uppercase tracking-[0.18em] mb-4">
            Recuperar acesso
          </p>
          <h2 className="text-4xl xl:text-5xl font-semibold text-white leading-tight mb-6">
            Sem problemas.<br />Recupere o acesso<br />em segundos.
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Indique o seu endereço de email e enviamos um link para redefinir a sua palavra-passe com segurança.
          </p>
        </div>

        <div className="z-10 relative flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-white/70 text-sm">Processo seguro e encriptado</span>
          </div>
        </div>
      </motion.div>

      {/* Right panel — form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-10"
      >
        <div className="lg:hidden mb-10">
          <Link to="/">
            <img src="/logo.svg" alt="Frebrico" className="h-12 w-auto" />
          </Link>
        </div>

        <div className="w-full max-w-[420px]">
          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-[#5a5a59] hover:text-[#313b2e] transition-colors mb-6 group"
                >
                  <svg className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Voltar ao login
                </Link>

                <h1 className="text-3xl font-semibold text-[#131313] mb-2">Recuperar palavra-passe</h1>
                <p className="text-[#5a5a59] mb-8 leading-relaxed">
                  Introduza o email associado à sua conta e enviaremos um link de recuperação.
                </p>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#131313]">Email</label>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="o.seu@email.pt"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-[#dcdcdc] bg-white text-[#131313] placeholder:text-[#5a5a59]/70 text-base outline-none focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/10 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#313b2e] hover:bg-[#3d4937] active:scale-[0.98] text-white font-semibold text-base transition-all"
                  >
                    Enviar link de recuperação
                  </button>
                </form>

                <p className="mt-6 text-sm text-[#5a5a59] text-center">
                  Não tem conta?{" "}
                  <Link to="/register" className="text-[#313b2e] font-medium hover:underline underline-offset-2">
                    Criar agora
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="sent-step"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center text-center"
              >
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-[#313b2e]/10 flex items-center justify-center mb-6"
                >
                  <svg className="w-9 h-9 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </motion.div>

                <h1 className="text-3xl font-semibold text-[#131313] mb-3">Email enviado!</h1>
                <p className="text-[#5a5a59] mb-2 leading-relaxed max-w-sm">
                  Enviamos um link de recuperação para
                </p>
                <p className="text-[#313b2e] font-semibold mb-8 break-all">{email}</p>

                <div className="w-full bg-[#f0f2ee] border border-[#dce0d8] rounded-xl px-5 py-4 mb-8 text-left">
                  <p className="text-sm text-[#5a5a59] leading-relaxed">
                    Não recebeu o email? Verifique a pasta de spam ou{" "}
                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="text-[#313b2e] font-medium hover:underline underline-offset-2"
                    >
                      tente novamente
                    </button>{" "}
                    com outro endereço.
                  </p>
                </div>

                <Link
                  to="/login"
                  className="w-full py-3.5 rounded-xl bg-[#313b2e] hover:bg-[#3d4937] active:scale-[0.98] text-white font-semibold text-base transition-all text-center block"
                >
                  Voltar ao login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-10 text-xs text-[#5a5a59] text-center">
          © {new Date().getFullYear()} Frebrico. Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
}
