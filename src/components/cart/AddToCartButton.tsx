"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types";

type Props = {
  product: Pick<ProductWithRelations, "id" | "slug" | "sku" | "name" | "thumbnail_url" | "brand">;
  /** Pa' productos configurables (ej. cilindro ISO) — pisa sku/nombre con la variante elegida. */
  overrideSku?: string;
  overrideName?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function AddToCartButton({ product, overrideSku, overrideName, className, variant = "secondary" }: Props) {
  const { addItem, isInCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const sku = overrideSku ?? product.sku;
  const inCart = isInCart(sku);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      sku,
      name: overrideName ?? product.name,
      brand: product.brand?.name ?? null,
      thumbnailUrl: product.thumbnail_url,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  const base =
    "relative z-10 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200";

  const variants = {
    primary: "btn-primary w-full py-2.5",
    secondary: cn(
      "w-full border py-2.5",
      inCart || justAdded
        ? "border-emerald-500/50 text-emerald-500"
        : "border-black/10 text-steel-300 hover:border-signal hover:bg-signal hover:text-white",
    ),
    ghost: "btn-ghost",
  };

  return (
    <button type="button" onClick={handleClick} className={cn(base, variants[variant], className)}>
      {justAdded ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Agregado
        </>
      ) : inCart ? (
        <>
          <Check className="h-3.5 w-3.5" />
          En el carrito · agregar otro
        </>
      ) : (
        <>
          <ShoppingCart className="h-3.5 w-3.5" />
          Agregar al carrito
        </>
      )}
    </button>
  );
}
