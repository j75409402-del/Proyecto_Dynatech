import type { Category } from "@/types";

/** Cadena completa de ancestros (raíz primero) de una categoría, ej. Neumática > Cilindros. */
export function buildCategoryTrail(category: Category, allCategories: Category[]): Category[] {
  const byId = new Map(allCategories.map((c) => [c.id, c]));
  const trail: Category[] = [];
  let current: Category | undefined = category;
  while (current) {
    trail.unshift(current);
    current = current.parent_id ? byId.get(current.parent_id) : undefined;
  }
  return trail;
}
