import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { FadeInUpInView } from "../atoms/FadeInUpInView";
import { useContent } from "../../content/useContent";
import { fetchProducts, resolveImageUrl } from "../../api/shop";

const FALLBACKS = {
  eyebrow: "Catálogo",
  title: "O nosso catálogo completo",
  description:
    "Consulte a gama Frebrico em PDF: vedações, redes, portões, arames e acessórios, com referências e informação técnica para ajudar a escolher a solução certa.",
  button: "Abrir Catálogo",
  pdf_url: "/uploads/catalogo/Frebrico-Catalogo.pdf",
};

const TILE_COUNT = 6;
const ROTATE_MS = 3000;
const FADE_MS = 300;
/** Warm a limited set so rotation stays snappy without downloading the whole catalog. */
const WARM_COUNT = 24;
const WARM_CONCURRENCY = 4;

function pickRandom<T>(items: T[], count: number, avoid: Set<string> = new Set()): T[] {
  if (items.length === 0) return [];
  const preferred = avoid.size ? items.filter((x) => !avoid.has(String(x))) : items;
  const source = preferred.length >= count ? preferred : items;
  if (source.length <= count) return [...source];
  const copy = [...source];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    if (!url) {
      resolve();
      return;
    }
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

async function preloadAll(urls: string[]): Promise<void> {
  await Promise.all(urls.map((url) => preloadImage(url)));
}

async function warmPool(urls: string[], concurrency: number): Promise<void> {
  let index = 0;
  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, async () => {
    while (index < urls.length) {
      const current = urls[index++];
      await preloadImage(current);
    }
  });
  await Promise.all(workers);
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
  const [ready, setReady] = useState(false);
  const nextTilesRef = useRef<string[]>([]);
  const tilesRef = useRef<string[]>([]);
  const rotatingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const products = await fetchProducts(undefined, undefined, { light: true });
        const urls = products.map((p) => resolveImageUrl(p.image)).filter(Boolean);
        const seen = new Set<string>();
        const unique = urls.filter((u) => (seen.has(u) ? false : (seen.add(u), true)));
        if (cancelled || unique.length === 0) return;

        const first = pickRandom(unique, TILE_COUNT);
        await preloadAll(first);
        if (cancelled) return;

        setImagePool(unique);
        tilesRef.current = first;
        setTiles(first);
        setReady(true);
        setVisible(true);

        const next = pickRandom(unique, TILE_COUNT, new Set(first));
        await preloadAll(next);
        if (!cancelled) nextTilesRef.current = next;

        // Background warm of a limited subset (includes first/next implicitly via cache).
        const warmList = pickRandom(unique, Math.min(WARM_COUNT, unique.length));
        void warmPool(warmList, WARM_CONCURRENCY);
      } catch {
        if (!cancelled) {
          setImagePool([]);
          setTiles([]);
          setReady(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || imagePool.length === 0) return;

    const interval = window.setInterval(() => {
      if (rotatingRef.current) return;
      rotatingRef.current = true;

      void (async () => {
        const upcoming =
          nextTilesRef.current.length === TILE_COUNT
            ? nextTilesRef.current
            : pickRandom(imagePool, TILE_COUNT, new Set(tilesRef.current));

        // Ensure next set is cached before revealing.
        await preloadAll(upcoming);

        setVisible(false);
        await new Promise((r) => window.setTimeout(r, FADE_MS));
        tilesRef.current = upcoming;
        setTiles(upcoming);
        setVisible(true);

        const following = pickRandom(imagePool, TILE_COUNT, new Set(upcoming));
        nextTilesRef.current = following;
        void preloadAll(following).finally(() => {
          rotatingRef.current = false;
        });
      })();
    }, ROTATE_MS);

    return () => window.clearInterval(interval);
  }, [ready, imagePool]);

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
    while (filled.length < TILE_COUNT) filled.push("");
    return filled.slice(0, TILE_COUNT);
  }, [tiles]);

  return (
    <section id="catalogo" className="w-full bg-white py-16 md:py-28 scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeInUpInView>
            <div
              className={`grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3 transition-opacity duration-300 ease-out ${
                visible && ready ? "opacity-100" : "opacity-0"
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
                      loading="eager"
                      decoding="async"
                      fetchPriority={i < 3 ? "high" : "auto"}
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
