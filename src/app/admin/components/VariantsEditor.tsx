import React, { useState, useEffect } from "react";
import { listUploads, type UploadRecord } from "../../content/api";

const inputClass =
  "w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";

export type VariantItem = { name: string; image_url?: string };

interface VariantsEditorProps {
  value: VariantItem[];
  onChange: (value: VariantItem[]) => void;
  imagePage?: string;
  imageSection?: string;
  label?: string;
}

export function VariantsEditor({
  value,
  onChange,
  imagePage = "products",
  imageSection = "general",
  label = "Variantes",
}: VariantsEditorProps) {
  const [uploads, setUploads] = useState<UploadRecord[]>([]);

  useEffect(() => {
    listUploads(imagePage, imageSection).then(setUploads).catch(() => setUploads([]));
  }, [imagePage, imageSection]);

  const update = (index: number, patch: Partial<VariantItem>) => {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const add = () => onChange([...value, { name: "", image_url: "" }]);
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-[13px] font-medium text-[#131313]">{label}</label>
        <button type="button" onClick={add} className="text-[12px] font-medium text-[#313b2e] hover:underline">
          + Adicionar variante
        </button>
      </div>
      <p className="text-[12px] text-[#5a5a59] mb-3">Cada variante pode ter um nome e uma imagem (ex.: Galva / Untreated).</p>
      <div className="space-y-4">
        {value.map((item, index) => (
          <div key={index} className="flex flex-wrap items-start gap-3 p-3 rounded-xl border border-[#e5e5e3] bg-[#fafaf9]">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Nome</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => update(index, { name: e.target.value })}
                placeholder="Ex: Galva / Untreated"
                className={inputClass}
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Imagem</label>
              <select
                value={item.image_url && uploads.some((u) => u.path === item.image_url) ? item.image_url : ""}
                onChange={(e) => update(index, { image_url: e.target.value || undefined })}
                className={inputClass}
              >
                <option value="">— Nenhuma —</option>
                {uploads.map((u) => (
                  <option key={u.id} value={u.path}>{u.original_name}</option>
                ))}
              </select>
              {item.image_url && !uploads.some((u) => u.path === item.image_url) && (
                <input
                  type="text"
                  value={item.image_url}
                  onChange={(e) => update(index, { image_url: e.target.value })}
                  placeholder="URL da imagem"
                  className={inputClass + " mt-1"}
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg text-[12px]"
              aria-label="Remover"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      {value.length === 0 && (
        <p className="text-[12px] text-[#5a5a59] py-2">Nenhuma variante. Clique em &quot;Adicionar variante&quot; para criar uma.</p>
      )}
    </div>
  );
}
