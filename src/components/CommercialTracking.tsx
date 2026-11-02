"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { trackCommercialEvent, type CommercialExtra } from "@/lib/conversions";
import { cleanText, isQuoteService, productFor, slug, UTM_KEYS, type QuoteTemplate } from "@/lib/quote";

const UTM_STORE = "dynatech.utm.v1";

/** Primera visita con UTM de la sesión (solo claves utm_*; nada personal). */
function rememberUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of UTM_KEYS) { const v = cleanText(params.get(key), 80); if (v) found[key] = v; }
    if (Object.keys(found).length && !sessionStorage.getItem(UTM_STORE)) sessionStorage.setItem(UTM_STORE, JSON.stringify(found));
  } catch { /* almacenamiento bloqueado: se sigue sin UTM */ }
}
function storedUtm(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem(UTM_STORE) ?? "{}"); } catch { return {}; }
}
function analyticsOff() {
  if (navigator.doNotTrack === "1") return true;
  try { return localStorage.getItem("dynatech.analytics-consent.v1") === "rejected"; } catch { return false; }
}

/** Evento de Vercel Web Analytics. No incluye el mensaje, el cuerpo del correo ni datos de contacto. */
function trackVercelClick(name: "whatsapp_click" | "email_click", props: Record<string, string | undefined>) {
  if (process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === "1" || analyticsOff()) return;
  if (window.location.pathname.startsWith("/admin")) return;
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(props)) {
    const clean = cleanText(value, 80);
    if (clean) data[key] = clean;
  }
  try { track(name, data); } catch { /* el clic no espera a la analítica */ }
}

/** Deja en el enlace la página de origen y las UTM de la visita, también sin esperar al clic. */
function decorateMeasured(element: HTMLAnchorElement, pathname: "/cotizacion" | "/correo") {
  const url = new URL(element.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname !== pathname) return null;
  const utm = { ...storedUtm() };
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key);
    if (value) utm[key] = cleanText(value, 80);
    else if (utm[key]) url.searchParams.set(key, utm[key]);
  }
  url.searchParams.set("from", window.location.pathname);
  if (analyticsOff()) url.searchParams.set("nt", "1");
  element.href = url.toString();
  return { url, utm };
}

/** Delegación: cubre también menú móvil y enlaces que aparecen tras enviar un formulario. */
export function CommercialTracking() {
  useEffect(() => {
    rememberUtm();
    document.querySelectorAll("a[href]").forEach((node) => {
      if (!(node instanceof HTMLAnchorElement)) return;
      decorateMeasured(node, "/cotizacion");
      decorateMeasured(node, "/correo");
    });
    function onClick(event: MouseEvent) {
      const element = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(element instanceof HTMLAnchorElement)) return;
      const url = new URL(element.href, window.location.href);
      const placement = element.closest("header") ? "header" : element.closest("footer") ? "footer" : "content";
      if (url.origin === window.location.origin && url.pathname === "/cotizacion") {
        // Contexto para la medición en servidor: página de origen, UTM y preferencia de privacidad.
        const decorated = decorateMeasured(element, "/cotizacion");
        const current = decorated?.url ?? url;
        const utm = decorated?.utm ?? storedUtm();
        const item = cleanText(current.searchParams.get("item"));
        const linea = cleanText(current.searchParams.get("linea"));
        const tpl = (current.searchParams.get("tpl") ?? (item ? "item" : "general")) as QuoteTemplate;
        const svcParam = current.searchParams.get("svc");
        const svc = isQuoteService(svcParam) ? svcParam : null;
        const extra: CommercialExtra = { source_page: window.location.pathname, product: productFor(item, linea, window.location.pathname, tpl, svc), ...(svc ? { service: svc } : {}), ...(linea ? { line: linea } : {}), ...utm };
        trackCommercialEvent("quote_whatsapp_click", "whatsapp", placement, extra);
        trackVercelClick("whatsapp_click", {
          source_page: window.location.pathname,
          item: item ? slug(item) : undefined,
          linea: linea ? slug(linea) : undefined,
          svc: svc ?? undefined,
          tpl,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
        });
      } else if (url.origin === window.location.origin && url.pathname === "/correo") {
        const decorated = decorateMeasured(element, "/correo");
        const current = decorated?.url ?? url;
        const utm = decorated?.utm ?? storedUtm();
        const item = cleanText(current.searchParams.get("item"));
        const linea = cleanText(current.searchParams.get("linea"));
        trackCommercialEvent("email_click", "email", placement, { source_page: window.location.pathname, ...(item ? { product: slug(item) } : {}), ...(linea ? { line: linea } : {}), ...utm });
        trackVercelClick("email_click", {
          source_page: window.location.pathname,
          item: item ? slug(item) : undefined,
          linea: linea ? slug(linea) : undefined,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
        });
      } else if (url.protocol === "https:" && url.hostname === "wa.me") {
        const utm = storedUtm();
        trackCommercialEvent("whatsapp_click", "whatsapp", placement, { source_page: window.location.pathname, ...utm });
        trackVercelClick("whatsapp_click", { source_page: window.location.pathname, utm_source: utm.utm_source, utm_medium: utm.utm_medium, utm_campaign: utm.utm_campaign });
      } else if (url.protocol === "tel:") {
        trackCommercialEvent("phone_click", "phone", placement);
      } else if (url.protocol === "mailto:") {
        trackCommercialEvent("email_click", "email", placement);
        trackVercelClick("email_click", { source_page: window.location.pathname });
      }
    }
    // auxclick: clic central / abrir en pestaña nueva también lleva origen y UTM.
    function onAux(event: MouseEvent) { if (event.button === 1) onClick(event); }
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onAux, true);
    return () => { document.removeEventListener("click", onClick, true); document.removeEventListener("auxclick", onAux, true); };
  }, []);
  return null;
}
