"use client";

import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProductWithRelations } from "@/types";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useCart } from "@/components/cart/CartContext";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappQuoteRequest } from "@/lib/whatsapp";

type Props = {
  product: Pick<ProductWithRelations, "id" | "name" | "slug" | "thumbnail_url">;
};

// Botón de WhatsApp por producto — pedido explícito del cliente, indispensable en cada
// ficha. No incluye SKU/código de fabricante en el mensaje, solo el nombre del producto
// (igual que whatsappQuoteRequest en el resto del sitio).
export function QuoteButton({ product }: Props) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleQuoteClick() {
    addItem({
      productId: product.id,
      slug: product.slug,
      sku: product.id,
      name: product.name,
      thumbnailUrl: product.thumbnail_url,
    });
    router.push("/cotizacion");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={whatsappQuoteRequest([{ name: product.name, quantity: 1 }])}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex-1 bg-[#25D366] hover:bg-[#1ebe57] border-[#25D366] hover:border-[#1ebe57]"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Solicitar cotización por WhatsApp
      </a>
      <AddToCartButton product={product} variant="secondary" className="flex-1" />
      <button type="button" onClick={handleQuoteClick} className="btn-secondary flex-1">
        <FileText className="h-4 w-4" />
        Cotización multi-ítem
      </button>
    </div>
  );
}
