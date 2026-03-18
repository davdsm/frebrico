import React, { useState } from "react";

const inputClass =
  "w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";

export type ProductOption = { id: number; name: string };

interface RelatedProductsPickerProps {
  value: number[];
  onChange: (value: number[]) => void;
  productList: ProductOption[];
  label?: string;
}

export function RelatedProductsPicker({
  value,
  onChange,
  productList,
  label = "Produtos relacionados",
}: RelatedProductsPickerProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const add = (id: number) => {
    if (value.includes(id)) return;
    onChange([...value, id]);
    setDropdownOpen(false);
  };

  const remove = (id: number) => onChange(value.filter((x) => x !== id));

  const displayName = (id: number) => productList.find((p) => p.id === id)?.name ?? `ID: ${id}`;

  const availableToAdd = productList.filter((p) => !value.includes(p.id));

  return (
    <div>
      <label className="block text-[13px] font-medium text-[#131313] mb-2">{label}</label>
      <p className="text-[12px] text-[#5a5a59] mb-3">
        Selecione produtos para mostrar como relacionados. Use o dropdown &quot;Adicionar produto&quot;.
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {value.map((id) => (
          <span
            key={id}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0f0ee] text-[13px] text-[#131313] border border-[#e5e5e3]"
          >
            {displayName(id)}
            <button
              type="button"
              onClick={() => remove(id)}
              className="text-[#5a5a59] hover:text-red-600 p-0.5 rounded"
              aria-label={`Remover ${displayName(id)}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={inputClass + " text-left flex items-center justify-between"}
        >
          <span className="text-[#5a5a59]">Adicionar produto</span>
          <span className="text-[#5a5a59]">{dropdownOpen ? "▲" : "▼"}</span>
        </button>
        {dropdownOpen && (
          <>
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-[#e5e5e3] bg-white shadow-lg max-h-48 overflow-y-auto">
              {availableToAdd.length === 0 ? (
                <div className="px-3 py-2 text-[12px] text-[#5a5a59]">Nenhum produto disponível para adicionar.</div>
              ) : (
                availableToAdd.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => add(p.id)}
                    className="block w-full text-left px-3 py-2 text-[13px] hover:bg-[#f5f5f4]"
                  >
                    {p.name} (ID: {p.id})
                  </button>
                ))
              )}
            </div>
            <div
              className="fixed inset-0 z-[5]"
              aria-hidden
              onClick={() => setDropdownOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}
