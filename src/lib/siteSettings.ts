import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

export type SiteSettings = {
  catalog_pdf_url: string | null;
  stat_productos: string;
  stat_marcas: string;
  stat_clientes: string;
  stat_respuesta: string;
};

const DEFAULTS: SiteSettings = {
  catalog_pdf_url: null,
  stat_productos: "500+",
  stat_marcas: "20+",
  stat_clientes: "100+",
  stat_respuesta: "24h",
};

/**
 * Lee `site_settings` con un cliente SIN cookies a propósito: se llama desde el layout raíz
 * (Navbar/Footer), y usar el cliente cookie-based (`createClient` de `@/lib/supabase/server`)
 * ahí forzaría TODAS las páginas del sitio a renderizarse dinámicas (Next.js trata cualquier
 * lectura de `cookies()` durante el render como request-específica). Estos datos son públicos
 * y de solo lectura, así que no hace falta sesión — se puede prerenderizar/cachear normal.
 * Si la tabla todavía no existe (falta correr la migración) o faltan envs, cae a defaults.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) return DEFAULTS;

  const supabase = createSupabaseClient<Database>(url, anonKey);
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error || !data) return DEFAULTS;

  const map = Object.fromEntries(data.map((row) => [row.key, row.value]));
  return {
    catalog_pdf_url: map.catalog_pdf_url ?? DEFAULTS.catalog_pdf_url,
    stat_productos: map.stat_productos ?? DEFAULTS.stat_productos,
    stat_marcas: map.stat_marcas ?? DEFAULTS.stat_marcas,
    stat_clientes: map.stat_clientes ?? DEFAULTS.stat_clientes,
    stat_respuesta: map.stat_respuesta ?? DEFAULTS.stat_respuesta,
  };
}
