import React from "react";

const LENS_SIZE = 160;
const ZOOM = 2.4;

interface ProductImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  /** Shown over the image (e.g. availability badge). */
  overlay?: React.ReactNode;
}

/**
 * Product main image with hover loupe (desktop) and click/tap lightbox zoom.
 */
export function ProductImageZoom({ src, alt, className, overlay }: ProductImageZoomProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [lens, setLens] = React.useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxScale, setLightboxScale] = React.useState(1);

  const updateLens = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    setLens({ x, y, visible: true });
  };

  const hideLens = () => setLens((prev) => ({ ...prev, visible: false }));

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen]);

  React.useEffect(() => {
    if (!lightboxOpen) setLightboxScale(1);
  }, [lightboxOpen, src]);

  const openLightbox = () => {
    hideLens();
    setLightboxOpen(true);
  };

  const lensLeft = lens.x - LENS_SIZE / 2;
  const lensTop = lens.y - LENS_SIZE / 2;
  const bgPosX = containerRef.current
    ? (lens.x / containerRef.current.clientWidth) * 100
    : 50;
  const bgPosY = containerRef.current
    ? (lens.y / containerRef.current.clientHeight) * 100
    : 50;

  return (
    <>
      <div
        ref={containerRef}
        className={`relative overflow-hidden cursor-zoom-in group ${className ?? ""}`}
        onMouseEnter={(e) => updateLens(e.clientX, e.clientY)}
        onMouseMove={(e) => updateLens(e.clientX, e.clientY)}
        onMouseLeave={hideLens}
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        aria-label={`Ampliar imagem: ${alt}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox();
          }
        }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-xl pointer-events-none select-none" draggable={false} />

        {/* Desktop loupe — hidden on coarse pointers / touch */}
        {lens.visible && (
          <div
            className="pointer-events-none absolute z-20 hidden md:block rounded-full border-2 border-white shadow-[0_8px_28px_rgba(0,0,0,0.28)] ring-1 ring-black/10"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lensLeft,
              top: lensTop,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${ZOOM * 100}%`,
              backgroundPosition: `${bgPosX}% ${bgPosY}%`,
            }}
            aria-hidden
          />
        )}

        <div className="absolute bottom-5 right-5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#313b2e] text-[12px] font-semibold px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
          Lupa
        </div>

        {overlay}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Zoom da imagem do produto"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-white shrink-0">
            <p className="text-sm font-medium truncate min-w-0">{alt}</p>
            <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-lg font-semibold"
                aria-label="Diminuir zoom"
                onClick={() => setLightboxScale((s) => Math.max(1, Number((s - 0.5).toFixed(1))))}
              >
                −
              </button>
              <span className="text-sm tabular-nums w-12 text-center">{Math.round(lightboxScale * 100)}%</span>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-lg font-semibold"
                aria-label="Aumentar zoom"
                onClick={() => setLightboxScale((s) => Math.min(4, Number((s + 0.5).toFixed(1))))}
              >
                +
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors ml-1"
                aria-label="Fechar"
                onClick={() => setLightboxOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className="flex-1 min-h-0 overflow-auto flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="w-auto max-w-[min(100%,960px)] max-h-[calc(100vh-8rem)] object-contain origin-center transition-transform duration-200 select-none"
              style={{ transform: `scale(${lightboxScale})` }}
              draggable={false}
            />
          </div>
          <p className="text-center text-white/60 text-[12px] pb-4 shrink-0">
            Clique fora ou Escape para fechar
          </p>
        </div>
      )}
    </>
  );
}
