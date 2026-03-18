import React, { useState, useCallback } from "react";

const inputClass =
  "w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";

type SchemaHint = "link" | "faq" | "category" | "categoryFull" | "product" | "service" | "stringArray" | "keyValue" | "auto";

function getSchemaHint(sectionKey: string, fieldKey: string): SchemaHint {
  const s = sectionKey.toLowerCase();
  const f = fieldKey.toLowerCase();
  if (s === "faq" && f === "items") return "faq";
  if ((s === "carousel" || s === "grid" || s === "related") && f === "products") return "product";
  if (s === "hero" && f === "categories") return "category";
  if (s === "mobile" && f === "categories") return "categoryFull";
  if (s === "services" && f === "items") return "service";
  if (s === "checkout" && f === "countries") return "stringArray";
  if (s === "branding" && f === "benefits") return "stringArray";
  if (s === "checkout" && f === "placeholders") return "keyValue";
  if (s === "titles" && f === "map") return "keyValue";
  return "auto";
}

function safeParse(value: string): unknown {
  const t = value?.trim();
  if (!t) return undefined;
  try {
    return JSON.parse(t);
  } catch {
    return undefined;
  }
}

export interface StructuredJsonFieldProps {
  value: string;
  onChange: (value: string) => void;
  defaultValue: string;
  fieldKey: string;
  sectionKey: string;
  label?: string;
}

export function StructuredJsonField({
  value,
  onChange,
  defaultValue,
  fieldKey,
  sectionKey,
  label,
}: StructuredJsonFieldProps) {
  const [showRaw, setShowRaw] = useState(false);

  const parsed = safeParse(value) ?? safeParse(defaultValue);
  const hint = getSchemaHint(sectionKey, fieldKey);

  const emit = useCallback(
    (next: unknown) => {
      try {
        onChange(JSON.stringify(next, null, 2));
      } catch {
        // ignore
      }
    },
    [onChange]
  );

  // —— String array ——
  if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "string") {
    const list = parsed as string[];
    const update = (index: number, v: string) => {
      const next = [...list];
      next[index] = v;
      emit(next);
    };
    const add = () => emit([...list, ""]);
    const remove = (index: number) => emit(list.filter((_, i) => i !== index));

    if (showRaw) {
      return (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
            <button type="button" onClick={() => setShowRaw(false)} className="text-[12px] text-[#313b2e] hover:underline">
              Editar como lista
            </button>
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-[#e5e5e3] rounded-xl text-[13px] min-h-[120px] font-mono bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none resize-y"
            rows={5}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
          <div className="flex items-center gap-2">
            <button type="button" onClick={add} className="text-[12px] font-medium text-[#313b2e] hover:underline">
              + Adicionar
            </button>
            <button type="button" onClick={() => setShowRaw(true)} className="text-[12px] text-[#5a5a59] hover:underline">
              Editar JSON
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {list.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={item}
                onChange={(e) => update(index, e.target.value)}
                className={inputClass + " flex-1"}
                placeholder="Valor"
              />
              <button type="button" onClick={() => remove(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-[12px]" aria-label="Remover">
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // —— Key-value object ——
  if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed) && (hint === "keyValue" || (hint === "auto" && (Object.keys(parsed as object).length > 0 || value.trim().startsWith("{"))))) {
    const obj = (parsed as Record<string, string>) || {};
    const entries = Object.entries(obj);

    const updateKey = (oldKey: string, newKey: string, val: string) => {
      const next = { ...obj };
      delete next[oldKey];
      if (newKey.trim()) next[newKey.trim()] = val;
      emit(next);
    };
    const updateVal = (key: string, val: string) => {
      emit({ ...obj, [key]: val });
    };
    const add = () => {
      const k = "nova_chave";
      let key = k;
      let i = 0;
      while (obj[key] !== undefined) key = `${k}_${++i}`;
      emit({ ...obj, [key]: "" });
    };
    const remove = (key: string) => {
      const next = { ...obj };
      delete next[key];
      emit(next);
    };

    if (showRaw) {
      return (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
            <button type="button" onClick={() => setShowRaw(false)} className="text-[12px] text-[#313b2e] hover:underline">
              Editar como formulário
            </button>
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-[#e5e5e3] rounded-xl text-[13px] min-h-[120px] font-mono bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none resize-y"
            rows={5}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
          <div className="flex items-center gap-2">
            <button type="button" onClick={add} className="text-[12px] font-medium text-[#313b2e] hover:underline">
              + Adicionar campo
            </button>
            <button type="button" onClick={() => setShowRaw(true)} className="text-[12px] text-[#5a5a59] hover:underline">
              Editar JSON
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {entries.map(([k, v]) => (
            <div key={k} className="flex flex-wrap gap-2 items-center p-3 rounded-xl border border-[#e5e5e3] bg-[#fafaf9]">
              <input
                type="text"
                value={k}
                onChange={(e) => updateKey(k, e.target.value, v)}
                placeholder="Chave"
                className={inputClass + " flex-1 min-w-[120px]"}
              />
              <input
                type="text"
                value={v}
                onChange={(e) => updateVal(k, e.target.value)}
                placeholder="Valor"
                className={inputClass + " flex-1 min-w-[160px]"}
              />
              <button type="button" onClick={() => remove(k)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-[12px]" aria-label="Remover">
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // —— Array of objects ——
  if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object" && parsed[0] !== null) {
    const list = parsed as Record<string, unknown>[];
    const keys = Object.keys(list[0]).filter((k) => typeof list[0][k] === "string" || typeof list[0][k] === "number");

    const getLabel = (key: string): string => {
      const labels: Record<string, string> = {
        label: "Texto",
        url: "URL",
        question: "Pergunta",
        answer: "Resposta",
        name: "Nome",
        slug: "Slug",
        title: "Título",
        description: "Descrição",
        number: "Número",
        price: "Preço (€)",
        badge: "Badge",
        id: "ID",
        featured: "Destaque",
      };
      return labels[key] ?? key;
    };

    const update = (index: number, key: string, val: string | number) => {
      const normalized = key === "id" ? Number(val) || 0 : key === "featured" ? (Number(val) ? 1 : 0) : val;
      const next = list.map((item, i) => (i === index ? { ...item, [key]: normalized } : item)) as Record<string, unknown>[];
      emit(next);
    };
    const add = () => {
      const newItem: Record<string, unknown> = {};
      for (const k of keys) newItem[k] = k === "number" ? "01" : k === "featured" || k === "id" ? 0 : "";
      emit([...list, newItem]);
    };
    const remove = (index: number) => emit(list.filter((_, i) => i !== index));
    const move = (index: number, dir: "up" | "down") => {
      const j = dir === "up" ? index - 1 : index + 1;
      if (j < 0 || j >= list.length) return;
      const next = [...list];
      [next[index], next[j]] = [next[j], next[index]];
      emit(next);
    };

    if (showRaw) {
      return (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
            <button type="button" onClick={() => setShowRaw(false)} className="text-[12px] text-[#313b2e] hover:underline">
              Editar como formulário
            </button>
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-[#e5e5e3] rounded-xl text-[13px] min-h-[120px] font-mono bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none resize-y"
            rows={6}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
          <div className="flex items-center gap-2">
            <button type="button" onClick={add} className="text-[12px] font-medium text-[#313b2e] hover:underline">
              + Adicionar item
            </button>
            <button type="button" onClick={() => setShowRaw(true)} className="text-[12px] text-[#5a5a59] hover:underline">
              Editar JSON
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {list.map((item, index) => (
            <div key={index} className="p-4 rounded-xl border border-[#e5e5e3] bg-[#fafaf9] space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-[#5a5a59]">Item {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => move(index, "up")} disabled={index === 0} className="p-1.5 rounded border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-40" aria-label="Mover para cima">
                    ↑
                  </button>
                  <button type="button" onClick={() => move(index, "down")} disabled={index === list.length - 1} className="p-1.5 rounded border border-[#e5e5e3] text-[#5a5a59] hover:bg-white disabled:opacity-40" aria-label="Mover para baixo">
                    ↓
                  </button>
                  <button type="button" onClick={() => remove(index)} className="p-1.5 text-red-600 hover:bg-red-50 rounded text-[12px]" aria-label="Remover">
                    Remover
                  </button>
                </div>
              </div>
              <div className={keys.length > 2 ? "space-y-3" : "flex flex-wrap gap-3"}>
                {keys.map((key) => (
                  <div key={key} className={key === "answer" || key === "description" ? "col-span-full" : ""}>
                    <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">{getLabel(key)}</label>
                    {key === "answer" || key === "description" ? (
                      <textarea
                        value={String(item[key] ?? "")}
                        onChange={(e) => update(index, key, e.target.value)}
                        rows={2}
                        className={inputClass + " resize-y"}
                      />
                    ) : (
                      <input
                        type={key === "price" || key === "id" || key === "featured" ? "number" : "text"}
                        value={String(item[key] ?? "")}
                        onChange={(e) => update(index, key, key === "price" || key === "id" || key === "featured" ? e.target.value : e.target.value)}
                        className={inputClass}
                        step={key === "price" ? "0.01" : undefined}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // —— Empty array: allow choosing type or add first item ——
  if (Array.isArray(parsed) && parsed.length === 0) {
    if (showRaw) {
      return (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
            <button type="button" onClick={() => setShowRaw(false)} className="text-[12px] text-[#313b2e] hover:underline">
              Editar como formulário
            </button>
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-[#e5e5e3] rounded-xl text-[13px] min-h-[100px] font-mono bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none resize-y"
            rows={4}
          />
        </div>
      );
    }

    const addFirst = () => {
      if (hint === "stringArray") emit([""]);
      else if (hint === "faq") emit([{ question: "", answer: "" }]);
      else if (hint === "link") emit([{ label: "", url: "" }]);
      else if (hint === "category") emit([{ name: "", slug: "" }]);
      else if (hint === "categoryFull") emit([{ title: "", slug: "", description: "" }]);
      else if (hint === "product") emit([{ name: "", price: "", badge: "" }]);
      else if (hint === "service") emit([{ number: "01", title: "", description: "" }]);
      else emit([{}]);
    };

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
          <div className="flex items-center gap-2">
            <button type="button" onClick={addFirst} className="text-[12px] font-medium text-[#313b2e] hover:underline">
              + Adicionar primeiro item
            </button>
            <button type="button" onClick={() => setShowRaw(true)} className="text-[12px] text-[#5a5a59] hover:underline">
              Editar JSON
            </button>
          </div>
        </div>
        <p className="text-[12px] text-[#5a5a59] py-2">Lista vazia. Adicione um item ou edite em JSON.</p>
      </div>
    );
  }

  // —— Fallback: raw textarea with option to try form ——
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        {label && <label className="block text-[13px] font-medium text-[#131313]">{label}</label>}
        <button type="button" onClick={() => setShowRaw(!showRaw)} className="text-[12px] text-[#5a5a59] hover:underline">
          {showRaw ? "Ver formulário (se suportado)" : "Editar como JSON"}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={defaultValue}
        className="w-full px-4 py-3 border border-[#e5e5e3] rounded-xl text-[13px] min-h-[100px] font-mono bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none resize-y"
        rows={4}
      />
    </div>
  );
}
