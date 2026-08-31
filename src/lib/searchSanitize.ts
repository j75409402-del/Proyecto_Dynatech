/**
 * PostgREST usa `,`/`(`/`)` como sintaxis de control dentro de `.or("a,b,c")` (separador de
 * condiciones y agrupación). Si un término de búsqueda del usuario los trae tal cual y se
 * interpolan directo en el string del filtro, se puede alterar la lógica del OR armado a mano
 * (ver auditoría pre-lanzamiento). No hay pérdida real de funcionalidad para una búsqueda de
 * catálogo — se sacan esos caracteres antes de armar el patrón ilike.
 */
export function sanitizeSearchWord(word: string): string {
  return word.replace(/[,()]/g, "").trim();
}
