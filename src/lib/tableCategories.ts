import type { ReferenceTableColumn } from "@/components/product/ReferenceTable";

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
    /** false = sin columna de stock ni carrito, solo botón único (ver ctaLabel). */
    showStock?: boolean;
    /** Texto del botón único cuando showStock=false. Default: "Consultar disponibilidad". */
    ctaLabel?: string;
    /** "boolean" = columna de disponibilidad sin cantidades (Disponible/No disponible). */
    stockMode?: "count" | "boolean";
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
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo o medida...",
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
    columns: [{ key: "descripcion", label: "Disponibilidad" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo o referencia...",
    // showStock por default (true): esta categoría sí conserva "Stock actual".
  },
  "valvulas-neumaticas": {
    holderSlug: "valvulas-neumaticas-emc",
    specsKey: "valvulas",
    columns: [{ key: "descripcion", label: "Disponibilidad" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo o tipo de válvula...",
    // showStock por default (true): esta categoría sí conserva "Stock actual".
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
    showStock: false,
    ctaLabel: "Solicitar cotización",
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
    showStock: false,
    ctaLabel: "Solicitar cotización",
  },
  // Neumática -> Accesorios Neumáticos: 13 familias, 135 referencias. Disponibilidad
  // binaria (Disponible/No disponible) sin cantidades — pedido explícito del cliente.
  "conectores-rectos": {
    holderSlug: "conectores-rectos",
    specsKey: "conectoresRectos",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "codos-neumaticos": {
    holderSlug: "codos-neumaticos",
    specsKey: "codosNeumaticos",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "tes-uniones-roscadas": {
    holderSlug: "tes-uniones-roscadas",
    specsKey: "tesUniones",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "reguladores-flujo": {
    holderSlug: "reguladores-flujo",
    specsKey: "reguladoresFlujo",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "llaves-paso-neumaticas": {
    holderSlug: "llaves-paso-neumaticas",
    specsKey: "llavesPaso",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "uniones-manguera": {
    holderSlug: "uniones-manguera",
    specsKey: "unionesManguera",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "uniones-y": {
    holderSlug: "uniones-y",
    specsKey: "unionesY",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "bulkhead-neumatico": {
    holderSlug: "bulkhead-neumatico",
    specsKey: "bulkhead",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "reducciones-neumaticas": {
    holderSlug: "reducciones-neumaticas",
    specsKey: "reducciones",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "tapones-neumaticos": {
    holderSlug: "tapones-neumaticos",
    specsKey: "tapones",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "codos-manguera": {
    holderSlug: "codos-manguera",
    specsKey: "codosManguera",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida, conexión o marca...",
    stockMode: "boolean",
  },
  "blue-cap": {
    holderSlug: "blue-cap",
    specsKey: "blueCap",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida...",
    stockMode: "boolean",
  },
  "silenciadores-neumaticos": {
    holderSlug: "silenciadores-neumaticos",
    specsKey: "silenciadores",
    columns: [{ key: "descripcion", label: "Referencia" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por medida o conexión...",
    stockMode: "boolean",
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
  "accesorios-sensores": {
    holderSlug: "accesorios-sensores-ifm",
    specsKey: "ifmAccesorios",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar accesorio...",
    showStock: false,
  },
  "cilindros-neumaticos-smc": {
    holderSlug: "cilindros-neumaticos-smc",
    specsKey: "smcCilindros",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo o medida...",
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
  "accesorios-neumaticos-smc": {
    holderSlug: "accesorios-neumaticos-smc",
    specsKey: "smcAccesorios",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar accesorio...",
    showStock: false,
  },
  "valvulas-neumaticas-mac": {
    holderSlug: "valvulas-neumaticas-mac",
    specsKey: "macValvulas",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
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
