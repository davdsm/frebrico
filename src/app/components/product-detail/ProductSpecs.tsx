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

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const data = parseSpecifications(product.specifications ?? '{}');
  const { addItem } = useCart();
  const [lastAddedRow, setLastAddedRow] = React.useState<number | null>(null);
  const mainImage = resolveImageUrl(product.image);

  if (!data || data.columns.length === 0 || data.rows.length === 0) return null;

  const { columns, rows } = data;
  const priceColIndex = columns.findIndex(isPriceColumn);
  const hasPriceColumn = priceColIndex >= 0;

  return (
    <FadeInUpInView>
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
          <div className="w-full overflow-x-auto">
            <div className="w-full min-w-[500px]">
              <div
                className="grid gap-4 pb-4 border-b-[3px] border-[#36474f]"
                style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
              >
                {columns.map((col, i) => (
                  <div key={i} className="text-xs text-[#36474f] font-normal">
                    {col}
                  </div>
                ))}
              </div>
              <div className="divide-y divide-[#d6d6d6]">
                {rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid gap-4 py-6 items-center"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
                  >
                    {columns.map((_, colIndex) => {
                      const cell = row[colIndex] ?? '';
                      return (
                      <div key={colIndex} className="text-base text-[#3f3f3f]">
                        {colIndex === priceColIndex && hasPriceColumn ? (
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <span>{cell.trim() ? `€${Number(cell).toFixed(2)}` : '—'}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const price = Number(cell) || 0;
                                const variantLabel = row.filter((_, i) => i !== priceColIndex).join(' / ') || '—';
                                addItem({
                                  id: `${product.id}-spec-${rowIndex}`,
                                  name: product.name,
                                  variant: variantLabel,
                                  price,
                                  image: mainImage,
                                });
                                setLastAddedRow(rowIndex);
                                window.setTimeout(() => setLastAddedRow(null), 900);
                              }}
                              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                                lastAddedRow === rowIndex
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  : 'bg-white text-[#313b2e] border border-black/10 hover:bg-[#313b2e] hover:text-white'
                              }`}
                            >
                              {lastAddedRow === rowIndex ? 'Adicionado' : 'Adicionar'}
                            </button>
                          </div>
                        ) : (
                          (cell || '—')
                        )}
                      </div>
                    ); })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInUpInView>
  );
}
