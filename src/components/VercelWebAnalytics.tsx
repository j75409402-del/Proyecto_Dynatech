"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

function analyticsRejected() {
  if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return true;
  const gpc = typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
  if (gpc) return true;
  try { return localStorage.getItem("dynatech.analytics-consent.v1") === "rejected"; } catch { return false; }
}

/** Quita la query (puede traer UTM o datos de un formulario) y descarta admin, DNT y el rechazo guardado. */
function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (analyticsRejected()) return null;
  try {
    const url = new URL(event.url, "https://www.dynatech.com.do");
    if (url.pathname.startsWith("/admin")) return null;
    url.search = "";
    url.hash = "";
    return { ...event, url: `${url.origin}${url.pathname}` };
  } catch {
    return null;
  }
}

/**
 * Vercel Web Analytics. No envía nada si NEXT_PUBLIC_DISABLE_ANALYTICS=1
 * (vista previa y pruebas). En producción hay que activar Web Analytics en el proyecto.
 */
export function VercelWebAnalytics() {
  if (process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === "1") return null;
  return <Analytics beforeSend={beforeSend} />;
}
