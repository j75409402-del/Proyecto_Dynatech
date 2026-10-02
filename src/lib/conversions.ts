export type CommercialEvent = "whatsapp_click" | "phone_click" | "email_click" | "quote_form_open" | "generate_lead";

/** Solo categorías y rutas; nunca mensajes, referencias, teléfonos ni datos del formulario. */
export function trackCommercialEvent(event: CommercialEvent, channel: string, placement?: string) {
  if (typeof window === "undefined" || window.location.pathname.startsWith("/admin")) return;
  const payload = {
    event,
    channel,
    page_path: window.location.pathname,
    ...(placement ? { placement } : {}),
  };
  const target = window as Window & { dataLayer?: Record<string, string>[] };
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("dynatech:conversion", { detail: payload }));
}
