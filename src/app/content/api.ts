/**
 * API client for the backoffice CMS.
 * Uses VITE_API_BASE from .env when set; otherwise same-origin /api (dev proxy or production).
 * Write operations (PUT, POST, DELETE) require auth token via authStore.
 */
import { getAuthHeaders } from "../auth/authStore";

const API_BASE = (() => {
  const raw = typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE != null
    ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
    : "";
  return raw.endsWith("/api") ? raw.slice(0, -4) : raw;
})();

export function getApiBase(): string {
  return API_BASE;
}

export type ContentMap = Record<string, Record<string, Record<string, string>>>;

export async function fetchAllContent(): Promise<ContentMap> {
  const res = await fetch(`${API_BASE}/api/content?all=1`);
  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json() as Promise<ContentMap>;
}

export async function fetchPageContent(page: string): Promise<Record<string, Record<string, string>>> {
  const res = await fetch(`${API_BASE}/api/content?page=${encodeURIComponent(page)}`);
  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json() as Promise<Record<string, Record<string, string>>>;
}

export async function putContent(
  page: string,
  section: string,
  field: string,
  value: string,
  fieldType: string = "text"
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/content/${encodeURIComponent(page)}/${encodeURIComponent(section)}/${encodeURIComponent(field)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ value, field_type: fieldType }),
  });
  if (!res.ok) throw new Error("Failed to update content");
}

export type UploadResult = { id: number; path: string; url: string };

export async function uploadImage(file: File, page: string, section: string): Promise<UploadResult> {
  return uploadFile(file, page, section);
}

export async function uploadFile(file: File, page: string, section: string): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("page", page);
  form.append("section", section);
  const res = await fetch(`${API_BASE}/api/upload`, { method: "POST", headers: getAuthHeaders(), body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Upload failed");
  }
  return res.json() as Promise<UploadResult>;
}

export type UploadRecord = {
  id: number;
  filename: string;
  original_name: string;
  path: string;
  page_slug: string;
  section_key: string;
  created_at: string;
};

export async function listUploads(page?: string, section?: string): Promise<UploadRecord[]> {
  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (section) params.set("section", section);
  const res = await fetch(`${API_BASE}/api/uploads?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to list uploads");
  return res.json() as Promise<UploadRecord[]>;
}

export async function deleteUpload(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/uploads/${id}`, { method: "DELETE", headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to delete upload");
}
