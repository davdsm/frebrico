import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories, type Category } from "../../api/shop";

type Subcategory = { name: string; slug: string };
type MenuCategory = { name: string; slug: string; image: string; subcategories: Subcategory[] };

function toMenuCategories(tree: Category[]): MenuCategory[] {
  return tree.map((c) => ({
    name: c.name,
    slug: c.slug,
    image: c.image || "",
    subcategories: (c.children || []).map((ch) => ({ name: ch.name, slug: ch.slug })),
  }));
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

  const column1 = categories.slice(0, 2);
  const column2 = categories.slice(2, 4);
  const column3 = categories.slice(4);

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
          className="fixed left-0 right-0 top-[4.5rem] z-50 bg-white shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
        >
          <div className="flex max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-8 pb-12">
            {/* Left: three-column category menus (domino cascade) */}
            <motion.nav
              variants={leftContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 grid grid-cols-3 gap-x-8 md:gap-x-10 py-0 pr-6 md:pr-8 min-w-0 content-start pl-0"
              aria-label="Categorias de produtos"
            >
              {[column1, column2, column3].map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-0">
                  {column.map((category) => (
                    <React.Fragment key={category.slug}>
                      <motion.div
                        variants={dominoItemVariants}
                        onMouseEnter={() => setHoveredIndex(categories.findIndex((c) => c.slug === category.slug))}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="pt-4 first:pt-0 mb-4"
                      >
                        <Link
                          to={`/category/${category.slug}`}
                          onClick={onClose}
                          className="text-lg font-semibold text-black hover:text-black/80 transition-colors w-fit block"
                        >
                          {category.name}
                        </Link>
                      </motion.div>
                      {category.subcategories.map((sub) => (
                        <motion.div
                          key={sub.slug}
                          variants={dominoItemVariants}
                          onMouseEnter={() => setHoveredIndex(categories.findIndex((c) => c.slug === category.slug))}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <Link
                            to={`/category/${sub.slug}`}
                            onClick={onClose}
                            className="text-sm text-black hover:text-black/80 transition-colors py-1 block w-fit"
                          >
                            {sub.name}
                          </Link>
                        </motion.div>
                      ))}
                    </React.Fragment>
                  ))}
                  {colIndex === 2 && (
                    <motion.div variants={dominoItemVariants} className="pt-4">
                      <Link to="/products" onClick={onClose} className="text-base font-semibold text-black hover:text-black/80 transition-colors block w-fit">
                        Ver todos os produtos
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
              className="hidden md:flex flex-1 items-center justify-center py-4 pl-6 md:pl-8 min-w-0"
            >
              <AnimatePresence mode="wait">
                {hoveredIndex !== null && categories[hoveredIndex] ? (
                  <motion.div
                    key={hoveredIndex}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-full max-w-md max-h-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f3f3f5] shrink-0"
                  >
                    {categories[hoveredIndex].image ? (
                      <img
                        src={categories[hoveredIndex].image}
                        alt={categories[hoveredIndex].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e5e5e3] flex items-center justify-center text-[#5a5a59] text-sm">{categories[hoveredIndex].name}</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
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
        </motion.div>
      )}
    </>
  );
}
