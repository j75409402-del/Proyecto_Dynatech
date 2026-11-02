const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|headless|lighthouse|curl|wget|python|node-fetch|axios/i;

export type HeaderSource = { get(name: string): string | null };

export function isPrefetch(h: HeaderSource) {
  return h.get("next-router-prefetch") === "1" || h.get("purpose") === "prefetch" || (h.get("sec-purpose") ?? "").includes("prefetch") || h.get("rsc") === "1";
}

/** Misma regla que /cotizacion: sin bots, prefetch, DNT, GPC ni nt=1. */
export function trackingAllowed(h: HeaderSource, p: URLSearchParams) {
  if (h.get("dnt") === "1" || h.get("sec-gpc") === "1" || p.get("nt") === "1") return false;
  const ua = h.get("user-agent") ?? "";
  return Boolean(ua) && !BOT.test(ua) && !isPrefetch(h);
}
