import { useContentState } from "./ContentContext";

/**
 * Returns the content value for the given page/section/field.
 * Frontoffice: only shows what is in the backoffice (no built-in defaults).
 */
export function useContent(
  page: string,
  section: string,
  field: string,
  fallback?: string
): string {
  const { content } = useContentState();
  const fromCms = content[page]?.[section]?.[field];
  if (fromCms !== undefined && fromCms !== "") return fromCms;
  return fallback ?? "";
}

/**
 * Returns the content value parsed as JSON (for arrays/objects).
 * When empty or invalid, returns fallback (e.g. [] for lists).
 */
export function useContentJson<T = unknown>(
  page: string,
  section: string,
  field: string,
  fallback?: T
): T {
  const raw = useContent(page, section, field);
  if (!raw) return (fallback ?? []) as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return (fallback ?? []) as T;
  }
}
