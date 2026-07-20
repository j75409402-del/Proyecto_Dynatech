import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProductWithRelations } from "@/types";
import { stockDisplay, cn } from "@/lib/utils";
import { TiltCard } from "@/components/motion/TiltCard";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export function ProductCard({ product, className }: Props) {
  const stock = stockDisplay(product.stock_status, product.stock_quantity);

  return (
    <TiltCard max={4} glare className={className}>
      <div
        className={cn(
          "group relative flex h-full flex-col bg-carbon-800 border border-black/5",
          "hover:border-signal/50 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]",
          "transition-all duration-300",
        )}
      >
        <Link href={`/productos/${product.slug}`} className="flex flex-1 flex-col">
          {/* Imagen */}
          <div className="relative aspect-[4/3] bg-carbon-700 border-b border-black/5 overflow-hidden">
            {product.thumbnail_url ? (
              <Image
                src={product.thumbnail_url}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 22vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <PlaceholderPattern />
              </div>
            )}

            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-carbon/80 backdrop-blur-sm px-2 py-1 border border-black/10">
              <span className={cn("h-1.5 w-1.5 rounded-full", stock.available ? "bg-emerald-500" : "bg-signal")} />
              <span className="font-mono text-[9px] uppercase tracking-techno text-steel-200">
                {stock.label}
              </span>
            </div>

            {product.brand && (
              <div className="absolute top-3 right-3 bg-carbon/80 backdrop-blur-sm px-2 py-1 border border-black/10">
                <span className="font-mono text-[9px] uppercase tracking-techno text-signal">
                  {product.brand.name}
                </span>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="p-4 flex-1 flex flex-col">
            <span className="sku-tag mb-2.5 self-start">SKU · {product.sku}</span>

            <h3 className="font-display text-sm text-surface leading-snug mb-1.5 line-clamp-2 group-hover:text-signal transition-colors">
              {product.name}
            </h3>

            {product.short_desc && (
              <p className="text-xs text-steel-300 line-clamp-2">{product.short_desc}</p>
            )}
          </div>
        </Link>

        {/* CTAs — links/botón independientes, no anidados dentro del Link de arriba */}
        <div className="relative grid grid-cols-2 gap-2 p-4 pt-0">
          <Link
            href={`/productos/${product.slug}`}
            className="relative z-10 flex items-center justify-center gap-1.5 border border-black/10
                       hover:border-signal hover:text-signal
                       text-steel-300 text-xs font-medium uppercase tracking-wider py-2.5
                       transition-colors duration-200"
          >
            Ver detalles
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <AddToCartButton product={product} variant="primary" className="text-[10px] gap-1 px-2 py-2.5" />
        </div>
      </div>
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
