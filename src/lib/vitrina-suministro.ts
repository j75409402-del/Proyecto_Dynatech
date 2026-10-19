import { GRUPOS_SUMINISTRO, SOLUCIONES } from "./soluciones";

/**
 * Pasarela de suministros en la portada (pedido del dueño, 19-oct-2026): fotos del catálogo de las
 * líneas que suministramos. Todo sale de soluciones.ts (fuente única): título, foto y enlace.
 *
 * Excluidas a propósito: fotos con marcas de terceros visibles (fusibles NH, temporizador, manómetro,
 * contactor), fotos con crédito obligatorio (Wikimedia) y las ilustraciones IA (termocupla, RTD, alambre).
 * Ninguna de estas fotos se usa en otra sección de la portada.
 */
const PICKS = [
  ["neumatica", "valvulas"],
  ["neumatica", "frl"],
  ["neumatica", "conexiones"],
  ["control-electrico", "mando-y-senalizacion"],
  ["sensores", "inductivos"],
  ["sensores", "fotoelectricos"],
  ["instrumentacion", "temperatura"],
  ["resistencias-electricas", "cartucho"],
] as const;

export type VitrinaItem = { key: string; title: string; grupo: string; image: string; href: string };

export const VITRINA_SUMINISTRO: VitrinaItem[] = PICKS.map(([slug, id]) => {
  const linea = SOLUCIONES.find((s) => s.slug === slug);
  const sub = linea?.subcategorias.find((x) => x.id === id);
  if (!linea || !sub?.image) throw new Error(`Vitrina: falta ${slug}#${id} o su foto en soluciones.ts`);
  return {
    key: `${slug}-${id}`,
    title: sub.title,
    grupo: GRUPOS_SUMINISTRO.find((g) => g.id === linea.grupo)?.title ?? linea.name,
    image: sub.image,
    href: sub.href ?? `/${slug}#${id}`,
  };
});
