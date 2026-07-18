import type { Category } from "@/types";

type MinimalProduct = { category_id: string | null; brand_id: string | null };

/** Cuenta productos activos por categoría (incluye subcategorías dentro del total del padre) y por marca. */
export function computeCatalogCounts(products: MinimalProduct[], allCategories: Category[]) {
  const byId = new Map(allCategories.map((c) => [c.id, c]));
  const categoryCounts = new Map<string, number>();
  const brandCounts = new Map<string, number>();

  for (const p of products) {
    if (p.brand_id) {
      brandCounts.set(p.brand_id, (brandCounts.get(p.brand_id) ?? 0) + 1);
    }
    // Sumamos al conteo de la categoría directa y de todos sus ancestros (pa' que el padre muestre el total).
    let current = p.category_id ? byId.get(p.category_id) : undefined;
    const seen = new Set<string>();
    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      categoryCounts.set(current.id, (categoryCounts.get(current.id) ?? 0) + 1);
      current = current.parent_id ? byId.get(current.parent_id) : undefined;
    }
  }

  return { categoryCounts, brandCounts };
}
