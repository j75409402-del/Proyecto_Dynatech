"use client";

import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProductWithRelations } from "@/types";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useCart } from "@/components/cart/CartContext";

type Props = {
  product: Pick<ProductWithRelations, "id" | "name" | "slug" | "thumbnail_url" | "brand">;
};

// El botón de WhatsApp de este componente se quitó a propósito — el sitio mantiene un
// único acceso principal a WhatsApp en el header (ver Navbar). Acá quedan agregar al
// carrito y el botón a la cotización multi-ítem (distinto del formulario inline de un
// solo producto que ya está más abajo en la misma página). No usa un <Link> con el SKU
// en la URL a propósito — agrega al carrito de cotización y navega sin query params.
export function QuoteButton({ product }: Props) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleQuoteClick() {
    addItem({
      productId: product.id,
      slug: product.slug,
      sku: product.id,
      name: product.name,
      brand: product.brand?.name ?? null,
      thumbnailUrl: product.thumbnail_url,
    });
    router.push("/cotizacion");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <AddToCartButton product={product} variant="primary" className="flex-1" />
      <button type="button" onClick={handleQuoteClick} className="btn-secondary flex-1">
        <FileText className="h-4 w-4" />
        Cotización multi-ítem
      </button>
    </div>
  );
}
