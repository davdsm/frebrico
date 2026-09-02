import DOMPurify from "dompurify";

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
];

const ALLOWED_ATTR = ["style", "href", "target", "rel", "class"];

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

export function normalizeRichHtmlForSave(html: string): string {
  const trimmed = (html || "").trim();
  if (!trimmed || trimmed === "<p></p>" || trimmed === "<p><br></p>") return "";
  return sanitizeRichHtml(trimmed);
}

/** Legacy plain text + bullet lines, or sanitized rich HTML from the admin editor. */
export function formatDescriptionHtml(raw: string): string {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";

  if (isRichHtmlContent(trimmed)) {
    return sanitizeRichHtml(trimmed);
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
