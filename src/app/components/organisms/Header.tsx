import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { NavItem } from "../molecules/NavItem";
import { Button } from "../atoms/Button";
import { Logo } from "../atoms/Logo";
import { ProductsSubmenu } from "./ProductsSubmenu";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "../../cart/CartContext";
import { useContent, useContentJson } from "../../content/useContent";
import { motion } from "framer-motion";
import { useCustomerAuth } from "../../auth/CustomerAuthContext";
import { SiteSearchOverlay } from "../common/SiteSearchOverlay";

const CLOSE_DELAY_MS = 180;

interface HeaderProps {
  isCompact?: boolean;
}

export function Header({ isCompact = false }: HeaderProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalCount } = useCart();
  const { user } = useCustomerAuth();
  const layoutLogoDesktop = useContent("_settings", "layout", "logo_desktop");
  const layoutLogoMobile = useContent("_settings", "layout", "logo_mobile");
  const headerLogoDesktop = useContent("header", "logo", "desktop");
  const headerLogoMobile = useContent("header", "logo", "mobile");
  const logoDesktop = layoutLogoDesktop || headerLogoDesktop;
  const logoMobile = layoutLogoMobile || headerLogoMobile;
  const navItems = useContentJson<{ label: string; url: string }[]>("header", "nav", "items", []);
  const navList = Array.isArray(navItems) ? navItems : [];
  const normalizeNavPath = (url: string) => {
    const p = url.split("?")[0];
    if (!p.startsWith("/")) return p;
    return p.replace(/\/+$/, "") || "/";
  };
  /** Contact is only the header button — not duplicated in the nav list */
  const navItemsForMenu = navList.filter((item) => normalizeNavPath(item.url) !== "/contact");

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleProductsHoverEnter = () => {
    clearCloseTimeout();
    setIsProductsOpen(true);
  };

  // When leaving the Products trigger: delay close so user can reach the submenu
  const handleProductsAreaLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, CLOSE_DELAY_MS);
  };

  // When leaving the submenu itself: close immediately
  const handleSubmenuLeave = () => {
    clearCloseTimeout();
    setIsProductsOpen(false);
  };

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [searchOpen]);

  return (
    <>
    <header
      className={`pr-4 md:pr-0 w-full max-w-[1200px] mx-auto relative transition-all duration-500 ${isCompact ? "" : "py-4"
        }`}
    >
      <div className="flex items-center justify-between transition-all duration-500">
        {/* Left: hamburger on mobile, logo on desktop */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 2 }}
          className="flex items-center min-w-0"
        >
          <button
            className="lg:hidden p-2"
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-6 h-6 shrink-0 align-middle"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="hidden lg:block">
            <Link to="/">
              <Logo compact={isCompact} logoSrc={logoDesktop} logoMobileSrc={logoMobile} />
            </Link>
          </div>
        </motion.div>

        {/* Center: logo on mobile, nav on desktop */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 2.1 }}
          className="flex-1 flex justify-center min-w-0"
        >
          <div className="lg:hidden">
            <Link to="/">
              <Logo compact={isCompact} logoSrc={logoDesktop} logoMobileSrc={logoMobile} />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-6 group/nav transition-all duration-500">
            {navItemsForMenu.map((item, idx) => {
              const isProducts = item.url === "/products" || item.url.startsWith("/products");
              if (isProducts) {
                return (
                  <div
                    key={`nav-${idx}-${item.url}`}
                    className="relative"
                    onMouseEnter={handleProductsHoverEnter}
                    onMouseLeave={handleProductsAreaLeave}
                  >
                    <NavLink
                      to="/products"
                      onClick={() => setIsProductsOpen(false)}
                      className="transition-opacity duration-200 group-hover/nav:opacity-20 hover:opacity-100"
                    >
                      {({ isActive }) => (
                        <NavItem label={item.label} isActive={isActive} hasDropdown isExpanded={isProductsOpen} compact={isCompact} />
                      )}
                    </NavLink>
                    <ProductsSubmenu
                      isOpen={isProductsOpen}
                      onMouseEnter={handleProductsHoverEnter}
                      onMouseLeave={handleSubmenuLeave}
                      onClose={() => {
                        clearCloseTimeout();
                        setIsProductsOpen(false);
                      }}
                    />
                  </div>
                );
              }
              const to = item.url.startsWith("/") ? item.url : "/";
              return (
                <NavLink
                  key={`nav-${idx}-${item.url}`}
                  to={to}
                  className="transition-opacity duration-200 group-hover/nav:opacity-20 hover:opacity-100"
                >
                  {({ isActive }) => <NavItem label={item.label} isActive={isActive} compact={isCompact} />}
                </NavLink>
              );
            })}
          </nav>
        </motion.div>

        {/* Cart and Contact */}
        <div
          className={`flex items-center transition-all duration-500 ${isCompact ? "gap-2 lg:gap-3" : "gap-3 lg:gap-6"
            }`}
        >
          {/* Três ícones: mesmo espaçamento (gap uniforme + mesma área de toque) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 2.2 }}
            className={`flex items-center shrink-0 ${isCompact ? "gap-1.5" : "gap-2"}`}
          >
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#131313] hover:bg-black/[0.06]"
              aria-label="Abrir pesquisa"
              aria-expanded={searchOpen}
              aria-haspopup="dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
            <Link
              to={user ? "/account/dashboard" : "/login?mode=customer"}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#131313] hover:bg-black/[0.06]"
              aria-label={user ? "Conta" : "Entrar"}
            >
              <svg className="h-6 w-6 shrink-0 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
            <Link to="/cart" className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#131313] hover:bg-black/[0.06]" aria-label="Carrinho">
              <svg className="h-6 w-6 shrink-0 align-middle transition-all duration-500" fill="none" viewBox="0 0 24 24">
                <path
                  d="M15.75 10.5V6C15.75 5.00544 15.3549 4.05161 14.6517 3.34835C13.9484 2.64509 12.9946 2.25 12 2.25C11.0054 2.25 10.0516 2.64509 9.34835 3.34835C8.64509 4.05161 8.25 5.00544 8.25 6V10.5M19.606 8.507L20.869 20.507C20.939 21.172 20.419 21.75 19.75 21.75H4.25C4.09221 21.7502 3.93614 21.7171 3.79195 21.6531C3.64775 21.589 3.51865 21.4953 3.41302 21.3781C3.3074 21.2608 3.22761 21.1227 3.17885 20.9726C3.13009 20.8226 3.11345 20.6639 3.13 20.507L4.394 8.507C4.42316 8.23056 4.55363 7.9747 4.76025 7.78876C4.96688 7.60281 5.23503 7.49995 5.513 7.5H18.487C19.063 7.5 19.546 7.935 19.606 8.507Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
              {totalCount > 0 && (
                <div
                  className={`absolute bg-[#313b2e] text-white text-xs rounded-full flex items-center justify-center transition-all duration-500 ${isCompact ? "-top-1 right-0 min-w-[18px] h-[18px] px-1 text-[10px]" : "-top-1 right-0 min-w-[20px] h-5 px-1 text-[10px]"
                    }`}
                >
                  {totalCount}
                </div>
              )}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 2.3 }}
            className="hidden sm:flex shrink-0"
          >
            <Link to="/contact" className="flex">
              <Button
                variant="primary"
                size={isCompact ? "sm" : "md"}
                className="bg-[#313b2e] text-white hover:bg-[#3d4937]"
                children={navList.find((i) => i.url === "/contact")?.label ?? "Contactos"}
              />
            </Link>
          </motion.div>

        </div>
      </div>
      {/* Mobile sidebar menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>

    <SiteSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}