import React, { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "figma:asset/a1506335f9c1a5795534434dee96810d0a8b30ff.png";
import img2 from "figma:asset/2bb6574b0734ce3219f7f1db98d1151bdad77901.png";
import img3 from "figma:asset/54af315f4b04f9d62134bf4a2d389532fea8fd69.png";
import img4 from "figma:asset/28f9d735f4368ce680a1b628f52ec3a2079c6abc.png";
import img5 from "figma:asset/fe05ef88c0952160ffaa014ba3d4f469d7ce7323.png";

type Subcategory = { name: string; slug: string };

const CATEGORIES: Array<{
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}> = [
  {
    name: "Arames",
    slug: "arames",
    image: img1,
    subcategories: [
      { name: "Arame Rebabado", slug: "arames-rebarbado" },
      { name: "Arame Farpado", slug: "arames-farpado" },
      { name: "Arame Liso", slug: "arames-liso" },
      { name: "Malha Metálica", slug: "arames-malha" },
      { name: "Arame Galvanizado", slug: "arames-galvanizado" },
    ],
  },
  {
    name: "Portões",
    slug: "portoes",
    image: img2,
    subcategories: [
      { name: "Portões Automáticos", slug: "portoes-automaticos" },
      { name: "Portões Manuais", slug: "portoes-manuais" },
      { name: "Portões de Garagem", slug: "portoes-garagem" },
      { name: "Portões de Vedação", slug: "portoes-vedacao" },
      { name: "Portões Industriais", slug: "portoes-industriais" },
    ],
  },
  {
    name: "Grades",
    slug: "grades",
    image: img3,
    subcategories: [
      { name: "Grades de Segurança", slug: "grades-seguranca" },
      { name: "Grades de Varanda", slug: "grades-varanda" },
      { name: "Grades Decorativas", slug: "grades-decorativas" },
      { name: "Grades Industriais", slug: "grades-industriais" },
      { name: "Grades de Obra", slug: "grades-obra" },
    ],
  },
  {
    name: "Vedações",
    slug: "vedacoes",
    image: img4,
    subcategories: [
      { name: "Vedações Residenciais", slug: "vedacoes-residenciais" },
      { name: "Vedações Industriais", slug: "vedacoes-industriais" },
      { name: "Rede Simples", slug: "vedacoes-rede-simples" },
      { name: "Rede Dupla", slug: "vedacoes-rede-dupla" },
      { name: "Vedações Agrícolas", slug: "vedacoes-agricolas" },
    ],
  },
  {
    name: "Correntes",
    slug: "correntes",
    image: img5,
    subcategories: [
      { name: "Correntes de Transmissão", slug: "correntes-transmissao" },
      { name: "Correntes de Elevação", slug: "correntes-elevacao" },
      { name: "Correntes de Proteção", slug: "correntes-protecao" },
      { name: "Correntes Soldadas", slug: "correntes-soldadas" },
      { name: "Correntes Galvanizadas", slug: "correntes-galvanizadas" },
    ],
  },
];

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="fixed left-0 right-0 top-[7rem] z-50 h-auto min-h-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06),0_24px_60px_-12px_rgba(0,0,0,0.08)]"
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
              {[
                CATEGORIES.slice(0, 2),
                CATEGORIES.slice(2, 4),
                CATEGORIES.slice(4),
              ].map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-0">
                  {column.map((category) => (
                    <React.Fragment key={category.slug}>
                      <motion.div
                        variants={dominoItemVariants}
                        onMouseEnter={() =>
                          setHoveredIndex(CATEGORIES.indexOf(category))
                        }
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="pt-4 first:pt-0 mb-4"
                      >
                        <Link
                          to={`/category/${category.slug}`}
                          onClick={onClose}
                          className="text-lg font-semibold text-[#313b2e] hover:text-[#3d4937] transition-colors w-fit block"
                        >
                          {category.name}
                        </Link>
                      </motion.div>
                      {category.subcategories.map((sub) => (
                        <motion.div
                          key={sub.slug}
                          variants={dominoItemVariants}
                          onMouseEnter={() =>
                            setHoveredIndex(CATEGORIES.indexOf(category))
                          }
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <Link
                            to={`/category/${sub.slug}`}
                            onClick={onClose}
                            className="text-sm text-black/60 hover:text-[#313b2e] transition-colors py-1 block w-fit"
                          >
                            {sub.name}
                          </Link>
                        </motion.div>
                      ))}
                    </React.Fragment>
                  ))}
                  {colIndex === 2 && (
                    <motion.div
                      variants={dominoItemVariants}
                      className="pt-4"
                    >
                      <Link
                        to="/products"
                        onClick={onClose}
                        className="text-base font-semibold text-[#313b2e] hover:text-[#3d4937] transition-colors block w-fit"
                      >
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
                {hoveredIndex !== null ? (
                  <motion.div
                    key={hoveredIndex}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-full max-w-md max-h-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f3f3f5] shrink-0"
                  >
                    <img
                      src={CATEGORIES[hoveredIndex].image}
                      alt={CATEGORIES[hoveredIndex].name}
                      className="w-full h-full object-cover"
                    />
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
                    <p className="text-black/40 text-sm font-medium">
                      Passe o rato sobre uma categoria
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
