import { useEffect, useId, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "../atoms/Logo";
import { DefaultCategoryMenuIcon } from "../atoms/DefaultCategoryMenuIcon";
import { useContent, useContentJson } from "../../content/useContent";
import { goToHomeHash } from "../../utils/scrollToHash";
import { fetchCategories, resolveImageUrl, type Category } from "../../api/shop";

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

type CategoryLoad = "idle" | "loading" | "ready" | "error";

function MenuChevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""} ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleLinkClick = () => onClose();
  const reduceMotion = useReducedMotion() === true;
  const productsMenuId = useId();
  const navHome = useContent("header", "mobile", "nav_home");
  const navItems = useContentJson<{ label: string; url: string }[]>("header", "nav", "items", []);
  const navList = Array.isArray(navItems) ? navItems : [];
  const normalizeNavPath = (url: string) => {
    const p = url.split("?")[0].split("#")[0];
    if (!p.startsWith("/")) return p;
    return p.replace(/\/+$/, "") || "/";
  };
  const navLinkTo = (url: string): string | { pathname: string; hash: string } => {
    if (url.includes("#")) {
      const [path, hash = ""] = url.split("#");
      return { pathname: path && path.length > 0 ? path : "/", hash };
    }
    return url.startsWith("/") ? url : "/";
  };
  const navItemsForMenu = navList.filter((item) => normalizeNavPath(item.url) !== "/contact");
  const layoutLogoDesktop = useContent("_settings", "layout", "logo_desktop");
  const layoutLogoMobile = useContent("_settings", "layout", "logo_mobile");
  const headerLogoDesktop = useContent("header", "logo", "desktop");
  const headerLogoMobile = useContent("header", "logo", "mobile");
  const logoDesktop = layoutLogoDesktop || headerLogoDesktop;
  const logoMobile = layoutLogoMobile || headerLogoMobile;

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryLoad, setCategoryLoad] = useState<CategoryLoad>("idle");
  const [productsOpen, setProductsOpen] = useState(true);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setCategoryLoad("loading");
    fetchCategories(true)
      .then((tree) => {
        if (cancelled) return;
        setCategories(Array.isArray(tree) ? tree : []);
        setCategoryLoad("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setCategoryLoad("error");
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

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

  const renderNavItem = (item: { label: string; url: string }, idx: number) => {
    const path = normalizeNavPath(item.url);
    const isProducts = path === "/products" || path.startsWith("/products/");
    if (isProducts) {
      const productsPanelId = `${productsMenuId}-${idx}`;
      return (
        <motion.div key={`mobile-nav-${idx}-${item.url}`} variants={listItemVariants} className="border-b border-black/5">
          <button
            type="button"
            onClick={() => setProductsOpen((v) => !v)}
            className="w-full py-2 flex items-center justify-between text-left"
            aria-expanded={productsOpen}
            aria-controls={productsPanelId}
          >
            <span>{item.label}</span>
            <MenuChevron open={productsOpen} className="text-black/40" />
          </button>
          <AnimatePresence initial={false}>
            {productsOpen && (
              <motion.div
                id={productsPanelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                className="overflow-hidden pb-3"
              >
                <div className="pl-1 flex flex-col gap-1.5">
                  <Link
                    to="/products"
                    onClick={handleLinkClick}
                    className="rounded-xl px-3 py-2.5 text-[14px] font-semibold text-[#313b2e] bg-[#eef0ee]"
                  >
                    Ver todos os produtos →
                  </Link>
                  {categories.map((cat) => {
                    const children = Array.isArray(cat.children) ? cat.children : [];
                    const open = expandedSlug === cat.slug;
                    const iconSrc = resolveImageUrl(cat.icon_svg);
                    const subcategoriesId = `${productsPanelId}-sub-${cat.id}`;
                    return (
                      <div key={cat.slug} className="rounded-xl border border-black/5 overflow-hidden">
                        <div className="flex items-stretch">
                          <Link
                            to={`/category/${cat.slug}`}
                            onClick={handleLinkClick}
                            className="flex-1 min-w-0 flex items-center gap-2.5 px-3 py-2.5 text-[14px] font-semibold text-[#1f2a1d]"
                          >
                            {iconSrc ? (
                              <img
                                src={iconSrc}
                                alt=""
                                aria-hidden
                                className="w-5 h-5 shrink-0 object-contain"
                              />
                            ) : (
                              <DefaultCategoryMenuIcon />
                            )}
                            <span className="truncate min-w-0" title={cat.name}>{cat.name}</span>
                          </Link>
                          {children.length > 0 && (
                            <button
                              type="button"
                              aria-expanded={open}
                              aria-controls={subcategoriesId}
                              aria-label={open ? `Fechar subcategorias de ${cat.name}` : `Abrir subcategorias de ${cat.name}`}
                              onClick={() => setExpandedSlug(open ? null : cat.slug)}
                              className="px-3 border-l border-black/5 text-black/40"
                            >
                              <MenuChevron open={open} />
                            </button>
                          )}
                        </div>
                        {open && children.length > 0 && (
                          <div id={subcategoriesId} className="bg-[#fafaf9] border-t border-black/5 px-3 py-2 flex flex-col gap-1">
                            {children.map((child) => (
                              <Link
                                key={child.slug}
                                to={`/category/${child.slug}`}
                                onClick={handleLinkClick}
                                className="py-1.5 text-[13px] text-[#5a5a59] hover:text-[#313b2e] break-words"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {categories.length === 0 && (categoryLoad === "idle" || categoryLoad === "loading") && (
                    <p className="text-[13px] text-black/40 px-1 py-2" role="status">A carregar categorias…</p>
                  )}
                  {categories.length === 0 && categoryLoad === "error" && (
                    <p className="text-[13px] text-black/40 px-1 py-2" role="status">Não foi possível carregar as categorias.</p>
                  )}
                  {categories.length === 0 && categoryLoad === "ready" && (
                    <p className="text-[13px] text-black/40 px-1 py-2">Sem categorias.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    const to = navLinkTo(item.url);
    const hashOnly = typeof to === "object";
    return (
      <motion.div key={`mobile-nav-${idx}-${item.url}`} variants={listItemVariants}>
        <Link
          to={to}
          onClick={(e) => {
            if (hashOnly && typeof to === "object" && to.hash) {
              goToHomeHash(to.hash, e);
            }
            handleLinkClick();
          }}
          className="py-2 flex items-center justify-between border-b border-black/5"
        >
          <span>{item.label}</span>
        </Link>
      </motion.div>
    );
  };

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
                {navItemsForMenu.map((item, idx) => renderNavItem(item, idx))}
              </motion.nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
