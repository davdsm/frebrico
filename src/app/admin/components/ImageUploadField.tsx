import React, { useState, useEffect, useCallback } from "react";
import { uploadImage, listUploads, getApiBase, type UploadRecord } from "../../content/api";

/**
 * Public folder structure: files are stored under public/uploads/{page}/{section}/.
 * Use page = "categories" | "products" | "shared" etc., section = "general" or a slug.
 * Admins can choose from already-uploaded images in this section or upload a new one.
 */
/** Normalize stored paths so list selection matches DB values (slashes, encoding). */
export function normalizeUploadPathForMatch(p: string): string {
  const t = p.trim();
  if (!t) return "";
  try {
    const decoded = decodeURIComponent(t);
    return decoded.replace(/\/+/g, "/");
  } catch {
    return t.replace(/\/+/g, "/");
  }
}

export interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (path: string) => void;
  /** Folder "page" (e.g. "categories", "products") */
  page: string;
  /** Folder "section" (e.g. "general", or entity slug) */
  section?: string;
  hint?: string;
  /**
   * When true, "Escolher das já carregadas" lists every upload under `page` (all sections).
   * Use for category icons saved under different sections (icons, cat-5, etc.) so the current file stays selectable.
   */
  listUploadsForWholePage?: boolean;
  /** Extra image paths (e.g. product gallery) merged into the picker even if not in uploads table */
  extraPaths?: string[];
}

export type PickerImage = {
  key: string;
  path: string;
  original_name: string;
};

/** Merge API upload records with extra paths (gallery, legacy imports, etc.). */
export function mergePickerImages(
  records: UploadRecord[],
  extraPaths: string[] = []
): PickerImage[] {
  const seen = new Set<string>();
  const result: PickerImage[] = [];

  const addPath = (path: string, preferOriginalName?: string) => {
    const norm = normalizeUploadPathForMatch(path);
    if (!norm || seen.has(norm)) return;
    seen.add(norm);
    result.push({
      key: norm,
      path: path.trim() || norm,
      original_name: preferOriginalName ?? norm.split("/").pop() ?? norm,
    });
  };

  for (const p of extraPaths) addPath(p);
  for (const r of records) addPath(r.path, r.original_name);

  return result;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  page,
  section = "general",
  hint,
  listUploadsForWholePage = false,
  extraPaths = [],
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingList, setExistingList] = useState<UploadRecord[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const apiBase = getApiBase();
  const normalizedValue = normalizeUploadPathForMatch(value);
  const pickerImages = React.useMemo(
    () => mergePickerImages(existingList, extraPaths),
    [existingList, extraPaths]
  );

  const loadExisting = useCallback(async () => {
    setLoadingList(true);
    try {
      const list = listUploadsForWholePage
        ? await listUploads(page, undefined)
        : await listUploads(page, section);
      setExistingList(list);
    } catch {
      setExistingList([]);
    } finally {
      setLoadingList(false);
    }
  }, [page, section, listUploadsForWholePage]);

  useEffect(() => {
    loadExisting();
  }, [loadExisting]);

  const doUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Apenas imagens (PNG, JPG, GIF, WebP, SVG).");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const result = await uploadImage(file, page, section);
      onChange(result.path);
      await loadExisting();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha no upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await doUpload(file);
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) await doUpload(file);
  };

  return (
    <div>
      <label className="block text-[13px] font-medium text-[#131313] mb-1.5">{label}</label>
      {hint && <p className="text-[12px] text-[#5a5a59] mb-2">{hint}</p>}

      {/* Current selection */}
      {value && (
        <div className="mb-3 rounded-xl overflow-hidden border border-[#e5e5e3] bg-[#fafaf9] max-w-[200px]">
          <img src={`${apiBase}${value}`} alt="" className="w-full h-auto max-h-[140px] object-contain" />
          <div className="p-2 flex items-center justify-between gap-2 bg-white border-t border-[#e5e5e3]">
            <span className="text-[11px] text-[#5a5a59] truncate">{value.split("/").pop()}</span>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[11px] font-medium text-red-600 hover:text-red-700"
            >
              Remover
            </button>
          </div>
        </div>
      )}

      {/* Choose from existing images in this section */}
      <div className="mb-4">
        <p className="text-[12px] font-medium text-[#131313] mb-2">Escolher das já carregadas</p>
        {loadingList && pickerImages.length === 0 ? (
          <p className="text-[12px] text-[#5a5a59]">A carregar lista...</p>
        ) : pickerImages.length === 0 ? (
          <p className="text-[12px] text-[#5a5a59]">Ainda não há imagens nesta secção. Carregue uma abaixo.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pickerImages.map((item) => {
              const isSelected = normalizedValue !== "" && normalizedValue === normalizeUploadPathForMatch(item.path);
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onChange(item.path)}
                  className={`rounded-lg border-2 overflow-hidden w-16 h-16 flex-shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-[#313b2e] focus:ring-offset-1 ${
                    isSelected ? "border-[#313b2e] ring-2 ring-[#313b2e]/20" : "border-[#e5e5e3] hover:border-[#313b2e]/50"
                  }`}
                  title={item.original_name}
                >
                  <img src={`${apiBase}${item.path}`} alt={item.original_name} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload new */}
      <label
        className={`block cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all ${
          dragActive ? "border-[#313b2e] bg-[#313b2e]/[0.04]" : "border-[#e5e5e3] hover:border-[#313b2e]/30 hover:bg-[#fafaf9]"
        } ${uploading ? "pointer-events-none opacity-70" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-9 h-9 rounded-lg bg-[#313b2e]/8 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-[13px] font-semibold text-[#131313]">
            {uploading ? "A carregar..." : "Ou carregar nova imagem"}
          </p>
          <p className="text-[11px] text-[#5a5a59]">PNG, JPG, GIF, WebP ou SVG. Arraste ou clique.</p>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
      {error && <p className="mt-2 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
