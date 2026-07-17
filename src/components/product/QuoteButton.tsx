"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types";
import { whatsappProductInquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type Props = {
  product: Pick<Product, "id" | "sku" | "name">;
};

export function QuoteButton({ product }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={whatsappProductInquiry(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex-1"
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
  );
}
