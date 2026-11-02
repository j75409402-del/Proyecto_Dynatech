import { after } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { trackingAllowed } from "@/lib/click-guard";
import { ANALYTICS, SITE } from "@/lib/constants";
import { sendQuoteEvent } from "@/lib/quote-event";
import { buildQuoteMessage, cleanPath, cleanText, isPaidGoogleAd, isQuoteService, mergeUtm, productFor, readUtm, UTM_KEYS, whatsappUrl, type QuoteTemplate } from "@/lib/quote";
import { buildWhatsappClick, logWhatsappClick } from "@/lib/whatsapp-click";

/**
 * /cotizacion → WhatsApp Business (flujo principal aprobado por el dueño, AP-004, 4-oct-2026).
 * 1) Construye el mensaje precargado con producto/línea y página de origen.
 * 2) Registra el clic sin frenar la redirección: fila en whatsapp_clicks (Supabase, service role)
 *    y `quote_whatsapp_click` en Umami. Sin IP ni datos personales. Si faltan las variables, se omite.
 * 3) Redirige (307) a https://wa.me/<número oficial>.
 * Es una página (no route handler) para conservar el archivo existente del proyecto.
 * IMPORTANTE: enlazar /cotizacion siempre con <a>, nunca con <Link> de Next (el prefetch contaría clics).
 */
export const dynamic = "force-dynamic";

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
  const requestHost = h.get("x-forwarded-host") ?? h.get("host");
  const referer = h.get("referer");
  const sourcePage = cleanPath(p.get("from")) || cleanPath(referer, requestHost) || "";
  // Servicio elegido (svc): solo claves conocidas de QUOTE_SERVICES; cualquier otro valor se ignora.
  const svcParam = p.get("svc");
  const svc = isQuoteService(svcParam) ? svcParam : null;
  // UTM de la URL y, si faltan, las del Referer del propio sitio (el CTA interno también las copia en el clic).
  const utm = mergeUtm(readUtm(p), referer, requestHost);
  // Clic de anuncio pagado (utm_source=google y utm_medium=cpc): la frase va en el mensaje aunque
  // la analítica esté rechazada; el evento sigue dependiendo solo de trackingAllowed().
  const paidAd = isPaidGoogleAd(utm.utm_source, utm.utm_medium);
  const message = buildQuoteMessage({ tpl, item, linea, sourcePage, svc, paidAd });
  const destination = whatsappUrl(message);

  if (trackingAllowed(h, p)) {
    const click = buildWhatsappClick({
      item,
      linea,
      svc,
      tpl,
      sourcePage,
      utm,
      referrer: referer,
      userAgent: h.get("user-agent"),
    });
    // after() mantiene el trabajo vivo después del 307 (en Vercel equivale a waitUntil).
    // No se espera: un fallo o la falta de variables no cambia la redirección.
    try { after(() => logWhatsappClick(click)); } catch { /* sin after: se omite el registro */ }

    if (ANALYTICS.umamiWebsiteId) {
      const data: Record<string, string> = {
        channel: "whatsapp",
        source_page: sourcePage || "direct",
        product: productFor(item, linea, sourcePage, tpl, svc),
        ...(svc ? { service: svc } : {}),
        ...(linea ? { line: linea.slice(0, 60) } : {}),
      };
      for (const key of UTM_KEYS) { const v = utm[key]; if (v) data[key] = v; }
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
      // Los fallos quedan en los registros de Vercel como `quote_event_send_failed`
      // (src/lib/quote-event.ts); nunca bloquean la cotización.
      try {
        after(() => sendQuoteEvent({
          url: ANALYTICS.umamiApiUrl,
          body,
          userAgent: ua,
          context: { service: data.service, source_page: data.source_page, utm_campaign: data.utm_campaign },
        }));
      } catch { /* la redirección no espera a Umami */ }
    }
  }

  redirect(destination);
}
