import React from 'react';
import { useCart } from '../../cart/CartContext';
import { resolveImageUrl, type Product } from '../../api/shop';
import { FadeInUpInView } from '../atoms/FadeInUpInView';

type SpecsData = { columns: string[]; rows: string[][] };

function parseSpecifications(raw: string): SpecsData | null {
  try {
    const a = JSON.parse(raw ?? '{}');
    if (a && typeof a === 'object' && Array.isArray(a.columns) && Array.isArray(a.rows)) {
      return {
        columns: (a.columns as unknown[]).map(String),
        rows: (a.rows as unknown[]).map((r) => (Array.isArray(r) ? (r as unknown[]).map(String) : [])),
      };
    }
    if (Array.isArray(a) && a.length > 0 && typeof a[0] === 'object' && a[0] !== null) {
      const legacy = a as Record<string, unknown>[];
      const columns = ['Diâmetro (mm)', 'Largura (mm)', 'Comprimento (mm)', 'Bordas', 'ID', 'Preço (€)'];
      const rows = legacy.map((row) => [
        String(row.diameter ?? ''),
        String(row.width ?? ''),
        String(row.length ?? ''),
        String(row.edges ?? ''),
        String(row.id ?? ''),
        String(row.price ?? ''),
      ]);
      return { columns, rows };
    }
    return null;
  } catch {
    return null;
  }
}

function isPriceColumn(label: string): boolean {
  const t = label.toLowerCase();
  return t.includes('preço') || t.includes('preco') || t.includes('price');
}

function variantKeyFromRow(columns: string[], row: string[], rowIndex: number): string {
  const codeIdx = columns.findIndex((c) => {
    const t = c.toLowerCase();
    return (
      (t.includes('código') ||
        t.includes('codigo') ||
        t.includes('cod ') ||
        t === 'cod' ||
        t === 'id' ||
        t.includes('ref') ||
        t.includes('artigo')) &&
      !t.includes('descri')
    );
  });
  if (codeIdx >= 0) {
    const code = String(row[codeIdx] ?? '').trim();
    if (code) return code;
  }
  return `row:${rowIndex}`;
}

function parsePriceValue(raw: string, fallback: number): number {
  const normalized = String(raw ?? "")
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function CellText({ text, className = "" }: { text: string; className?: string }) {
  const display = text.trim() ? text : "—";
  return (
    <span className={`block break-words whitespace-normal ${className}`.trim()}>
      {display}
    </span>
  );
}

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const data = parseSpecifications(product.specifications ?? '{}');
  const { addItem, items } = useCart();
  const [lastAddedRow, setLastAddedRow] = React.useState<number | null>(null);
  const mainImage = resolveImageUrl(product.image);

  if (!data || data.columns.length === 0 || data.rows.length === 0) return null;

  const { columns, rows } = data;
  const priceColIndex = columns.findIndex(isPriceColumn);
  const hasPriceColumn = priceColIndex >= 0;

  return (
    <FadeInUpInView>
      <section id="product-specs-table" className="w-full bg-white pt-12 md:pt-16 lg:pt-20 pb-4 md:pb-6 lg:pb-8 scroll-mt-28">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
          <p className="text-sm text-[#5a5a59] mb-4">Selecione a variante na tabela e clique em Adicionar.</p>
          <div className="w-full max-h-[min(70vh,720px)] overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-[3px] border-[#36474f]">
                  {columns.map((col, i) => (
                    <th
                      key={i}
                      className="sticky top-0 z-10 bg-white pb-4 pt-1 pr-4 text-xs text-[#36474f] font-normal text-center whitespace-nowrap shadow-[0_1px_0_0_#36474f]"
                    >
                      {col}
                    </th>
                  ))}
                  <th className="sticky top-0 z-10 bg-white pb-4 pt-1 text-xs text-[#36474f] font-normal text-center whitespace-nowrap shadow-[0_1px_0_0_#36474f]">
                    Carrinho
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d6d6d6]">
                {rows.map((row, rowIndex) => {
                  const rowId = `${product.id}-spec-${rowIndex}`;
                  const variantKey = variantKeyFromRow(columns, row, rowIndex);
                  const variantLabel = row.filter((_, i) => i !== priceColIndex).join(' / ') || '—';
                  const alreadyInCart = items.some((item) => item.id === rowId && item.variant === variantLabel);
                  const isAddedState = alreadyInCart || lastAddedRow === rowIndex;
                  return (
                    <tr key={rowIndex}>
                      {columns.map((_, colIndex) => {
                        const cell = row[colIndex] ?? "";
                        const priceText =
                          colIndex === priceColIndex && hasPriceColumn
                            ? cell.trim()
                              ? `€${parsePriceValue(cell, Number(product.price) || 0).toFixed(2)}`
                              : ""
                            : null;
                        return (
                          <td key={colIndex} className="py-6 pr-4 text-base text-[#3f3f3f] text-center align-middle">
                            <CellText text={priceText != null ? priceText : cell} className="text-center" />
                          </td>
                        );
                      })}
                      <td className="py-6 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => {
                            const priceCell = hasPriceColumn ? (row[priceColIndex] ?? "") : "";
                            const price = parsePriceValue(priceCell, Number(product.price) || 0);
                            addItem({
                              id: rowId,
                              name: product.name,
                              variant: variantLabel,
                              price,
                              image: mainImage,
                              productId: product.id,
                              variantKey,
                            });
                            setLastAddedRow(rowIndex);
                            window.setTimeout(() => setLastAddedRow(null), 900);
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                            isAddedState
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-white text-[#313b2e] border border-black/10 hover:bg-[#313b2e] hover:text-white'
                          }`}
                        >
                          {isAddedState ? 'Adicionado' : 'Adicionar'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </FadeInUpInView>
  );
}
