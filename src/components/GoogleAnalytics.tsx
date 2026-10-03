"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/constants";

const ID = "G-9JET3799ZE";
const KEY = "dynatech.analytics-consent.v1";
const CHANGE = "dynatech:analytics-consent";
const EVENTS = new Set(["whatsapp_click", "phone_click", "email_click", "quote_form_open", "generate_lead"]);
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: `ga-disable-${string}`]: boolean };
function snapshot() { try { return localStorage.getItem(KEY); } catch { return null; } }
function subscribe(callback: () => void) {
  window.addEventListener(CHANGE, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(CHANGE, callback); window.removeEventListener("storage", callback); };
}
function choose(value: string) {
  try { localStorage.setItem(KEY, value); } catch { return; }
  window.dispatchEvent(new Event(CHANGE));
}
function cleanReferrer() {
  try { const url = new URL(document.referrer); return url.pathname.startsWith("/admin") ? "" : url.origin + url.pathname; } catch { return ""; }
}
function initialize() {
  const target = window as unknown as AnalyticsWindow;
  target[`ga-disable-${ID}`] = false;
  if (target.gtag) { target.gtag("consent", "update", { analytics_storage: "granted" }); return; }
  target.dataLayer ??= [];
  // gtag exige un objeto arguments en la cola oficial.
  // eslint-disable-next-line prefer-rest-params
  target.gtag = function () { target.dataLayer!.push(arguments); };
  target.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  target.gtag("js", new Date());
  target.gtag("config", ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: SITE.url + window.location.pathname, page_referrer: cleanReferrer() });
  const script = document.createElement("script");
  script.id = "dynatech-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(script);
}

/** Analítica opcional: carga solo tras aceptar, sin query, mensajes ni campos personales. */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, snapshot, () => null);
  const lastPage = useRef<string | null>(null);
  const admin = pathname.startsWith("/admin");
  useEffect(() => {
    const target = window as unknown as AnalyticsWindow;
    if (consent !== "accepted" || admin) {
      target[`ga-disable-${ID}`] = true;
      lastPage.current = null;
      return;
    }
    initialize();
    const location = SITE.url + pathname;
    target.gtag!("set", { page_location: location, page_referrer: cleanReferrer() });
    if (lastPage.current !== pathname) {
      target.gtag!("event", "page_view", { send_to: ID, page_location: location, page_title: document.title, page_referrer: cleanReferrer() });
      lastPage.current = pathname;
    }
    function onConversion(event: Event) {
      const detail = (event as CustomEvent).detail;
      if (!detail || !EVENTS.has(detail.event) || snapshot() !== "accepted" || window.location.pathname.startsWith("/admin")) return;
      target.gtag!("event", detail.event, { send_to: ID, channel: detail.channel, ...(detail.placement ? { placement: detail.placement } : {}), page_path: window.location.pathname, page_location: SITE.url + window.location.pathname });
    }
    window.addEventListener("dynatech:conversion", onConversion);
    return () => window.removeEventListener("dynatech:conversion", onConversion);
  }, [consent, pathname, admin]);
  if (admin) return null;
  if (consent) return <button type="button" onClick={() => choose("")} className="fixed bottom-2 left-2 z-40 border border-black/15 bg-white px-3 py-2 text-xs text-steel-300 shadow-sm">Preferencias de analítica</button>;
  return (
    <section aria-label="Preferencias de analítica" className="fixed inset-x-0 bottom-0 z-50 border-t border-black/15 bg-white shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.2)]">
      <div className="container-max flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-steel-300">¿Nos permites usar Google Analytics para mejorar la web y medir consultas? Es opcional y no afecta tu cotización. <Link href="/privacidad" className="underline underline-offset-4">Más información</Link></p>
        <div className="flex shrink-0 gap-3"><button type="button" onClick={() => choose("rejected")} className="btn-secondary">Rechazar</button><button type="button" onClick={() => choose("accepted")} className="btn-primary">Aceptar analítica</button></div>
      </div>
    </section>
  );
}
