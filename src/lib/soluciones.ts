import {
  Wind, Zap, Radar, Gauge, Flame,
  Cylinder, GitFork, Cable, SlidersHorizontal, Waves, Boxes,
  ToggleRight, ShieldAlert, CircleDot, Timer, MoveVertical, Plug,
  ScanLine, Magnet, Thermometer, Cpu, Droplets,
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
  /** Fotografía del tipo de componente; no representa una promesa de existencia. */
  image?: string;
  imageAlt?: string;
  /** "contain" (por defecto) para fotos de catálogo con fondo blanco; "cover" para fotos de ambiente. */
  imageFit?: "contain" | "cover";
  /** Rótulo visible sobre la foto (p. ej. "Imagen de referencia"). */
  imageNote?: string;
  /** Foto de terceros con licencia libre (Wikimedia Commons): autor, licencia y página de origen. */
  credit?: { author: string; license: string; url: string };
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
  /** Grupo de suministro al que pertenece (portada, menú y /catalogo). */
  grupo: GrupoId;
  /**
   * Control, automatización e instrumentación: SOLO suministro (confirmado por el dueño, 15-oct-2026).
   * La página muestra `SOLO_SUMINISTRO`.
   */
  soloSuministro?: boolean;
};

export type GrupoId = "neumatica" | "control" | "automatizacion" | "instrumentacion" | "resistencias";

/** Alcance confirmado por el dueño (15-oct-2026). No anunciar CNC ni servicios en estas líneas. */
export const SOLO_SUMINISTRO =
  "solo suministro. Sin instalación, programación, mantenimiento, tableros ni puesta en marcha.";

/**
 * Oferta de suministro confirmada por el dueño el 15-oct-2026: neumática, control industrial,
 * automatización, instrumentación, resistencias eléctricas y termocuplas. Cada grupo usa solo
 * las líneas y subcategorías ya documentadas en SOLUCIONES (sin productos nuevos).
 */
export const GRUPOS_SUMINISTRO: { id: GrupoId; title: string; desc: string }[] = [
  { id: "neumatica", title: "Neumática", desc: "Válvulas, conexiones, unidades FRL, mangueras, accesorios y repuestos para cilindros." },
  { id: "control", title: "Control industrial", desc: "Contactores, relés, protecciones, mando y señalización, y gabinetes para tableros." },
  { id: "automatizacion", title: "Automatización", desc: "Sensores para detectar piezas, posición y presencia, con sus módulos y accesorios." },
  { id: "instrumentacion", title: "Instrumentación", desc: "Medición de presión y temperatura para procesos." },
  { id: "resistencias", title: "Resistencias y termocuplas", desc: "Resistencias de cartucho, termocuplas, RTD y alambre de resistencia." },
];

/** Información para evaluar solicitudes, sin prometer especificaciones ni disponibilidad. */
export const DATOS_PARA_COTIZAR: Record<string, readonly string[]> = {
  neumatica: ["Código o foto del componente", "Medidas de conexión y rosca, si las conoces", "Aplicación y presión de trabajo conocida"],
  "control-electrico": ["Referencia o foto de la etiqueta", "Tensión y corriente indicadas en el componente", "Función del repuesto en tu equipo o tablero"],
  sensores: ["Referencia y foto de la etiqueta", "Alimentación, conexión y tipo de salida, si los conoces", "Qué detecta el sensor y dónde está instalado"],
  instrumentacion: ["Variable a medir: presión o temperatura", "Rango y unidades requeridos, si están definidos", "Foto, referencia y conexión al proceso"],
  "gabinetes-electricos": ["Medidas: alto × ancho × fondo", "Material y grado de protección (IP o NEMA), si están definidos", "Uso: interior o exterior, y qué va a alojar"],
  "resistencias-electricas": ["Fotos, forma y dimensiones", "Voltaje y potencia indicados, si los conoces", "Aplicación y cantidad requerida"],
};

export const SOLUCIONES: Solucion[] = [
  {
    slug: "neumatica",
    grupo: "neumatica",
    icon: Wind,
    name: "Neumática",
    title: "Neumática industrial",
    short: "Válvulas, FRL, conexiones y mangueras.",
    description: "Componentes de aire comprimido. Código o foto.",
    metaDescription:
      "Neumática industrial en República Dominicana: válvulas, conectores, conexiones, unidades FRL, mangueras, cilindros y accesorios bajo cotización.",
    image: "/studio/linea-neumatica.jpg",
    imageWidth: 1024,
    imageHeight: 1024,
    ctaTitle: "Cotiza neumática",
    imageAlt: "Cilindros neumáticos, manguera y válvula, sin marcas",
    ejemplos: ["Cilindros neumáticos", "Válvulas", "Conectores", "Conexiones", "Unidades FRL", "Kits de sellos"],
    subcategorias: [
      {
        id: "cilindros",
        icon: Cylinder,
        title: "Cilindros neumáticos",
        desc: "Doble y simple efecto, compactos e ISO, en medidas métricas y en pulgadas. También a la medida.",
        image: "/studio/pneu-cilindros.jpg",
        imageAlt: "Cilindros neumáticos de acero, sin marcas",
        href: "/cilindros-neumaticos",
      },
      {
        id: "valvulas",
        icon: GitFork,
        title: "Válvulas neumáticas",
        href: "/valvulas-neumaticas",
        desc: "Válvulas direccionales y solenoides para controlar el paso del aire.",
        image: "/studio/pneu-valvulas.jpg",
        imageAlt: "Válvula solenoide neumática, sin marcas",
        ejemplos: ["2/2", "3/2", "5/2", "5/3", "Descarga rápida", "Cheque"],
      },
      {
        id: "conexiones",
        icon: Cable,
        title: "Conexiones",
        desc: "Conectores, codos, tés, reguladores de flujo y demás accesorios push-in.",
        image: "/products/fittings-neumaticos.jpg",
        imageAlt: "Conexiones neumáticas: conectores rectos, codos y uniones",
        ejemplos: ["Conectores", "Conector recto", "Codo", "Unión T", "Unión Y", "Bulkhead", "Regulador de flujo", "Silenciador", "Tapón"],
      },
      {
        id: "conexiones-rapidas",
        icon: Plug,
        title: "Conexiones rápidas",
        desc: "Acople rápido para manguera y herramienta. Código o foto.",
        image: "/studio/pneu-conexiones.jpg",
        imageAlt: "Conexiones rápidas neumáticas, sin marcas",
      },
      {
        id: "frl",
        icon: SlidersHorizontal,
        title: "Unidades FRL y reguladores",
        desc: "Filtros, reguladores y lubricadores para preparar el aire comprimido.",
        image: "/studio/pneu-frl.jpg",
        imageAlt: "Unidad FRL neumática, sin marcas",
        ejemplos: ["Unidad FRL", "Unidad FR", "Regulador", "Filtro", "Lubricador"],
      },
      {
        id: "mangueras",
        icon: Waves,
        title: "Mangueras neumáticas",
        desc: "Mangueras de poliuretano, nylon y PVC para sistemas neumáticos.",
        image: "/studio/pneu-mangueras.jpg",
        imageAlt: "Manguera neumática azul, sin marcas",
      },
      {
        id: "controles-neumaticos",
        icon: Gauge,
        title: "Controles neumáticos",
        desc: "Reguladores, válvulas manuales, silenciadores y reguladores de caudal.",
        image: "/studio/pneu-controles.jpg",
        imageAlt: "Regulador, válvula manual, silenciador y regulador de caudal, sin marcas",
      },
      {
        id: "accesorios",
        icon: Boxes,
        title: "Accesorios neumáticos",
        desc: "Componentes de apoyo para cilindros y sistemas neumáticos.",
        image: "/products/accesorios-neumaticos-todos.jpg",
        imageAlt: "Accesorios para cilindros y sistemas neumáticos",
        ejemplos: ["Actuadores", "Amortiguadores", "Generadores de vacío", "Bases y soportes", "Bobinas", "Manifolds", "Sensores para cilindro"],
      },
      {
        id: "sellos-y-vastagos",
        icon: Ruler,
        title: "Kits de sellos y vástagos cromados",
        desc: "Repuestos para mantener y recuperar cilindros neumáticos.",
        href: "/sellos-y-componentes",
        image: "/products/kit-sello-cilindro-neumatico.jpg",
        imageAlt: "Kit de sellos para cilindro neumático",
      },
      {
        id: "servicio-cilindros",
        icon: Hammer,
        title: "Reparación de cilindros",
        desc: "Reparación y reconstrucción de cilindros neumáticos, con prueba de funcionamiento antes de entregar.",
        href: "/servicios",
        // WEB-011: foto real del caso antes/después (antes era el hero de /servicios).
        image: "/cilindros/antes-cilindro-iso-32mm.jpg",
        imageAlt: "Cilindro neumático ISO 32 mm con corrosión, antes de su reparación en el taller",
        imageFit: "cover",
      },
    ],
    aplicaciones: [
      "Automatización de máquinas y líneas de producción",
      "Repuestos para equipos neumáticos en planta",
      "Reemplazo de cilindros y componentes descontinuados",
      "Sistemas de aire comprimido",
    ],
  },
  {
    slug: "control-electrico",
    grupo: "control",
    soloSuministro: true,
    icon: Zap,
    name: "Control eléctrico",
    title: "Control eléctrico industrial",
    short: "Contactores, relés y protecciones.",
    description: "Componentes de tablero. Referencia o foto.",
    metaDescription:
      "Controles eléctricos industriales en República Dominicana: cotiza contactores, relés, breakers, fusibles, pulsadores y temporizadores con referencia o foto.",
    image: "/studio/linea-control.jpg",
    imageWidth: 1024,
    imageHeight: 1024,
    ctaTitle: "Cotiza control eléctrico",
    imageAlt: "Contactores, breaker y pulsadores, sin marcas",
    ejemplos: ["Contactores", "Relés", "Breakers", "Fusibles", "Pulsadores"],
    subcategorias: [
      {
        id: "contactores-y-reles",
        icon: ToggleRight,
        title: "Contactores y relés",
        desc: "Contactores para arranque y control de motores, relés de control y relés térmicos.",
        image: "/products/contactor-trifasico.jpg",
        imageAlt: "Contactor trifásico para control de motores",
        ejemplos: ["Contactores", "Relés de control", "Unidades térmicas"],
      },
      {
        id: "proteccion",
        icon: ShieldAlert,
        title: "Breakers y protección",
        desc: "Interruptores termomagnéticos, arrancadores manuales y protección de circuitos.",
        image: "/products/arrancadores-manuales-telemecanique.jpg",
        imageAlt: "Arrancadores manuales para protección de motores",
        ejemplos: ["Breakers", "Arrancadores manuales"],
      },
      {
        id: "fusibles",
        icon: Zap,
        title: "Fusibles y portafusibles",
        desc: "Fusibles industriales, fusibles tipo NH y bases portafusibles.",
        image: "/products/fusibles-tipo-nh.jpg",
        imageAlt: "Fusibles industriales tipo NH",
        ejemplos: ["Fusibles industriales", "Fusibles NH", "Bases portafusibles"],
        cta: "Consultar disponibilidad",
      },
      {
        id: "mando-y-senalizacion",
        icon: CircleDot,
        title: "Pulsadores, selectores y luces piloto",
        desc: "Mando y señalización para tableros de control.",
        image: "/products/pulsadores-selectores-autonics.jpg",
        imageAlt: "Pulsadores, selectores y paro de emergencia para tablero",
      },
      {
        id: "temporizadores",
        icon: Timer,
        title: "Temporizadores, contadores y controladores",
        desc: "Temporizadores, contadores y controladores de temperatura para tablero.",
        image: "/products/temporizadores-autonics.jpg",
        imageAlt: "Temporizador analógico para tablero de control",
      },
      {
        id: "interruptores",
        icon: MoveVertical,
        title: "Finales de carrera e interruptores",
        image: "/referencia/final-de-carrera.jpg",
        imageAlt: "Final de carrera con palanca de rodillo instalado en una estructura",
        imageNote: "Foto de referencia",
        imageFit: "cover",
        credit: { author: "S.J. de Waard", license: "CC BY 2.5", url: "https://commons.wikimedia.org/wiki/File:Eindschakelaar_op_de_Mallegatsluis_in_Gouda.JPG" },
        desc: "Interruptores de posición para detectar el recorrido de máquinas.",
        ejemplos: ["Limit switch", "Micro switch"],
      },
      {
        id: "conectores",
        icon: Plug,
        title: "Conectores industriales",
        desc: "Clavijas y conectores para conexión de equipos en planta.",
        image: "/products/conectores-industriales-harting.jpg",
        imageAlt: "Clavijas y bases de conexión industrial",
      },
    ],
    aplicaciones: [
      "Arranque y protección de motores",
      "Tableros de control de máquinas",
      "Repuestos eléctricos para la planta",
      "Señalización y mando de procesos",
    ],
  },
  {
    // WEB-020 (05-oct-2026): el Capitán confirmó SOLO el suministro de gabinetes (no fabricación ni armado).
    slug: "gabinetes-electricos",
    grupo: "control",
    soloSuministro: true,
    icon: Boxes,
    name: "Gabinetes eléctricos",
    title: "Gabinetes eléctricos",
    short: "Gabinetes y cajas para tableros.",
    description: "Solo suministro. Cotiza con medidas y uso.",
    metaDescription:
      "Suministro de gabinetes eléctricos en República Dominicana: cajas y gabinetes para tableros de control y distribución. Cotiza con medidas y uso.",
    image: "/studio/linea-gabinetes.jpg",
    imageWidth: 1024,
    imageHeight: 1024,
    ctaTitle: "Cotiza un gabinete",
    imageAlt: "Gabinete eléctrico de acero con la puerta abierta, sin marcas",
    ejemplos: ["Gabinetes para tablero", "Cajas eléctricas"],
    subcategorias: [
      {
        id: "gabinetes-para-tablero",
        icon: Boxes,
        title: "Gabinetes para tableros",
        desc: "Gabinetes para alojar tableros de control, protección o distribución de máquinas y planta.",
        image: "/studio/gabinete-tablero.jpg",
        imageAlt: "Interior de un gabinete con borneras y cableado, sin marcas",
        imageFit: "cover",
      },
      {
        id: "cajas-electricas",
        icon: Plug,
        title: "Cajas eléctricas",
        image: "/studio/caja-industrial.jpg",
        imageAlt: "Caja eléctrica industrial con prensaestopas, sin marcas",
        imageFit: "cover",
        desc: "Cajas para conexión, paso o mando en campo, según las medidas y el uso que nos indiques.",
        cta: "Enviar especificaciones",
      },
    ],
    aplicaciones: [
      "Tableros de control de máquinas",
      "Distribución y protección eléctrica en planta",
      "Reemplazo de gabinetes dañados",
      "Ampliaciones de tableros existentes",
    ],
  },
  {
    slug: "sensores",
    grupo: "automatizacion",
    soloSuministro: true,
    icon: Radar,
    name: "Sensores",
    title: "Sensores industriales",
    short: "Inductivos, fotoeléctricos y de presión.",
    description: "Detección de piezas y posición. Solo suministro.",
    metaDescription:
      "Sensores industriales en República Dominicana: inductivos, capacitivos, fotoeléctricos, fotoceldas, magnéticos, de presión y de temperatura bajo cotización.",
    image: "/studio/linea-sensores.jpg",
    imageWidth: 1024,
    imageHeight: 1024,
    ctaTitle: "Cotiza un sensor",
    imageAlt: "Sensores industriales y conector, sin marcas",
    ejemplos: ["Inductivos", "Fotoeléctricos", "Capacitivos", "Fotoceldas", "Presión"],
    subcategorias: [
      {
        id: "inductivos",
        icon: CircleDot,
        title: "Sensores inductivos",
        desc: "De M8 a M30, PNP o NPN, NO/NC, con cable o conector M12. Detectan objetos metálicos sin contacto.",
        image: "/products/sensores-inductivos.jpg",
        imageAlt: "Sensor inductivo cilíndrico con cable",
      },
      {
        id: "capacitivos",
        icon: Droplets,
        title: "Sensores capacitivos",
        desc: "Detectan materiales metálicos y no metálicos, como plásticos, líquidos o granulados.",
        image: "/products/sensor-capacitivo.png",
        imageAlt: "Sensor capacitivo de cuerpo roscado",
      },
      {
        id: "fotoelectricos",
        icon: ScanLine,
        title: "Sensores fotoeléctricos y fotoceldas",
        desc: "De todo tipo: difusos, de barrera, retrorreflectivos y de fibra óptica.",
        image: "/products/sensores-fotoelectricos.jpg",
        imageAlt: "Sensores fotoeléctricos de emisor y receptor",
      },
      {
        id: "magneticos",
        icon: Magnet,
        title: "Sensores magnéticos y de proximidad",
        desc: "Detectan la posición del pistón en cilindros y actuadores.",
        image: "/products/sensor-magnetico.png",
        imageAlt: "Sensor magnético para ranura de cilindro",
      },
      {
        id: "presion",
        icon: Gauge,
        title: "Sensores de presión",
        desc: "Switches y transmisores para supervisar la presión del proceso.",
        image: "/products/interruptores-presion-smc.jpg",
        imageAlt: "Interruptor de presión digital",
      },
      {
        id: "temperatura",
        icon: Thermometer,
        title: "Sensores de temperatura",
        desc: "Termocuplas tipo J y K, y sondas RTD PT100.",
        href: "/resistencias-electricas#termocuplas",
      },
      {
        id: "accesorios",
        icon: Cpu,
        title: "Amplificadores, módulos y accesorios",
        desc: "Amplificadores, módulos, conectores, cables y soportes para sensores.",
        image: "/products/accesorios-sensores.jpg",
        imageAlt: "Cables, conectores y soportes para sensores",
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
    grupo: "instrumentacion",
    soloSuministro: true,
    icon: Gauge,
    name: "Instrumentación",
    title: "Instrumentación industrial",
    short: "Presión y temperatura.",
    description: "Manómetros, transmisores y termómetros.",
    metaDescription:
      "Instrumentación industrial en República Dominicana: manómetros, transmisores e interruptores de presión, termómetros y termopozos.",
    image: "/studio/linea-instrumentacion.jpg",
    imageWidth: 1024,
    imageHeight: 1024,
    ctaTitle: "Cotiza instrumentación",
    imageAlt: "Manómetro y sonda de temperatura, sin marcas",
    ejemplos: ["Manómetros", "Termómetros", "Interruptores de presión", "Termopozos"],
    subcategorias: [
      {
        id: "presion",
        icon: Gauge,
        title: "Instrumentación de presión",
        desc: "Manómetros tipo Bourdon, interruptores y transmisores de presión.",
        image: "/products/brand-wika-manometro.png",
        imageAlt: "Manómetro tipo Bourdon con conexión inferior",
        ejemplos: ["Manómetros", "Interruptores de presión", "Transmisores de presión"],
      },
      {
        id: "temperatura",
        icon: Thermometer,
        title: "Instrumentación de temperatura",
        desc: "Termómetros, termómetros de bolsillo y termopozos.",
        image: "/products/temperatura-teltru.jpg",
        imageAlt: "Termómetros bimetálicos y termómetro de bolsillo",
        ejemplos: ["Termómetros", "Termopozos", "Termómetros de bolsillo"],
      },
      {
        id: "control",
        icon: Cpu,
        title: "Medición y control",
        desc: "Controladores de temperatura para tablero.",
        image: "/products/controladores-temperatura-autonics.jpg",
        imageAlt: "Controlador digital de temperatura para tablero",
        href: "/control-electrico#temporizadores",
      },
    ],
    aplicaciones: [
      "Supervisión de presión en líneas y equipos",
      "Control de temperatura en procesos",
      "Reposición de instrumentos en planta",
    ],
  },
  {
    slug: "resistencias-electricas",
    grupo: "resistencias",
    icon: Flame,
    name: "Resistencias eléctricas",
    title: "Resistencias y termocuplas",
    short: "Cartucho, termocuplas y RTD.",
    description: "Calentamiento y medición. También bajo especificación.",
    metaDescription:
      "Resistencias eléctricas industriales en República Dominicana: de cartucho, termocuplas, RTD y alambre de resistencia. Cotización bajo especificación.",
    image: "/studio/linea-resistencias.jpg",
    imageWidth: 1024,
    imageHeight: 1024,
    ctaTitle: "Cotiza resistencias",
    imageAlt: "Resistencias de cartucho y termocupla, sin marcas",
    ejemplos: ["Resistencias de cartucho", "Termocuplas", "RTD", "Alambre de resistencia"],
    subcategorias: [
      {
        id: "cartucho",
        icon: Flame,
        title: "Resistencias de cartucho",
        desc: "Alta densidad, para calentamiento de cilindros en máquinas de inyección de plástico.",
        image: "/products/resistencia-de-cartucho-real.jpg",
        imageAlt: "Resistencia de cartucho con cables de salida",
      },
      {
        id: "termocuplas",
        icon: Thermometer,
        title: "Termocuplas",
        image: "/studio/termocupla.jpg",
        imageAlt: "Termocupla roscada de acero, sin marcas",
        imageFit: "cover",
        desc: "Termocuplas tipo J y K, lisas y con conexión roscada, con sus conectores.",
        ejemplos: ["Termocupla lisa", "Termocupla con rosca", "Conectores"],
      },
      {
        id: "rtd",
        icon: Thermometer,
        title: "Sondas RTD",
        image: "/studio/sonda-rtd.jpg",
        imageAlt: "Sonda RTD de acero, sin marcas",
        imageFit: "cover",
        desc: "Sondas RTD PT100 para medir temperatura en equipos y procesos.",
      },
      {
        id: "alambre",
        icon: Cable,
        title: "Alambre de resistencia",
        image: "/studio/alambre-resistencia.jpg",
        imageAlt: "Carrete de alambre de resistencia, sin marcas",
        imageFit: "cover",
        desc: "Alambre de resistencia y resistencias planas.",
      },
      {
        id: "a-la-medida",
        icon: Ruler,
        title: "Bajo especificación",
        desc: "Se consiguen o se mandan a fabricar. Envíanos voltaje, potencia, medidas o una muestra.",
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

/** Primera foto de la línea que todavía no está en `usadas`. */
export function fotoLibre(s: Solucion, usadas: ReadonlySet<string>): string | undefined {
  const candidatas = [s.image, ...s.subcategorias.flatMap((sub) => (sub.image ? [sub.image] : []))];
  return candidatas.find((src) => !usadas.has(src));
}
