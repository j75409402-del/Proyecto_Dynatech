import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProductWithRelations } from "@/types";
import { stockStatusLabel, stockStatusColor, cn } from "@/lib/utils";
import { TiltCard } from "@/components/motion/TiltCard";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export function ProductCard({ product, className }: Props) {
  const specs = (product.specs as Record<string, string>) ?? {};
  const specEntries = Object.entries(specs).slice(0, 3);

  return (
    <TiltCard max={5} glare className={className}>
    <Link
      href={`/productos/${product.slug}`}
      className={cn(
        "group relative bg-carbon-800 border border-white/5 hover:border-signal/50",
        "flex flex-col transition-all duration-200 h-full",
      )}
    >
      {/* Imagen o placeholder */}
      <div className="relative aspect-[4/3] bg-carbon-700 border-b border-white/5 overflow-hidden">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <PlaceholderPattern />
          </div>
        )}

        {/* Stock badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-carbon/80 backdrop-blur-sm px-2 py-1 border border-white/10">
          <span className={cn("h-1.5 w-1.5 rounded-full", stockStatusColor(product.stock_status))} />
          <span className="font-mono text-[9px] uppercase tracking-techno text-steel-200">
            {stockStatusLabel(product.stock_status)}
          </span>
        </div>

        {/* Brand tag */}
        {product.brand && (
          <div className="absolute top-3 right-3 bg-carbon/80 backdrop-blur-sm px-2 py-1 border border-white/10">
            <span className="font-mono text-[9px] uppercase tracking-techno text-signal">
              {product.brand.name}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col">
        {/* SKU */}
        <span className="sku-tag mb-3 self-start">SKU · {product.sku}</span>

        {/* Nombre */}
        <h3 className="font-display text-base text-surface leading-snug mb-2 line-clamp-2 group-hover:text-signal transition-colors">
          {product.name}
        </h3>

        {/* Short desc */}
        {product.short_desc && (
          <p className="text-xs text-steel-300 line-clamp-2 mb-4">
            {product.short_desc}
          </p>
        )}

        {/* Specs preview */}
        {specEntries.length > 0 && (
          <dl className="space-y-1 mb-4 mt-auto pt-4 border-t border-white/5">
            {specEntries.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 text-[11px]">
                <dt className="font-mono uppercase tracking-techno text-steel-500 capitalize">
                  {k.replace(/_/g, " ")}
                </dt>
                <dd className="font-mono text-steel-200 text-numeric truncate">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Footer CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-xs text-steel-400">
            {product.category?.name ?? "Ver detalle"}
          </span>
          <ArrowUpRight className="h-4 w-4 text-steel-500 group-hover:text-signal transition-colors" />
        </div>
      </div>
    </Link>
    </TiltCard>
  );
}

/** Placeholder cuando no hay imagen — sigue viéndose técnico. */
function PlaceholderPattern() {
  return (
    <div className="text-steel-600 opacity-50">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="4"  x2="40" y2="16" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="64" x2="40" y2="76" stroke="currentColor" strokeWidth="1" />
        <line x1="4"  y1="40" x2="16" y2="40" stroke="currentColor" strokeWidth="1" />
        <line x1="64" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
