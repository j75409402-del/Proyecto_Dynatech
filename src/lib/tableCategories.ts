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
  // PA12 (amplificador) se sacó de Sensores Fotoeléctricos — no es un sensor, es un módulo
  // accesorio. Queda junto a las demás categorías de accesorios de sensores.
  "amplificadores-autonics": {
    holderSlug: "amplificadores-autonics",
    specsKey: "amplificadoresAutonics",
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
  // Neumática -> Fittings Neumáticos: 12 familias, 142 referencias (reorganizado: T's
  // dispersas unificadas en "Unión T", duplicados de Reguladores de Flujo/Bulkhead/Codos
  // fusionados en una sola categoría cada uno).
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
  // "Unión T" reúne todas las T dispersas del catálogo: las que ya eran "Tés y Uniones
  // Roscadas" (100% T, pese al nombre — no había ninguna unión roscada genérica mezclada),
  // "Uniones T SMC", y las "Unión T" que estaban sueltas dentro de Uniones para Manguera.
  "union-t": {
    holderSlug: "union-t",
    specsKey: "unionT",
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
  // "Uniones Roscadas" = ex "Reducciones": las reducciones EMC/SPC hembra-hembra son
  // uniones de conexión roscada por definición — único contenido real disponible hoy para
  // esta categoría (no había otras uniones roscadas genéricas sueltas en el catálogo).
  "uniones-roscadas": {
    holderSlug: "uniones-roscadas",
    specsKey: "unionesRoscadas",
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
  "soportes-bases-ifm": {
    holderSlug: "soportes-bases-ifm",
    specsKey: "soportesBasesIfm",
    columns: [{ key: "descripcion", label: "Descripción" }],
    searchKeys: ["descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  // No se trata como válvula individual — es la base/manifold para montar varias válvulas.
  "manifold-smc": {
    holderSlug: "manifold-smc",
    specsKey: "manifoldSmc",
    columns: [{ key: "modelo", label: "Modelo" }, { key: "tipo", label: "Tipo" }],
    searchKeys: ["modelo", "tipo", "descripcion"],
    searchPlaceholder: "Buscar por modelo...",
  },
  "valvulas-descarga-rapida-smc": {
    holderSlug: "valvulas-descarga-rapida-smc",
    specsKey: "descargaRapidaSmc",
    columns: [{ key: "modelo", label: "Modelo" }, { key: "conexion", label: "Conexión" }],
    searchKeys: ["modelo", "conexion", "descripcion"],
    searchPlaceholder: "Buscar por modelo o conexión...",
  },
  "cheque-neumatico-smc": {
    holderSlug: "cheque-neumatico-smc",
    specsKey: "chequeNeumaticoSmc",
    columns: [{ key: "modelo", label: "Modelo" }, { key: "conexion", label: "Conexión" }],
    searchKeys: ["modelo", "conexion", "descripcion"],
    searchPlaceholder: "Buscar por modelo o conexión...",
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
