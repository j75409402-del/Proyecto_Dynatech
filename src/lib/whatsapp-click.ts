import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import { cleanText, isQuoteService, slug, type QuoteTemplate, type UtmParams } from "@/lib/quote";

/**
 * Registro del clic de /cotizacion en public.whatsapp_clicks.
 * Reutiliza NEXT_PUBLIC_SUPABASE_URL (o SUPABASE_URL) y SUPABASE_SERVICE_ROLE_KEY.
 * No hay variable nueva. Si faltan, no hace nada.
 * No guarda IP, mensaje, teléfono ni datos de contacto.
 */

export const WHATSAPP_CLICK_TIMEOUT_MS = 2000;

const TEMPLATES = new Set<QuoteTemplate>(["general", "item", "cilindro", "solucion"]);

export type WhatsappClickInsert = Database["public"]["Tables"]["whatsapp_clicks"]["Insert"];

/** Origen sin query ni hash: la query puede traer datos que no queremos guardar. */
export function referrerForLog(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const stored = `${url.origin}${url.pathname}`.slice(0, 300);
    return stored || null;
  } catch {
    return null;
  }
}

export function userAgentForLog(value: string | null | undefined): string | null {
  const agent = cleanText(value, 200);
  return agent || null;
}

function slugOrNull(value: string | null | undefined): string | null {
  const text = slug(cleanText(value));
  return text || null;
}

export function buildWhatsappClick(input: {
  item?: string | null;
  linea?: string | null;
  svc?: string | null;
  tpl?: string | null;
  sourcePage?: string | null;
  utm: UtmParams;
  referrer?: string | null;
  userAgent?: string | null;
}): WhatsappClickInsert {
  const source = (input.sourcePage ?? "").slice(0, 120);
  return {
    item: slugOrNull(input.item),
    linea: slugOrNull(input.linea),
    svc: isQuoteService(input.svc) ? input.svc : null,
    tpl: input.tpl && TEMPLATES.has(input.tpl as QuoteTemplate) ? input.tpl : null,
    source_page: source || null,
    utm_source: input.utm.utm_source ?? null,
    utm_medium: input.utm.utm_medium ?? null,
    utm_campaign: input.utm.utm_campaign ?? null,
    referrer: referrerForLog(input.referrer),
    user_agent: userAgentForLog(input.userAgent),
  };
}

/** Nunca lanza. El insert no pide la fila de vuelta: service_role solo tiene GRANT INSERT. */
export async function logWhatsappClick(row: WhatsappClickInsert): Promise<void> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return;
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: {
        fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(WHATSAPP_CLICK_TIMEOUT_MS) }),
      },
    });
    await client.from("whatsapp_clicks").insert(row);
  } catch {
    // Sin credenciales, sin tabla o con la red caída: la redirección ya salió.
  }
}
