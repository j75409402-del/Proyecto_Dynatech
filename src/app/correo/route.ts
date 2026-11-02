import { after } from "next/server";
import { trackingAllowed } from "@/lib/click-guard";
import { buildMailto } from "@/lib/correo";
import { cleanPath, cleanText, mergeUtm, readUtm } from "@/lib/quote";
import { buildWhatsappClick, logWhatsappClick } from "@/lib/whatsapp-click";

/**
 * /correo → mailto del correo comercial.
 * 1) Arma asunto y cuerpo (origen del sitio, página o pieza, campos en blanco).
 * 2) Si la visita se puede medir, after() inserta whatsapp_clicks con channel=email.
 *    No espera el resultado: un fallo o la falta de variables no cambia la redirección.
 * 3) Responde 307 al mailto. El destino lo construye el servidor; no se acepta un correo ajeno.
 * Enlazar con <a href="/correo">, nunca con <Link> (el prefetch contaría clics).
 */
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const p = url.searchParams;
  const h = request.headers;
  const item = cleanText(p.get("item"));
  const linea = cleanText(p.get("linea"));
  const requestHost = h.get("x-forwarded-host") ?? h.get("host");
  const referer = h.get("referer");
  const sourcePage = cleanPath(p.get("from")) || cleanPath(referer, requestHost) || "";
  const utm = mergeUtm(readUtm(p), referer, requestHost);
  const mailto = buildMailto({ item, linea, sourcePage });

  if (trackingAllowed(h, p)) {
    const click = {
      ...buildWhatsappClick({
        item,
        linea,
        tpl: item ? "item" : "general",
        sourcePage,
        utm,
        referrer: referer,
        userAgent: h.get("user-agent"),
      }),
      channel: "email" as const,
    };
    try { after(() => logWhatsappClick(click)); } catch { /* sin after: se omite el registro */ }
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: mailto,
      "Cache-Control": "private, no-store",
    },
  });
}
