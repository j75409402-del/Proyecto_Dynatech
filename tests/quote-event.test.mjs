// Envío del evento de cotización a Umami (src/lib/quote-event.ts): detección de fallos sin duplicados.
// Uso: node --experimental-strip-types tests/quote-event.test.mjs   (no envía nada a Umami real)
import assert from 'node:assert/strict';
import http from 'node:http';
import { sendQuoteEvent, QUOTE_EVENT_TIMEOUT_MS } from '../src/lib/quote-event.ts';

let hits = 0;
let behavior = 'ok';
const server = http.createServer((req, res) => {
  let b = ''; req.on('data', c => b += c);
  req.on('end', () => {
    hits++;
    if (behavior === 'ok') return res.end('{"cache":"x"}');
    if (behavior === 'slow') return setTimeout(() => res.end('{}'), 3500);
    if (behavior === 'hang') return setTimeout(() => res.end('{}'), 1500);
    if (behavior === '500') { res.statusCode = 500; return res.end('error'); }
    if (behavior === 'bot') return res.end('{"beep":"boop"}');
  });
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/api/send`;
const body = { type: 'event', payload: { name: 'quote_whatsapp_click' } };
const UA = 'Mozilla/5.0 (Windows NT 10.0) Chrome/141.0';
const context = { service: 'mecanizado', source_page: '/mecanizado', utm_campaign: 'prueba' };

async function run(b, extra = {}) {
  behavior = b; hits = 0; const lines = [];
  const out = await sendQuoteEvent({ url, body, userAgent: UA, context, log: l => lines.push(l), ...extra });
  return { out, hits, lines };
}

try {
  assert.equal(QUOTE_EVENT_TIMEOUT_MS, 8000);

  let r = await run('ok');
  assert.equal(r.out.ok, true); assert.equal(r.hits, 1); assert.equal(r.lines.length, 0);

  // El caso del clic perdido: Umami tarda más de 3 s. Antes se cortaba; ahora llega, 1 sola vez.
  r = await run('slow');
  assert.equal(r.out.ok, true, JSON.stringify(r.out)); assert.equal(r.hits, 1); assert.ok(r.out.ms >= 3400);

  // Tiempo agotado: se registra el fallo y NO se reintenta (Umami pudo haberlo guardado).
  r = await run('hang', { timeoutMs: 800 });
  assert.equal(r.out.ok, false); assert.equal(r.out.reason, 'timeout'); assert.equal(r.out.attempts, 1);
  await new Promise(res => setTimeout(res, 900));
  assert.equal(r.hits, 1, 'la petición llegó una vez y no se repitió');
  assert.equal(r.lines.length, 1);
  const line = JSON.parse(r.lines[0]);
  assert.equal(line.event, 'quote_event_send_failed'); assert.equal(line.reason, 'timeout');
  assert.equal(line.service, 'mecanizado'); assert.equal(line.source_page, '/mecanizado');
  assert.ok(!r.lines[0].includes('Mozilla') && !r.lines[0].includes('127.0.0.1'), 'sin agente de usuario ni IP en el registro');

  r = await run('500');
  assert.equal(r.out.reason, 'http_error'); assert.equal(r.out.status, 500); assert.equal(r.hits, 1); assert.equal(r.lines.length, 1);

  r = await run('bot');
  assert.equal(r.out.reason, 'rejected'); assert.equal(r.hits, 1); assert.equal(r.lines.length, 1);

  // Conexión rechazada: la petición no salió, así que se reintenta una vez; un solo registro.
  const closed = http.createServer(); await new Promise(res => closed.listen(0, '127.0.0.1', res));
  const deadUrl = `http://127.0.0.1:${closed.address().port}/api/send`; await new Promise(res => closed.close(res));
  const lines = [];
  const out = await sendQuoteEvent({ url: deadUrl, body, userAgent: UA, context, log: l => lines.push(l) });
  assert.equal(out.ok, false); assert.equal(out.reason, 'network'); assert.equal(out.code, 'ECONNREFUSED'); assert.equal(out.attempts, 2);
  assert.equal(lines.length, 1);

  console.log('quote-event: 6/6 (ok, lento >3 s, tiempo agotado sin reintento, 500, rechazado, conexión rechazada con 1 reintento)');
} finally {
  server.close();
}
