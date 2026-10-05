import { CONTACT, SITE } from "./constants";

/**
 * Flujo principal de cotización (decisión del dueño, 4-oct-2026): toda solicitud de
 * cotización pasa por `/cotizacion`, que mide el clic y redirige a WhatsApp Business
 * con un mensaje precargado. El formulario por correo quedó retirado como CTA.
 */

export type QuoteTemplate = "general" | "item" | "cilindro" | "solucion";

/** Producto/servicio por página de origen (solo rutas comerciales públicas). */
export const PRODUCT_BY_PATH: Record<string, string> = {
  "/": "inicio",
  "/cilindros-neumaticos": "cilindros_neumaticos",
  "/cilindros-hidraulicos": "cilindros_hidraulicos",
  "/mecanizado": "mecanizado",
  "/servicios": "servicios_cilindros",
  "/sellos-y-componentes": "sellos_y_componentes",
  "/valvulas-neumaticas": "valvulas_neumaticas",
  "/neumatica": "neumatica",
  "/control-electrico": "control_electrico",
  "/sensores": "sensores",
  "/instrumentacion": "instrumentacion",
  "/resistencias-electricas": "resistencias_electricas",
  "/contacto": "contacto",
  "/nosotros": "nosotros",
};

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** Texto corto y seguro para mensaje y analítica: sin saltos, sin controles, máx. 90. */
export function cleanText(value: string | null | undefined, max = 90): string {
  return (value ?? "").replace(/[\u0000-\u001f\u007f<>]|\p{Cf}/gu, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Solo la ruta (sin query ni hash) y solo si es del propio sitio. */
export function cleanPath(value: string | null | undefined): string {
  if (!value) return "";
  try {
    const url = new URL(value, SITE.url);
    const own = new URL(SITE.url);
    if (url.hostname !== own.hostname && url.hostname !== own.hostname.replace(/^www\./, "") && !["localhost", "127.0.0.1"].includes(url.hostname)) return "";
    return url.pathname.startsWith("/admin") ? "" : url.pathname.slice(0, 120);
  } catch {
    return "";
  }
}

export function slug(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 60);
}

/** Producto/servicio: el ítem explícito manda; si no, la línea; si no, la página de origen. */
export function productFor(item: string, linea: string, sourcePage: string, tpl: QuoteTemplate): string {
  if (item) return slug(item);
  if (linea) return slug(linea);
  if (tpl === "cilindro") return "cilindros_neumaticos";
  return PRODUCT_BY_PATH[sourcePage] ?? (sourcePage ? slug(sourcePage) : "general");
}

export function buildQuoteMessage(opts: { tpl: QuoteTemplate; item?: string; linea?: string; sourcePage?: string }): string {
  const item = cleanText(opts.item);
  const linea = cleanText(opts.linea);
  const origin = opts.sourcePage ? `\n\n(Desde ${SITE.url.replace(/^https?:\/\//, "")}${opts.sourcePage === "/" ? "" : opts.sourcePage})` : "";
  if (opts.tpl === "cilindro" && !item) {
    return `Hola Dynatech, necesito cotizar la reparación / fabricación de un cilindro neumático.\n\nMarca/modelo (si lo tengo):\nProblema o especificación:\nCantidad:${origin}`;
  }
  if (item || linea) {
    const details = item ? [item, linea && linea !== item ? `Línea: ${linea}` : ""].filter(Boolean).join(" · ") : linea;
    return `Hola Dynatech, solicito cotización sobre ${details}.\n\nProducto, código o especificaciones:\nCantidad:${origin}`;
  }
  return `Hola Dynatech, quisiera solicitar una cotización.\n\nProducto o servicio:\nCantidad:${origin}`;
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Enlace interno de cotización (mide y redirige). `from`/UTM los añade el navegador al hacer clic. */
export function quoteBridgeHref(opts: { tpl?: QuoteTemplate; item?: string; linea?: string } = {}): string {
  const params = new URLSearchParams();
  if (opts.item) params.set("item", cleanText(opts.item));
  if (opts.linea) params.set("linea", cleanText(opts.linea));
  if (opts.tpl && opts.tpl !== "general" && opts.tpl !== "item") params.set("tpl", opts.tpl);
  const q = params.toString();
  return `/cotizacion${q ? `?${q}` : ""}`;
}
