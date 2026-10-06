import { CONTACT } from "./constants";
import { quoteBridgeHref } from "./quote";

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

/** Cotización de cilindros: pasa por /cotizacion (medición) y abre WhatsApp. */
export function whatsappCylinderService(): string {
  return quoteBridgeHref({ tpl: "cilindro" });
}

/** "Quiero cotizar" genérico: pasa por /cotizacion. */
export function whatsappGeneral(): string {
  return quoteBridgeHref();
}

/** Cotizar dentro de una línea industrial (Neumática, Sensores, etc.). */
export function whatsappSolucion(linea: string): string {
  return quoteBridgeHref({ linea, tpl: "solucion" });
}

/**
 * CTA secundario "WhatsApp" (WEB-020, decisión del Capitán 05-oct): chat directo para consultas.
 * Es wa.me con el número oficial de CONTACT; CommercialTracking lo mide como `whatsapp_click`.
 * El CTA principal "Solicitar cotización" sigue pasando por /cotizacion (quote_whatsapp_click).
 */
export function whatsappChat(): string {
  return whatsappLink("Hola Dynatech, tengo una consulta.");
}
