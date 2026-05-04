/**
 * Soft pastel SVG swatches for color attribute values (PDP).
 * Used when no image_url is set on the attribute value.
 */

export function isColorAttributeName(attributeName: string): boolean {
  const raw = attributeName.trim();
  if (!raw) return false;
  const t = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  if (t === "cor" || t === "cores") return true;
  if (t === "color" || t === "colour" || t === "couleur" || t === "farbe") return true;
  // "Cor:", "Cor (RAL)", "color acabamento" — evita falsos positivos tipo "corrente"
  if (/^cor\b/i.test(raw)) return true;
  if (/^cores\b/i.test(raw)) return true;
  if (/^color\b/i.test(raw) || /^colour\b/i.test(raw)) return true;
  // Ex.: "Acabamento — Cor", "RAL / Cor"
  if (/\bcor\b|\bcores\b|\bcolors?\b|\bcolou?rs?\b/i.test(t)) return true;
  return false;
}

type GradientPair = { from: string; to: string };

const KEYWORD_GRADIENTS: { test: (normalizedLabel: string) => boolean; gradient: GradientPair }[] = [
  { test: (s) => s.includes("verde") || s.includes("green"), gradient: { from: "#d8eedf", to: "#b6dfc8" } },
  { test: (s) => s.includes("azul") || s.includes("blue"), gradient: { from: "#d6e9ff", to: "#b8d9ff" } },
  { test: (s) => s.includes("branco") || s.includes("white") || s === "branca", gradient: { from: "#f5f5f4", to: "#e8e8e6" } },
  { test: (s) => s.includes("preto") || s.includes("black"), gradient: { from: "#d4d4d4", to: "#b8b8b8" } },
  { test: (s) => s.includes("cinza") || s.includes("cinzento") || s.includes("gray") || s.includes("grey"), gradient: { from: "#e2e5e8", to: "#ccd1d6" } },
  { test: (s) => s.includes("amarelo") || s.includes("yellow"), gradient: { from: "#fdf6d6", to: "#f5e6a8" } },
  { test: (s) => s.includes("vermelho") || s.includes("red"), gradient: { from: "#fde2e2", to: "#f5bcbc" } },
  { test: (s) => s.includes("laranja") || s.includes("orange"), gradient: { from: "#ffe8d6", to: "#ffd0a8" } },
  { test: (s) => s.includes("rosa") || s.includes("pink"), gradient: { from: "#fce8f0", to: "#f5c8dc" } },
  { test: (s) => s.includes("roxo") || s.includes("violeta") || s.includes("purple"), gradient: { from: "#ebe4fb", to: "#d8ccf5" } },
  { test: (s) => s.includes("castanho") || s.includes("marrom") || s.includes("brown"), gradient: { from: "#ede4dc", to: "#dcc9b8" } },
  { test: (s) => s.includes("bege") || s.includes("beige") || s.includes("creme"), gradient: { from: "#f3ece4", to: "#e8dccf" } },
  { test: (s) => s.includes("natural") || s.includes("cru") || s.includes("madeira"), gradient: { from: "#efe8df", to: "#e0d4c4" } },
  { test: (s) => s.includes("galvaniz") || s.includes("zinc") || s.includes("pratead"), gradient: { from: "#e8eef2", to: "#d0dde8" } },
  { test: (s) => s.includes("dourad") || s.includes("gold"), gradient: { from: "#f5ecd8", to: "#e8d9b0" } },
  { test: (s) => s.includes("cobre") || s.includes("copper"), gradient: { from: "#f3e4df", to: "#e5ccc2" } },
];

function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim();
}

function hashHue(label: string): number {
  let h = 0;
  for (let i = 0; i < label.length; i += 1) {
    h = (h * 31 + label.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

function fallbackGradient(label: string): GradientPair {
  const hue = hashHue(label);
  const from = `hsl(${hue} 32% 92%)`;
  const to = `hsl(${hue} 38% 84%)`;
  return { from, to };
}

function buildSvgDataUrl(from: string, to: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g)"/>
  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Pastel gradient image URL for a color label (data URI). Always safe for img src.
 */
export function pastelSwatchDataUrlForColorLabel(label: string): string {
  const n = normalizeLabel(label);
  for (const { test, gradient } of KEYWORD_GRADIENTS) {
    if (test(n)) {
      return buildSvgDataUrl(gradient.from, gradient.to);
    }
  }
  const fb = fallbackGradient(label);
  return buildSvgDataUrl(fb.from, fb.to);
}
