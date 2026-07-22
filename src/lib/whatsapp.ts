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
  quantity: number;
  notes?: string;
};

/**
 * Link pa' cotización de múltiples ítems. A propósito no incluye SKU/código de
 * fabricante en el mensaje — el nombre del ítem ya trae la variante configurada
 * (ej. "Cilindro Neumático ISO 15552 · 32 mm · 100 mm") y eso alcanza para que
 * el equipo de Dynatech identifique qué cotizar; el código real, si hace falta,
 * se busca en el panel admin.
 */
export function whatsappQuoteRequest(items: QuoteMessageItem[], companyName?: string): string {
  const itemsList = items
    .map((it, i) => {
      const meta = `Cantidad: ${it.quantity}`;
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
 * Link pa' consultar sobre reparación/fabricación de cilindros neumáticos.
 */
export function whatsappCylinderService(): string {
  const msg = `Hola Dynatech, tengo un cilindro neumático que necesito reparar / fabricar.

Marca/modelo (si lo tengo):
Problema o especificación:`;
  return whatsappLink(msg);
}

/**
 * Link genérico "quiero cotizar".
 */
export function whatsappGeneral(): string {
  return whatsappLink(`Hola Dynatech, me interesa recibir información sobre sus productos. Vengo desde ${SITE.url}`);
}
