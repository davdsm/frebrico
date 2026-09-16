import DOMPurify from "dompurify";
import { resolveImageUrl } from "../api/shop";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "span",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "a",
  "img",
];

const ALLOWED_ATTR = ["style", "href", "target", "rel", "class", "src", "alt", "width", "height", "title"];

export function sanitizeRichHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
}

export function isRichHtmlContent(raw: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test((raw || "").trim());
}

/** Rewrite relative /uploads paths in img src so they resolve against the API base. */
export function rewriteDescriptionImageUrls(html: string): string {
  if (!html || !html.includes("<img")) return html;
  return html.replace(/<img\b([^>]*)>/gi, (full, attrs: string) => {
    const srcMatch = attrs.match(/\bsrc\s*=\s*(["'])(.*?)\1/i);
    if (!srcMatch) return full;
    const resolved = resolveImageUrl(srcMatch[2]);
    if (!resolved || resolved === srcMatch[2]) return full;
    const newAttrs = attrs.replace(/\bsrc\s*=\s*(["']).*?\1/i, `src="${resolved}"`);
    return `<img${newAttrs}>`;
  });
}

export function normalizeRichHtmlForSave(html: string): string {
  const trimmed = (html || "").trim();
  if (!trimmed || trimmed === "<p></p>" || trimmed === "<p><br></p>") return "";
  // Persist relative /uploads paths even if the editor briefly had an absolute API URL.
  const withRelativeUploads = trimmed.replace(
    /\bsrc=(["'])(https?:\/\/[^"']+)\/uploads\//gi,
    (_m, q) => `src=${q}/uploads/`
  );
  return sanitizeRichHtml(withRelativeUploads);
}

/** Legacy plain text + bullet lines, or sanitized rich HTML from the admin editor. */
export function formatDescriptionHtml(raw: string): string {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";

  if (isRichHtmlContent(trimmed)) {
    return rewriteDescriptionImageUrls(sanitizeRichHtml(trimmed));
  }

  const text = trimmed.replace(/<br\s*\/?>/gi, "\n").replace(/\r\n/g, "\n");
  const lines = text.split("\n");
  const firstBulletIndex = lines.findIndex((line) => line.trim().startsWith("-"));
  const esc = (v: string) =>
    v
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  if (firstBulletIndex < 0) {
    return lines.map((line) => esc(line)).join("<br/>");
  }

  const before = lines.slice(0, firstBulletIndex).map((line) => esc(line)).join("<br/>").trim();
  const bullets = lines
    .slice(firstBulletIndex)
    .filter((line) => line.trim() !== "")
    .map((line) => esc(line.trim()))
    .join("<br/>");

  return before ? `${before}<br/><br/>${bullets}` : bullets;
}
