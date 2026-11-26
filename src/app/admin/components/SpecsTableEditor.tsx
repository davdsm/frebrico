import React from "react";
import { cn } from "../../components/ui/utils";
import { isPriceColumn, normalizeOnRequest } from "../../utils/specsTable";

const inputClass =
  "w-full min-w-0 px-2 py-1.5 border border-[#e5e5e3] rounded-lg text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none break-words";

function AutoResizeTextarea({
  value,
  onChange,
  placeholder,
  className,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      rows={1}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      style={{ resize: "none", overflow: "hidden" }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export type SpecsTableData = {
  columns: string[];
  rows: string[][];
  /** Per-row "Sob consulta" — price kept but disabled/ignored on storefront */
  on_request?: boolean[];
};

interface SpecsTableEditorProps {
  value: SpecsTableData;
  onChange: (value: SpecsTableData) => void;
  label?: string;
}

/** @deprecated Use SpecsTableData - legacy row type for migration */
export type SpecRow = Record<string, unknown>;

const defaultData: SpecsTableData = { columns: [], rows: [], on_request: [] };

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function SpecsTableEditor({ value, onChange, label = "Especificações" }: SpecsTableEditorProps) {
  const data = value?.columns != null ? value : defaultData;
  const columns = Array.isArray(data.columns) ? data.columns : [];
  const safeRows = Array.isArray(data.rows) ? data.rows : [];
  const onRequest = normalizeOnRequest(safeRows.length, data.on_request);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const updateScrollButtons = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(max > 2 && el.scrollLeft < max - 2);
  }, []);

  React.useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => updateScrollButtons()) : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro?.disconnect();
    };
  }, [updateScrollButtons, columns.length, safeRows.length]);

  const scrollTableBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const isInteractiveTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(target.closest("input, textarea, button, label, a, select, [role='button']"));
  };

  const onTablePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (isInteractiveTarget(e.target)) return;
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = { pointerId: e.pointerId, startX: e.clientX, scrollLeft: el.scrollLeft };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onTablePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = scrollRef.current;
    if (!drag || !el || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    el.scrollLeft = drag.scrollLeft - dx;
  };

  const endTableDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    try {
      scrollRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Stable IDs so React can track column DOM elements across swaps
  const colIds = React.useRef<string[]>([]);
  while (colIds.current.length < columns.length) colIds.current.push(generateId());
  if (colIds.current.length > columns.length) colIds.current = colIds.current.slice(0, columns.length);

  const rowIds = React.useRef<string[]>([]);
  while (rowIds.current.length < safeRows.length) rowIds.current.push(generateId());
  if (rowIds.current.length > safeRows.length) rowIds.current = rowIds.current.slice(0, safeRows.length);

  const emit = (next: { columns: string[]; rows: string[][]; on_request?: boolean[] }) => {
    onChange({
      columns: next.columns,
      rows: next.rows,
      on_request: normalizeOnRequest(next.rows.length, next.on_request ?? onRequest),
    });
  };

  const setColumns = (next: string[]) => {
    const newRows = safeRows.map((row) => {
      const arr = [...(row || [])];
      while (arr.length < next.length) arr.push("");
      return arr.slice(0, next.length);
    });
    emit({ columns: next, rows: newRows, on_request: onRequest });
  };

  const setRows = (next: string[][], nextOnRequest?: boolean[]) => {
    const padded = next.map((row) => {
      const arr = [...(row || [])];
      while (arr.length < columns.length) arr.push("");
      return arr.slice(0, columns.length);
    });
    emit({
      columns,
      rows: padded,
      on_request: normalizeOnRequest(padded.length, nextOnRequest ?? onRequest),
    });
  };

  const removeColumn = (e: React.MouseEvent, colIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    colIds.current.splice(colIndex, 1);
    const nextColumns = columns.filter((_, i) => i !== colIndex);
    const nextRows = safeRows.map((row) => row.filter((_, i) => i !== colIndex));
    emit({ columns: nextColumns, rows: nextRows, on_request: onRequest });
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
    rowIds.current.push(generateId());
    setRows([...safeRows, columns.map(() => "")], [...onRequest, false]);
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
    emit({ columns: nextColumns, rows: nextRows, on_request: onRequest });
  };

  const removeRow = (e: React.MouseEvent, rowIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    rowIds.current.splice(rowIndex, 1);
    setRows(
      safeRows.filter((_, i) => i !== rowIndex),
      onRequest.filter((_, i) => i !== rowIndex)
    );
  };

  const duplicateRow = (e: React.MouseEvent, rowIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const source = safeRows[rowIndex] ?? columns.map(() => "");
    const copy = [...source];
    while (copy.length < columns.length) copy.push("");
    const nextRows = [...safeRows];
    nextRows.splice(rowIndex + 1, 0, copy.slice(0, columns.length));
    const nextOnRequest = [...onRequest];
    nextOnRequest.splice(rowIndex + 1, 0, onRequest[rowIndex] ?? false);
    rowIds.current.splice(rowIndex + 1, 0, generateId());
    setRows(nextRows, nextOnRequest);
  };

  const moveRow = (e: React.MouseEvent, rowIndex: number, direction: "up" | "down") => {
    e.preventDefault();
    e.stopPropagation();
    const targetIndex = direction === "up" ? rowIndex - 1 : rowIndex + 1;
    if (targetIndex < 0 || targetIndex >= safeRows.length) return;

    const nextIds = [...rowIds.current];
    const tmpId = nextIds[rowIndex];
    nextIds[rowIndex] = nextIds[targetIndex];
    nextIds[targetIndex] = tmpId;
    rowIds.current = nextIds;

    const nextRows = [...safeRows];
    const tmpRow = nextRows[rowIndex];
    nextRows[rowIndex] = nextRows[targetIndex];
    nextRows[targetIndex] = tmpRow;

    const nextOnRequest = [...onRequest];
    const tmpFlag = nextOnRequest[rowIndex];
    nextOnRequest[rowIndex] = nextOnRequest[targetIndex];
    nextOnRequest[targetIndex] = tmpFlag;
    setRows(nextRows, nextOnRequest);
  };

  const updateCell = (rowIndex: number, colIndex: number, cellValue: string) => {
    setRows(
      safeRows.map((row, i) =>
        i === rowIndex
          ? row.map((cell, j) => (j === colIndex ? cellValue : cell))
          : row
      ),
      onRequest
    );
  };

  const toggleOnRequest = (rowIndex: number, checked: boolean) => {
    const next = [...onRequest];
    next[rowIndex] = checked;
    emit({ columns, rows: safeRows, on_request: next });
  };

  return (
    <div className="min-w-0 w-full">
      <div className="flex items-center justify-between gap-3 mb-2">
        <label className="block text-[13px] font-medium text-[#131313]">{label}</label>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-0.5 rounded-lg border border-[#e5e5e3] bg-white p-0.5">
            <button
              type="button"
              onClick={() => scrollTableBy(-240)}
              disabled={!canScrollLeft}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#313b2e] hover:bg-[#f5f5f4] disabled:opacity-25 disabled:hover:bg-transparent"
              title="Deslizar tabela para a esquerda"
              aria-label="Deslizar tabela para a esquerda"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => scrollTableBy(240)}
              disabled={!canScrollRight}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#313b2e] hover:bg-[#f5f5f4] disabled:opacity-25 disabled:hover:bg-transparent"
              title="Deslizar tabela para a direita"
              aria-label="Deslizar tabela para a direita"
            >
              ▶
            </button>
          </div>
          <button type="button" onClick={addColumn} className="text-[12px] font-medium text-[#313b2e] hover:underline">
            + Coluna
          </button>
          <button type="button" onClick={addRow} className="text-[12px] font-medium text-[#313b2e] hover:underline">
            + Linha
          </button>
        </div>
      </div>
      <p className="text-[12px] text-[#5a5a59] mb-3">
        Defina as colunas (cabeçalhos) e preencha as linhas. Use <strong>Duplicar</strong> para copiar uma linha
        quase igual e alterar só o que muda (ex.: cor). Pode incluir uma coluna &quot;Preço (€)&quot; para mostrar o
        botão Adicionar ao carrinho. Marque <strong>Sob consulta</strong> numa linha para desativar o preço
        (o valor fica guardado, mas no site aparece &quot;Sob Consulta&quot;). Use as setas ou arraste a tabela
        horizontalmente se tiver muitas colunas.
      </p>
      <div
        ref={scrollRef}
        className={cn(
          "w-full rounded-xl border border-[#e5e5e3] bg-[#fafaf9] overflow-x-auto",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onPointerDown={onTablePointerDown}
        onPointerMove={onTablePointerMove}
        onPointerUp={endTableDrag}
        onPointerCancel={endTableDrag}
      >
        <table
          className="w-full table-fixed border-collapse text-[13px]"
          style={{ minWidth: `${Math.max(520, columns.length * 148 + 196)}px` }}
        >
          <colgroup>
            {columns.map((_, colIndex) => (
              <col key={colIds.current[colIndex]} />
            ))}
            <col className="w-[88px]" />
            <col className="w-[108px]" />
          </colgroup>
          <thead>
            <tr className="border-b border-[#e5e5e3] bg-[#f5f5f4]">
              {columns.map((col, colIndex) => (
                <th key={colIds.current[colIndex]} className="text-left px-1.5 py-2 font-medium text-[#5a5a59] align-top min-w-0">
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => moveColumn(e, colIndex, "left")}
                        disabled={colIndex === 0}
                        className="p-0.5 text-[11px] text-[#5a5a59] hover:text-[#313b2e] disabled:opacity-20 rounded hover:bg-[#e5e5e3] transition-colors"
                        title="Mover coluna para a esquerda"
                      >
                        ◀
                      </button>
                      <button
                        type="button"
                        onClick={(e) => moveColumn(e, colIndex, "right")}
                        disabled={colIndex === columns.length - 1}
                        className="p-0.5 text-[11px] text-[#5a5a59] hover:text-[#313b2e] disabled:opacity-20 rounded hover:bg-[#e5e5e3] transition-colors"
                        title="Mover coluna para a direita"
                      >
                        ▶
                      </button>
                      <button
                        type="button"
                        onClick={(e) => removeColumn(e, colIndex)}
                        className="p-0.5 text-red-600 hover:bg-red-50 rounded text-[10px]"
                        title="Remover coluna"
                      >
                        ✕
                      </button>
                    </div>
                    <input
                      type="text"
                      value={col}
                      onChange={(e) => renameColumn(colIndex, e.target.value)}
                      placeholder="Coluna"
                      className={inputClass}
                    />
                  </div>
                </th>
              ))}
              <th scope="col" className="sticky right-[108px] z-20 bg-[#f5f5f4] px-1.5 py-2 align-top text-xs font-semibold text-[#5a5a59] leading-tight text-center">
                Sob consulta
              </th>
              <th className="sticky right-0 z-20 bg-[#f5f5f4] px-1.5 py-2 align-top" />
            </tr>
          </thead>
          <tbody>
            {safeRows.map((row, rowIndex) => {
              const rowOnRequest = onRequest[rowIndex] === true;
              const rowHint = row.map((cell) => cell.trim()).find(Boolean);
              return (
              <tr key={rowIds.current[rowIndex]} className="border-b border-[#e5e5e3] last:border-0">
                {columns.map((colName, colIndex) => {
                  const priceCol = isPriceColumn(colName);
                  const disabled = rowOnRequest && priceCol;
                  return (
                  <td key={colIds.current[colIndex]} className="px-1.5 py-1.5 align-top min-w-0">
                    <AutoResizeTextarea
                      value={row[colIndex] ?? ""}
                      onChange={(v) => updateCell(rowIndex, colIndex, v)}
                      placeholder="—"
                      className={cn(inputClass, disabled && "opacity-50 cursor-not-allowed bg-[#eee]")}
                      disabled={disabled}
                    />
                  </td>
                  );
                })}
                <td className="sticky right-[108px] z-10 bg-[#fafaf9] px-1.5 py-1.5 align-middle text-center">
                  <label className="inline-flex items-center justify-center min-h-6 min-w-6 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rowOnRequest}
                      onChange={(e) => toggleOnRequest(rowIndex, e.target.checked)}
                      aria-label={rowHint ? `Sob consulta, ${rowHint}` : `Sob consulta, linha ${rowIndex + 1}`}
                      className="h-4 w-4 accent-[#313b2e] cursor-pointer"
                      title="Marcar preço desta linha como Sob consulta"
                    />
                  </label>
                </td>
                <td className="sticky right-0 z-10 bg-[#fafaf9] px-1.5 py-1.5 align-top">
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={(e) => moveRow(e, rowIndex, "up")}
                        disabled={rowIndex === 0}
                        className="p-0.5 text-[11px] text-[#5a5a59] hover:text-[#313b2e] disabled:opacity-20 rounded hover:bg-[#e5e5e3] transition-colors"
                        title="Mover linha para cima"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={(e) => moveRow(e, rowIndex, "down")}
                        disabled={rowIndex === safeRows.length - 1}
                        className="p-0.5 text-[11px] text-[#5a5a59] hover:text-[#313b2e] disabled:opacity-20 rounded hover:bg-[#e5e5e3] transition-colors"
                        title="Mover linha para baixo"
                      >
                        ▼
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => duplicateRow(e, rowIndex)}
                      className="p-1 text-[#313b2e] hover:bg-[#313b2e]/10 rounded text-[11px] whitespace-nowrap font-medium"
                      title="Duplicar linha"
                    >
                      Duplicar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => removeRow(e, rowIndex)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded text-[11px] whitespace-nowrap"
                    >
                      Remover
                    </button>
                  </div>
                </td>
              </tr>
              );
            })}
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
