import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { ADMIN_PAGES } from "../pagesList";

const LOJA_ITEMS = [
  { to: "/admin/products", label: "Produtos" },
  { to: "/admin/categories", label: "Categorias" },
  { to: "/admin/attributes", label: "Atributos" },
];

const navItems = [
  { to: "/admin", label: "Dashboard", icon: "layout" },
  { to: "/admin/media", label: "Media", icon: "image" },
  { to: "/admin/configuration", label: "Configuração", icon: "settings" },
];

const iconSvg: Record<string, React.ReactNode> = {
  layout: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  file: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  globe: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  footer: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  image: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  settings: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  folder: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  ),
  cube: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  store: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const [pagesExpanded, setPagesExpanded] = useState(false);
  const [lojaExpanded, setLojaExpanded] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isPagesActive = location.pathname.startsWith("/admin/pages");
  const isLojaActive =
    location.pathname.startsWith("/admin/products") ||
    location.pathname.startsWith("/admin/categories") ||
    location.pathname.startsWith("/admin/attributes");
  useEffect(() => {
    if (isPagesActive) setPagesExpanded(true);
  }, [isPagesActive]);
  useEffect(() => {
    if (isLojaActive) setLojaExpanded(true);
  }, [isLojaActive]);

  const isActive = (to: string) => {
    if (to === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(to);
  };

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="px-5 pt-6 pb-5">
        <Link to="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#313b2e] flex items-center justify-center">
            <span className="text-white text-sm font-bold">F</span>
          </div>
          <span className="font-semibold text-[15px] text-[#131313]">Frebrico</span>
          <span className="ml-auto text-[10px] font-medium text-[#5a5a59] bg-[#f0f0ef] rounded-full px-2 py-0.5">Admin</span>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 pt-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5a5a59]/80">Menu</p>
        <NavLink
          to="/admin"
          end
          onClick={() => setOpen(false)}
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
            location.pathname === "/admin"
              ? "bg-[#313b2e] text-white shadow-[0_2px_8px_rgba(49,59,46,0.18)]"
              : "text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313]"
          }`}
        >
          <span className={location.pathname === "/admin" ? "text-white" : "text-[#5a5a59] group-hover:text-[#131313]"}>
            {iconSvg.layout}
          </span>
          Dashboard
        </NavLink>
        {/* Páginas expandable submenu */}
        <div className="py-0.5">
          <button
            type="button"
            onClick={() => setPagesExpanded((e) => !e)}
            className={`group w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
              isPagesActive ? "bg-[#313b2e]/10 text-[#313b2e]" : "text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313]"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={isPagesActive ? "text-[#313b2e]" : "text-[#5a5a59] group-hover:text-[#131313]"}>{iconSvg.file}</span>
              Páginas
            </span>
            <span className={`text-[#5a5a59] transition-transform ${pagesExpanded ? "rotate-180" : ""}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          {pagesExpanded && (
            <div className="ml-4 mt-0.5 pl-3 border-l border-[#e5e5e3] space-y-0.5">
              {ADMIN_PAGES.map(({ slug, name }) => (
                <NavLink
                  key={slug}
                  to={`/admin/pages/${slug}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive: active }) =>
                    `flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] font-medium transition-all ${
                      active ? "bg-[#313b2e] text-white" : "text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313]"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        {/* Loja expandable submenu */}
        <div className="py-0.5">
          <button
            type="button"
            onClick={() => setLojaExpanded((e) => !e)}
            className={`group w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
              isLojaActive ? "bg-[#313b2e]/10 text-[#313b2e]" : "text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313]"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={isLojaActive ? "text-[#313b2e]" : "text-[#5a5a59] group-hover:text-[#131313]"}>{iconSvg.store}</span>
              Loja
            </span>
            <span className={`text-[#5a5a59] transition-transform ${lojaExpanded ? "rotate-180" : ""}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          {lojaExpanded && (
            <div className="ml-4 mt-0.5 pl-3 border-l border-[#e5e5e3] space-y-0.5">
              {LOJA_ITEMS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive: active }) =>
                    `flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] font-medium transition-all ${
                      active ? "bg-[#313b2e] text-white" : "text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        {navItems.slice(1).map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
              isActive(to)
                ? "bg-[#313b2e] text-white shadow-[0_2px_8px_rgba(49,59,46,0.18)]"
                : "text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313]"
            }`}
          >
            <span className={`transition-colors ${isActive(to) ? "text-white" : "text-[#5a5a59] group-hover:text-[#131313]"}`}>
              {iconSvg[icon]}
            </span>
            {label}
          </NavLink>
        ))}

        <div className="h-px bg-[#e5e5e3] my-3 mx-2" />
        <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5a5a59]/80">Equipa</p>

        <Link
          to="/admin/register"
          onClick={() => setOpen(false)}
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
            location.pathname === "/admin/register"
              ? "bg-[#313b2e] text-white shadow-[0_2px_8px_rgba(49,59,46,0.18)]"
              : "text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313]"
          }`}
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
          Novo admin
        </Link>
      </nav>

      {/* Bottom user area */}
      <div className="px-3 pb-4 pt-2">
        <div className="h-px bg-[#e5e5e3] mb-3" />
        {user?.email && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#313b2e]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-semibold text-[#313b2e] uppercase">
                {user.email.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-[#131313] truncate">{user.email}</p>
              <p className="text-[10px] text-[#5a5a59]">Administrador</p>
            </div>
          </div>
        )}
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313] transition-all"
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Ver website
        </Link>
        <button
          type="button"
          onClick={() => { setOpen(false); logout(); navigate("/login", { replace: true }); }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-[#5a5a59] hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Terminar sessão
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white text-[#131313] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-black/5"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-[260px] bg-white border-r border-[#e5e5e3] flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile close */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-5 right-4 p-1.5 rounded-lg text-[#5a5a59] hover:bg-[#f5f5f4] hover:text-[#131313] transition-colors"
          aria-label="Fechar menu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
