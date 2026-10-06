export const SITE = {
  name: "Dynatech Ingeniería",
  legalName: "Dynatech Ingeniería SRL",
  shortName: "Dynatech",
  tagline: "Cilindros neumáticos · Fabricación y reparación",
  brandTagline: "Excellent Under Pressure.",
  description:
    "Fabricación, reparación y reconstrucción de cilindros neumáticos en República Dominicana. Como servicios complementarios, cilindros hidráulicos, mecanizado y suministros de neumática, control eléctrico, sensores, instrumentación y resistencias eléctricas bajo cotización.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dynatech.com.do",
  rnc: "133-45350-9",
} as const;

/** Enlace uniforme al correo de contacto publicado por la empresa. */
export function emailHref(subject?: string) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${CONTACT.email}${query}`;
}

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "18092844336",
  whatsappDisplay: "+1 (809) 284-4336",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "dynatechsrl@outlook.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+1 (809) 284-4336",
  address: "Av. Rómulo Betancourt, Santo Domingo, República Dominicana",
  streetAddress: "Av. Rómulo Betancourt",
  locality: "Santo Domingo",
  hours: "Lunes a Viernes · 8:00 AM - 5:00 PM · Sábado · 8:00 AM - 12:00 PM",
} as const;

/** Umami Cloud (sin cookies). El ID es público; el envío servidor de /cotizacion usa la API /api/send. */
export const ANALYTICS = {
  // NEXT_PUBLIC_DISABLE_ANALYTICS=1 (solo vistas previas locales) evita contaminar las métricas de producción.
  umamiWebsiteId: process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === "1" ? "" : "4bbea860-f2e7-4268-9476-190563eeab0a",
  umamiScriptUrl: "https://cloud.umami.is/script.js",
  umamiApiUrl: process.env.UMAMI_API_URL ?? "https://cloud.umami.is/api/send",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/dynatech_ingenieria",
  linkedin: "https://linkedin.com/company/dynatech-do",
} as const;

export const NAV = {
  /** Va después del desplegable "Soluciones" (que se arma desde src/lib/soluciones.ts). */
  main: [
    { label: "Cilindros", short: "Cilindros", href: "/cilindros-neumaticos" },
    { label: "Servicios",            short: "Servicios", href: "/servicios" },
    { label: "Nosotros",             short: "Nosotros",  href: "/nosotros" },
    { label: "Contacto",             short: "Contacto",  href: "/contacto" },
  ],
  /** Grupo de cilindros dentro del desplegable. */
  cilindros: [
    { label: "Cilindros neumáticos", href: "/cilindros-neumaticos" },
    { label: "Reparación de cilindros", href: "/servicios" },
    { label: "Sellos y componentes", href: "/sellos-y-componentes" },
  ],
  /** Servicios industriales y especialidades con página propia (menú y pie). */
  especialidades: [
    { label: "Válvulas neumáticas", href: "/valvulas-neumaticas" },
    { label: "Cilindros hidráulicos", href: "/cilindros-hidraulicos" },
    { label: "Mecanizado", href: "/mecanizado" },
  ],
  cta: { label: "Solicitar cotización", href: "/cotizacion" },
} as const;
