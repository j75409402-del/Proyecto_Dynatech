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
  "automatizacion-industrial-autonics": {
    holderSlug: "automatizacion-industrial-autonics",
    specsKey: "autonics",
    columns: [
      { key: "modelo", label: "Modelo" },
      { key: "descripcion", label: "Descripción" },
    ],
    searchKeys: ["modelo", "descripcion"],
    searchPlaceholder: "Buscar por modelo o descripción...",
  },
  "sensores-autonics": {
    holderSlug: "sensores-autonics",
    specsKey: "sensoresAutonics",
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
