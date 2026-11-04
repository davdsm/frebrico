import React from "react";

interface ProductImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  /** Shown over the image (e.g. availability badge). */
  overlay?: React.ReactNode;
}

/**
 * Product main image with a bottom-right loupe button that opens a zoomable,
 * pannable lightbox.
 */
export function ProductImageZoom({ src, alt, className, overlay }: ProductImageZoomProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const dragRef = React.useRef<{
    active: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [dragging, setDragging] = React.useState(false);

  const openLightbox = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const resetView = React.useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
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
    if (!lightboxOpen) resetView();
  }, [lightboxOpen, src, resetView]);

  React.useEffect(() => {
    if (scale <= 1) setOffset({ x: 0, y: 0 });
  }, [scale]);

  const zoomOut = () => setScale((s) => Math.max(1, Number((s - 0.5).toFixed(1))));
  const zoomIn = () => setScale((s) => Math.min(4, Number((s + 0.5).toFixed(1))));

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: offset.x,
      origY: offset.y,
    };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag?.active) return;
    setOffset({
      x: drag.origX + (e.clientX - drag.startX),
      y: drag.origY + (e.clientY - drag.startY),
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current?.active) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    dragRef.current = null;
    setDragging(false);
  };

  return (
    <>
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-xl pointer-events-none select-none"
          draggable={false}
        />

        <button
          type="button"
          onClick={openLightbox}
          className="absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 bg-white/95 hover:bg-white text-[#313b2e] text-[12px] font-semibold px-3 py-2 rounded-full border border-black/5 shadow-sm transition-colors"
          aria-label={`Ampliar imagem: ${alt}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
            />
          </svg>
          Lupa
        </button>

        {overlay}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Zoom da imagem do produto"
          onClick={closeLightbox}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-white shrink-0">
            <p className="text-sm font-medium truncate min-w-0">{alt}</p>
            <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-lg font-semibold disabled:opacity-40"
                aria-label="Diminuir zoom"
                disabled={scale <= 1}
                onClick={zoomOut}
              >
                −
              </button>
              <span className="text-sm tabular-nums w-12 text-center">{Math.round(scale * 100)}%</span>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-lg font-semibold disabled:opacity-40"
                aria-label="Aumentar zoom"
                disabled={scale >= 4}
                onClick={zoomIn}
              >
                +
              </button>
              {scale > 1 && (
                <button
                  type="button"
                  className="h-10 px-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-[12px] font-semibold"
                  onClick={resetView}
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors ml-1"
                aria-label="Fechar"
                onClick={closeLightbox}
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className={`flex-1 min-h-0 overflow-hidden flex items-center justify-center p-4 ${
              scale > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
            }`}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <img
              src={src}
              alt={alt}
              className="w-auto max-w-[min(100%,960px)] max-h-[calc(100vh-8rem)] object-contain select-none touch-none"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transition: dragging ? "none" : "transform 0.15s ease-out",
              }}
              draggable={false}
            />
          </div>
          <p className="text-center text-white/60 text-[12px] pb-4 shrink-0">
            {scale > 1 ? "Arraste para mover · " : ""}
            Escape ou clique fora para fechar
          </p>
        </div>
      )}
    </>
  );
}
