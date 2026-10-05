export type CommercialEvent = "whatsapp_click" | "quote_whatsapp_click" | "phone_click" | "email_click" | "quote_form_open" | "generate_lead";

/** Atributos permitidos: categorías, rutas y UTM. Nunca mensajes, referencias, teléfonos ni datos del formulario. */
export type CommercialExtra = Partial<Record<"source_page" | "product" | "line" | "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content", string>>;

export function trackCommercialEvent(event: CommercialEvent, channel: string, placement?: string, extra: CommercialExtra = {}) {
  if (typeof window === "undefined" || window.location.pathname.startsWith("/admin")) return;
  const payload = {
    event,
    channel,
    page_path: window.location.pathname,
    ...(placement ? { placement } : {}),
    ...extra,
  };
  const target = window as Window & { dataLayer?: Record<string, string>[] };
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("dynatech:conversion", { detail: payload }));
}
