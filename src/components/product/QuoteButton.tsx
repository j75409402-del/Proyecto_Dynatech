"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import type { ProductWithRelations } from "@/types";
import { whatsappProductInquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

type Props = {
  product: Pick<ProductWithRelations, "id" | "sku" | "name" | "slug" | "thumbnail_url" | "brand">;
};

export function QuoteButton({ product }: Props) {
  return (
    <div className="space-y-3">
      <AddToCartButton product={product} variant="primary" className="w-full sm:w-auto" />
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={whatsappProductInquiry(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Cotizar por WhatsApp
        </a>
        <Link
          href={`/cotizacion?sku=${encodeURIComponent(product.sku)}&nombre=${encodeURIComponent(product.name)}`}
          className="btn-secondary flex-1"
        >
          <FileText className="h-4 w-4" />
          Formulario formal
        </Link>
      </div>
    </div>
  );
}
