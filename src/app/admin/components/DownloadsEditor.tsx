import React, { useState } from "react";
import { uploadFile } from "../../content/api";

const inputClass =
  "w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";

export type DownloadItem = { label?: string; url?: string };

interface DownloadsEditorProps {
  value: DownloadItem[];
  onChange: (value: DownloadItem[]) => void;
  label?: string;
}

export function DownloadsEditor({ value, onChange, label = "Downloads" }: DownloadsEditorProps) {
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const update = (index: number, patch: Partial<DownloadItem>) => {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const add = () => onChange([...value, { label: "", url: "" }]);
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));

  const handleFileUpload = async (index: number, file: File) => {
    setUploadingIdx(index);
    try {
      const result = await uploadFile(file, "products", "downloads");
      update(index, {
        url: result.path,
        label: value[index]?.label || file.name.replace(/\.[^.]+$/, ""),
      });
    } catch {
      // silently fail, user can retry
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-[13px] font-medium text-[#131313]">{label}</label>
        <button type="button" onClick={add} className="text-[12px] font-medium text-[#313b2e] hover:underline">
          + Adicionar link
        </button>
      </div>
      <p className="text-[12px] text-[#5a5a59] mb-3">Lista de ficheiros para download. Pode carregar um PDF/imagem ou inserir um URL manualmente.</p>
      <div className="space-y-3">
        {value.map((item, index) => (
          <div key={index} className="flex flex-col gap-3 p-3 rounded-xl border border-[#e5e5e3] bg-[#fafaf9]">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[120px]">
                <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Etiqueta</label>
                <input
                  type="text"
                  value={item.label ?? ""}
                  onChange={(e) => update(index, { label: e.target.value })}
                  placeholder="Ex: Ficha técnica"
                  className={inputClass}
                />
              </div>
              <div className="flex-1 min-w-[180px]">
                <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">URL</label>
                <input
                  type="text"
                  value={item.url ?? ""}
                  onChange={(e) => update(index, { url: e.target.value })}
                  placeholder="https://... ou /uploads/..."
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-[12px]"
                aria-label="Remover"
              >
                Remover
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[#e5e5e3] text-[12px] font-medium text-[#313b2e] cursor-pointer hover:bg-[#313b2e]/[0.04] transition-colors ${
                  uploadingIdx === index ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                {uploadingIdx === index ? "A carregar..." : "Carregar ficheiro"}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(index, file);
                    e.target.value = "";
                  }}
                  disabled={uploadingIdx === index}
                />
              </label>
              {item.url && (
                <span className="text-[11px] text-[#5a5a59] truncate max-w-[200px]" title={item.url}>
                  {item.url.split("/").pop()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {value.length === 0 && (
        <p className="text-[12px] text-[#5a5a59] py-2">Nenhum link. Clique em &quot;Adicionar link&quot;.</p>
      )}
    </div>
  );
}
