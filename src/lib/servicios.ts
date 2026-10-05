import { SOLUCIONES } from "@/lib/soluciones";
import { Factory, Wrench, RotateCcw, FileText, ShieldCheck, Ruler, PackageCheck, Settings2, type LucideIcon } from "lucide-react";

export type Oferta = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Página donde se detalla. */
  href: string;
};

/**
 * Lista comercial de Dynatech (dada por el cliente). Las descripciones salen del contenido
 * que ya estaba publicado en la página de cilindros — no agregar servicios que no estén aquí.
 */
export const SERVICIOS: Oferta[] = [
  {
    id: "fabricacion",
    icon: Factory,
    title: "Fabricación de cilindros neumáticos",
    desc: "Fabricación de cilindros completos a medida, incluso cuando el original ya no está disponible.",
    href: "/cilindros-neumaticos",
  },
  {
    id: "reparacion",
    icon: Wrench,
    title: "Reparación de cilindros neumáticos",
    desc: "Diagnóstico y reparación completa, con repuesto de calidad y prueba de funcionamiento antes de la entrega.",
    href: "/servicios#reparacion",
  },
  {
    id: "reconstruccion",
    icon: RotateCcw,
    title: "Reconstrucción de cilindros",
    desc: "Desarme completo, reemplazo de los componentes dañados, ensamblaje con las tolerancias correctas y prueba.",
    href: "/servicios#reconstruccion",
  },
  {
    id: "bajo-muestra-o-plano",
    icon: FileText,
    title: "Fabricación bajo muestra o plano",
    desc: "Fabricamos a partir de una muestra física o de tus especificaciones técnicas.",
    href: "/cilindros-neumaticos",
  },
  {
    id: "cambio-de-sellos",
    icon: ShieldCheck,
    title: "Cambio de sellos",
    desc: "Reemplazo de sellos por repuesto de calidad para eliminar fugas de aire.",
    href: "/servicios#cambio-de-sellos",
  },
  {
    id: "personalizados",
    icon: Settings2,
    title: "Cilindros neumáticos personalizados",
    desc: "Cilindros fabricados según las medidas y especificaciones de tu aplicación.",
    href: "/cilindros-neumaticos",
  },
];

export const COMPONENTES: Oferta[] = [
  {
    id: "kits-de-sellos",
    icon: PackageCheck,
    title: "Kits de sellos",
    desc: "Kits de sellos para la reparación y el mantenimiento de cilindros neumáticos.",
    href: "/sellos-y-componentes#kits-de-sellos",
  },
  {
    id: "vastagos",
    icon: Ruler,
    title: "Vástagos y barras cromadas",
    desc: "Vástagos cromados fabricados a medida, con el acabado y la tolerancia del original.",
    href: "/sellos-y-componentes#vastagos",
  },
];

/** Oferta confirmada por el dueño el 2-oct-2026. No implica capacidad, stock ni plazo específico. */
export const SERVICIOS_ADICIONALES = [
  {
    slug: "cilindros-hidraulicos",
    name: "Cilindros hidráulicos",
    title: "Fabricación y reparación de cilindros hidráulicos en República Dominicana",
    /** H1 corto (el title SEO no cambia). */
    h1: "Cilindros hidráulicos: fabricación y reparación",
    description: "Solicita cotización para fabricar o reparar un cilindro hidráulico. Comparte fotos, plano o muestra, las medidas disponibles y la aplicación del equipo.",
    intro: "¿Necesitas reparar un cilindro hidráulico o cotizar su fabricación? En Dynatech Ingeniería SRL recibimos solicitudes de empresas, industrias y zonas francas en República Dominicana. Cuéntanos qué necesita tu equipo para evaluar el trabajo y preparar la cotización.",
    situations: ["Reparación de un cilindro hidráulico existente", "Fabricación de un cilindro hidráulico a partir de la información de tu proyecto"],
    situationDescs: ["Describe la falla que observas y envía fotos del cilindro completo, sus conexiones y puntos de montaje.", "Comparte el plano, la muestra o las medidas con sus unidades, y la aplicación del equipo."],
    information: ["Fotos del cilindro completo, sus conexiones y puntos de montaje", "Descripción de la falla o del trabajo que necesitas", "Plano, muestra o medidas disponibles, indicando las unidades", "Aplicación del equipo y condiciones de operación conocidas", "Cantidad, ciudad y fecha en que necesitas el trabajo"],
    note: "Si el cilindro presenta fugas o dejó de funcionar, describe lo que observas. La reparación necesaria y su alcance se confirman después de evaluar el caso; las fotos por sí solas no sustituyen una inspección.",
  },
  {
    slug: "mecanizado",
    name: "Mecanizado",
    title: "Mecanizado industrial en República Dominicana",
    h1: "Mecanizado industrial bajo plano o muestra",
    description: "Cotiza trabajos de mecanizado industrial con Dynatech. Envía plano, muestra, medidas y cantidad para evaluar tu solicitud en República Dominicana.",
    intro: "Cotiza el mecanizado de una pieza para tu empresa o industria. Envíanos la información disponible del trabajo: el plano o la muestra, las medidas, la cantidad y la aplicación. Evaluamos cada solicitud antes de confirmar su alcance.",
    situations: ["Un trabajo de mecanizado definido en un plano", "Una pieza de referencia o muestra para evaluar el trabajo requerido"],
    situationDescs: ["Envía el plano con medidas y unidades; material y tolerancias, si están definidos.", "Comparte fotos con una referencia de tamaño y explica qué función cumple la pieza."],
    information: ["Plano o fotos de la pieza y una referencia de tamaño", "Medidas y unidades; tolerancias solo si están definidas en tu plano", "Material requerido, si lo conoces o está especificado", "Cantidad de piezas y aplicación", "Ciudad y fecha requerida para coordinar la solicitud"],
    note: "Si no tienes plano, comparte fotos y explica qué función cumple la pieza. Confirmaremos qué información adicional o muestra hace falta antes de cotizar; el proceso y la viabilidad se evalúan según el trabajo.",
  },
] as const;

/** Opciones del formulario de cotización, agrupadas (mismo orden que la oferta comercial). */
export const GRUPOS_DE_SOLICITUD = [
  {
    label: "Cilindros neumáticos",
    options: [
      ...SERVICIOS.map((s) => s.title),
      ...COMPONENTES.map((c) => c.title),
      "Componentes bajo medida (camisa, tapa, pistón)",
    ],
  },
  { label: "Soluciones industriales", options: SOLUCIONES.map((s) => s.name) },
  { label: "Otros servicios industriales", options: SERVICIOS_ADICIONALES.map((s) => s.name) },
];

export const TIPOS_DE_SOLICITUD: readonly string[] = [
  ...GRUPOS_DE_SOLICITUD.flatMap((g) => g.options),
  "Otro",
];
