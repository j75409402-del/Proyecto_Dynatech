"use client";

import { useEffect } from "react";
import { trackCommercialEvent, type CommercialExtra } from "@/lib/conversions";
import { cleanText, productFor, UTM_KEYS, type QuoteTemplate } from "@/lib/quote";

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

/** Delegación: cubre también menú móvil y enlaces que aparecen tras enviar un formulario. */
export function CommercialTracking() {
  useEffect(() => {
    rememberUtm();
    function onClick(event: MouseEvent) {
      const element = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(element instanceof HTMLAnchorElement)) return;
      const url = new URL(element.href, window.location.href);
      const placement = element.closest("header") ? "header" : element.closest("footer") ? "footer" : "content";
      if (url.origin === window.location.origin && url.pathname === "/cotizacion") {
        // Contexto para la medición en servidor: página de origen, UTM y preferencia de privacidad.
        const utm = { ...storedUtm() };
        for (const key of UTM_KEYS) { const v = url.searchParams.get(key); if (v) utm[key] = v; else if (utm[key]) url.searchParams.set(key, utm[key]); }
        url.searchParams.set("from", window.location.pathname);
        if (analyticsOff()) url.searchParams.set("nt", "1");
        element.href = url.toString();
        const item = cleanText(url.searchParams.get("item"));
        const linea = cleanText(url.searchParams.get("linea"));
        const tpl = (url.searchParams.get("tpl") ?? (item ? "item" : "general")) as QuoteTemplate;
        const extra: CommercialExtra = { source_page: window.location.pathname, product: productFor(item, linea, window.location.pathname, tpl), ...(linea ? { line: linea } : {}), ...utm };
        trackCommercialEvent("quote_whatsapp_click", "whatsapp", placement, extra);
      } else if (url.protocol === "https:" && url.hostname === "wa.me") {
        trackCommercialEvent("whatsapp_click", "whatsapp", placement, { source_page: window.location.pathname, ...storedUtm() });
      } else if (url.protocol === "tel:") {
        trackCommercialEvent("phone_click", "phone", placement);
      } else if (url.protocol === "mailto:") {
        trackCommercialEvent("email_click", "email", placement);
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
