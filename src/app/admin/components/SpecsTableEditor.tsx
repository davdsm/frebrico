import React from "react";

const inputClass =
  "w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";

export type SpecsTableData = {
  columns: string[];
  rows: string[][];
};

interface SpecsTableEditorProps {
  value: SpecsTableData;
  onChange: (value: SpecsTableData) => void;
  label?: string;
}

/** @deprecated Use SpecsTableData - legacy row type for migration */
export type SpecRow = Record<string, unknown>;

const defaultData: SpecsTableData = { columns: [], rows: [] };

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function SpecsTableEditor({ value, onChange, label = "Especificações" }: SpecsTableEditorProps) {
  const data = value?.columns != null ? value : defaultData;
  const columns = Array.isArray(data.columns) ? data.columns : [];
  const safeRows = Array.isArray(data.rows) ? data.rows : [];

  // Stable IDs so React can track column DOM elements across swaps
  const colIds = React.useRef<string[]>([]);
  while (colIds.current.length < columns.length) colIds.current.push(generateId());
  if (colIds.current.length > columns.length) colIds.current = colIds.current.slice(0, columns.length);

  const setColumns = (next: string[]) => {
    const newRows = safeRows.map((row) => {
      const arr = [...(row || [])];
      while (arr.length < next.length) arr.push("");
      return arr.slice(0, next.length);
    });
    onChange({ columns: next, rows: newRows });
  };

  const setRows = (next: string[][]) => {
    const padded = next.map((row) => {
      const arr = [...(row || [])];
      while (arr.length < columns.length) arr.push("");
      return arr.slice(0, columns.length);
    });
    onChange({ columns, rows: padded });
  };

  const removeColumn = (e: React.MouseEvent, colIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    colIds.current.splice(colIndex, 1);
    const nextColumns = columns.filter((_, i) => i !== colIndex);
    const nextRows = safeRows.map((row) => row.filter((_, i) => i !== colIndex));
    onChange({ columns: nextColumns, rows: nextRows });
  };

  const addColumn = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    colIds.current.push(generateId());
    setColumns([...columns, `Coluna ${columns.length + 1}`]);
  };

  const addRow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRows([...safeRows, columns.map(() => "")]);
  };

  const renameColumn = (colIndex: number, name: string) => {
    setColumns(columns.map((c, i) => (i === colIndex ? name : c)));
  };

  const moveColumn = (e: React.MouseEvent, colIndex: number, direction: "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();
    const targetIndex = direction === "left" ? colIndex - 1 : colIndex + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return;

    // Swap stable IDs so React moves DOM elements rather than updating in-place
    const nextIds = [...colIds.current];
    const tmpId = nextIds[colIndex];
    nextIds[colIndex] = nextIds[targetIndex];
    nextIds[targetIndex] = tmpId;
    colIds.current = nextIds;

    const nextColumns = [...columns];
    const tmpCol = nextColumns[colIndex];
    nextColumns[colIndex] = nextColumns[targetIndex];
    nextColumns[targetIndex] = tmpCol;

    const nextRows = safeRows.map((row) => {
      const arr = [...row];
      const tmpCell = arr[colIndex];
      arr[colIndex] = arr[targetIndex];
      arr[targetIndex] = tmpCell;
      return arr;
    });
    onChange({ columns: nextColumns, rows: nextRows });
  };

  const removeRow = (e: React.MouseEvent, rowIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setRows(safeRows.filter((_, i) => i !== rowIndex));
  };

  const updateCell = (rowIndex: number, colIndex: number, cellValue: string) => {
    setRows(
      safeRows.map((row, i) =>
        i === rowIndex
          ? row.map((cell, j) => (j === colIndex ? cellValue : cell))
          : row
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-[13px] font-medium text-[#131313]">{label}</label>
        <div className="flex gap-2">
          <button type="button" onClick={addColumn} className="text-[12px] font-medium text-[#313b2e] hover:underline">
            + Coluna
          </button>
          <button type="button" onClick={addRow} className="text-[12px] font-medium text-[#313b2e] hover:underline">
            + Linha
          </button>
        </div>
      </div>
      <p className="text-[12px] text-[#5a5a59] mb-3">
        Defina as colunas (cabeçalhos) e preencha as linhas. Pode incluir uma coluna &quot;Preço (€)&quot; para mostrar o botão Adicionar ao carrinho.
      </p>
      <div className="overflow-x-auto rounded-xl border border-[#e5e5e3] bg-[#fafaf9]">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#e5e5e3] bg-[#f5f5f4]">
              {columns.map((col, colIndex) => (
                <th key={colIds.current[colIndex]} className="text-left px-2 py-2 font-medium text-[#5a5a59] whitespace-nowrap align-top">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => moveColumn(e, colIndex, "left")}
                      disabled={colIndex === 0}
                      className="p-1 text-[#5a5a59] hover:text-[#313b2e] disabled:opacity-20 rounded hover:bg-[#e5e5e3] transition-colors"
                      title="Mover coluna para a esquerda"
                    >
                      ◀
                    </button>
                    <input
                      type="text"
                      value={col}
                      onChange={(e) => renameColumn(colIndex, e.target.value)}
                      placeholder="Nome da coluna"
                      className={inputClass + " min-w-[100px]"}
                    />
                    <button
                      type="button"
                      onClick={(e) => moveColumn(e, colIndex, "right")}
                      disabled={colIndex === columns.length - 1}
                      className="p-1 text-[#5a5a59] hover:text-[#313b2e] disabled:opacity-20 rounded hover:bg-[#e5e5e3] transition-colors"
                      title="Mover coluna para a direita"
                    >
                      ▶
                    </button>
                    <button
                      type="button"
                      onClick={(e) => removeColumn(e, colIndex)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded text-[11px]"
                      title="Remover coluna"
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
              <th className="w-20 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {safeRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-[#e5e5e3] last:border-0">
                {columns.map((_, colIndex) => (
                  <td key={colIds.current[colIndex]} className="px-2 py-1.5">
                    <input
                      type="text"
                      value={row[colIndex] ?? ""}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      placeholder="—"
                      className={inputClass + " min-w-[70px]"}
                    />
                  </td>
                ))}
                <td className="px-2 py-1.5">
                  <button
                    type="button"
                    onClick={(e) => removeRow(e, rowIndex)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded text-[12px]"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(columns.length === 0 || safeRows.length === 0) && (
        <p className="text-[12px] text-[#5a5a59] py-2">
          {columns.length === 0 ? "Adicione colunas e depois linhas." : "Adicione pelo menos uma linha."}
        </p>
      )}
    </div>
  );
}
