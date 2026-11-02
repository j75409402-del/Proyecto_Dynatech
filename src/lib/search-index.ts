import { NAV } from "@/lib/constants";
import { SOLUCIONES } from "@/lib/soluciones";

export type SearchEntry = {
  title: string;
  href: string;
  group: string;
  hint: string;
};

/** Índice estático: líneas, familias y taller. Sin productos inventados. */
export function buildSearchIndex(): SearchEntry[] {
  const lines: SearchEntry[] = SOLUCIONES.map((s) => ({
    title: s.name,
    href: `/${s.slug}`,
    group: "Líneas",
    hint: s.short,
  }));
  const families: SearchEntry[] = SOLUCIONES.flatMap((s) =>
    s.subcategorias.map((sub) => ({
      title: sub.title,
      href: sub.href ?? `/${s.slug}#${sub.id}`,
      group: s.name,
      hint: (sub.ejemplos ?? []).slice(0, 3).join(" · ") || sub.desc,
    })),
  );
  const taller: SearchEntry[] = [...NAV.cilindros, ...NAV.especialidades].map((item) => ({
    title: item.label,
    href: item.href,
    group: "Servicios",
    hint: "",
  }));
  return [
    { title: "Catálogo", href: "/catalogo", group: "Líneas", hint: "Todas las categorías" },
    { title: "Aplicaciones", href: "/aplicaciones", group: "Empresa", hint: "Dónde se usan" },
    ...lines,
    ...families,
    ...taller,
  ];
}

export function filterSearch(query: string, entries: SearchEntry[]): SearchEntry[] {
  const q = query.trim().toLocaleLowerCase("es");
  if (q.length < 2) return [];
  return entries
    .filter((e) => `${e.title} ${e.group} ${e.hint}`.toLocaleLowerCase("es").includes(q))
    .slice(0, 8);
}
