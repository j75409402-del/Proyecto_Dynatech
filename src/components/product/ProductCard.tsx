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

function quickSpecs(specs: ProductWithRelations["specs"]): [string, string][] {
  if (!specs || typeof specs !== "object") return [];
  return Object.entries(specs as Record<string, unknown>)
    .filter(([key, value]) => key !== "configurator" && typeof value === "string" && value.trim() !== "")
    .slice(0, 3)
    .map(([key, value]) => {
      const label = key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
      return [label, value as string];
    });
}

// Orden fijo de la tarjeta (no cambiar): Stock -> Marca -> Imagen -> Nombre ->
// Descripción -> Especificaciones rápidas -> Ver detalles -> Agregar al carrito.
export function ProductCard({ product, className }: Props) {
  const stock = stockDisplay(product.stock_status, product.stock_quantity);
  const specs = quickSpecs(product.specs);
  // Objeto acotado a propósito: el botón (client component) solo recibe lo que
  // necesita para el carrito — nunca el SKU real, así no queda embebido en el
  // HTML/RSC de la tarjeta (ver pedido de ocultar el SKU/código de fabricante).
  const cardProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    thumbnail_url: product.thumbnail_url,
    brand: product.brand,
  };

  return (
    <TiltCard max={4} glare className={cn("h-full", className)}>
      <div
        className={cn(
          "group relative flex h-full flex-col bg-carbon-800 border border-black/5",
          "hover:border-signal hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]",
          "transition-all duration-300",
        )}
      >
        <Link href={`/productos/${product.slug}`} className="flex flex-1 flex-col">
          {/* Stock + Marca */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/5">
            <span className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", stock.dotClass)} />
              <span className="font-mono text-[9px] uppercase tracking-techno text-steel-300">
                {stock.label}
              </span>
            </span>
            {product.brand && (
              <span className="font-mono text-[9px] uppercase tracking-techno text-signal truncate max-w-[45%]">
                {product.brand.name}
              </span>
            )}
          </div>

          {/* Imagen — mismo alto en todas las tarjetas, siempre contain, nunca cover */}
          <div className="relative h-[220px] bg-white border-b border-black/5 overflow-hidden shrink-0">
            {product.thumbnail_url ? (
              <Image
                src={product.thumbnail_url}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 90vw, 320px"
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <PlaceholderPattern />
              </div>
            )}
          </div>

          {/* Nombre, descripción, specs rápidas */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-display text-sm text-surface leading-snug mb-1.5 line-clamp-2 group-hover:text-signal transition-colors">
              {product.name}
            </h3>

            {product.short_desc && (
              <p className="text-xs text-steel-300 line-clamp-2 mb-2">{product.short_desc}</p>
            )}

            {specs.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {specs.map(([label, value]) => (
                  <span
                    key={label}
                    title={`${label}: ${value}`}
                    className="font-mono text-[9px] uppercase tracking-techno text-steel-400 border border-black/10 px-1.5 py-0.5 truncate max-w-[120px]"
                  >
                    {label}: {value}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>

        {/* CTAs — links/botón independientes, no anidados dentro del Link de arriba.
            mt-auto es cinturón-y-tirantes: el Link de arriba ya es flex-1, así que
            estos botones siempre quedan al fondo aunque el contenido varíe de largo. */}
        <div className="relative grid grid-cols-2 gap-2 p-4 pt-0 mt-auto">
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
          <AddToCartButton product={cardProduct} variant="primary" className="text-[10px] gap-1 px-2 py-2.5" />
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
