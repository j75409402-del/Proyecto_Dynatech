"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, Check, Star } from "lucide-react";
import { updateStockStatus, toggleFeatured } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const STATUS_OPTIONS = [
  { value: "en_stock", label: "En stock" },
  { value: "bajo_pedido", label: "Bajo pedido" },
  { value: "consultar", label: "Consultar disponibilidad" },
  { value: "agotado", label: "Agotado" },
];

type Props = {
  products: Pick<Product, "id" | "sku" | "name" | "stock_status" | "featured">[];
};

export function AdminProductList({ products }: Props) {
  const [query, setQuery] = useState("");
  const [savedId, setSavedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState<Record<string, string>>({});
  const [localFeatured, setLocalFeatured] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q),
    );
  }, [products, query]);

  function handleChange(productId: string, status: string) {
    setLocalStatus((prev) => ({ ...prev, [productId]: status }));
    startTransition(async () => {
      await updateStockStatus(productId, status);
      setSavedId(productId);
      setTimeout(() => setSavedId((cur) => (cur === productId ? null : cur)), 1500);
    });
  }

  function handleFeaturedToggle(productId: string, current: boolean) {
    setLocalFeatured((prev) => ({ ...prev, [productId]: !current }));
    startTransition(async () => {
      await toggleFeatured(productId, !current);
      setSavedId(productId);
      setTimeout(() => setSavedId((cur) => (cur === productId ? null : cur)), 1500);
    });
  }

  return (
    <div>
      <div className="relative max-w-sm mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o SKU..."
          className="block w-full bg-carbon-800 border border-black/10 pl-9 pr-4 py-2.5 text-sm
                     text-surface placeholder:text-steel-500 focus:border-signal focus:ring-1
                     focus:ring-signal focus:outline-none rounded-xs transition-colors"
        />
      </div>

      <div className="border border-black/10 divide-y divide-black/5">
        {filtered.map((product) => {
          const currentStatus = localStatus[product.id] ?? product.stock_status ?? "consultar";
          const isFeatured = localFeatured[product.id] ?? product.featured ?? false;
          return (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 py-4"
            >
              <div className="flex-1 min-w-0">
                <div className="sku-tag mb-1">{product.sku}</div>
                <div className="text-sm text-surface truncate">{product.name}</div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {savedId === product.id && (
                  <Check className="h-4 w-4 text-emerald-500" />
                )}
                <button
                  type="button"
                  onClick={() => handleFeaturedToggle(product.id, isFeatured)}
                  disabled={isPending}
                  aria-pressed={isFeatured}
                  title="Destacado en Productos Más Vendidos"
                  className={cn(
                    "flex items-center gap-1.5 border px-3 py-2 text-sm transition-colors rounded-xs disabled:opacity-50",
                    isFeatured
                      ? "border-signal bg-signal/10 text-signal"
                      : "border-black/10 text-steel-400 hover:border-signal/40",
                  )}
                >
                  <Star className={cn("h-3.5 w-3.5", isFeatured && "fill-signal")} />
                  Destacado
                </button>
                <select
                  value={currentStatus}
                  onChange={(e) => handleChange(product.id, e.target.value)}
                  disabled={isPending}
                  className={cn(
                    "bg-carbon-800 border border-black/10 text-sm text-surface px-3 py-2",
                    "focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none",
                    "rounded-xs transition-colors disabled:opacity-50",
                  )}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-steel-400">
            No se encontraron productos.
          </div>
        )}
      </div>
    </div>
  );
}
