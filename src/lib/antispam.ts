/**
 * Protección básica de los formularios públicos, sin servicios externos:
 * - Límite de envíos por IP (ventana deslizante en memoria). Es "best effort": en Vercel
 *   cada instancia tiene su propia memoria, pero corta ráfagas de un mismo origen.
 * - Honeypot: campo oculto que una persona nunca llena.
 * - Tiempo mínimo: un formulario enviado a los pocos segundos de cargarse es un bot.
 * - Origen: si el navegador manda Origin, debe ser este mismo sitio.
 */

const hits = new Map<string, number[]>();

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "desconocida").trim();
}

/** true si la IP superó `max` envíos en `windowMs`. */
export function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    // Limpieza simple para que el mapa no crezca sin límite.
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return recent.length > max;
}

export function badOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== new URL(req.url).host && new URL(origin).host !== req.headers.get("host");
  } catch {
    return true;
  }
}

/** Nombre del campo honeypot (oculto en los formularios). */
export const HONEYPOT_FIELD = "sitio_web";
/** Milisegundos mínimos entre que se carga el formulario y se envía. */
const MIN_FILL_MS = 3000;

/** true si el cuerpo parece de un bot (honeypot lleno o enviado demasiado rápido). */
export function looksLikeBot(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const honeypot = b[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  const started = Number(b._t);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS) return true;
  return false;
}
