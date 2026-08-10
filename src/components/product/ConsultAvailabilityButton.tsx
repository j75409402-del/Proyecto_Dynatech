import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappQuoteRequest } from "@/lib/whatsapp";

/**
 * Único CTA para familias sin stock/carrito (ej. Cilindros American, Fusibles) — pedido
 * explícito: "Mostrar únicamente el botón [label]". El texto es configurable porque distintas
 * categorías piden distinto wording ("Consultar disponibilidad" vs "Solicitar cotización").
 */
export function ConsultAvailabilityButton({
  productName,
  label = "Consultar disponibilidad",
}: {
  productName: string;
  label?: string;
}) {
  return (
    <a
      href={whatsappQuoteRequest([{ name: productName, quantity: 1 }])}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary bg-[#25D366] hover:bg-[#1ebe57] border-[#25D366] hover:border-[#1ebe57]"
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  );
}
