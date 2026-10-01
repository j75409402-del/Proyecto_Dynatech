/** Estados válidos de `quotes.status` (mismo check que la migración inicial). */
export const QUOTE_STATUSES = ["nuevo", "en_revision", "enviada", "cerrada_ganada", "cerrada_perdida"] as const;

export const QUOTE_STATUS_LABEL: Record<(typeof QUOTE_STATUSES)[number], string> = {
  nuevo: "Nuevo",
  en_revision: "En revisión",
  enviada: "Cotización enviada",
  cerrada_ganada: "Cerrada · ganada",
  cerrada_perdida: "Cerrada · perdida",
};
