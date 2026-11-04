import type { MetadataRoute } from "next";
import { CANONICAL_ORIGIN } from "@/lib/constants";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { SOLUCIONES } from "@/lib/soluciones";

/**
 * Páginas públicas reales. Fuera del sitemap:
 * - /garantias y /devoluciones: borrador legal corto, con noindex.
 * - /cotizacion, /cotizacion/correo y /correo: redirecciones.
 * - /admin: bloqueado en robots.ts.
 * /catalogo se queda: tablero de familias con descripción y cotización.
 */
const UPDATED = new Date("2026-11-04");

function entry(
  path: string,
  priority: number,
  changeFrequency: "monthly" | "yearly" = "monthly",
): MetadataRoute.Sitemap[number] {
  return {
    // La home no lleva barra final: coincide con el canonical que emite Next.
    url: path === "/" ? CANONICAL_ORIGIN : `${CANONICAL_ORIGIN}${path}`,
    lastModified: UPDATED,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1),
    entry("/cilindros-neumaticos", 1),
    ...SERVICIOS_ADICIONALES.map((s) => entry(`/${s.slug}`, 0.8)),
    ...SOLUCIONES.map((s) => entry(`/${s.slug}`, 0.7)),
    entry("/breakers", 0.8),
    entry("/valvulas-neumaticas", 0.8),
    entry("/servicios", 0.9),
    entry("/sellos-y-componentes", 0.9),
    entry("/catalogo", 0.8),
    entry("/aplicaciones", 0.6),
    entry("/nosotros", 0.5, "yearly"),
    entry("/contacto", 0.5, "yearly"),
    entry("/privacidad", 0.2, "yearly"),
    entry("/terminos", 0.2, "yearly"),
  ];
}
