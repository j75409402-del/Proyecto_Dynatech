"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import type { Category } from "@/types";
import { CategoryIcon } from "@/lib/categoryIcons";
import { cn } from "@/lib/utils";

type Props = {
  categories: Category[];
  categoryCounts: Record<string, number>;
  totalCount: number;
};

export function ProductFilters({ categories, categoryCounts, totalCount }: Props) {
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

  const hasActiveFilters = activeCategory;

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
              href={buildHref({ categoria: null })}
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
                  href={buildHref({ categoria: cat.slug })}
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
    </aside>
  );
}
