import { after } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ANALYTICS, SITE } from "@/lib/constants";
import { buildQuoteMessage, cleanPath, cleanText, productFor, UTM_KEYS, whatsappUrl, type QuoteTemplate } from "@/lib/quote";

/**
 * /cotizacion → WhatsApp Business (flujo principal aprobado por el dueño, AP-004, 4-oct-2026).
 * 1) Construye el mensaje precargado con producto/línea y página de origen.
 * 2) Registra `quote_whatsapp_click` en Umami desde el servidor (no depende de JS ni de que
 *    la pestaña siga abierta) con source_page, product, utm_*. Sin datos personales.
 * 3) Redirige (307) a https://wa.me/<número oficial>.
 * Es una página (no route handler) para conservar el archivo existente del proyecto.
 * IMPORTANTE: enlazar /cotizacion siempre con <a>, nunca con <Link> de Next (el prefetch contaría clics).
 */
export const dynamic = "force-dynamic";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|headless|lighthouse|curl|wget|python|node-fetch|axios/i;

type Headers = Awaited<ReturnType<typeof headers>>;
function isPrefetch(h: Headers) {
  return h.get("next-router-prefetch") === "1" || h.get("purpose") === "prefetch" || (h.get("sec-purpose") ?? "").includes("prefetch") || h.get("rsc") === "1";
}

function trackingAllowed(h: Headers, p: URLSearchParams) {
  if (h.get("dnt") === "1" || h.get("sec-gpc") === "1" || p.get("nt") === "1") return false;
  const ua = h.get("user-agent") ?? "";
  return Boolean(ua) && !BOT.test(ua) && !isPrefetch(h);
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CotizacionPage({ searchParams }: Props) {
  const raw = await searchParams;
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(raw)) if (typeof v === "string") p.set(k, v); else if (Array.isArray(v) && v[0]) p.set(k, v[0]);
  const h = await headers();
  const tplParam = p.get("tpl");
  // Compatibilidad con enlaces antiguos de /cotizacion/correo?nombre=…&tipo=…
  const item = cleanText(p.get("item") ?? p.get("nombre"));
  const linea = cleanText(p.get("linea") ?? p.get("tipo"));
  const tpl: QuoteTemplate = tplParam === "cilindro" || tplParam === "solucion" ? tplParam : item ? "item" : "general";
  const sourcePage = cleanPath(p.get("from")) || cleanPath(h.get("referer")) || "";
  const message = buildQuoteMessage({ tpl, item, linea, sourcePage });
  const destination = whatsappUrl(message);

  if (trackingAllowed(h, p) && ANALYTICS.umamiWebsiteId) {
    const data: Record<string, string> = {
      channel: "whatsapp",
      source_page: sourcePage || "direct",
      product: productFor(item, linea, sourcePage, tpl),
      ...(linea ? { line: linea.slice(0, 60) } : {}),
    };
    for (const key of UTM_KEYS) { const v = cleanText(p.get(key), 80); if (v) data[key] = v; }
    const body = {
      type: "event",
      payload: {
        website: ANALYTICS.umamiWebsiteId,
        hostname: new URL(SITE.url).hostname,
        url: "/cotizacion",
        referrer: sourcePage ? SITE.url + sourcePage : "",
        language: (h.get("accept-language") ?? "").split(",")[0]?.slice(0, 20) ?? "",
        name: "quote_whatsapp_click",
        data,
      },
    };
    const ua = h.get("user-agent") ?? "";
    // after(): el envío no retrasa la redirección del usuario.
    after(async () => {
      try {
        await fetch(ANALYTICS.umamiApiUrl, { method: "POST", headers: { "content-type": "application/json", "user-agent": ua }, body: JSON.stringify(body), signal: AbortSignal.timeout(3000) });
      } catch { /* la analítica nunca bloquea la cotización */ }
    });
  }

  redirect(destination);
}
