import { GRUPOS_SUMINISTRO, SOLUCIONES, type GrupoId } from "./soluciones";

/**
 * Pasarela de suministros en la portada (pedido del dueño, 19-oct-2026): una tarjeta por CATEGORÍA
 * (no por producto). Cada una lleva a la página de la línea, donde se ve todo lo que suministramos.
 * Nombres y enlaces salen de soluciones.ts (fuente única); la foto es una del catálogo de esa línea.
 *
 * Fotos elegidas sin marcas de terceros visibles, sin crédito obligatorio y que no son ilustraciones IA.
 * Ninguna se usa en otra sección de la portada (la sección 02 usa otras imágenes).
 */
const FOTO: Record<GrupoId, string> = {
  neumatica: "/products/unidades-frl-smc.jpg",
  control: "/products/pulsadores-selectores-autonics.jpg",
  automatizacion: "/products/sensores-fotoelectricos.jpg",
  instrumentacion: "/products/temperatura-teltru.jpg",
  resistencias: "/products/resistencia-de-cartucho-real.jpg",
};

export type VitrinaItem = { key: string; title: string; image: string; href: string };

export const VITRINA_SUMINISTRO: VitrinaItem[] = GRUPOS_SUMINISTRO.map((g) => {
  const principal = SOLUCIONES.find((s) => s.grupo === g.id);
  if (!principal) throw new Error(`Vitrina: no hay línea para la categoría ${g.id}`);
  return { key: g.id, title: g.title, image: FOTO[g.id], href: `/${principal.slug}` };
});
