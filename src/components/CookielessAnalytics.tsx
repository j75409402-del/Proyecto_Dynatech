"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const EVENTS = new Set(["whatsapp_click", "phone_click", "email_click", "quote_form_open", "generate_lead"]);
type Payload = Record<string, unknown>;
type UmamiWindow = Window & { umami?: { track: (payload: Payload) => Promise<unknown> } };
function enabled() {
  if (navigator.doNotTrack === "1") return false;
  try { return localStorage.getItem("dynatech.analytics-consent.v1") !== "rejected"; } catch { return true; }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("dynatech:analytics-consent", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("dynatech:analytics-consent", callback); };
}
function cleanReferrer() {
  try { const url = new URL(document.referrer); return url.pathname.startsWith("/admin") ? "" : url.origin + url.pathname; } catch { return ""; }
}

/** Se activa Ãºnicamente con el ID y script reales de la cuenta del propietario. */
export function CookielessAnalytics({ websiteId, scriptUrl }: { websiteId: string; scriptUrl: string }) {
  const pathname = usePathname();
  const allowed = useSyncExternalStore(subscribe, enabled, () => false);
  const [ready, setReady] = useState(false);
  const previousPage = useRef<string | null>(null);
  const admin = pathname.startsWith("/admin");
  useEffect(() => {
    const tracker = (window as UmamiWindow).umami;
    if (!ready || !tracker || admin || !allowed) return;
    function payload(): Payload {
      return { website: websiteId, hostname: window.location.hostname, url: window.location.pathname, title: document.title, referrer: cleanReferrer(), language: navigator.language, screen: `${screen.width}x${screen.height}` };
    }
    if (previousPage.current !== pathname) {
      void tracker.track(payload()).catch(() => {});
      previousPage.current = pathname;
    }
    function onConversion(event: Event) {
      const detail = (event as CustomEvent).detail;
      if (!detail || !EVENTS.has(detail.event) || !enabled() || window.location.pathname.startsWith("/admin")) return;
      void tracker!.track({ ...payload(), name: detail.event, data: { channel: detail.channel, ...(detail.placement ? { placement: detail.placement } : {}) } }).catch(() => {});
    }
    window.addEventListener("dynatech:conversion", onConversion);
    return () => window.removeEventListener("dynatech:conversion", onConversion);
  }, [ready, pathname, admin, websiteId, allowed]);
  if (!allowed || admin || !websiteId || !scriptUrl) return null;
  return <Script id="dynatech-umami" src={scriptUrl} data-website-id={websiteId} data-auto-track="false" data-exclude-search="true" data-exclude-hash="true" data-do-not-track="true" strategy="afterInteractive" onReady={() => setReady(true)} />;
}
