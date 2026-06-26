import React, { useState, useEffect, useCallback } from "react";
import { uploadImage, listUploads, getApiBase, type UploadRecord } from "../../content/api";
import { normalizeUploadPathForMatch, mergePickerImages } from "./ImageUploadField";

interface GalleryImagesEditorProps {
  value: string[];
  onChange: (paths: string[]) => void;
  page?: string;
  section?: string;
  label?: string;
  hint?: string;
}

export function GalleryImagesEditor({
  value,
  onChange,
  page = "products",
  section = "general",
  label = "Galeria de imagens",
  hint = "Imagens adicionais mostradas na página do produto (miniaturas e galeria). A imagem principal fica acima.",
}: GalleryImagesEditorProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingList, setExistingList] = useState<UploadRecord[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const apiBase = getApiBase();

  const normalizedGallery = value.map(normalizeUploadPathForMatch).filter(Boolean);

  const pickerImages = React.useMemo(
    () => mergePickerImages(existingList, value),
    [existingList, value]
  );

  const loadExisting = useCallback(async () => {
    setLoadingList(true);
    try {
      const list = await listUploads(page, section);
      setExistingList(list);
    } catch {
      setExistingList([]);
    } finally {
      setLoadingList(false);
    }
  }, [page, section]);

  useEffect(() => {
    loadExisting();
  }, [loadExisting]);

  const isInGallery = (path: string) =>
    normalizedGallery.includes(normalizeUploadPathForMatch(path));

  const addImage = (path: string) => {
    const normalized = normalizeUploadPathForMatch(path);
    if (!normalized || isInGallery(path)) return;
    onChange([...value, path]);
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const doUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Apenas imagens (PNG, JPG, GIF, WebP, SVG).");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const result = await uploadImage(file, page, section);
      if (!isInGallery(result.path)) {
        onChange([...value, result.path]);
      }
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
      {hint && <p className="text-[12px] text-[#5a5a59] mb-3">{hint}</p>}

      {value.length > 0 ? (
        <div className="mb-4">
          <p className="text-[12px] font-medium text-[#131313] mb-2">
            Imagens na galeria ({value.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {value.map((path, index) => (
              <div
                key={`${normalizeUploadPathForMatch(path)}-${index}`}
                className="rounded-xl overflow-hidden border border-[#e5e5e3] bg-[#fafaf9]"
              >
                <img
                  src={`${apiBase}${path}`}
                  alt=""
                  className="w-full h-28 object-cover"
                />
                <div className="p-2 flex items-center justify-between gap-2 bg-white border-t border-[#e5e5e3]">
                  <span className="text-[11px] text-[#5a5a59] truncate flex-1" title={path}>
                    {path.split("/").pop()}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-[11px] font-medium text-red-600 hover:text-red-700 shrink-0"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[12px] text-[#5a5a59] mb-4">
          Nenhuma imagem na galeria. Adicione abaixo.
        </p>
      )}

      <div className="mb-4">
        <p className="text-[12px] font-medium text-[#131313] mb-2">Adicionar das já carregadas</p>
        {loadingList && pickerImages.length === 0 ? (
          <p className="text-[12px] text-[#5a5a59]">A carregar lista...</p>
        ) : pickerImages.length === 0 ? (
          <p className="text-[12px] text-[#5a5a59]">Ainda não há imagens nesta secção. Carregue uma abaixo.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pickerImages.map((item) => {
              const selected = isInGallery(item.path);
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => (selected ? undefined : addImage(item.path))}
                  disabled={selected}
                  className={`rounded-lg border-2 overflow-hidden w-16 h-16 flex-shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-[#313b2e] focus:ring-offset-1 ${
                    selected
                      ? "border-[#313b2e] ring-2 ring-[#313b2e]/20 opacity-50 cursor-not-allowed"
                      : "border-[#e5e5e3] hover:border-[#313b2e]/50"
                  }`}
                  title={selected ? `${item.original_name} (já na galeria)` : item.original_name}
                >
                  <img
                    src={`${apiBase}${item.path}`}
                    alt={item.original_name}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <label
        className={`block cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all ${
          dragActive ? "border-[#313b2e] bg-[#313b2e]/[0.04]" : "border-[#e5e5e3] hover:border-[#313b2e]/30 hover:bg-[#fafaf9]"
        } ${uploading ? "pointer-events-none opacity-70" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
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
            {uploading ? "A carregar..." : "Carregar nova imagem para a galeria"}
          </p>
          <p className="text-[11px] text-[#5a5a59]">PNG, JPG, GIF, WebP ou SVG. Arraste ou clique.</p>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
      {error && <p className="mt-2 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
