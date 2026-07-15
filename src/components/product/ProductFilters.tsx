"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Category, Brand } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  categories: Category[];
  brands: Brand[];
};

export function ProductFilters({ categories, brands }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("categoria");
  const activeBrand = searchParams.get("marca");

  const buildHref = (params: Record<string, string | null>) => {
    const sp = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([k, v]) => {
      if (v === null) sp.delete(k);
      else sp.set(k, v);
    });
    const qs = sp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <aside className="space-y-8">
      {/* Categorías */}
      <div>
        <div className="eyebrow mb-4 pb-2 border-b border-black/10">Categorías</div>
        <ul className="space-y-1">
          <li>
            <Link
              href={buildHref({ categoria: null })}
              className={cn(
                "block py-1.5 text-sm transition-colors",
                !activeCategory ? "text-signal font-medium" : "text-steel-300 hover:text-surface",
              )}
            >
              Todas
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={buildHref({ categoria: cat.slug })}
                className={cn(
                  "block py-1.5 text-sm transition-colors",
                  activeCategory === cat.slug
                    ? "text-signal font-medium"
                    : "text-steel-300 hover:text-surface",
                )}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Marcas */}
      <div>
        <div className="eyebrow mb-4 pb-2 border-b border-black/10">Marcas</div>
        <ul className="space-y-1">
          <li>
            <Link
              href={buildHref({ marca: null })}
              className={cn(
                "block py-1.5 text-sm transition-colors",
                !activeBrand ? "text-signal font-medium" : "text-steel-300 hover:text-surface",
              )}
            >
              Todas
            </Link>
          </li>
          {brands.map((brand) => (
            <li key={brand.id}>
              <Link
                href={buildHref({ marca: brand.slug })}
                className={cn(
                  "block py-1.5 text-sm transition-colors flex items-center justify-between",
                  activeBrand === brand.slug
                    ? "text-signal font-medium"
                    : "text-steel-300 hover:text-surface",
                )}
              >
                <span>{brand.name}</span>
                {brand.country && (
                  <span className="font-mono text-[9px] uppercase tracking-techno text-steel-500">
                    {brand.country}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
