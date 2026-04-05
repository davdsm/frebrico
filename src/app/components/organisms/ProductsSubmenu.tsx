import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories, resolveImageUrl, type Category } from "../../api/shop";

type Subcategory = { name: string; slug: string };
type MenuCategory = { name: string; slug: string; image: string; iconSvg: string; subcategories: Subcategory[] };

function toMenuCategories(tree: Category[]): MenuCategory[] {
  return tree.map((c) => ({
    name: c.name,
    slug: c.slug,
    image: c.image || "",
    iconSvg: (c.icon_svg || "").trim(),
    subcategories: (c.children || []).map((ch) => ({ name: ch.name, slug: ch.slug })),
  }));
}

/** Inline SVG shown when a category has no custom `icon_svg` upload. */
function DefaultCategoryMenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 text-current opacity-90 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 5.5a1.5 1.5 0 011.5-1.5h4A1.5 1.5 0 0111 5.5v4A1.5 1.5 0 019.5 11h-4A1.5 1.5 0 014 9.5v-4zM13 5.5a1.5 1.5 0 011.5-1.5h4A1.5 1.5 0 0120 5.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0113 9.5v-4zM4 14.5a1.5 1.5 0 011.5-1.5h4A1.5 1.5 0 0111 14.5v4A1.5 1.5 0 019.5 20h-4A1.5 1.5 0 014 18.5v-4zM13 14.5a1.5 1.5 0 011.5-1.5h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0113 18.5v-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const leftContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.015, staggerDirection: -1 },
  },
};

const dominoItemVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface ProductsSubmenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose?: () => void;
}

export function ProductsSubmenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: ProductsSubmenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchCategories(true)
      .then((tree) => { if (!cancelled) setCategories(toMenuCategories(tree)); })
      .catch(() => { if (!cancelled) setCategories([]); });
    return () => { cancelled = true; };
  }, []);

  const column1 = categories.slice(0, 5);
  const column2 = categories.slice(5, 10);
  const activeIndex = hoveredIndex ?? (categories.length > 0 ? 0 : null);
  const activeCategory = activeIndex !== null ? categories[activeIndex] : null;

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="fixed left-0 right-0 top-[4.5rem] z-[9999] bg-white shadow-[0_20px_50px_rgba(17,24,39,0.12)]"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-10">
              <div className="flex gap-6 md:gap-8">
            {/* Left: two-column category menu (5 per column) */}
            <motion.nav
              variants={leftContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 grid grid-cols-2 gap-4 md:gap-5 min-w-0 content-start"
              aria-label="Categorias de produtos"
            >
              {[column1, column2].map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-2">
                  {column.map((category) => (
                    <motion.div
                      key={category.slug}
                      variants={dominoItemVariants}
                      onMouseEnter={() => setHoveredIndex(categories.findIndex((c) => c.slug === category.slug))}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="pt-1 first:pt-0"
                    >
                      <Link
                        to={`/category/${category.slug}`}
                        onClick={onClose}
                        className={`block w-full rounded-xl px-3 py-2 text-[17px] font-semibold transition-colors ${
                          activeCategory?.slug === category.slug
                            ? "bg-[#eef0ee] text-[#1f2a1d]"
                            : "text-black hover:bg-black/5"
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          {category.iconSvg ? (
                            <img
                              src={resolveImageUrl(category.iconSvg)}
                              alt=""
                              aria-hidden
                              className="w-5 h-5 shrink-0 object-contain"
                            />
                          ) : (
                            <DefaultCategoryMenuIcon />
                          )}
                          <span>{category.name}</span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                  {colIndex === 1 && (
                    <motion.div variants={dominoItemVariants} className="pt-3">
                      <Link
                        to="/products"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#eef0ee]"
                      >
                        Ver todos os produtos
                        <span aria-hidden>→</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.nav>

            {/* Right: image (appears after domino cascade) */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{ visible: { transition: { staggerChildren: 0 } } }}
              className="hidden md:flex flex-1 min-w-0"
            >
              <AnimatePresence mode="wait">
                {activeCategory ? (
                  <motion.div
                    key={activeCategory.slug}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-full max-w-[520px] aspect-[5/3] overflow-hidden rounded-2xl border border-black/10 bg-[#f3f3f5] shrink-0"
                  >
                    {activeCategory.image ? (
                      <img
                        src={resolveImageUrl(activeCategory.image)}
                        alt={activeCategory.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e5e5e3] flex items-center justify-center text-[#5a5a59] text-sm">
                        {activeCategory.name}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <p className="text-white text-sm md:text-base font-semibold drop-shadow-sm">
                        {activeCategory.name}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-w-md max-h-full aspect-[4/3] rounded-xl bg-[#f3f3f5] flex items-center justify-center shrink-0"
                  >
                    <p className="text-black text-sm font-medium">
                      Passe o rato sobre uma categoria
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
              </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
