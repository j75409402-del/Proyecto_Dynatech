import { CONTACT, SITE } from "./constants";
import type { Product, QuoteItem } from "@/types";

/**
 * Genera un link de wa.me con mensaje pre-cargado.
 */
export function whatsappLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp}?text=${encoded}`;
}

/**
 * Link pa' consultar sobre un producto específico.
 */
export function whatsappProductInquiry(product: Pick<Product, "sku" | "name">): string {
  const msg = `Hola Dynatech, quisiera cotizar:

*${product.name}*
SKU: ${product.sku}

Mi consulta:`;
  return whatsappLink(msg);
}

/**
 * Link pa' cotización de múltiples ítems.
 */
export function whatsappQuoteRequest(items: QuoteItem[], companyName?: string): string {
  const itemsList = items
    .map((it, i) => `${i + 1}. ${it.name}\n   SKU: ${it.sku} — Cantidad: ${it.quantity}`)
    .join("\n\n");

  const msg = `Hola Dynatech, solicito cotización${companyName ? ` para ${companyName}` : ""}:

${itemsList}

Quedo pendiente. Gracias.`;

  return whatsappLink(msg);
}

/**
 * Link genérico "quiero cotizar".
 */
export function whatsappGeneral(): string {
  return whatsappLink(`Hola Dynatech, me interesa recibir información sobre sus productos. Vengo desde ${SITE.url}`);
}
