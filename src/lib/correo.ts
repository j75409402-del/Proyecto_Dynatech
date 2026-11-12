import { CONTACT, SITE } from "@/lib/constants";

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
  // Línea retirada (12-nov-2026). Un enlace viejo no debe nombrarla.
  "/gabinetes-electricos": "Control eléctrico",
  "/sensores": "Sensores",
  "/instrumentacion": "Instrumentación",
  "/resistencias-electricas": "Resistencias eléctricas",
  "/breakers": "Breakers",
  "/aplicaciones": "Aplicaciones",
};

/** Nombre visible de la página de origen. Vacío si no hay ruta. */
export function pageLabel(sourcePage: string): string {
  const path = sourcePage.split("?")[0].replace(/\/$/, "") || "/";
  if (path === "/") return PAGE_LABEL["/"] ?? "Inicio";
  if (PAGE_LABEL[path]) return PAGE_LABEL[path];
  const slug = path.replace(/^\//, "").split("/")[0] ?? "";
  if (!slug) return "Sitio";
  return slug.replace(/-/g, " ").replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("es"));
}

export function siteHost() {
  try {
    return new URL(SITE.url).hostname.replace(/^www\./, "");
  } catch {
    return "dynatech.com.do";
  }
}

export function buildMailto(opts: { item?: string | null; linea?: string | null; sourcePage?: string | null }) {
  const sourcePage = opts.sourcePage || "";
  const label = sourcePage ? pageLabel(sourcePage) : "Sitio";
  const host = siteHost();
  const subject = `Cotización – ${label} (web)`;
  const body = label === "Sitio"
    ? `Hola, vengo de ${host} y quiero cotizar:`
    : `Hola, vengo de la página de ${label} en ${host} y quiero cotizar:`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
