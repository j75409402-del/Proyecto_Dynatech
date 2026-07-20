import { CONTACT, SITE } from "./constants";

/**
 * Genera un link de wa.me con mensaje pre-cargado.
 */
export function whatsappLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp}?text=${encoded}`;
}

type QuoteMessageItem = {
  name: string;
  sku?: string;
  quantity: number;
  notes?: string;
};

/**
 * Link pa' cotización de múltiples ítems.
 */
export function whatsappQuoteRequest(items: QuoteMessageItem[], companyName?: string): string {
  const itemsList = items
    .map((it, i) => {
      const meta = [it.sku && `SKU: ${it.sku}`, `Cantidad: ${it.quantity}`].filter(Boolean).join(" — ");
      const lines = [`${i + 1}. ${it.name}`, `   ${meta}`];
      if (it.notes) lines.push(`   Notas: ${it.notes}`);
      return lines.join("\n");
    })
    .join("\n\n");

  const msg = `Hola Dynatech, solicito cotización${companyName ? ` para ${companyName}` : ""}:

${itemsList}

Quedo pendiente. Gracias.`;

  return whatsappLink(msg);
}

/**
 * Link pa' solicitar la importación de un producto que no está en catálogo.
 */
export function whatsappImportRequest(): string {
  const msg = `Hola Dynatech, no encontré en el catálogo un producto que necesito y quisiera que me ayuden a importarlo.

Número de parte / modelo / fabricante:
(o adjunto una foto del producto)

Cantidad:`;
  return whatsappLink(msg);
}

/**
 * Link genérico "quiero cotizar".
 */
export function whatsappGeneral(): string {
  return whatsappLink(`Hola Dynatech, me interesa recibir información sobre sus productos. Vengo desde ${SITE.url}`);
}
