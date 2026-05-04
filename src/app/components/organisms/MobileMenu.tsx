import React, { useEffect } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "../atoms/Logo";
import { useContent, useContentJson } from "../../content/useContent";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.8, 0.25, 1] },
  },
  exit: { x: "100%", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

const listContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

type CategoryItem = { title: string; slug: string; description: string };

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleLinkClick = () => onClose();
  const navHome = useContent("header", "mobile", "nav_home");
  const navItems = useContentJson<{ label: string; url: string }[]>("header", "nav", "items", []);
  const navList = Array.isArray(navItems) ? navItems : [];
  const normalizeNavPath = (url: string) => {
    const p = url.split("?")[0];
    if (!p.startsWith("/")) return p;
    return p.replace(/\/+$/, "") || "/";
  };
  const navItemsForMenu = navList.filter((item) => normalizeNavPath(item.url) !== "/contact");
  const categoriesTitle = useContent("header", "mobile", "categories_title");
  const categories = useContentJson<CategoryItem[]>("header", "mobile", "categories", []);
  const categoryList = Array.isArray(categories) ? categories : [];
  const layoutLogoDesktop = useContent("_settings", "layout", "logo_desktop");
  const layoutLogoMobile = useContent("_settings", "layout", "logo_mobile");
  const headerLogoDesktop = useContent("header", "logo", "desktop");
  const headerLogoMobile = useContent("header", "logo", "mobile");
  const logoDesktop = layoutLogoDesktop || headerLogoDesktop;
  const logoMobile = layoutLogoMobile || headerLogoMobile;

  // Lock page scroll when mobile sidebar is open
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="mobile-menu-overlay"
            className="h-[100svh] fixed inset-0 z-40 bg-black/40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.aside
            key="mobile-menu-panel"
            className="h-[100svh] fixed inset-y-0 right-0 z-50 w-[80%] max-w-sm bg-white border-l border-black/5 shadow-[0_10px_40px_rgba(15,23,42,0.16)] flex flex-col rounded-l-3xl overflow-hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-black/5">
              <Link to="/" onClick={handleLinkClick}>
                <Logo logoSrc={logoDesktop} logoMobileSrc={logoMobile} />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
                className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-black hover:border-black/20 transition-colors"
              >
                <svg
                  className="w-6 h-6 shrink-0 align-middle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4 flex flex-col gap-8">
              <motion.nav
                className="flex flex-col gap-3 text-lg font-medium text-[#313b2e]"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div variants={listItemVariants}>
                  <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="py-2 flex items-center justify-between border-b border-black/5"
                  >
                    <span>{navHome}</span>
                  </Link>
                </motion.div>
                <motion.div variants={listItemVariants}>
                  <Link
                    to="/search"
                    onClick={handleLinkClick}
                    className="py-2 flex items-center justify-between border-b border-black/5"
                  >
                    <span>Pesquisa</span>
                  </Link>
                </motion.div>
                {navItemsForMenu.map((item, idx) => {
                  const to = item.url.startsWith("/") ? item.url : "/";
                  return (
                    <motion.div key={`mobile-nav-${idx}-${item.url}`} variants={listItemVariants}>
                      <Link
                        to={to}
                        onClick={handleLinkClick}
                        className="py-2 flex items-center justify-between border-b border-black/5"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div
                className="space-y-4"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                  {categoriesTitle}
                </p>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  {categoryList.map((cat) => (
                    <motion.div key={cat.slug} variants={listItemVariants}>
                      <Link
                        to={`/category/${cat.slug}`}
                        onClick={handleLinkClick}
                        className="flex flex-col items-start rounded-2xl border border-black/5 bg-[#f5f5f7] px-4 py-3 text-left active:scale-[0.98] transition-transform"
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50">
                          {cat.title}
                        </span>
                        <span className="mt-1 text-[13px] text-black/70">
                          {cat.description}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

