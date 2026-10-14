import { CONTACT, SITE } from "./constants";

/**
 * Flujo principal de cotización (decisión del dueño, 4-oct-2026): toda solicitud de
 * cotización pasa por `/cotizacion`, que mide el clic y redirige a WhatsApp Business
 * con un mensaje precargado. El formulario por correo quedó retirado como CTA.
 */

export type QuoteTemplate = "general" | "item" | "cilindro" | "solucion";

/**
 * Cotización por necesidad (mejora de conversión, oct-2026). Cada servicio lleva su propio
 * mensaje corto de WhatsApp y su clave de medición (`service` en Umami, sin datos personales).
 * Todos permiten empezar con una foto: no exigen medidas.
 */
export const QUOTE_SERVICES = {
  "neumatico-reparar": {
    product: "reparacion_cilindro_neumatico",
    message: "Hola Dynatech, quiero cotizar la reparación de un cilindro neumático. Les envío fotos del cilindro y de su placa.\n\nQué falla (fuga, golpe, no avanza…):\nCantidad:",
  },
  "neumatico-fabricar": {
    product: "fabricacion_cilindro_neumatico",
    message: "Hola Dynatech, quiero cotizar la fabricación de un cilindro neumático. Les envío el plano, una foto o la muestra.\n\nDiámetro x carrera (si lo tengo):\nCantidad:",
  },
  hidraulico: {
    product: "cilindro_hidraulico",
    message: "Hola Dynatech, quiero cotizar un cilindro hidráulico. Les envío fotos del cilindro o el plano.\n\n¿Reparar o fabricar?:\nCantidad:",
  },
  "hidraulico-reparar": {
    product: "reparacion_cilindro_hidraulico",
    message: "Hola Dynatech, quiero cotizar la reparación de un cilindro hidráulico. Les envío fotos del cilindro, sus conexiones y montajes.\n\nQué falla:\nCantidad:",
  },
  "hidraulico-fabricar": {
    product: "fabricacion_cilindro_hidraulico",
    message: "Hola Dynatech, quiero cotizar la fabricación de un cilindro hidráulico. Les envío el plano, una foto o la muestra.\n\nAplicación del equipo:\nCantidad:",
  },
  mecanizado: {
    product: "mecanizado",
    message: "Hola Dynatech, quiero cotizar el mecanizado de una pieza. Les envío el plano o fotos de la muestra con una referencia de tamaño.\n\nMaterial (si lo sé):\nCantidad:",
  },
  componente: {
    product: "componente_neumatico",
    message: "Hola Dynatech, busco un componente neumático (válvula, conexión, FRL u otro). Les envío el código o una foto de la placa.\n\nCantidad:",
  },
  foto: {
    product: "identificar_por_foto",
    message: "Hola Dynatech, no tengo la referencia. Les envío fotos de la pieza (y de su placa, si tiene) para que me ayuden a identificarla.\n\nQué hace en la máquina:\nCantidad:",
  },
} as const;

export type QuoteService = keyof typeof QUOTE_SERVICES;

export function isQuoteService(value: string | null | undefined): value is QuoteService {
  return !!value && Object.prototype.hasOwnProperty.call(QUOTE_SERVICES, value);
}

/** Servicio por defecto según la página de origen (CTA genéricos, botón flotante). */
export const SERVICE_BY_PATH: Record<string, QuoteService> = {
  "/servicios": "neumatico-reparar",
  "/cilindros-hidraulicos": "hidraulico",
  "/cilindros-neumaticos": "neumatico-fabricar",
  "/mecanizado": "mecanizado",
  "/neumatica": "componente",
  "/valvulas-neumaticas": "componente",
  "/sellos-y-componentes": "componente",
};

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

/** Producto/servicio: el servicio elegido manda; luego el ítem, la línea y la página de origen. */
export function productFor(item: string, linea: string, sourcePage: string, tpl: QuoteTemplate, svc?: string | null): string {
  if (isQuoteService(svc)) return QUOTE_SERVICES[svc].product;
  if (item) return slug(item);
  if (linea) return slug(linea);
  if (tpl === "cilindro") return "cilindros_neumaticos";
  return PRODUCT_BY_PATH[sourcePage] ?? (sourcePage ? slug(sourcePage) : "general");
}

export function buildQuoteMessage(opts: { tpl: QuoteTemplate; item?: string; linea?: string; sourcePage?: string; svc?: string | null }): string {
  const item = cleanText(opts.item);
  const linea = cleanText(opts.linea);
  const origin = opts.sourcePage ? `\n\n(Desde ${SITE.url.replace(/^https?:\/\//, "")}${opts.sourcePage === "/" ? "" : opts.sourcePage})` : "";
  if (isQuoteService(opts.svc)) {
    // Un ítem concreto (p. ej. "Válvulas direccionales") se añade como referencia.
    const [intro, ...fields] = QUOTE_SERVICES[opts.svc].message.split("\n\n");
    return [intro, item ? `Sobre: ${item}` : "", ...fields].filter(Boolean).join("\n\n") + origin;
  }
  // Cilindros (AP-007): pedir los datos mínimos para cotizar en el primer mensaje.
  // Oct-2026: preguntas mínimas (se completan en la conversación); se empieza con una foto.
  const cylinderFields = `¿Fabricar o reparar?:\nCantidad:\n\nLes envío fotos del cilindro y su placa, o el plano.`;
  if (opts.tpl === "cilindro" && !item) {
    return `Hola Dynatech, necesito cotizar la reparación o fabricación de un cilindro neumático.\n\n${cylinderFields}${origin}`;
  }
  if (item || linea) {
    const details = item ? [item, linea && linea !== item ? `Línea: ${linea}` : ""].filter(Boolean).join(" · ") : linea;
    const fields = /cilindro/i.test(details) ? cylinderFields : `Código o referencia (o les envío una foto):\nCantidad:`;
    return `Hola Dynatech, solicito cotización sobre ${details}.\n\n${fields}${origin}`;
  }
  return `Hola Dynatech, quisiera cotizar. Les envío una foto, el código o el plano.\n\nQué necesito:\nCantidad:${origin}`;
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Enlace interno de cotización (mide y redirige). `from`/UTM los añade el navegador al hacer clic. */
export function quoteBridgeHref(opts: { tpl?: QuoteTemplate; item?: string; linea?: string; svc?: QuoteService } = {}): string {
  const params = new URLSearchParams();
  if (opts.svc) params.set("svc", opts.svc);
  if (opts.item) params.set("item", cleanText(opts.item));
  if (opts.linea) params.set("linea", cleanText(opts.linea));
  if (opts.tpl && opts.tpl !== "general" && opts.tpl !== "item") params.set("tpl", opts.tpl);
  const q = params.toString();
  return `/cotizacion${q ? `?${q}` : ""}`;
}
