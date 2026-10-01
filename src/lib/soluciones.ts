import {
  Wind, Zap, Radar, Gauge, Flame,
  Cylinder, GitFork, Cable, SlidersHorizontal, Waves, Boxes,
  ToggleRight, ShieldAlert, CircleDot, Timer, MoveVertical, Plug,
  ScanLine, Magnet, Thermometer, Activity, Cpu, Droplets,
  Ruler, Hammer, type LucideIcon,
} from "lucide-react";

/**
 * Líneas industriales de Dynatech — fuente única para home, menú, páginas de categoría,
 * sitemap y formulario de cotización.
 *
 * Origen del contenido (no agregar nada fuera de esto sin confirmación del cliente):
 * - Categorías, subcategorías y tipos del catálogo anterior (commit 6178629 y tablas
 *   `categories` / `products.specs` de Supabase, que siguen archivadas).
 * - Descripciones de categoría que ya estaban publicadas en ese catálogo.
 * - Lista de líneas pedida por el cliente el 1-oct-2026.
 * Sin marcas, modelos, precios, inventario ni especificaciones.
 */

export type Subcategoria = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Ejemplos tomados de los tipos que existían en el catálogo. */
  ejemplos?: string[];
  /** Enlace a una página propia (en vez de cotizar directo). */
  href?: string;
  /** CTA alternativo (por defecto "Solicitar cotización"). */
  cta?: "Solicitar cotización" | "Consultar disponibilidad" | "Enviar especificaciones";
};

export type Solucion = {
  slug: string;
  icon: LucideIcon;
  /** Nombre corto (menú, tarjetas, opción del formulario). */
  name: string;
  /** H1 de la página. */
  title: string;
  /** Una línea para tarjetas y menú. */
  short: string;
  /** Párrafo de la página (hero / descripción). */
  description: string;
  metaDescription: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  /** Título del bloque final de cotización. */
  ctaTitle: string;
  /** Ejemplos visibles en la tarjeta del home. */
  ejemplos: string[];
  subcategorias: Subcategoria[];
  aplicaciones: string[];
};

export const SOLUCIONES: Solucion[] = [
  {
    slug: "neumatica",
    icon: Wind,
    name: "Neumática",
    title: "Neumática industrial",
    short: "Cilindros, válvulas, racores, unidades FRL y accesorios para aire comprimido.",
    description:
      "Cilindros, válvulas, actuadores, unidades FRL y accesorios para sistemas de aire comprimido. Además, fabricamos, reparamos y reconstruimos cilindros neumáticos.",
    metaDescription:
      "Neumática industrial en República Dominicana: cilindros, válvulas, racores, unidades FRL, mangueras y accesorios bajo cotización. Fabricación y reparación de cilindros.",
    image: "/banners/neumatica-industrial.jpg",
    imageWidth: 1402,
    imageHeight: 1122,
    ctaTitle: "¿Necesitas un componente neumático?",
    imageAlt: "Componentes de neumática industrial: cilindros, válvulas, racores y unidades FRL",
    ejemplos: ["Cilindros neumáticos", "Válvulas", "Racores", "Unidades FRL", "Kits de sellos"],
    subcategorias: [
      {
        id: "cilindros",
        icon: Cylinder,
        title: "Cilindros neumáticos",
        desc: "Doble y simple efecto, compactos e ISO, en medidas métricas y en pulgadas. También a la medida.",
        href: "/cilindros-neumaticos",
      },
      {
        id: "valvulas",
        icon: GitFork,
        title: "Válvulas neumáticas",
        desc: "Válvulas direccionales y solenoides para controlar el paso del aire.",
        ejemplos: ["2/2", "3/2", "5/2", "5/3", "Descarga rápida", "Cheque"],
      },
      {
        id: "racores",
        icon: Cable,
        title: "Racores y conexiones",
        desc: "Conectores, codos, tés, reguladores de flujo y demás accesorios push-in.",
        ejemplos: ["Conector recto", "Codo", "Unión T", "Unión Y", "Bulkhead", "Regulador de flujo", "Silenciador", "Tapón"],
      },
      {
        id: "frl",
        icon: SlidersHorizontal,
        title: "Unidades FRL y reguladores",
        desc: "Filtros, reguladores y lubricadores para preparar el aire comprimido.",
        ejemplos: ["Unidad FRL", "Unidad FR", "Regulador", "Filtro", "Lubricador"],
      },
      {
        id: "mangueras",
        icon: Waves,
        title: "Mangueras neumáticas",
        desc: "Mangueras de poliuretano, nylon y PVC para sistemas neumáticos.",
      },
      {
        id: "accesorios",
        icon: Boxes,
        title: "Accesorios neumáticos",
        desc: "Componentes de apoyo para cilindros y sistemas neumáticos.",
        ejemplos: ["Actuadores", "Amortiguadores", "Generadores de vacío", "Bases y soportes", "Bobinas", "Manifolds", "Sensores para cilindro"],
      },
      {
        id: "sellos-y-vastagos",
        icon: Ruler,
        title: "Kits de sellos y vástagos cromados",
        desc: "Repuestos para mantener y recuperar cilindros neumáticos.",
        href: "/sellos-y-componentes",
      },
      {
        id: "servicio-cilindros",
        icon: Hammer,
        title: "Fabricación y reparación de cilindros",
        desc: "Fabricación, reparación y reconstrucción, también bajo muestra o plano.",
        href: "/servicios",
      },
    ],
    aplicaciones: [
      "Automatización de máquinas y líneas de producción",
      "Mantenimiento de equipos neumáticos en planta",
      "Reemplazo de cilindros y componentes descontinuados",
      "Sistemas de aire comprimido",
    ],
  },
  {
    slug: "control-electrico",
    icon: Zap,
    name: "Control eléctrico",
    title: "Control eléctrico industrial",
    short: "Contactores, relés, protecciones, mando y señalización para tableros.",
    description:
      "Contactores, relés, protecciones y componentes de tablero para el control y la protección de máquinas y motores.",
    metaDescription:
      "Control eléctrico industrial en República Dominicana: contactores, relés, breakers, fusibles, pulsadores, temporizadores y finales de carrera bajo cotización.",
    image: "/banners/controles-electricos.jpg",
    imageWidth: 1290,
    imageHeight: 1025,
    ctaTitle: "¿Necesitas componentes de control eléctrico?",
    imageAlt: "Componentes de control eléctrico industrial para tablero",
    ejemplos: ["Contactores", "Relés", "Breakers", "Fusibles", "Pulsadores"],
    subcategorias: [
      {
        id: "contactores-y-reles",
        icon: ToggleRight,
        title: "Contactores y relés",
        desc: "Contactores para arranque y control de motores, relés de control y relés térmicos.",
        ejemplos: ["Contactores", "Relés de control", "Unidades térmicas"],
      },
      {
        id: "proteccion",
        icon: ShieldAlert,
        title: "Breakers y protección",
        desc: "Interruptores termomagnéticos, arrancadores manuales y protección de circuitos.",
        ejemplos: ["Breakers", "Arrancadores manuales"],
      },
      {
        id: "fusibles",
        icon: Zap,
        title: "Fusibles y portafusibles",
        desc: "Fusibles industriales, fusibles tipo NH y bases portafusibles.",
        ejemplos: ["Fusibles industriales", "Fusibles NH", "Bases portafusibles"],
        cta: "Consultar disponibilidad",
      },
      {
        id: "mando-y-senalizacion",
        icon: CircleDot,
        title: "Pulsadores, selectores y luces piloto",
        desc: "Mando y señalización para tableros de control.",
      },
      {
        id: "temporizadores",
        icon: Timer,
        title: "Temporizadores, contadores y controladores",
        desc: "Temporizadores, contadores y controladores de temperatura para tablero.",
      },
      {
        id: "interruptores",
        icon: MoveVertical,
        title: "Finales de carrera e interruptores",
        desc: "Interruptores de posición para detectar el recorrido de máquinas.",
        ejemplos: ["Limit switch", "Micro switch"],
      },
      {
        id: "conectores",
        icon: Plug,
        title: "Conectores industriales",
        desc: "Clavijas y conectores para conexión de equipos en planta.",
      },
    ],
    aplicaciones: [
      "Arranque y protección de motores",
      "Tableros de control de máquinas",
      "Mantenimiento eléctrico de planta",
      "Señalización y mando de procesos",
    ],
  },
  {
    slug: "sensores",
    icon: Radar,
    name: "Sensores",
    title: "Sensores industriales",
    short: "Sensores inductivos, capacitivos, fotoeléctricos, magnéticos y de presión.",
    description:
      "Sensores inductivos, capacitivos, fotoeléctricos, magnéticos y de proximidad para detectar piezas, posición y presencia en procesos automatizados.",
    metaDescription:
      "Sensores industriales en República Dominicana: inductivos, capacitivos, fotoeléctricos, fotoceldas, magnéticos, de presión y de temperatura bajo cotización.",
    image: "/banners/sensores-fotoceldas.jpg",
    imageWidth: 1290,
    imageHeight: 945,
    ctaTitle: "¿Necesitas un sensor industrial?",
    imageAlt: "Sensores industriales inductivos y fotoeléctricos",
    ejemplos: ["Inductivos", "Fotoeléctricos", "Capacitivos", "Fotoceldas", "Presión"],
    subcategorias: [
      {
        id: "inductivos",
        icon: CircleDot,
        title: "Sensores inductivos",
        desc: "Detectan objetos metálicos sin contacto. Ideales para posición de piezas y partes de máquina.",
      },
      {
        id: "capacitivos",
        icon: Droplets,
        title: "Sensores capacitivos",
        desc: "Detectan materiales metálicos y no metálicos, como plásticos, líquidos o granulados.",
      },
      {
        id: "fotoelectricos",
        icon: ScanLine,
        title: "Sensores fotoeléctricos y fotoceldas",
        desc: "Detectan presencia mediante un haz de luz. Incluye fotoceldas y barreras ópticas.",
      },
      {
        id: "magneticos",
        icon: Magnet,
        title: "Sensores magnéticos y de proximidad",
        desc: "Detectan la posición del pistón en cilindros y actuadores.",
      },
      {
        id: "presion",
        icon: Gauge,
        title: "Sensores de presión",
        desc: "Switches y transmisores para supervisar la presión del proceso.",
      },
      {
        id: "temperatura",
        icon: Thermometer,
        title: "Sensores de temperatura",
        desc: "Termocuplas y RTD para medir temperatura en equipos y procesos.",
        href: "/resistencias-electricas#termocuplas",
      },
      {
        id: "nivel-y-flujo",
        icon: Activity,
        title: "Sensores de nivel y flujo",
        desc: "Medición de nivel y caudal para procesos industriales.",
        href: "/instrumentacion#flujo",
      },
      {
        id: "accesorios",
        icon: Cpu,
        title: "Amplificadores, módulos y accesorios",
        desc: "Amplificadores, módulos, conectores, cables y soportes para sensores.",
      },
    ],
    aplicaciones: [
      "Detección de piezas en bandas y líneas de producción",
      "Posición de cilindros y actuadores",
      "Conteo y control de presencia",
      "Supervisión de presión y temperatura",
    ],
  },
  {
    slug: "instrumentacion",
    icon: Gauge,
    name: "Instrumentación",
    title: "Instrumentación industrial",
    short: "Medición de presión, temperatura, flujo y nivel para procesos.",
    description: "Medición de presión, temperatura, flujo y nivel para procesos industriales.",
    metaDescription:
      "Instrumentación industrial en República Dominicana: manómetros, interruptores y transmisores de presión, termómetros, termopozos y medición de flujo y nivel bajo cotización.",
    image: "/banners/instrumentacion-procesos.jpg",
    imageWidth: 1290,
    imageHeight: 1009,
    ctaTitle: "¿Necesitas un instrumento de medición?",
    imageAlt: "Instrumentos de medición de presión para procesos industriales",
    ejemplos: ["Manómetros", "Termómetros", "Interruptores de presión", "Flujo", "Nivel"],
    subcategorias: [
      {
        id: "presion",
        icon: Gauge,
        title: "Instrumentación de presión",
        desc: "Manómetros tipo Bourdon, interruptores y transmisores de presión.",
        ejemplos: ["Manómetros", "Interruptores de presión", "Transmisores de presión"],
      },
      {
        id: "temperatura",
        icon: Thermometer,
        title: "Instrumentación de temperatura",
        desc: "Termómetros, termómetros de bolsillo y termopozos.",
        ejemplos: ["Termómetros", "Termopozos", "Termómetros de bolsillo"],
      },
      {
        id: "flujo",
        icon: Activity,
        title: "Medición de flujo",
        desc: "Caudalímetros electromagnéticos, vórtex y coriolis.",
        cta: "Enviar especificaciones",
      },
      {
        id: "nivel",
        icon: Droplets,
        title: "Medición de nivel",
        desc: "Medición de nivel para tanques y procesos.",
        cta: "Enviar especificaciones",
      },
      {
        id: "control",
        icon: Cpu,
        title: "Medición y control",
        desc: "Controladores de temperatura para tablero.",
        href: "/control-electrico#temporizadores",
      },
    ],
    aplicaciones: [
      "Supervisión de presión en líneas y equipos",
      "Control de temperatura en procesos",
      "Medición de caudal y nivel en tanques",
      "Mantenimiento e instrumentación de planta",
    ],
  },
  {
    slug: "resistencias-electricas",
    icon: Flame,
    name: "Resistencias eléctricas",
    title: "Resistencias eléctricas industriales",
    short: "Resistencias de cartucho, termocuplas, RTD y alambre de resistencia.",
    description:
      "Resistencias de cartucho de alta densidad para el calentamiento de cilindros en máquinas de inyección y procesos industriales, junto con termocuplas, RTD y alambre de resistencia. Cotizamos también según tu especificación.",
    metaDescription:
      "Resistencias eléctricas industriales en República Dominicana: resistencias de cartucho, termocuplas, RTD y alambre de resistencia. Cotización bajo especificación.",
    image: "/banners/resistencias-electricas-industriales.jpg",
    imageWidth: 1254,
    imageHeight: 1254,
    ctaTitle: "¿Necesitas una resistencia eléctrica?",
    imageAlt: "Resistencias de cartucho industriales",
    ejemplos: ["Resistencias de cartucho", "Termocuplas", "RTD", "Alambre de resistencia"],
    subcategorias: [
      {
        id: "cartucho",
        icon: Flame,
        title: "Resistencias de cartucho",
        desc: "Alta densidad, para calentamiento de cilindros en máquinas de inyección de plástico.",
      },
      {
        id: "termocuplas",
        icon: Thermometer,
        title: "Termocuplas y RTD",
        desc: "Termocuplas lisas y con rosca, RTD y conectores.",
        ejemplos: ["Termocupla lisa", "Termocupla con rosca", "RTD", "Conectores"],
      },
      {
        id: "alambre",
        icon: Cable,
        title: "Alambre de resistencia",
        desc: "Alambre de resistencia y resistencias planas.",
      },
      {
        id: "a-la-medida",
        icon: Ruler,
        title: "Bajo especificación",
        desc: "Envíanos voltaje, potencia, medidas o una muestra y te cotizamos.",
        cta: "Enviar especificaciones",
      },
    ],
    aplicaciones: [
      "Máquinas de inyección de plástico",
      "Calentamiento de moldes y cilindros",
      "Medición de temperatura en procesos",
      "Reposición de resistencias dañadas",
    ],
  },
];

export function getSolucion(slug: string): Solucion {
  const s = SOLUCIONES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Solución desconocida: ${slug}`);
  return s;
}
