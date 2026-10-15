/**
 * Envío del evento `quote_whatsapp_click` a Umami desde el servidor (/cotizacion).
 *
 * Contexto (15-oct-2026, docs/ads-atribucion/EVIDENCIA.md §7): de 10 clics de prueba se perdió 1.
 * En los registros de Vercel ese clic sí llegó a /cotizacion (307) pero la función duró 3.122 ms,
 * justo el límite de 3 s que tenía el envío; los demás duraron 0,6–1,4 s. El error se ignoraba
 * sin registrar nada, así que no había forma de detectarlo.
 *
 * Reglas:
 * - Se ejecuta dentro de after(): la redirección a WhatsApp ya salió; nada de esto la retrasa.
 * - Límite de 8 s: un envío lento ya no se corta a los 3 s.
 * - Cada fallo deja UNA línea de error en los registros de Vercel: `quote_event_send_failed`,
 *   con el motivo y datos sin información personal (servicio, página, campaña).
 * - Sin duplicados: Umami no admite clave de idempotencia, así que solo se reintenta (una vez)
 *   cuando la conexión falló ANTES de enviar la petición. Tras un tiempo agotado, un 5xx o un
 *   corte a mitad de respuesta no se reintenta: Umami pudo haberlo registrado.
 */

export const QUOTE_EVENT_TIMEOUT_MS = 8000;

/** Errores de conexión en los que la petición no llegó a enviarse (reintentar no duplica). */
const NOT_SENT_CODES = new Set(["ENOTFOUND", "EAI_AGAIN", "ECONNREFUSED", "EHOSTUNREACH", "ENETUNREACH", "UND_ERR_CONNECT_TIMEOUT"]);

export type QuoteEventOutcome =
  | { ok: true; status: number; ms: number; attempts: number }
  | { ok: false; reason: "timeout" | "http_error" | "rejected" | "network"; status?: number; code?: string; ms: number; attempts: number };

type SendOptions = {
  url: string;
  body: unknown;
  userAgent: string;
  /** Datos de diagnóstico SIN información personal (servicio, página, campaña). */
  context?: Record<string, string | undefined>;
  timeoutMs?: number;
  log?: (line: string) => void;
};

function errorCode(error: unknown): string {
  const e = error as { code?: string; cause?: { code?: string } } | null;
  return e?.cause?.code ?? e?.code ?? "";
}

async function attempt(opts: SendOptions, deadline: number): Promise<QuoteEventOutcome & { retryable?: boolean }> {
  const start = Date.now();
  try {
    const res = await fetch(opts.url, {
      method: "POST",
      headers: { "content-type": "application/json", "user-agent": opts.userAgent },
      body: JSON.stringify(opts.body),
      signal: AbortSignal.timeout(Math.max(1, deadline - start)),
    });
    const text = await res.text().catch(() => "");
    const ms = Date.now() - start;
    if (!res.ok) return { ok: false, reason: "http_error", status: res.status, ms, attempts: 1 };
    // Umami responde 200 con {"beep":"boop"} cuando descarta la petición (p. ej. la toma por bot).
    if (text.includes("beep")) return { ok: false, reason: "rejected", status: res.status, ms, attempts: 1 };
    return { ok: true, status: res.status, ms, attempts: 1 };
  } catch (error) {
    const ms = Date.now() - start;
    const name = (error as { name?: string } | null)?.name;
    if (name === "TimeoutError" || name === "AbortError") return { ok: false, reason: "timeout", ms, attempts: 1 };
    const code = errorCode(error);
    return { ok: false, reason: "network", code: code || undefined, ms, attempts: 1, retryable: NOT_SENT_CODES.has(code) };
  }
}

/** Nunca lanza: la analítica jamás bloquea la cotización. */
export async function sendQuoteEvent(opts: SendOptions): Promise<QuoteEventOutcome> {
  const started = Date.now();
  const deadline = started + (opts.timeoutMs ?? QUOTE_EVENT_TIMEOUT_MS);
  let result = await attempt(opts, deadline);
  if (!result.ok && result.retryable && deadline - Date.now() > 500) {
    await new Promise((r) => setTimeout(r, 300));
    result = { ...(await attempt(opts, deadline)), attempts: 2 };
  }
  const { retryable: _drop, ...outcome } = result;
  void _drop;
  const final = { ...outcome, ms: Date.now() - started } as QuoteEventOutcome;
  if (!final.ok) {
    const context = Object.fromEntries(Object.entries(opts.context ?? {}).filter(([, v]) => v));
    (opts.log ?? console.error)(JSON.stringify({ event: "quote_event_send_failed", ...final, ...context }));
  }
  return final;
}
