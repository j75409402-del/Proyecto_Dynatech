import type { ReferenceTableColumn, ReferenceTableFilter } from "@/components/product/ReferenceTable";

/**
 * Categorías que además de su ficha de producto normal (galería, WhatsApp, etc.) muestran
 * una tabla de referencias completa (buscador + orden + stock) leída desde
 * specs.<specsKey> del producto que sostiene los datos.
 */
export const TABLE_CATEGORIES: Record<
  string,
  {
    holderSlug: string;
    specsKey: string;
    columns: ReferenceTableColumn[];
    searchKeys: string[];
    searchPlaceholder: string;
    filterKey?: string;
    /** Varios filtros simultáneos (ej. Cilindros: Diámetro + Carrera + Marca). Solo se declara
     * para categorías cuyas filas ya traen esos campos estructurados. */
    filters?: ReferenceTableFilter[];
    /** Default false en todo el catálogo (sin excepción): sin columna de stock ni carrito,
     * solo botón único "Consultar disponibilidad" (ver ctaLabel). true = excepción explícita
     * que sí muestra stock real — no usar salvo pedido explícito del cliente. */
    showStock?: boolean;
    /** Texto del botón único. Default: "Consultar disponibilidad". */
    ctaLabel?: string;
  }
> = {
  "resistencias-maquinas-inyeccion-plastico": {
    holderSlug: "resistencia-maquina-inyeccion-plastico",
    specsKey: "resistencias",
    columns: [
      { key: "medida", label: "Medida" },
      { key: "potencia", label: "Potencia" },
      { key: "voltaje", label: "Voltaje" },
    ],
    searchKeys: ["medida"],
    searchPlaceholder: "Buscar por medida (ej. 1-1/2 x 3/4)...",
    filterKey: "voltaje",
    showStock: false,
  },
  // "Automatización Industrial Autonics" y "Sensores Autonics" eran cajones de sastre que
  // mezclaban varias familias reales (temporizadores, contadores, luces piloto, pulsadores/
  // selectores, controladores de temperatura / inductivos, capacitivos, fotoeléctricos) —
  // se separaron en una categoría/holder por familia real (ver más abajo).
  // Controles Eléctricos: cada tipo (Temporizadores, Contadores, etc.) ahora tiene un hijo de
  // marca explícito ("Autonics"/"Harting") aunque hoy sea la única marca — pedido del cliente,
  // mismo patrón Tipo -> Marca que Neumática, listo para sumar otras marcas sin reconstruir.
  "temporizadores-autonics": {
    holderSlug: "temporizadores-autonics",
    specsKey: "temporizadores",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "contadores-autonics": {
    holderSlug: "contadores-autonics",
    specsKey: "contadores",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "luces-piloto-autonics": {
    holderSlug: "luces-piloto-autonics",
    specsKey: "lucesPiloto",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por color o voltaje...",
  },
  "controladores-temperatura-autonics": {
    holderSlug: "controladores-temperatura-autonics",
    specsKey: "controladoresTemperatura",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "pulsadores-selectores-autonics": {
    holderSlug: "pulsadores-selectores-autonics",
    specsKey: "pulsadoresSelectores",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por color o tipo...",
  },
  // Inductivos, Capacitivos, Fotoeléctricos y Amplificadores Autonics se unificaron en una
  // sola categoría/tabla "Sensores Autonics" (pedido del cliente: un solo tile, un solo
  // listado). Las categorías "sensores-inductivos/capacitivos/fotoelectricos" siguen
  // existiendo pero ahora solo contienen su producto IFM (sin entrada acá, cae al
  // render genérico de categoría hoja).
  "sensores-autonics": {
    holderSlug: "sensores-autonics",
    specsKey: "sensoresAutonics",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion", "tipo"],
    searchPlaceholder: "Buscar por modelo, tipo o descripción...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  // Mismo criterio: Inductivos IFM + Capacitivos IFM + Fotoeléctricos IFM (antes 3
  // categorías separadas, cada una con solo el producto IFM tras sacar el Autonics)
  // se unificaron en una sola categoría/tabla "Sensores IFM".
  "sensores-ifm": {
    holderSlug: "sensores-ifm",
    specsKey: "sensoresIfm",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["descripcion", "tipo"],
    searchPlaceholder: "Buscar por tipo o descripción...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  "cilindros-neumaticos-bimba": {
    holderSlug: "cilindros-neumaticos-bimba",
    specsKey: "bimba",
    columns: [
      { key: "descripcion", label: "Descripción" },
      { key: "modelo", label: "Modelo" },
      { key: "diametro", label: "Diámetro" },
      { key: "carrera", label: "Carrera" },
    ],
    searchKeys: ["descripcion", "modelo"],
    searchPlaceholder: "Buscar por modelo o medida...",
    filters: [
      { key: "diametro", label: "Diámetro" },
      { key: "carrera", label: "Carrera" },
    ],
  },
  // Los kits de sello/reparación no son cilindros — se separan en su propia subcategoría
  // dentro de Neumática, junto a (no mezclados con) los cilindros.
  "kits-sello-cilindros": {
    holderSlug: "kits-sello-cilindros-bimba",
    specsKey: "kitsSello",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar kit por modelo de cilindro...",
  },
  "cilindros-festo": {
    holderSlug: "cilindros-festo",
    specsKey: "cilindros",
    columns: [
      { key: "descripcion", label: "Disponibilidad" },
      { key: "modelo", label: "Modelo" },
      { key: "diametro", label: "Diámetro" },
      { key: "carrera", label: "Carrera" },
    ],
    searchKeys: ["descripcion", "modelo"],
    searchPlaceholder: "Buscar por modelo o referencia...",
    filters: [
      { key: "diametro", label: "Diámetro" },
      { key: "carrera", label: "Carrera" },
    ],
  },
  // Mismo patrón de filtros ricos que SMC/MAC. "voltaje" puede ser un valor fijo, "No
  // aplica" (válvulas mecánicas/manuales, sin solenoide) o "Seleccionar voltaje" cuando el
  // Part Number se pide especificando el voltaje entre varias opciones — en ese caso las
  // opciones reales viven en voltajes_disponibles y se eligen en la ficha (ReferenceDetailPanel).
  "valvulas-neumaticas": {
    holderSlug: "valvulas-neumaticas-emc",
    specsKey: "valvulas",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "tipo", label: "Tipo" },
      { key: "configuracion", label: "Configuración" },
      { key: "conexion", label: "Conexión" },
      { key: "rosca", label: "Rosca" },
      { key: "voltaje", label: "Voltaje" },
      { key: "accionamiento", label: "Accionamiento" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: [
      "modelo", "serie", "tipo", "configuracion", "accionamiento", "conexion", "rosca",
      "voltaje", "voltajes_disponibles", "descripcion",
    ],
    searchPlaceholder: "Buscar por Part Number, tipo, conexión o voltaje...",
    filters: [
      { key: "tipo", label: "Tipo" },
      { key: "accionamiento", label: "Accionamiento" },
      { key: "configuracion", label: "Configuración" },
      { key: "conexion", label: "Conexión" },
      { key: "rosca", label: "Rosca" },
      { key: "voltaje", label: "Voltaje" },
    ],
    showStock: false,
  },
  "bases-para-fusibles": {
    holderSlug: "bases-para-fusibles",
    specsKey: "bases",
    columns: [
      { key: "descripcion", label: "Descripción" },
      { key: "capacidad", label: "Capacidad" },
    ],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar base por modelo compatible...",
  },
  "accesorios-para-fusibles": {
    holderSlug: "accesorios-para-fusibles",
    specsKey: "accesorios",
    columns: [
      { key: "descripcion", label: "Descripción" },
      { key: "capacidad", label: "Capacidad" },
    ],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar accesorio...",
  },
  // Neumática -> Fittings Neumáticos: reestructurado de "11 categorías por tipo" (mezclaban
  // marcas EMC/PISCO/SPC/SMC en el texto de cada fila) a "5 tiles por marca", con "Tipo"
  // (Conector Recto, Codo, Unión T, etc.) como columna/filtro dentro de cada marca — pedido
  // explícito del cliente: primero separar por tipo de producto, luego agrupar por marca.
  "fittings-emc": {
    holderSlug: "fittings-emc",
    specsKey: "fittingsEmc",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Referencia" },
    ],
    searchKeys: ["descripcion", "tipo"],
    searchPlaceholder: "Buscar por medida, conexión o tipo...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  "fittings-pisco": {
    holderSlug: "fittings-pisco",
    specsKey: "fittingsPisco",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Referencia" },
    ],
    searchKeys: ["descripcion", "tipo"],
    searchPlaceholder: "Buscar por medida, conexión o tipo...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  "fittings-spc": {
    holderSlug: "fittings-spc",
    specsKey: "fittingsSpc",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Referencia" },
    ],
    searchKeys: ["descripcion", "tipo"],
    searchPlaceholder: "Buscar por medida, conexión o tipo...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  "fittings-smc": {
    holderSlug: "fittings-smc",
    specsKey: "fittingsSmc",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Referencia" },
    ],
    searchKeys: ["descripcion", "tipo"],
    searchPlaceholder: "Buscar por medida, conexión o tipo...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  // MW, NZ y filas sin marca legible en el texto (ej. fittings tipo compresión genéricos,
  // silenciadores sin marca) — volumen chico, se agrupan para no crear tiles casi vacíos.
  "fittings-otras-marcas": {
    holderSlug: "fittings-otras-marcas",
    specsKey: "fittingsOtras",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Referencia" },
    ],
    searchKeys: ["descripcion", "tipo"],
    searchPlaceholder: "Buscar por medida, conexión o tipo...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  // Lote IFM/SMC/MAC/Harting — sin columna de stock: solo botón único "Consultar
  // disponibilidad" (regla explícita del cliente: nunca mostrar Stock/Agotado/números).
  "sensores-presion": {
    holderSlug: "sensores-presion-ifm",
    specsKey: "ifmPresion",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo o rango...",
    showStock: false,
  },
  "flujo": {
    holderSlug: "medicion-flujo-ifm",
    specsKey: "ifmFlujo",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
    showStock: false,
  },
  "temperatura": {
    holderSlug: "medicion-temperatura-ifm",
    specsKey: "ifmTemperatura",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
    showStock: false,
  },
  "cilindros-neumaticos-smc": {
    holderSlug: "cilindros-neumaticos-smc",
    specsKey: "smcCilindros",
    columns: [
      { key: "descripcion", label: "Descripción" },
      { key: "modelo", label: "Modelo" },
      { key: "diametro", label: "Diámetro" },
      { key: "carrera", label: "Carrera" },
    ],
    searchKeys: ["descripcion", "modelo"],
    searchPlaceholder: "Buscar por modelo o medida...",
    filters: [
      { key: "diametro", label: "Diámetro" },
      { key: "carrera", label: "Carrera" },
    ],
    showStock: false,
  },
  // Datos técnicos ricos (marca/serie/tipo/configuración/conexión/rosca/voltaje/etc.) para
  // las 16 válvulas direccionales verificadas por el cliente — el resto de filas antiguas
  // (sin esos campos) sigue mostrando solo su descripción, retrocompatible.
  "valvulas-neumaticas-smc": {
    holderSlug: "valvulas-neumaticas-smc",
    specsKey: "smcValvulas",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "tipo", label: "Tipo" },
      { key: "configuracion", label: "Configuración" },
      { key: "conexion", label: "Conexión" },
      { key: "rosca", label: "Rosca" },
      { key: "voltaje", label: "Voltaje" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "serie", "tipo", "configuracion", "accionamiento", "conexion", "voltaje", "descripcion"],
    searchPlaceholder: "Buscar por Part Number, tipo, conexión o voltaje...",
    filters: [
      { key: "tipo", label: "Tipo" },
      { key: "configuracion", label: "Configuración" },
      { key: "conexion", label: "Conexión" },
      { key: "rosca", label: "Rosca" },
      { key: "voltaje", label: "Voltaje" },
    ],
    showStock: false,
  },
  // Mismo patrón de filtros ricos que valvulas-neumaticas-smc — Tipo aquí es la clasificación
  // COMERCIAL de Dynatech (3/2, 5/2, 5/3, Otras); la nomenclatura técnica MAC (4/2, 4/3, etc.)
  // vive en tipo_mac y se muestra solo en la ficha, nunca en la tabla/filtro.
  "valvulas-neumaticas-mac": {
    holderSlug: "valvulas-neumaticas-mac",
    specsKey: "macValvulas",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "tipo", label: "Tipo" },
      { key: "configuracion", label: "Configuración" },
      { key: "conexion", label: "Conexión" },
      { key: "rosca", label: "Rosca" },
      { key: "voltaje", label: "Voltaje" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "serie", "tipo", "configuracion", "conexion", "voltaje", "descripcion"],
    searchPlaceholder: "Buscar por Part Number, conexión o voltaje...",
    filters: [
      { key: "tipo", label: "Tipo" },
      { key: "configuracion", label: "Configuración" },
      { key: "conexion", label: "Conexión" },
      { key: "rosca", label: "Rosca" },
      { key: "voltaje", label: "Voltaje" },
    ],
    showStock: false,
  },
  "conectores-industriales-harting": {
    holderSlug: "conectores-industriales-harting",
    specsKey: "conectoresIndustriales",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por código o amperaje...",
    showStock: false,
  },
  // Rescatado del mismo producto huérfano que dio el sensor de cilindro de arriba — la
  // categoría "Unidades FRL" existía vacía, ahora tiene su primer contenido real (SMC).
  "unidades-frl": {
    holderSlug: "unidades-frl-smc",
    specsKey: "unidadesFrlSmc",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["descripcion", "tipo"],
    searchPlaceholder: "Buscar por tipo o descripción...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  "interruptores-presion-smc": {
    holderSlug: "interruptores-presion-smc",
    specsKey: "interruptoresPresionSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  // Accesorios Neumáticos: 7 categorías 100% SMC (Kits de Sellos, Actuadores, Amortiguadores,
  // Generadores de Vacío, Bases y Soportes, Bobinas, Manifold) se unificaron en un solo tile
  // "SMC" con "Tipo" como filtro — mismo criterio que Fittings. También incluye un sensor para
  // cilindro SMC rescatado de un producto huérfano/inactivo que no tenía hogar en el catálogo.
  "accesorios-neumaticos-smc": {
    holderSlug: "accesorios-neumaticos-smc",
    specsKey: "accesoriosNeumaticosSmc",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["descripcion", "tipo", "modelo"],
    searchPlaceholder: "Buscar por tipo, modelo o descripción...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  // Accesorios de Sensores: Conectores, Cables y Soportes/Bases IFM se unificaron en un solo
  // tile "IFM" con "Tipo" como filtro. Módulos y Amplificadores IFM quedan aparte (son
  // electrónica de señal, no accesorios mecánicos — no se mezclan solo por ser la misma marca).
  "accesorios-sensores-ifm": {
    holderSlug: "accesorios-sensores-ifm",
    specsKey: "accesoriosSensoresIfm",
    columns: [
      { key: "tipo", label: "Tipo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["descripcion", "tipo"],
    searchPlaceholder: "Buscar por tipo o descripción...",
    filters: [{ key: "tipo", label: "Tipo" }],
  },
  // El amplificador (único, "AMPLIFICADOR IFM 2 CH...") se separó a su propia categoría
  // "amplificadores-ifm" — acá solo quedan los módulos (IO-Link, display, convertidor).
  "modulos-amplificadores-ifm": {
    holderSlug: "modulos-amplificadores-ifm",
    specsKey: "modulosIfm",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "amplificadores-ifm": {
    holderSlug: "amplificadores-ifm",
    specsKey: "amplificadoresIfm",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
};

/**
 * Clave de specs para familias de variantes SIN stock ni carrito (ej. Cilindros American):
 * solo una tabla de medidas disponibles + botón único "Consultar disponibilidad". A
 * diferencia de TABLE_CATEGORIES, esto no depende de la categoría — cualquier producto con
 * specs.medidas usa este modo.
 */
export const MEDIDAS_SPECS_KEY = "medidas";
/** Texto opcional del botón único para productos en modo specs.medidas (ver CTA_LABEL_SPECS_KEY). */
export const CTA_LABEL_SPECS_KEY = "ctaLabel";
/** Encabezado opcional de la columna única en modo specs.medidas. Default: "Descripción"
 * (ej. Cilindros American). Fusibles lo pisa a "Disponibilidad". */
export const MEDIDAS_COLUMN_LABEL_SPECS_KEY = "medidasColumnLabel";

export const TABLE_SPECS_KEYS = new Set([
  ...Object.values(TABLE_CATEGORIES).map((c) => c.specsKey),
  MEDIDAS_SPECS_KEY,
  CTA_LABEL_SPECS_KEY,
  MEDIDAS_COLUMN_LABEL_SPECS_KEY,
]);

/**
 * Un producto "holder" sostiene un array de referencias/variantes en specs.<key> (una
 * categoría-tabla entera, ej. "Válvulas Neumáticas SMC", o un specs.medidas genérico, ej.
 * "Cilindros American Serie SS") — no es una sola referencia comprable. Se detecta por forma
 * (¿tiene alguna key de TABLE_SPECS_KEYS?), no por lista de slugs, para cubrir ambos patrones
 * sin mantener dos registros separados. Usar esto para excluir holders de cualquier listado
 * genérico de productos (catálogo, destacados, relacionados) — nunca deben ser "agregables al
 * carrito" como si fueran un solo producto.
 */
export function isHolderProduct(specs: unknown): boolean {
  if (!specs || typeof specs !== "object") return false;
  return Object.keys(specs).some((k) => TABLE_SPECS_KEYS.has(k));
}
