export type CmsImageItem = {
  path: string;
  url: string;
};

type ParseOptions = {
  /** Keep blank slots so the admin editor can show empty rows. */
  keepEmpty?: boolean;
  /** Accept a legacy plain path (the about hero used to store one string). */
  legacyPlainPath?: boolean;
};

function toItem(value: unknown, keepEmpty: boolean): CmsImageItem {
  const record =
    value !== null && typeof value === "object"
      ? (value as { path?: unknown; url?: unknown })
      : {};
  const path = typeof record.path === "string" ? record.path : "";
  const urlRaw = typeof record.url === "string" ? record.url : "";
  return { path, url: keepEmpty ? urlRaw : urlRaw.trim() };
}

/**
 * CMS image list stored as JSON `[{ path, url? }]`.
 * Public callers drop empty paths. The editor keeps them.
 */
export function parseCmsImageItems(
  raw: string | null | undefined,
  options?: ParseOptions
): CmsImageItem[] {
  const keepEmpty = options?.keepEmpty === true;
  const legacyPlainPath = options?.legacyPlainPath === true;
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return keepEmpty ? [{ path: "", url: "" }] : [];

  if (!trimmed.startsWith("[")) {
    if (keepEmpty || legacyPlainPath) return [{ path: trimmed, url: "" }];
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (!Array.isArray(parsed)) return [];
    const items = parsed.map((value) => toItem(value, keepEmpty));
    return keepEmpty ? items : items.filter((item) => item.path !== "");
  } catch {
    if (!keepEmpty && legacyPlainPath && trimmed.startsWith("/")) {
      return [{ path: trimmed, url: "" }];
    }
    return [];
  }
}

/** Absolute http(s) URL, or null. Rejects javascript:, data:, and protocol-relative values. */
export function safeExternalHref(raw: string | null | undefined): string | null {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return null;
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  return url.href;
}

/** True when the value already has a scheme that is not http(s). Incomplete https:// stays false. */
export function hasUnsafeUrlScheme(raw: string | null | undefined): boolean {
  const trimmed = (raw ?? "").trim();
  const match = /^([a-z][a-z0-9+.-]*):/i.exec(trimmed);
  if (!match) return false;
  const scheme = match[1].toLowerCase();
  return scheme !== "http" && scheme !== "https";
}

export function externalLinkAlt(href: string): string {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    return host ? `Abrir ${host} numa nova aba` : "Abrir ligação numa nova aba";
  } catch {
    return "Abrir ligação numa nova aba";
  }
}
