import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setLoading(false);
    }
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
        {/* Background texture rings */}
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full border border-white/10" />
        <div className="absolute -bottom-20 -left-20 w-[340px] h-[340px] rounded-full border border-white/10" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/10" />

        <Link to="/" className="inline-block z-10 relative">
          <img src="/logo.svg" alt="Frebrico" className="h-14 w-auto brightness-0 invert" />
        </Link>

        <div className="z-10 relative">
          <p className="text-white/60 text-sm font-medium uppercase tracking-[0.18em] mb-4">
            Bem-vindo de volta
          </p>
          <h2 className="text-4xl xl:text-5xl font-semibold text-white leading-tight mb-6">
            A qualidade que<br />conhece, sempre<br />à sua disposição.
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Aceda à sua conta para consultar encomendas, gerir favoritos e continuar a sua experiência Frebrico.
          </p>
        </div>

        <div className="z-10 relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <p className="text-white/50 text-sm">Mais de <span className="text-white font-semibold">1 200</span> clientes satisfeitos</p>
        </div>
      </motion.div>

      {/* Right panel — form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-10"
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link to="/">
            <img src="/logo.svg" alt="Frebrico" className="h-12 w-auto" />
          </Link>
        </div>

        <div className="w-full max-w-[420px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-3xl font-semibold text-[#131313] mb-2">Entrar no backoffice</h1>
            <p className="text-[#5a5a59] mb-8">
              Apenas administradores.{" "}
              <Link to="/register" className="text-[#313b2e] font-medium hover:underline underline-offset-2">
                Criar novo admin
              </Link>
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
            )}

            <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#131313]">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="o.seu@email.pt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-xl border border-[#dcdcdc] bg-white text-[#131313] placeholder:text-[#5a5a59]/70 text-base outline-none focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/10 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#131313]">Palavra-passe</label>
                  <Link to="/recover-password" className="text-xs text-[#5a5a59] hover:text-[#313b2e] transition-colors">
                    Esqueceu-se?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-[#dcdcdc] bg-white text-[#131313] placeholder:text-[#5a5a59]/70 text-base outline-none focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a5a59] hover:text-[#313b2e] transition-colors"
                    aria-label={showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
                  >
                    {showPassword ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-6 h-6 rounded-md border border-[#dcdcdc] bg-white peer-checked:bg-[#313b2e] peer-checked:border-[#313b2e] transition-all flex items-center justify-center">
                    <svg className="w-6 h-6 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-[#5a5a59] group-hover:text-[#131313] transition-colors">Manter sessão iniciada</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 py-3.5 rounded-xl bg-[#313b2e] hover:bg-[#3d4937] active:scale-[0.98] text-white font-semibold text-base transition-all mt-1 disabled:opacity-70"
              >
                {loading ? "A entrar..." : "Entrar"}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#dcdcdc]" />
                <span className="text-xs text-[#5a5a59]">ou continuar com</span>
                <div className="flex-1 h-px bg-[#dcdcdc]" />
              </div>

              <button
                type="button"
                className="w-full h-12 rounded-xl border border-[#dcdcdc] bg-white hover:bg-[#f7f7f5] active:scale-[0.98] text-[#131313] font-medium text-sm flex items-center justify-center gap-3 transition-all"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Entrar com Google
              </button>
            </form>
          </motion.div>
        </div>

        <p className="mt-10 text-xs text-[#5a5a59] text-center">
          © {new Date().getFullYear()} Frebrico. Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
}
