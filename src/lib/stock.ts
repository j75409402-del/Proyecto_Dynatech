/**
 * Un producto/fila sin stock trackeado (`null`/`undefined`/vacío) sigue visible — significa
 * "consultar disponibilidad", no "confirmado agotado". Solo un número parseable ≤ 0 se oculta.
 */
export function isOutOfStock(stock: string | number | null | undefined): boolean {
  if (stock === null || stock === undefined || stock === "") return false;
  const n = typeof stock === "number" ? stock : parseFloat(stock);
  return !Number.isNaN(n) && n <= 0;
}

/** Para productos standalone (no-holder): stock_quantity numérico o stock_status explícito. */
export function isProductOutOfStock(product: {
  stock_quantity?: number | null;
  stock_status?: string | null;
}): boolean {
  if (product.stock_status === "agotado") return true;
  return isOutOfStock(product.stock_quantity ?? null);
}
