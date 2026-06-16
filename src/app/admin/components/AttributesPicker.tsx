import React, { useState } from "react";
import type { Attribute, AttributeValue } from "../../api/shop";
import { getApiBase } from "../../content/api";

export type ProductAttributeGroup = {
  attribute_id: number;
  attribute_name: string;
  values: AttributeValue[];
};

interface AttributesPickerProps {
  value: ProductAttributeGroup[];
  onChange: (value: ProductAttributeGroup[]) => void;
  attributeList: Attribute[];
  productImages?: string[];
  label?: string;
}

function parseAttributeValues(raw: string): AttributeValue[] {
  try {
    const a = JSON.parse(raw || "[]");
    return Array.isArray(a) ? a : [];
  } catch {
    return [];
  }
}

export function AttributesPicker({
  value,
  onChange,
  attributeList,
  productImages = [],
  label = "Atributos",
}: AttributesPickerProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const apiBase = getApiBase();
  const attachedIds = value.map((g) => g.attribute_id);
  const available = attributeList.filter((a) => !attachedIds.includes(a.id));

  const addAttribute = (attr: Attribute) => {
    onChange([
      ...value,
      { attribute_id: attr.id, attribute_name: attr.name, values: [] },
    ]);
    setExpandedId(attr.id);
  };

  const removeGroup = (index: number) => {
    const removed = value[index];
    if (removed && expandedId === removed.attribute_id) setExpandedId(null);
    onChange(value.filter((_, i) => i !== index));
  };

  const toggleValue = (groupIndex: number, attrValue: AttributeValue) => {
    const group = value[groupIndex];
    const exists = group.values.some((v) => v.name === attrValue.name);
    const nextValues = exists
      ? group.values.filter((v) => v.name !== attrValue.name)
      : [...group.values, attrValue];
    onChange(
      value.map((g, i) => (i === groupIndex ? { ...g, values: nextValues } : g))
    );
  };

  const getAllValuesForAttribute = (attributeId: number): AttributeValue[] => {
    const attr = attributeList.find((a) => a.id === attributeId);
    if (!attr) return [];
    return parseAttributeValues(attr.values);
  };

  const setGalleryImage = (groupIndex: number, valueName: string, galleryImage: string | undefined) => {
    onChange(
      value.map((g, i) =>
        i !== groupIndex
          ? g
          : {
              ...g,
              values: g.values.map((v) =>
                v.name === valueName ? { ...v, gallery_image: galleryImage } : v
              ),
            }
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-[13px] font-medium text-[#131313]">{label}</label>
        {available.length > 0 && (
          <select
            className="text-[12px] font-medium text-[#313b2e] border border-[#e5e5e3] rounded-lg px-2 py-1.5 bg-white focus:border-[#313b2e] outline-none"
            value=""
            onChange={(e) => {
              const id = Number(e.target.value);
              if (!Number.isFinite(id)) return;
              const attr = attributeList.find((a) => a.id === id);
              if (attr) addAttribute(attr);
              e.target.value = "";
            }}
          >
            <option value="">+ Adicionar atributo</option>
            {available.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <p className="text-[12px] text-[#5a5a59] mb-3">
        Escolha atributos globais (ex.: Acabamento) e selecione os valores disponíveis para este produto.
      </p>
      <div className="space-y-3">
        {value.map((group, index) => {
          const allValues = getAllValuesForAttribute(group.attribute_id);
          const isExpanded = expandedId === group.attribute_id;
          return (
            <div
              key={`${group.attribute_id}-${index}`}
              className="rounded-xl border border-[#e5e5e3] bg-[#fafaf9] overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 p-3">
                <button
                  type="button"
                  className="flex items-center gap-2 text-left flex-1 min-w-0"
                  onClick={() => setExpandedId(isExpanded ? null : group.attribute_id)}
                >
                  <svg
                    className={`w-3.5 h-3.5 text-[#5a5a59] transition-transform flex-shrink-0 ${isExpanded ? "rotate-90" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  <div>
                    <p className="font-medium text-[#131313] text-[13px]">{group.attribute_name}</p>
                    <p className="text-[11px] text-[#5a5a59]">
                      {group.values.length} de {allValues.length} valor(es) selecionado(s)
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => removeGroup(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-[12px] flex-shrink-0"
                  aria-label="Remover atributo"
                >
                  Remover
                </button>
              </div>
              {isExpanded && (
                <div className="border-t border-[#e5e5e3] p-3">
                  {allValues.length === 0 ? (
                    <p className="text-[12px] text-[#5a5a59]">
                      Este atributo não tem valores. Adicione valores em Loja → Atributos.
                    </p>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <button
                          type="button"
                          onClick={() => {
                            onChange(
                              value.map((g, i) => (i === index ? { ...g, values: [...allValues] } : g))
                            );
                          }}
                          className="text-[11px] font-medium text-[#313b2e] hover:underline"
                        >
                          Selecionar todos
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onChange(
                              value.map((g, i) => (i === index ? { ...g, values: [] } : g))
                            );
                          }}
                          className="text-[11px] font-medium text-[#5a5a59] hover:underline"
                        >
                          Limpar
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {allValues.map((av) => {
                          const isSelected = group.values.some((v) => v.name === av.name);
                          return (
                            <button
                              key={av.name}
                              type="button"
                              onClick={() => toggleValue(index, av)}
                              className={`flex items-center gap-2 p-2 rounded-lg border-2 text-left transition-all ${
                                isSelected
                                  ? "border-[#313b2e] bg-white ring-1 ring-[#313b2e]/10"
                                  : "border-[#e5e5e3] bg-white hover:border-[#313b2e]/30"
                              }`}
                            >
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected ? "border-[#313b2e] bg-[#313b2e]" : "border-[#ccc]"
                              }`}>
                                {isSelected && (
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                )}
                              </div>
                              {av.image_url && (
                                <img
                                  src={`${apiBase}${av.image_url}`}
                                  alt={av.name}
                                  className="w-8 h-8 rounded object-cover flex-shrink-0"
                                />
                              )}
                              <span className="text-[12px] text-[#131313] truncate">{av.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Gallery image linker — only shown when product has gallery images and there are selected values */}
                      {productImages.length > 0 && group.values.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <p className="text-[11px] font-medium text-[#5a5a59] uppercase tracking-wide">
                            Ligar variante à foto do produto
                          </p>
                          {group.values.map((selectedVal) => {
                            const linkedImage = selectedVal.gallery_image ?? "";
                            return (
                              <div key={selectedVal.name} className="flex items-center gap-3">
                                <span className="text-[12px] text-[#131313] w-24 shrink-0 truncate font-medium">
                                  {selectedVal.name}
                                </span>
                                <div className="flex items-center gap-2 flex-wrap">
                                  {/* "Nenhuma" option */}
                                  <button
                                    type="button"
                                    onClick={() => setGalleryImage(index, selectedVal.name, undefined)}
                                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-[10px] text-[#5a5a59] transition-colors ${
                                      !linkedImage ? "border-[#313b2e] bg-[#f5f5f5]" : "border-[#e5e5e3] hover:border-[#ccc]"
                                    }`}
                                    title="Sem imagem ligada"
                                  >
                                    —
                                  </button>
                                  {productImages.map((imgUrl, imgIdx) => {
                                    const resolved = imgUrl.startsWith("http") ? imgUrl : `${apiBase}${imgUrl}`;
                                    const isLinked = linkedImage === imgUrl || linkedImage === resolved;
                                    return (
                                      <button
                                        key={imgIdx}
                                        type="button"
                                        onClick={() => setGalleryImage(index, selectedVal.name, imgUrl)}
                                        className={`w-10 h-10 rounded-lg border-2 overflow-hidden transition-colors shrink-0 ${
                                          isLinked ? "border-[#313b2e]" : "border-[#e5e5e3] hover:border-[#ccc]"
                                        }`}
                                        title={`Foto ${imgIdx + 1}`}
                                      >
                                        <img src={resolved} alt={`Foto ${imgIdx + 1}`} className="w-full h-full object-cover" />
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {value.length === 0 && available.length === 0 && attributeList.length === 0 && (
        <p className="text-[12px] text-[#5a5a59] py-2">
          Crie atributos em Loja → Atributos e depois adicione-os aqui.
        </p>
      )}
      {value.length === 0 && attributeList.length > 0 && (
        <p className="text-[12px] text-[#5a5a59] py-2">
          Use o dropdown acima para adicionar um atributo ao produto.
        </p>
      )}
    </div>
  );
}
