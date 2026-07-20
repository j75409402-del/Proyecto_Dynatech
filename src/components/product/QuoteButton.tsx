"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import type { ProductWithRelations } from "@/types";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

type Props = {
  product: Pick<ProductWithRelations, "id" | "sku" | "name" | "slug" | "thumbnail_url" | "brand">;
};

// El botón de WhatsApp de este componente se quitó a propósito — el sitio mantiene un
// único acceso principal a WhatsApp en el header (ver Navbar). Acá quedan agregar al
// carrito y el link al formulario de cotización multi-ítem (distinto del formulario
// inline de un solo producto que ya está más abajo en la misma página).
export function QuoteButton({ product }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <AddToCartButton product={product} variant="primary" className="flex-1" />
      <Link
        href={`/cotizacion?sku=${encodeURIComponent(product.sku)}&nombre=${encodeURIComponent(product.name)}`}
        className="btn-secondary flex-1"
      >
        <FileText className="h-4 w-4" />
        Cotización multi-ítem
      </Link>
    </div>
  );
}
