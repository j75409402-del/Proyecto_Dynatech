"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";
import type { Category, Brand } from "@/types";
import { CategoryIcon } from "@/lib/categoryIcons";
import { stockStatusLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  categories: Category[];
  brands: Brand[];
  categoryCounts: Record<string, number>;
  brandCounts: Record<string, number>;
  totalCount: number;
};

const STOCK_OPTIONS = ["en_stock", "bajo_pedido", "consultar", "agotado"];

export function ProductFilters({ categories, brands, categoryCounts, brandCounts, totalCount }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("categoria");
  const activeBrands = useMemo(
    () => new Set((searchParams.get("marca") ?? "").split(",").filter(Boolean)),
    [searchParams],
  );
  const activeStock = useMemo(
    () => new Set((searchParams.get("disponibilidad") ?? "").split(",").filter(Boolean)),
    [searchParams],
  );
  const [brandQuery, setBrandQuery] = useState("");
  const [openSections, setOpenSections] = useState({ brands: true, stock: false });

  function buildHref(params: Record<string, string | null>) {
    const sp = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([k, v]) => {
      if (v === null || v === "") sp.delete(k);
      else sp.set(k, v);
    });
    const qs = sp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  function toggleSetParam(key: "marca" | "disponibilidad", value: string, current: Set<string>) {
    const next = new Set(current);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return buildHref({ [key]: next.size ? Array.from(next).join(",") : null });
  }

  const visibleBrands = brandQuery
    ? brands.filter((b) => b.name.toLowerCase().includes(brandQuery.toLowerCase()))
    : brands;

  const hasActiveFilters = activeCategory || activeBrands.size > 0 || activeStock.size > 0;

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

      {/* Marcas */}
      <FilterSection
        title="Marcas"
        open={openSections.brands}
        onToggle={() => setOpenSections((s) => ({ ...s, brands: !s.brands }))}
      >
        <label className="relative mb-3 flex items-center">
          <Search className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-steel-500" />
          <input
            type="text"
            value={brandQuery}
            onChange={(e) => setBrandQuery(e.target.value)}
            placeholder="Buscar marca..."
            className="w-full rounded-xs border border-black/10 bg-carbon-700 py-1.5 pl-8 pr-2 text-xs
                       text-surface placeholder:text-steel-500 outline-none focus:border-signal/40"
          />
        </label>
        <ul className="space-y-0.5 max-h-56 overflow-y-auto">
          {visibleBrands.map((brand) => {
            const checked = activeBrands.has(brand.slug);
            const count = brandCounts[brand.id] ?? 0;
            return (
              <li key={brand.id}>
                <Link
                  href={toggleSetParam("marca", brand.slug, activeBrands)}
                  className="flex items-center justify-between gap-2 rounded-xs px-2 py-1.5 text-sm text-steel-300
                             hover:bg-carbon-700 hover:text-surface transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors",
                        checked ? "bg-signal border-signal" : "border-black/20",
                      )}
                    >
                      {checked && <CheckIcon />}
                    </span>
                    {brand.name}
                  </span>
                  <span className="font-mono text-[11px] text-steel-500">{count}</span>
                </Link>
              </li>
            );
          })}
          {visibleBrands.length === 0 && (
            <li className="px-2 py-2 text-xs text-steel-500">Sin resultados</li>
          )}
        </ul>
      </FilterSection>

      {/* Disponibilidad */}
      <FilterSection
        title="Disponibilidad"
        open={openSections.stock}
        onToggle={() => setOpenSections((s) => ({ ...s, stock: !s.stock }))}
      >
        <ul className="space-y-0.5">
          {STOCK_OPTIONS.map((status) => {
            const checked = activeStock.has(status);
            return (
              <li key={status}>
                <Link
                  href={toggleSetParam("disponibilidad", status, activeStock)}
                  className="flex items-center gap-2 rounded-xs px-2 py-1.5 text-sm text-steel-300
                             hover:bg-carbon-700 hover:text-surface transition-colors"
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors",
                      checked ? "bg-signal border-signal" : "border-black/20",
                    )}
                  >
                    {checked && <CheckIcon />}
                  </span>
                  {stockStatusLabel(status)}
                </Link>
              </li>
            );
          })}
        </ul>
      </FilterSection>
    </aside>
  );
}

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-black/10 py-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="eyebrow">{title}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-steel-500 transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-white stroke-[2.5]">
      <path d="M2 6.5 4.5 9 10 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
