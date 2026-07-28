import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { pricingApi, type PricingCustomer } from "../api/pricingApi";

const SESSION_KEY = "frebrico_admin_notif_seen";
const POLL_MS = 60_000;

export type AdminNotification = {
  id: string;
  type: "pending_customer";
  title: string;
  body: string;
  href: string;
  createdAt: string;
};

type NotificationsContextValue = {
  pendingCount: number;
  pendingCustomers: PricingCustomer[];
  notifications: AdminNotification[];
  loading: boolean;
  refresh: () => Promise<void>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function useAdminNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useAdminNotifications must be used within AdminNotificationsProvider");
  return ctx;
}

export function AdminNotificationsProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [pendingCustomers, setPendingCustomers] = useState<PricingCustomer[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(async () => {
    if (!token) return;
    try {
      const [dash, pending] = await Promise.all([
        pricingApi.dashboard(),
        pricingApi.listCustomers("pending"),
      ]);
      setPendingCount(dash.pending || 0);
      setPendingCustomers(pending);
    } catch {
      setPendingCount(0);
      setPendingCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    void refresh();
    const id = window.setInterval(() => void refresh(), POLL_MS);
    return () => window.clearInterval(id);
  }, [token, refresh]);

  const notifications = useMemo<AdminNotification[]>(() => {
    return pendingCustomers.map((c) => ({
      id: `pending-customer-${c.id}`,
      type: "pending_customer" as const,
      title: "Nova conta à espera de aprovação",
      body: c.name ? `${c.name} · ${c.email}` : c.email,
      href: `/admin/customers/${c.id}`,
      createdAt: c.created_at,
    }));
  }, [pendingCustomers]);

  const value = useMemo(
    () => ({
      pendingCount,
      pendingCustomers,
      notifications,
      loading,
      refresh,
      open,
      setOpen,
    }),
    [pendingCount, pendingCustomers, notifications, loading, refresh, open]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

function formatRelative(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Date.now() - t;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "agora";
  if (mins < 60) return `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.floor(hours / 24);
  return `há ${days} d`;
}

/** Bell + dropdown — always visible in admin chrome */
export function AdminNotificationBell() {
  const { pendingCount, notifications, loading, open, setOpen, refresh } = useAdminNotifications();
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, setOpen]);

  useEffect(() => {
    if (!open) return;
    void refresh();
    const onDoc = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, refresh, setOpen]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#e5e5e3] text-[#5a5a59] hover:text-[#131313] hover:border-[#313b2e]/25 transition-colors"
        aria-label="Notificações"
        aria-expanded={open}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[1.15rem] h-[1.15rem] px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {pendingCount > 99 ? "99+" : pendingCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-[min(100vw-2rem,360px)] rounded-2xl bg-white border border-[#e5e5e3] shadow-[0_16px_48px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e5e5e3] flex items-center justify-between gap-2">
            <div>
              <p className="text-[13px] font-semibold text-[#131313]">Notificações</p>
              <p className="text-[11px] text-[#5a5a59]">
                {loading
                  ? "A atualizar..."
                  : pendingCount > 0
                    ? `${pendingCount} conta${pendingCount === 1 ? "" : "s"} pendente${pendingCount === 1 ? "" : "s"}`
                    : "Tudo em dia"}
              </p>
            </div>
            <Link
              to="/admin/customers?status=pending"
              onClick={() => setOpen(false)}
              className="text-[12px] font-medium text-[#313b2e] hover:underline"
            >
              Ver todas
            </Link>
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-[13px] font-medium text-[#131313]">Sem contas para aprovar</p>
                <p className="text-[12px] text-[#5a5a59] mt-1">Não há novos registos pendentes neste momento.</p>
              </div>
            ) : (
              <ul>
                {notifications.map((n) => (
                  <li key={n.id} className="border-b border-[#f0f0ef] last:border-0">
                    <Link
                      to={n.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 hover:bg-[#fafaf9] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-semibold text-[#131313]">{n.title}</p>
                          <p className="text-[12px] text-[#5a5a59] truncate mt-0.5">{n.body}</p>
                          {n.createdAt && (
                            <p className="text-[11px] text-[#5a5a59]/70 mt-1">{formatRelative(n.createdAt)}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {pendingCount > 0 && (
            <div className="px-4 py-3 border-t border-[#e5e5e3] bg-[#fafaf9]">
              <Link
                to="/admin/customers?status=pending"
                onClick={() => setOpen(false)}
                className="block w-full text-center text-[13px] font-semibold py-2.5 rounded-xl bg-[#313b2e] text-white hover:bg-[#3d4a38] transition-colors"
              >
                Aprovar ou rejeitar contas
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Modal shown once per browser session when admin enters with pending approvals */
export function AdminEntryNotification() {
  const { pendingCount, pendingCustomers, loading } = useAdminNotifications();
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (loading || shownRef.current) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    shownRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    // Always show entry status once per session (pending or clear)
    setVisible(true);
  }, [loading, pendingCount]);

  if (!visible || loading) return null;

  const hasPending = pendingCount > 0;
  const preview = pendingCustomers.slice(0, 3);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        aria-label="Fechar"
        onClick={() => setVisible(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-entry-notif-title"
        className="relative w-full max-w-md rounded-2xl bg-white border border-[#e5e5e3] shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden"
      >
        <div className={`px-5 pt-5 pb-4 ${hasPending ? "bg-amber-50 border-b border-amber-100" : "bg-emerald-50 border-b border-emerald-100"}`}>
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                hasPending ? "bg-amber-500 text-white" : "bg-emerald-600 text-white"
              }`}
            >
              {hasPending ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>
            <div className="min-w-0">
              <h2 id="admin-entry-notif-title" className="text-[16px] font-semibold text-[#131313]">
                {hasPending
                  ? `${pendingCount} conta${pendingCount === 1 ? "" : "s"} para aprovar`
                  : "Sem contas pendentes"}
              </h2>
              <p className="text-[13px] text-[#5a5a59] mt-1 leading-relaxed">
                {hasPending
                  ? "Há novos registos à espera da tua decisão. Podes aprovar ou rejeitar agora."
                  : "Não há novos clientes à espera de aprovação neste momento."}
              </p>
            </div>
          </div>
        </div>

        {hasPending && (
          <ul className="px-5 py-3 space-y-2 max-h-48 overflow-y-auto">
            {preview.map((c) => (
              <li key={c.id} className="flex items-center gap-3 text-[13px]">
                <span className="w-8 h-8 rounded-full bg-[#313b2e]/10 text-[#313b2e] flex items-center justify-center text-[11px] font-semibold uppercase flex-shrink-0">
                  {(c.name || c.email).charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-[#131313] truncate">{c.name || "Sem nome"}</p>
                  <p className="text-[12px] text-[#5a5a59] truncate">{c.email}</p>
                </div>
              </li>
            ))}
            {pendingCount > preview.length && (
              <li className="text-[12px] text-[#5a5a59] pl-11">
                +{pendingCount - preview.length} mais
              </li>
            )}
          </ul>
        )}

        <div className="px-5 py-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end border-t border-[#e5e5e3]">
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#5a5a59] hover:bg-[#f5f5f4] transition-colors"
          >
            Fechar
          </button>
          {hasPending && (
            <Link
              to="/admin/customers?status=pending"
              onClick={() => setVisible(false)}
              className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-center bg-[#313b2e] text-white hover:bg-[#3d4a38] transition-colors"
            >
              Ver pendentes
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
