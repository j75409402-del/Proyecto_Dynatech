import { CONTACT } from "./constants";

/**
 * Genera un link de wa.me con mensaje pre-cargado.
 */
export function whatsappLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp}?text=${encoded}`;
}

/**
 * Link genérico — pide de una vez los datos que necesitamos pa' cotizar un cilindro.
 */
export function whatsappGeneral(): string {
  return whatsappLink(`Hola Dynatech, quiero cotizar un cilindro neumático.

Servicio (fabricación / reparación / sellos / vástago):
Medidas o especificaciones:
Cantidad:

(Puedo enviar plano, muestra o fotos)`);
}

/**
 * Link pa' continuar por WhatsApp después de enviar el formulario de cotización.
 */
export function whatsappQuoteFollowUp(quoteNumber: string, companyName: string): string {
  return whatsappLink(
    `Hola Dynatech, acabo de enviar la solicitud de cotización ${quoteNumber} (${companyName}) desde la web. Les comparto los detalles por aquí.`,
  );
}
