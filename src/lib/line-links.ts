import { SOLUCIONES } from "@/lib/soluciones";

/** Anclas descriptivas. Los textos salen de los títulos ya publicados en cada página. */
export const TALLER_LINE_LINKS = [
  { href: "/cilindros-neumaticos", label: "Cilindros neumáticos a la medida" },
  { href: "/cilindros-hidraulicos", label: "Reparación de cilindros hidráulicos" },
  { href: "/mecanizado", label: "Mecanizado en torno y fresadora" },
] as const;

export const SUPPLY_LINE_LINKS = SOLUCIONES.map((s) => ({
  href: `/${s.slug}`,
  label: s.title,
}));

export const LINE_PAGE_LINKS = [...TALLER_LINE_LINKS, ...SUPPLY_LINE_LINKS];
