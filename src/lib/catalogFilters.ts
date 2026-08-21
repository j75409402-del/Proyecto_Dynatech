import { TABLE_CATEGORIES } from "@/lib/tableCategories";
import type { ReferenceTableRow } from "@/components/product/ReferenceTable";
import type { ProductWithRelations } from "@/types";

export type CatalogFilterGroup = { key: string; label: string; options: string[] };

function capitalize(s: string): string {
  return s.replace(/^\w/, (c) => c.toUpperCase());
}

/** Defs de filtro declaradas para la categoría directa de este producto (si es una familia
 * con tabla de referencias en TABLE_CATEGORIES). Normaliza el `filterKey` legacy (un solo
 * campo) al mismo formato que `filters` (varios campos). */
function getFilterDefs(product: ProductWithRelations): { key: string; label: string }[] {
  const config = TABLE_CATEGORIES[product.category?.slug ?? ""];
  if (!config) return [];
  if (config.filters?.length) return config.filters;
  if (config.filterKey) return [{ key: config.filterKey, label: capitalize(config.filterKey) }];
  return [];
}

/** Filas estructuradas de esta familia (specs[specsKey]), o null si el producto no es una
 * familia con tabla de referencias, o esas filas no tienen la forma esperada. */
function getFamilyRows(product: ProductWithRelations): ReferenceTableRow[] | null {
  const config = TABLE_CATEGORIES[product.category?.slug ?? ""];
  if (!config) return null;
  const specs = product.specs as Record<string, unknown> | null;
  const rows = specs?.[config.specsKey];
  return Array.isArray(rows) ? (rows as ReferenceTableRow[]) : null;
}

/** Agrega los filtros técnicos disponibles a través de todas las familias presentes en
 * `products` (ej. Diámetro/Carrera compartidos entre Cilindros Bimba/Festo/SMC). Solo
 * devuelve grupos con 2+ opciones reales — nunca se inventa un filtro sin datos detrás. */
export function computeCatalogFilterGroups(products: ProductWithRelations[]): CatalogFilterGroup[] {
  const groups = new Map<string, { label: string; values: Set<string> }>();

  for (const product of products) {
    const rows = getFamilyRows(product);
    if (!rows) continue;
    for (const def of getFilterDefs(product)) {
      const bucket = groups.get(def.key) ?? { label: def.label, values: new Set<string>() };
      for (const row of rows) {
        const value = row[def.key];
        if (value) bucket.values.add(value);
      }
      groups.set(def.key, bucket);
    }
  }

  return Array.from(groups.entries())
    .map(([key, { label, values }]) => ({
      key,
      label,
      options: Array.from(values).sort((a, b) => a.localeCompare(b, "es")),
    }))
    .filter((g) => g.options.length >= 2);
}

/** true si el producto pasa los filtros técnicos seleccionados (`{diametro: "32MM", ...}`).
 * Familias irrelevantes a TODOS los filtros activos (ej. una válvula cuando se filtra por
 * Diámetro) se excluyen — un filtro técnico solo tiene sentido dentro de su propia familia. */
export function productMatchesCatalogFilters(
  product: ProductWithRelations,
  selected: Record<string, string | undefined>,
): boolean {
  const active = Object.entries(selected).filter(([, v]) => v);
  if (active.length === 0) return true;

  const defKeys = new Set(getFilterDefs(product).map((d) => d.key));
  const relevant = active.filter(([k]) => defKeys.has(k));
  if (relevant.length === 0) return false;

  const rows = getFamilyRows(product);
  if (!rows) return false;
  return relevant.every(([k, v]) => rows.some((row) => row[k] === v));
}
