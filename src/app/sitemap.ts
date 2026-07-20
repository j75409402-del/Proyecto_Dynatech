import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }, { data: brands }] = await Promise.all([
    supabase.from("products").select("slug, updated_at").eq("active", true),
    supabase.from("categories").select("slug"),
    supabase.from("brands").select("slug"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/productos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/nosotros`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/contacto`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/cotizacion`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/faq`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE.url}/garantias`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/devoluciones`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terminos`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/mapa-del-sitio`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
    url: `${SITE.url}/productos/${p.slug}`,
    lastModified: p.updated_at ?? undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = (categories ?? []).map((c) => ({
    url: `${SITE.url}/categorias/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const brandRoutes: MetadataRoute.Sitemap = (brands ?? []).map((b) => ({
    url: `${SITE.url}/marcas/${b.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...brandRoutes];
}
