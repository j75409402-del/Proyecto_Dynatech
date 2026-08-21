"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { X, MessageCircleQuestion } from "lucide-react";
import type { Category } from "@/types";
import { CategoryIcon } from "@/lib/categoryIcons";
import { cn } from "@/lib/utils";
import { whatsappImportRequest } from "@/lib/whatsapp";
import type { CatalogFilterGroup } from "@/lib/catalogFilters";

type Props = {
  categories: Category[];
  categoryCounts: Record<string, number>;
  totalCount: number;
  /** Filtros técnicos agregados (Diámetro, Carrera, Marca...) — solo llegan poblados cuando
   * las familias visibles ya tienen esos datos estructurados (ver src/lib/catalogFilters.ts). */
  filterGroups?: CatalogFilterGroup[];
};

export function ProductFilters({ categories, categoryCounts, totalCount, filterGroups = [] }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("categoria");

  function buildHref(params: Record<string, string | null>) {
    const sp = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([k, v]) => {
      if (v === null || v === "") sp.delete(k);
      else sp.set(k, v);
    });
    const qs = sp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  // Los filtros técnicos (diámetro, tipo...) son propios de la familia/categoría actual — al
  // cambiar de categoría se limpian, si no un filtro que la nueva categoría no declara deja
  // el listado vacío sin explicación.
  function buildCategoryHref(categoria: string | null) {
    return buildHref({
      categoria,
      ...Object.fromEntries(filterGroups.map((g) => [g.key, null])),
    });
  }

  const hasActiveTechFilters = filterGroups.some((g) => searchParams.get(g.key));
  const hasActiveFilters = activeCategory || hasActiveTechFilters;

  return (
    <aside className="space-y-1">
      {hasActiveFilters && (
        <Link
          href={pathname}
          className="mb-4 flex items-center gap-1.5 text-xs text-signal hover:text-signal-hover font-medium"
        >
          <X className="h-3.5 w-3.5" />
          Limpiar filtros
        </Link>
      )}

      {/* Categorías */}
      <div className="pb-6 mb-6 border-b border-black/10">
        <div className="eyebrow mb-3">Categorías</div>
        <ul className="space-y-0.5">
          <li>
            <Link
              href={buildCategoryHref(null)}
              className={cn(
                "flex items-center justify-between gap-2 rounded-xs px-3 py-2 text-sm transition-colors",
                !activeCategory
                  ? "bg-signal-soft text-signal font-semibold"
                  : "text-steel-300 hover:bg-carbon-700 hover:text-surface",
              )}
            >
              <span>Todas</span>
              <span className="font-mono text-[11px] text-steel-500">{totalCount}</span>
            </Link>
          </li>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            const count = categoryCounts[cat.id] ?? 0;
            return (
              <li key={cat.id}>
                <Link
                  href={buildCategoryHref(cat.slug)}
                  className={cn(
                    "relative flex items-center justify-between gap-2 rounded-xs px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-signal-soft text-signal font-semibold"
                      : "text-steel-300 hover:bg-carbon-700 hover:text-surface",
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 bg-signal" />
                  )}
                  <span className="flex items-center gap-2">
                    <CategoryIcon name={cat.icon} className="h-4 w-4 shrink-0" />
                    {cat.name}
                  </span>
                  <span className={cn("font-mono text-[11px]", isActive ? "text-signal" : "text-steel-500")}>
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Filtros técnicos — solo aparecen si hay datos estructurados reales detrás. */}
      {filterGroups.map((group) => {
        const activeValue = searchParams.get(group.key);
        return (
          <div key={group.key} className="pb-6 mb-6 border-b border-black/10">
            <div className="eyebrow mb-3">{group.label}</div>
            <div className="flex flex-wrap gap-1.5">
              {group.options.map((option) => {
                const isActive = activeValue === option;
                return (
                  <Link
                    key={option}
                    href={buildHref({ [group.key]: isActive ? null : option })}
                    className={cn(
                      "rounded-xs border px-3 py-2 text-xs font-mono uppercase tracking-techno transition-colors",
                      isActive
                        ? "border-signal/40 bg-signal-soft text-signal"
                        : "border-black/10 text-steel-300 hover:text-surface",
                    )}
                  >
                    {option}
                    {isActive && <X className="inline h-3 w-3 ml-1.5 -mt-0.5" />}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      <a
        href={whatsappImportRequest()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-2.5 border border-black/10 hover:border-signal p-4 text-sm
                   text-steel-300 hover:text-surface transition-colors"
      >
        <MessageCircleQuestion className="h-4 w-4 shrink-0 mt-0.5 text-signal" />
        <span>
          <span className="block font-medium text-surface mb-0.5">¿No encuentras lo que buscas?</span>
          Envíanos foto, número de parte o modelo por WhatsApp.
        </span>
      </a>
    </aside>
  );
}
