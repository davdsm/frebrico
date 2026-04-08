import React from "react";

const inputClass =
  "w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";

export type FaqItem = { question: string; answer: string };

interface FaqsEditorProps {
  value: FaqItem[];
  onChange: (value: FaqItem[]) => void;
  label?: string;
}

export function FaqsEditor({ value, onChange, label = "FAQs" }: FaqsEditorProps) {
  const update = (index: number, patch: Partial<FaqItem>) => {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const add = () => onChange([...value, { question: "", answer: "" }]);
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-[13px] font-medium text-[#131313]">{label}</label>
        <button type="button" onClick={add} className="text-[12px] font-medium text-[#313b2e] hover:underline">
          + Adicionar pergunta
        </button>
      </div>
      <p className="text-[12px] text-[#5a5a59] mb-3">Perguntas e respostas para a secção de FAQs do produto.</p>
      <div className="space-y-4">
        {value.map((item, index) => (
          <div key={index} className="p-4 rounded-xl border border-[#e5e5e3] bg-[#fafaf9] space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Pergunta</label>
              <input
                type="text"
                value={item.question}
                onChange={(e) => update(index, { question: e.target.value })}
                placeholder="Pergunta frequente"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Resposta</label>
              <textarea
                value={item.answer}
                onChange={(e) => update(index, { answer: e.target.value })}
                placeholder="Resposta"
                rows={2}
                className={inputClass + " resize-y"}
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
        ))}
      </div>
      {value.length === 0 && (
        <p className="text-[12px] text-[#5a5a59] py-2">Nenhuma FAQ. Clique em &quot;Adicionar pergunta&quot;.</p>
      )}
    </div>
  );
}
