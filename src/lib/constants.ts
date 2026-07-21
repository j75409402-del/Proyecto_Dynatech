export const SITE = {
  name: "Dynatech Ingeniería",
  shortName: "Dynatech",
  tagline: "Piezas industriales que mantienen tu planta corriendo.",
  description:
    "Distribuidor B2B de neumática, automatización, instrumentación y sensores industriales en República Dominicana.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dynatech.com.do",
  rnc: "133-45350-9",
} as const;

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "18092844336",
  whatsappDisplay: "+1 (809) 284-4336",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "cotizaciones.dynatech@outlook.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+1 (809) 284-4336",
  address: "Av. Rómulo Betancourt, Santo Domingo, República Dominicana",
  hours: "Lunes a Viernes · 8:00 AM - 5:30 PM",
} as const;

export const SOCIAL = {
  instagram: "https://instagram.com/dynatech.do",
  linkedin: "https://linkedin.com/company/dynatech-do",
  facebook: "https://facebook.com/dynatech.do",
} as const;

export const NAV = {
  main: [
    { label: "Catálogo",    href: "/productos" },
    { label: "Categorías",  href: "/#categorias" },
    { label: "Marcas",      href: "/#marcas" },
    { label: "Cilindros", href: "/reparacion-cilindros-neumaticos" },
    { label: "Nosotros",    href: "/nosotros" },
    { label: "Contacto",    href: "/contacto" },
  ],
} as const;

export const VALUE_PROPS = [
  {
    number: "01",
    title: "Productos originales",
    body: "Distribución directa de fabricantes: Festo, SMC, Siemens, Omron. Cero réplicas.",
  },
  {
    number: "02",
    title: "Importación internacional",
    body: "Lo que no está en catálogo lo importamos bajo pedido desde EE.UU., Europa y Asia.",
  },
  {
    number: "03",
    title: "Atención personalizada",
    body: "Un equipo que conoce tu operación, no un formulario genérico que nadie lee.",
  },
  {
    number: "04",
    title: "Soporte técnico",
    body: "Ingenieros que dimensionan, cotizan y resuelven — no un catálogo que se navega solo.",
  },
  {
    number: "05",
    title: "Cotizaciones rápidas",
    body: "Envías tu lista, recibes precios y disponibilidad en menos de un día hábil.",
  },
  {
    number: "06",
    title: "Soluciones industriales",
    body: "Neumática, instrumentación, sensores y control eléctrico bajo un mismo proveedor.",
  },
] as const;
