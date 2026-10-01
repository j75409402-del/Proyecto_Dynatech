export const SITE = {
  name: "Dynatech Ingeniería",
  shortName: "Dynatech",
  tagline: "Cilindros neumáticos a la medida",
  description:
    "Fabricación, reparación y reconstrucción de cilindros neumáticos para aplicaciones industriales en República Dominicana. Trabajamos bajo cotización.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dynatech.com.do",
  rnc: "133-45350-9",
} as const;

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "18092844336",
  whatsappDisplay: "+1 (809) 284-4336",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "dynatechsrl@outlook.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+1 (809) 284-4336",
  address: "Av. Rómulo Betancourt, Santo Domingo, República Dominicana",
  hours: "Lunes a Viernes · 8:30 AM - 5:00 PM",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/dynatech_ingenieria",
  linkedin: "https://linkedin.com/company/dynatech-do",
} as const;

export const NAV = {
  main: [
    { label: "Inicio",               href: "/" },
    { label: "Cilindros neumáticos", href: "/cilindros-neumaticos" },
    { label: "Servicios",            href: "/servicios" },
    { label: "Sellos y componentes", href: "/sellos-y-componentes" },
    { label: "Nosotros",             href: "/nosotros" },
  ],
  quote: { label: "Solicita tu cotización", href: "/cotizacion" },
} as const;

/** Lo que el cliente nos puede enviar para cotizar — se repite en Home, Cilindros y Cotización. */
export const INPUTS = ["Plano", "Muestra", "Medidas", "Fotos", "Especificaciones"] as const;

/** Flujo de trabajo bajo pedido. */
export const PROCESS = [
  { title: "Nos envías la pieza o los datos", body: "Plano, muestra, medidas, fotos o especificaciones." },
  { title: "Cotizamos", body: "Revisamos la información y te enviamos precio y tiempo de entrega." },
  { title: "Fabricamos o importamos", body: "Ejecutamos el trabajo una vez aprobada la cotización." },
  { title: "Entregamos", body: "Recibes la pieza lista para instalar." },
] as const;
