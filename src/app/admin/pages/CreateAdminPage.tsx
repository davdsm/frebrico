import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { listAdmins, updateAdminRole, deleteAdminUser, type AdminUser } from "../../auth/authApi";
import { useToast } from "../components/Toast";

const inputClass =
  "w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";
const labelClass = "block text-[13px] font-medium text-[#131313] mb-1.5";

export default function CreateAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const { createAdmin, token, user } = useAuth();
  const { toast } = useToast();

  const loadAdmins = async () => {
    if (!token) return;
    setLoadingAdmins(true);
    try {
      const list = await listAdmins(token);
      setAdmins(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar utilizadores");
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    void loadAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await createAdmin(email, password, isAdmin);
      setSuccess("Utilizador criado com sucesso.");
      setEmail("");
      setPassword("");
      await loadAdmins();
      toast("Utilizador criado com sucesso.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao criar utilizador";
      setError(msg);
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5a5a59] hover:text-[#313b2e] transition-colors mb-3"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Dashboard
        </Link>
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Criar novo administrador</h1>
        <p className="text-[14px] text-[#5a5a59] mt-1">Adicione utilizadores com acesso ao backoffice.</p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-4 rounded-xl bg-green-50 text-green-700 text-sm">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e5e5e3] p-6 max-w-xl space-y-4 mb-8">
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            autoComplete="email"
            placeholder="admin@frebrico.pt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Palavra-passe *</label>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="w-4 h-4 rounded border-[#e5e5e3] text-[#313b2e] focus:ring-[#313b2e]/20"
          />
          <label htmlFor="isAdmin" className="text-[13px] font-medium text-[#131313] cursor-pointer">
            Administrador (acesso ao backoffice)
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-50 transition-colors"
          >
            {loading ? "A criar..." : "Criar utilizador"}
          </button>
          <Link
            to="/admin"
            className="px-4 py-2.5 border border-[#e5e5e3] text-[13px] font-medium text-[#5a5a59] rounded-xl hover:bg-[#f5f5f4] transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>

      <section className="bg-white rounded-2xl border border-[#e5e5e3] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#131313]">Utilizadores atuais</h2>
          <button
            type="button"
            onClick={() => void loadAdmins()}
            disabled={loadingAdmins}
            className="text-[12px] font-medium text-[#313b2e] hover:underline disabled:opacity-50"
          >
            {loadingAdmins ? "A atualizar..." : "Recarregar"}
          </button>
        </div>
        <p className="text-[12px] text-[#5a5a59] mb-3">
          Gere os utilizadores com acesso ao backoffice. Não pode remover o seu próprio utilizador.
        </p>
        {admins.length === 0 ? (
          <p className="text-[13px] text-[#5a5a59]">Nenhum utilizador encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-[#e5e5e3] bg-[#f5f5f4]">
                  <th className="text-left px-3 py-2 font-medium text-[#5a5a59]">Email</th>
                  <th className="text-left px-3 py-2 font-medium text-[#5a5a59]">Perfil</th>
                  <th className="text-left px-3 py-2 font-medium text-[#5a5a59]">Criado em</th>
                  <th className="px-3 py-2 w-[160px] text-right font-medium text-[#5a5a59]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => {
                  const isSelf = user?.email === admin.email;
                  return (
                    <tr key={admin.id} className="border-b border-[#f0f0ee] last:border-0">
                      <td className="px-3 py-2 align-middle">
                        <span className="text-[#131313]">{admin.email}</span>
                        {isSelf && <span className="ml-2 text-[10px] text-[#5a5a59] bg-[#f4f4f2] rounded-full px-2 py-0.5">Você</span>}
                      </td>
                      <td className="px-3 py-2 align-middle">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#f0f0ee] text-[#131313]">
                          {admin.isAdmin ? "Administrador" : "Colaborador"}
                        </span>
                      </td>
                      <td className="px-3 py-2 align-middle text-[12px] text-[#5a5a59]">
                        {new Date(admin.createdAt).toLocaleString("pt-PT")}
                      </td>
                      <td className="px-3 py-2 align-middle">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              if (!token) return;
                              try {
                                await updateAdminRole(admin.id, !admin.isAdmin, token);
                                setAdmins((prev) =>
                                  prev.map((u) => (u.id === admin.id ? { ...u, isAdmin: !u.isAdmin } : u))
                                );
                                toast(`Perfil de ${admin.email} atualizado.`);
                              } catch (err) {
                                const msg = err instanceof Error ? err.message : "Erro ao atualizar utilizador";
                                setError(msg);
                                toast(msg, "error");
                              }
                            }}
                            disabled={isSelf}
                            className="px-2.5 py-1.5 border border-[#e5e5e3] rounded-lg text-[11px] font-medium text-[#313b2e] hover:bg-[#f5f5f4] disabled:opacity-40"
                          >
                            {admin.isAdmin ? "Tornar colaborador" : "Tornar admin"}
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              if (!token) return;
                              if (!window.confirm(`Remover utilizador ${admin.email}?`)) return;
                              try {
                                await deleteAdminUser(admin.id, token);
                                setAdmins((prev) => prev.filter((u) => u.id !== admin.id));
                                toast(`Utilizador ${admin.email} removido.`);
                              } catch (err) {
                                const msg = err instanceof Error ? err.message : "Erro ao remover utilizador";
                                setError(msg);
                                toast(msg, "error");
                              }
                            }}
                            disabled={isSelf}
                            className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-red-600 hover:bg-red-50 disabled:opacity-40"
                          >
                            Remover
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
