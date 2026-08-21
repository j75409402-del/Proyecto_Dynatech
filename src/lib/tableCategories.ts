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
  "temporizadores-electricos": {
    holderSlug: "temporizadores-autonics",
    specsKey: "temporizadores",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "contadores-electricos": {
    holderSlug: "contadores-autonics",
    specsKey: "contadores",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "luces-piloto": {
    holderSlug: "luces-piloto-autonics",
    specsKey: "lucesPiloto",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por color o voltaje...",
  },
  "controladores-temperatura": {
    holderSlug: "controladores-temperatura-autonics",
    specsKey: "controladoresTemperatura",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "pulsadores": {
    holderSlug: "pulsadores-selectores-autonics",
    specsKey: "pulsadoresSelectores",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por color o tipo...",
  },
  "sensores-inductivos": {
    holderSlug: "sensores-inductivos-autonics",
    specsKey: "sensoresInductivos",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "sensores-capacitivos": {
    holderSlug: "sensores-capacitivos-autonics",
    specsKey: "sensoresCapacitivos",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "sensores-fotoelectricos": {
    holderSlug: "sensores-fotoelectricos-autonics",
    specsKey: "sensoresFotoelectricos",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
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
  "valvulas-neumaticas": {
    holderSlug: "valvulas-neumaticas-emc",
    specsKey: "valvulas",
    columns: [{ key: "descripcion", label: "Disponibilidad" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo o tipo de válvula...",
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
  // Neumática -> Fittings Neumáticos: 13 familias, 135 referencias.
  "conectores-rectos": {
    holderSlug: "conectores-rectos",
    specsKey: "conectoresRectos",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "codos-neumaticos": {
    holderSlug: "codos-neumaticos",
    specsKey: "codosNeumaticos",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "tes-uniones-roscadas": {
    holderSlug: "tes-uniones-roscadas",
    specsKey: "tesUniones",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "reguladores-flujo": {
    holderSlug: "reguladores-flujo",
    specsKey: "reguladoresFlujo",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "llaves-paso-neumaticas": {
    holderSlug: "llaves-paso-neumaticas",
    specsKey: "llavesPaso",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "uniones-manguera": {
    holderSlug: "uniones-manguera",
    specsKey: "unionesManguera",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "uniones-y": {
    holderSlug: "uniones-y",
    specsKey: "unionesY",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "bulkhead-neumatico": {
    holderSlug: "bulkhead-neumatico",
    specsKey: "bulkhead",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "reducciones-neumaticas": {
    holderSlug: "reducciones-neumaticas",
    specsKey: "reducciones",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "tapones-neumaticos": {
    holderSlug: "tapones-neumaticos",
    specsKey: "tapones",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "codos-manguera": {
    holderSlug: "codos-manguera",
    specsKey: "codosManguera",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
  },
  "blue-cap": {
    holderSlug: "blue-cap",
    specsKey: "blueCap",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida...",
  },
  "silenciadores-neumaticos": {
    holderSlug: "silenciadores-neumaticos",
    specsKey: "silenciadores",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida o conexión...",
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
  "valvulas-neumaticas-smc": {
    holderSlug: "valvulas-neumaticas-smc",
    specsKey: "smcValvulas",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
    showStock: false,
  },
  "valvulas-neumaticas-mac": {
    holderSlug: "valvulas-neumaticas-mac",
    specsKey: "macValvulas",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "tipo", label: "Tipo" },
      { key: "conexion", label: "Conexión" },
      { key: "voltaje", label: "Voltaje" },
      { key: "configuracion", label: "Configuración" },
    ],
    searchKeys: ["modelo", "tipo", "conexion", "voltaje"],
    searchPlaceholder: "Buscar por modelo, conexión o voltaje...",
    filterKey: "tipo",
    showStock: false,
  },
  "conectores-industriales": {
    holderSlug: "conectores-industriales-harting",
    specsKey: "conectoresIndustriales",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por código o amperaje...",
    showStock: false,
  },
  // "Accesorios Neumáticos SMC" y "Accesorios de Sensores IFM" eran cajones de sastre
  // (reguladores + uniones + kits + interruptores + etc. todo junto) — se separan en una
  // categoría por familia real, igual que se hizo con los Autonics.
  "reguladores-flujo-smc": {
    holderSlug: "reguladores-flujo-smc",
    specsKey: "reguladoresFlujoSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "uniones-t-smc": {
    holderSlug: "uniones-t-smc",
    specsKey: "unionesTSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo o medida...",
  },
  "bulkhead-smc": {
    holderSlug: "bulkhead-smc",
    specsKey: "bulkheadSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "kits-sello-smc": {
    holderSlug: "kits-sello-smc",
    specsKey: "kitsSelloSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar kit por modelo compatible...",
  },
  "actuadores-smc": {
    holderSlug: "actuadores-smc",
    specsKey: "actuadoresSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "interruptores-presion-smc": {
    holderSlug: "interruptores-presion-smc",
    specsKey: "interruptoresPresionSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "amortiguadores-smc": {
    holderSlug: "amortiguadores-smc",
    specsKey: "amortiguadoresSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "generadores-vacio-smc": {
    holderSlug: "generadores-vacio-smc",
    specsKey: "generadoresVacioSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "bases-soportes-smc": {
    holderSlug: "bases-soportes-smc",
    specsKey: "basesSoportesSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "bobinas-smc": {
    holderSlug: "bobinas-smc",
    specsKey: "bobinasSmc",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "conectores-sensores-ifm": {
    holderSlug: "conectores-sensores-ifm",
    specsKey: "conectoresSensoresIfm",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "cables-sensores-ifm": {
    holderSlug: "cables-sensores-ifm",
    specsKey: "cablesSensoresIfm",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "modulos-amplificadores-ifm": {
    holderSlug: "modulos-amplificadores-ifm",
    specsKey: "modulosAmplificadoresIfm",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "soportes-bases-ifm": {
    holderSlug: "soportes-bases-ifm",
    specsKey: "soportesBasesIfm",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "herramientas-software-ifm": {
    holderSlug: "herramientas-software-ifm",
    specsKey: "herramientasSoftwareIfm",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "adaptadores-ifm": {
    holderSlug: "adaptadores-ifm",
    specsKey: "adaptadoresIfm",
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
