/** True when a specs column header is the price column. */
export function isPriceColumn(label: string): boolean {
  const t = label.toLowerCase();
  return t.includes("preço") || t.includes("preco") || t.includes("price");
}

/** Align per-row "Sob consulta" flags with the current row count. */
export function normalizeOnRequest(rowCount: number, onRequest?: unknown): boolean[] {
  const arr = Array.isArray(onRequest) ? onRequest.map(Boolean) : [];
  while (arr.length < rowCount) arr.push(false);
  return arr.slice(0, rowCount);
}
