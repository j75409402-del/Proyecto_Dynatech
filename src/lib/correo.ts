import { CONTACT, SITE } from "@/lib/constants";
import { cleanText } from "@/lib/quote";

/** Asunto fijo: identifica el sitio y la pieza, la línea o la página. */
const PAGE_LABEL: Record<string, string> = {
  "/": "Inicio",
  "/contacto": "Contacto",
  "/nosotros": "Nosotros",
  "/privacidad": "Privacidad",
  "/terminos": "Términos",
  "/garantias": "Garantías",
  "/devoluciones": "Devoluciones",
  "/servicios": "Servicios",
  "/catalogo": "Catálogo",
  "/cilindros-neumaticos": "Cilindros neumáticos",
  "/cilindros-hidraulicos": "Cilindros hidráulicos",
  "/mecanizado": "Mecanizado",
  "/neumatica": "Neumática",
  "/valvulas-neumaticas": "Válvulas neumáticas",
  "/sellos-y-componentes": "Sellos y componentes",
  "/control-electrico": "Control eléctrico",
  "/gabinetes-electricos": "Gabinetes eléctricos",
  "/sensores": "Sensores",
  "/instrumentacion": "Instrumentación",
  "/resistencias-electricas": "Resistencias eléctricas",
};

export function siteHost() {
  try {
    return new URL(SITE.url).hostname.replace(/^www\./, "");
  } catch {
    return "dynatech.com.do";
  }
}

/** Producto o línea si vienen en la URL; si no, el nombre de la página. */
export function quoteTopic(item: string, linea: string, sourcePage: string) {
  const product = cleanText(item, 80);
  const line = cleanText(linea, 80);
  if (product && line && line !== product) return `${product} / ${line}`.slice(0, 80);
  if (product) return product;
  if (line) return line;
  if (PAGE_LABEL[sourcePage]) return PAGE_LABEL[sourcePage];
  if (sourcePage && sourcePage !== "/") return sourcePage.slice(0, 80);
  return "Contacto";
}

export function buildMailto(opts: { item?: string | null; linea?: string | null; sourcePage?: string | null }) {
  const sourcePage = opts.sourcePage || "";
  const topic = quoteTopic(opts.item ?? "", opts.linea ?? "", sourcePage);
  const page = sourcePage || "directo";
  const subject = `Cotización desde ${siteHost()} – ${topic}`;
  const body = `Enviado desde: ${page}\n\nEmpresa:\nPieza/modelo:\nCantidad:\n`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
