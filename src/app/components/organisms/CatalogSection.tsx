import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { FadeInUpInView } from "../atoms/FadeInUpInView";
import { useContent } from "../../content/useContent";
import { fetchProducts } from "../../api/shop";
import { resolveImageUrl } from "../../api/shop";

const FALLBACKS = {
  eyebrow: "Catálogo",
  title: "O nosso catálogo completo",
  description:
    "Consulte a gama Frebrico em PDF: vedações, redes, portões, arames e acessórios, com referências e informação técnica para ajudar a escolher a solução certa.",
  button: "Abrir Catálogo",
  pdf_url: "/uploads/catalogo/Frebrico-Catalogo.pdf",
};

function pickRandom<T>(items: T[], count: number): T[] {
  if (items.length === 0) return [];
  if (items.length <= count) return [...items];
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export function CatalogSection() {
  const eyebrow = useContent("home", "catalog", "eyebrow", FALLBACKS.eyebrow);
  const title = useContent("home", "catalog", "title", FALLBACKS.title);
  const description = useContent("home", "catalog", "description", FALLBACKS.description);
  const buttonText = useContent("home", "catalog", "button", FALLBACKS.button);
  const pdfUrl = useContent("home", "catalog", "pdf_url", FALLBACKS.pdf_url);

  const [imagePool, setImagePool] = useState<string[]>([]);
  const [tiles, setTiles] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const products = await fetchProducts();
        const urls = products
          .map((p) => resolveImageUrl(p.image))
          .filter((u) => Boolean(u));
        // unique preserve order
        const seen = new Set<string>();
        const unique = urls.filter((u) => (seen.has(u) ? false : (seen.add(u), true)));
        if (!cancelled) {
          setImagePool(unique);
          setTiles(pickRandom(unique, 6));
        }
      } catch {
        if (!cancelled) {
          setImagePool([]);
          setTiles([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (imagePool.length === 0) return;
    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setTiles(pickRandom(imagePool, 6));
        setVisible(true);
      }, 350);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [imagePool]);

  useEffect(() => {
    const scrollToCatalog = () => {
      if (window.location.hash.replace(/^#/, "") === "catalogo") {
        document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    scrollToCatalog();
    window.addEventListener("hashchange", scrollToCatalog);
    return () => window.removeEventListener("hashchange", scrollToCatalog);
  }, []);

  const gridTiles = useMemo(() => {
    const filled = [...tiles];
    while (filled.length < 6) filled.push("");
    return filled.slice(0, 6);
  }, [tiles]);

  return (
    <section id="catalogo" className="w-full bg-white py-16 md:py-28 scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeInUpInView>
            <div
              className={`grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3 transition-opacity duration-300 ease-out ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={gridTiles.every((t) => !t)}
            >
              {gridTiles.map((src, i) => (
                <div
                  key={`${i}-${src || "empty"}`}
                  className="aspect-square rounded-2xl overflow-hidden bg-[#f0f0ee] border border-[#e5e5e3]"
                >
                  {src ? (
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </FadeInUpInView>

          <FadeInUpInView delay={0.08}>
            <div className="max-w-xl">
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5a5a59] mb-3">
                  {eyebrow}
                </p>
              ) : null}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[#131313]">
                {title}
              </h2>
              <p className="mt-5 md:mt-6 text-base md:text-lg text-black/60 leading-relaxed">
                {description}
              </p>
              <div className="mt-8">
                <a
                  href={pdfUrl || FALLBACKS.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button variant="primary" size="lg" className="gap-3 bg-[#313b2e] text-white hover:bg-[#3d4937]">
                    {buttonText}
                    <Icon name="arrow-right" />
                  </Button>
                </a>
              </div>
            </div>
          </FadeInUpInView>
        </div>
      </div>
    </section>
  );
}
