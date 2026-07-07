export const SITE = {
  name: "Dynatech Ingeniería",
  shortName: "Dynatech",
  tagline: "Piezas industriales que mantienen tu planta corriendo.",
  description:
    "Distribuidor B2B de neumática, automatización, instrumentación y sensores industriales en República Dominicana.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dynatech.do",
} as const;

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "18095551234",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ventas@dynatech.do",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+1 (809) 555-1234",
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
    { label: "Nosotros",    href: "/nosotros" },
    { label: "Contacto",    href: "/contacto" },
  ],
} as const;

export const VALUE_PROPS = [
  {
    number: "01",
    title: "Inventario local",
    body: "Stock disponible en Santo Domingo. Sin esperas de importación pa' repuestos críticos.",
  },
  {
    number: "02",
    title: "Marcas originales",
    body: "Distribución directa de fabricantes: Festo, SMC, Siemens, Omron. Cero replicas.",
  },
  {
    number: "03",
    title: "Soporte técnico",
    body: "Ingenieros que dimensionan, cotizan y resuelven — no un catálogo que se navega solo.",
  },
  {
    number: "04",
    title: "Cotización 24 h",
    body: "Envías tu lista, recibes precios y disponibilidad en menos de un día hábil.",
  },
] as const;
