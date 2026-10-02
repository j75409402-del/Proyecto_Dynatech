import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { SOLUCIONES } from "@/lib/soluciones";

// Lista fija: el sitio ya no tiene catálogo dinámico, así que el sitemap no consulta Supabase.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1 },
    ...SERVICIOS_ADICIONALES.map((s) => ({ url: `${SITE.url}/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...SOLUCIONES.map((s) => ({
      url: `${SITE.url}/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE.url}/cilindros-neumaticos`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/servicios`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/sellos-y-componentes`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/nosotros`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/contacto`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/cotizacion/correo`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/garantias`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/devoluciones`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terminos`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
