import { CONTACT } from "./constants";
import { quoteBridgeHref, type QuoteService } from "./quote";

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

/** Cotización por necesidad (reparar, fabricar, mecanizar, componente, foto): mensaje propio y medición por servicio. */
export function whatsappService(svc: QuoteService, item?: string): string {
  return quoteBridgeHref({ svc, item });
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
 * Chat directo (wa.me) para consultas que no son cotización (garantías, devoluciones, contacto).
 * Oct-2026: ya no se usa como botón contiguo al CTA «Cotizar por WhatsApp» (parecían dos procesos
 * distintos para el mismo canal). CommercialTracking lo mide como `whatsapp_click`.
 */
export function whatsappChat(): string {
  return whatsappLink("Hola Dynatech, tengo una consulta.");
}
