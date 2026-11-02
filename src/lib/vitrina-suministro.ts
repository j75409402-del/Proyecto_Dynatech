import { GRUPOS_SUMINISTRO, SOLUCIONES, type GrupoId } from "./soluciones";

/**
 * Pasarela de suministros en la portada (pedido del dueño, 19-oct-2026): una tarjeta por CATEGORÍA
 * (no por producto). Cada una lleva a la página de la línea, donde se ve todo lo que suministramos.
 * Nombres y enlaces salen de soluciones.ts (fuente única); la foto es una del catálogo de esa línea.
 *
 * Fotos elegidas sin marcas de terceros visibles, sin crédito obligatorio y que no son ilustraciones IA.
 * Ninguna se usa en otra sección de la portada (la sección 02 usa otras imágenes).
 */
/** Mismo archivo y el mismo alt ya publicado en soluciones.ts para esa foto. */
const FOTO: Record<GrupoId, { image: string; imageAlt: string }> = {
  neumatica: { image: "/products/unidades-frl-smc.jpg", imageAlt: "Unidad de preparación de aire neumático" },
  control: { image: "/products/pulsadores-selectores-autonics.jpg", imageAlt: "Pulsadores, selectores y paro de emergencia para tablero" },
  automatizacion: { image: "/products/sensores-fotoelectricos.jpg", imageAlt: "Sensores fotoeléctricos de emisor y receptor" },
  instrumentacion: { image: "/products/temperatura-teltru.jpg", imageAlt: "Termómetros bimetálicos y termómetro de bolsillo" },
  resistencias: { image: "/products/resistencia-de-cartucho-real.jpg", imageAlt: "Resistencia de cartucho con cables de salida" },
};

export type VitrinaItem = { key: string; title: string; image: string; imageAlt: string; href: string };

export const VITRINA_SUMINISTRO: VitrinaItem[] = GRUPOS_SUMINISTRO.map((g) => {
  const principal = SOLUCIONES.find((s) => s.grupo === g.id);
  if (!principal) throw new Error(`Vitrina: no hay línea para la categoría ${g.id}`);
  return { key: g.id, title: g.title, image: FOTO[g.id].image, imageAlt: FOTO[g.id].imageAlt, href: `/${principal.slug}` };
});
