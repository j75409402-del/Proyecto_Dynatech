export const SITE = {
  name: "Dynatech Ingeniería",
  legalName: "Dynatech Ingeniería SRL",
  shortName: "Dynatech",
  tagline: "Cilindros neumáticos · Fabricación y reparación",
  brandTagline: "Excellent Under Pressure.",
  description:
    "Fabricación y reparación de cilindros neumáticos e hidráulicos y mecanizado de piezas con torno y fresadora en República Dominicana. Suministro de neumática, control industrial, automatización, instrumentación, resistencias eléctricas y termocuplas bajo cotización.",
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
  /** Segundo teléfono, solo llamadas (confirmado por el dueño, 15-oct-2026). WhatsApp sigue en `whatsapp`. */
  phone2: "+1 (809) 854-2800",
  address: "Av. Rómulo Betancourt, Santo Domingo, República Dominicana",
  streetAddress: "Av. Rómulo Betancourt",
  locality: "Santo Domingo",
  hours: "Lunes a Viernes · 8:00 AM - 5:00 PM · Sábado · 8:00 AM - 12:00 PM",
} as const;

/** Teléfonos de llamadas, en orden: principal y secundario. */
export const CALL_PHONES = [CONTACT.phone, CONTACT.phone2] as const;

/** Enlace tel: sin espacios ni signos de formato. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Umami Cloud (sin cookies). El ID es público; el envío servidor de /cotizacion usa la API /api/send. */
export const ANALYTICS = {
  // NEXT_PUBLIC_DISABLE_ANALYTICS=1 (pruebas locales y entorno Preview de Vercel, desde 15-oct-2026) evita contaminar las métricas de producción.
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
  /** Taller (oct-2026: lo que más se quiere vender hoy, agrupado por necesidad). */
  cilindros: [
    { label: "Reparación de cilindros", href: "/servicios" },
    { label: "Cilindros neumáticos a la medida", href: "/cilindros-neumaticos" },
    { label: "Cilindros hidráulicos", href: "/cilindros-hidraulicos" },
    { label: "Mecanizado de piezas", href: "/mecanizado" },
  ],
  /** Componentes neumáticos con página propia (menú y pie). */
  especialidades: [
    { label: "Válvulas neumáticas", href: "/valvulas-neumaticas" },
    { label: "Sellos y componentes", href: "/sellos-y-componentes" },
  ],
  cta: { label: "Cotizar por WhatsApp", href: "/cotizacion" },
} as const;
