// Atribución de Google Ads en el puente /cotizacion (nota `claude/coordinacion-ads-web.md`, aprobada el 14-oct-2026).
// Un clic con utm_source=google Y utm_medium=cpc → el mensaje de WhatsApp incluye «Vengo de un anuncio de Google»;
// orgánico o sin parámetros → no. Con consentimiento, cada clic genera exactamente UN evento en Umami
// (quote_whatsapp_click, enviado desde el servidor) con service y UTM; con la analítica rechazada, ninguno.
// Uso: iniciar `next start -p 3197` con UMAMI_API_URL=http://127.0.0.1:3196/api/send y luego
//   PLAYWRIGHT_MODULE=… BROWSER_EXECUTABLE=… TEST_BASE_URL=http://localhost:3197 MOCK_PORT=3196 node tests/ads-attribution.test.mjs
// Opcional: EVIDENCE_FILE=ruta.json guarda el detalle de cada caso. No envía nada real a Umami ni a WhatsApp.
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');

const base = process.env.TEST_BASE_URL || 'http://localhost:3197';
const mockPort = Number(process.env.MOCK_PORT || 3196);
const PHRASE = 'Vengo de un anuncio de Google';
const BROWSER_UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Mobile Safari/537.36';
const PAID = 'utm_source=google&utm_medium=cpc&utm_campaign=prueba_medicion';

// Umami simulado: recibe los eventos que /cotizacion envía desde el servidor.
const received = [];
const mock = http.createServer((req, res) => { let b = ''; req.on('data', c => (b += c)); req.on('end', () => { try { received.push({ at: new Date().toISOString(), ...JSON.parse(b) }); } catch {} res.end('{}'); }); });
await new Promise(r => mock.listen(mockPort, '127.0.0.1', r));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await chromium.launch({ ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}), headless: true });
async function newContext({ rejected = false } = {}) {
  const ctx = await browser.newContext({ userAgent: BROWSER_UA, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  // Script de Umami simulado en el navegador: registra lo que el cliente intentaría enviar.
  await ctx.route('https://cloud.umami.is/script.js', r => r.fulfill({ contentType: 'application/javascript', body: 'window.hits=[];window.umami={track:async p=>{window.hits.push(p)}};' }));
  // WhatsApp interceptado: nunca se abre el real.
  for (const host of ['https://wa.me/**', 'https://api.whatsapp.com/**']) await ctx.route(host, r => r.fulfill({ contentType: 'text/html', body: '<title>wa</title>ok' }));
  if (rejected) await ctx.addInitScript(() => { try { if (location.hostname === 'localhost') localStorage.setItem('dynatech.analytics-consent.v1', 'rejected'); } catch {} });
  return ctx;
}

const evidence = [];
/** Toca el CTA principal de la página (abre /cotizacion en otra pestaña) y devuelve mensaje + eventos nuevos. */
async function quoteClick(ctx, page, label) {
  const before = received.length;
  const link = page.locator('main a[href^="/cotizacion"]').first();
  await link.waitFor();
  // La redirección de /cotizacion a WhatsApp se lee de la petición saliente (la pestaña nueva no carga WhatsApp real).
  const waRequest = ctx.waitForEvent('request', { predicate: q => /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(q.url()), timeout: 10000 });
  const [popup] = await Promise.all([ctx.waitForEvent('page'), link.click()]);
  const url = new URL((await waRequest).url());
  const message = url.searchParams.get('text') || '';
  await popup.close();
  // Espera el envío en segundo plano y un margen extra para detectar duplicados tardíos.
  const t = Date.now(); while (received.length === before && Date.now() - t < 4000) await sleep(50);
  await sleep(1200);
  const events = received.slice(before);
  const clientHits = await page.evaluate(() => (window.hits || []).filter(h => h.name)).catch(() => []);
  const row = { caso: label, pagina: new URL(page.url()).pathname, mensaje: message, frase_ads: message.includes(PHRASE), eventos_servidor: events.length, eventos: events.map(e => ({ name: e.payload?.name, data: e.payload?.data })), eventos_cliente_umami: clientHits.map(h => h.name) };
  evidence.push(row);
  return row;
}

const passed = [];
try {
  // 1) Clic pagado: frase + 1 evento con service y UTM
  let ctx = await newContext();
  let page = await ctx.newPage();
  await page.goto(`${base}/mecanizado?${PAID}`, { waitUntil: 'networkidle' });
  let r = await quoteClick(ctx, page, '1 · Clic pagado (google/cpc) en /mecanizado');
  assert.ok(r.frase_ads, r.mensaje);
  assert.ok(!/·\s*G\b/.test(r.mensaje), 'no debe usarse «· G»');
  assert.equal(r.eventos_servidor, 1);
  assert.equal(r.eventos[0].name, 'quote_whatsapp_click');
  assert.equal(r.eventos[0].data.service, 'mecanizado');
  assert.equal(r.eventos[0].data.utm_source, 'google');
  assert.equal(r.eventos[0].data.utm_medium, 'cpc');
  assert.equal(r.eventos[0].data.utm_campaign, 'prueba_medicion');
  assert.equal(r.eventos[0].data.source_page, '/mecanizado');
  assert.deepEqual(r.eventos_cliente_umami, [], 'el cliente no debe duplicar el evento en Umami');
  passed.push('clic pagado');

  // 2) Navegación entre páginas en la misma sesión pagada: sigue siendo pagado
  await page.goto(`${base}/servicios`, { waitUntil: 'networkidle' });
  r = await quoteClick(ctx, page, '2 · Misma sesión pagada, otra página (/servicios)');
  assert.ok(r.frase_ads, r.mensaje);
  assert.equal(r.eventos_servidor, 1);
  assert.equal(r.eventos[0].data.service, 'neumatico-reparar');
  assert.equal(r.eventos[0].data.utm_medium, 'cpc');
  assert.equal(r.eventos[0].data.utm_campaign, 'prueba_medicion');
  assert.equal(r.eventos[0].data.source_page, '/servicios');
  passed.push('navegación entre páginas');

  // 3) Pestaña nueva sin parámetros en el mismo navegador: no hereda el origen pagado
  const tab = await ctx.newPage();
  await tab.goto(`${base}/cilindros-hidraulicos`, { waitUntil: 'networkidle' });
  r = await quoteClick(ctx, tab, '3 · Pestaña nueva sin parámetros (/cilindros-hidraulicos)');
  assert.ok(!r.frase_ads, r.mensaje);
  assert.equal(r.eventos_servidor, 1);
  assert.equal(r.eventos[0].data.service, 'hidraulico');
  assert.equal(r.eventos[0].data.utm_source, undefined);
  assert.equal(r.eventos[0].data.utm_medium, undefined);
  passed.push('pestaña nueva sin parámetros');
  await ctx.close();

  // 4) Orgánica de Google (llega desde google.com, sin UTM)
  ctx = await newContext(); page = await ctx.newPage();
  await page.goto(`${base}/mecanizado`, { waitUntil: 'networkidle', referer: 'https://www.google.com/' });
  r = await quoteClick(ctx, page, '4 · Orgánica de Google, sin UTM (/mecanizado)');
  assert.ok(!r.frase_ads, r.mensaje);
  assert.equal(r.eventos_servidor, 1);
  assert.equal(r.eventos[0].data.service, 'mecanizado');
  assert.equal(r.eventos[0].data.utm_medium, undefined);
  await ctx.close();

  // 4b) Orgánica marcada con utm_medium=organic: tampoco es anuncio
  ctx = await newContext(); page = await ctx.newPage();
  await page.goto(`${base}/mecanizado?utm_source=google&utm_medium=organic&utm_campaign=prueba_medicion`, { waitUntil: 'networkidle' });
  r = await quoteClick(ctx, page, '4b · Google con utm_medium=organic (/mecanizado)');
  assert.ok(!r.frase_ads, r.mensaje);
  assert.equal(r.eventos_servidor, 1);
  assert.equal(r.eventos[0].data.utm_source, 'google');
  assert.equal(r.eventos[0].data.utm_medium, 'organic');
  await ctx.close();
  passed.push('visita orgánica');

  // 5) Sin parámetros (dirección escrita)
  ctx = await newContext(); page = await ctx.newPage();
  await page.goto(`${base}/cilindros-neumaticos`, { waitUntil: 'networkidle' });
  r = await quoteClick(ctx, page, '5 · Sin parámetros (/cilindros-neumaticos)');
  assert.ok(!r.frase_ads, r.mensaje);
  assert.equal(r.eventos_servidor, 1);
  assert.equal(r.eventos[0].data.service, 'neumatico-fabricar');
  assert.equal(Object.keys(r.eventos[0].data).filter(k => k.startsWith('utm_')).length, 0);
  await ctx.close();
  passed.push('sin parámetros');

  // 6) Clic pagado con la analítica rechazada: frase sí, ningún evento ni script de Umami
  ctx = await newContext({ rejected: true }); page = await ctx.newPage();
  await page.goto(`${base}/mecanizado?${PAID}`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#dynatech-umami').count(), 0);
  r = await quoteClick(ctx, page, '6 · Clic pagado con analítica rechazada (/mecanizado)');
  assert.ok(r.frase_ads, r.mensaje);
  assert.equal(r.eventos_servidor, 0);
  await ctx.close();
  passed.push('analítica rechazada');

  console.log(`OK (${passed.length}): ${passed.join(' · ')}`);
} finally {
  if (process.env.EVIDENCE_FILE) fs.writeFileSync(process.env.EVIDENCE_FILE, JSON.stringify({ base, fecha: new Date().toISOString(), casos: evidence }, null, 2));
  await browser.close();
  mock.close();
}
