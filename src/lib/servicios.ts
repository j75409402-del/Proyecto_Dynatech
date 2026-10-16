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

/**
 * Oferta confirmada por el dueño el 2-oct-2026; en oct-2026 pasa a ser prioridad comercial junto a
 * los cilindros neumáticos. No implica capacidad, stock, tolerancias ni plazo específico.
 */
export const SERVICIOS_ADICIONALES = [
  {
    slug: "cilindros-hidraulicos",
    name: "Cilindros hidráulicos",
    title: "Fabricación y reparación de cilindros hidráulicos en República Dominicana",
    /** H1 corto (el title SEO no cambia). */
    h1: "Cilindros hidráulicos: fabricación y reparación",
    description: "Reparación y fabricación de cilindros hidráulicos en República Dominicana. Envía fotos, plano o muestra por WhatsApp y te cotizamos.",
    intro: "Reparamos cilindros hidráulicos con fugas o daños y fabricamos cilindros nuevos a partir de tu plano, una muestra o tus medidas. Atendemos empresas, industrias y zonas francas en República Dominicana.",
    lead: "Empieza con fotos del cilindro o el plano. Si falta algún dato, te lo pedimos por el mismo chat.",
    situations: ["Reparar un cilindro hidráulico", "Fabricar un cilindro hidráulico"],
    situationDescs: ["Cuéntanos qué falla y envía fotos del cilindro completo, sus conexiones y puntos de montaje.", "Envía el plano, la muestra o las medidas con sus unidades, y para qué equipo es."],
    services: ["hidraulico-reparar", "hidraulico-fabricar"],
    information: ["Fotos del cilindro completo, sus conexiones y puntos de montaje", "Qué falla o qué trabajo necesitas", "Plano, muestra o medidas disponibles, con sus unidades", "Equipo o aplicación donde trabaja", "Cantidad, ciudad y fecha en que lo necesitas"],
    note: "Con las fotos orientamos la cotización. El alcance exacto de una reparación se confirma al revisar el cilindro en el taller.",
    procesos: [],
  },
  {
    slug: "mecanizado",
    name: "Mecanizado",
    title: "Mecanizado industrial en República Dominicana",
    h1: "Mecanizado de piezas con torno y fresadora",
    description: "Mecanizado de piezas con torno y fresadora bajo plano o muestra en Santo Domingo, República Dominicana. Envía el plano o fotos de la pieza por WhatsApp y te cotizamos.",
    intro: "Fabricamos piezas industriales con torno y fresadora a partir de tu plano o de una muestra: piezas nuevas o repuestos que ya no consigues, en la cantidad que necesitas.",
    lead: "Envía el plano, o fotos de la pieza con una referencia de tamaño, el material si lo conoces y la cantidad.",
    situations: ["Tengo el plano", "Tengo la pieza o una muestra"],
    situationDescs: ["Envía el plano en PDF o una foto legible, con medidas y unidades; material y tolerancias, si están definidos, y la cantidad.", "Envía fotos de la pieza junto a una regla o cinta métrica y cuéntanos qué función cumple. Si hace falta la muestra física, te lo decimos."],
    services: ["mecanizado", "mecanizado"],
    information: ["Plano, o fotos de la pieza con una referencia de tamaño", "Medidas y unidades; tolerancias solo si están definidas en tu plano", "Material, si lo conoces o está especificado", "Cantidad de piezas y para qué equipo son", "Ciudad y fecha en que las necesitas"],
    note: "Si no tienes plano, con fotos y la descripción de la función empezamos. Si hace falta la muestra física u otra medida, te lo decimos antes de cotizar.",
    /**
     * Torno y fresadora confirmados por el dueño (15-oct-2026). NO anunciar CNC. Los ejemplos
     * describen el tipo de pieza de cada proceso; la factibilidad se confirma al cotizar.
     */
    procesos: [
      { title: "Torno", text: "Piezas cilíndricas o de revolución: ejes, bujes, pasadores, espaciadores y piezas con rosca." },
      { title: "Fresadora", text: "Piezas planas o de bloque: placas, soportes, bases y bridas, con ranuras, chaveteros, escalones o agujeros." },
      { title: "Bajo plano o muestra", text: "Con tu plano cotizamos según sus medidas y especificaciones. Con una muestra, tomamos las medidas de la pieza original." },
    ],
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
