// Los cinco recorridos hacia WhatsApp (portada → «¿Qué necesitas?» → página → «Cotizar por WhatsApp»),
// en escritorio y emulación móvil, con y sin parámetros de anuncio pagado (google/cpc).
// Comprueba: el acceso es visible, el mensaje de WhatsApp es el del servicio, la frase
// «Vengo de un anuncio de Google» aparece solo en la visita pagada y el servidor envía exactamente
// UN evento quote_whatsapp_click con service y UTM. Sin errores de JavaScript en la página.
// Uso: `next start -p 3197` con UMAMI_API_URL=http://127.0.0.1:3196/api/send y luego
//   PLAYWRIGHT_MODULE=… BROWSER_EXECUTABLE=… TEST_BASE_URL=http://localhost:3197 MOCK_PORT=3196 node tests/journeys-ads.test.mjs
// Contra una vista previa real: TEST_BASE_URL=<url> NO_MOCK=1 (los eventos van al Umami de esa vista previa;
// se marcan con utm_campaign=prueba_medicion y la hora queda en EVIDENCE_FILE).
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');

const base = process.env.TEST_BASE_URL || 'http://localhost:3197';
const useMock = process.env.NO_MOCK !== '1';
const mockPort = Number(process.env.MOCK_PORT || 3196);
const PHRASE = 'Vengo de un anuncio de Google';
const PAID = 'utm_source=google&utm_medium=cpc&utm_campaign=prueba_medicion';

const received = [];
let mock;
if (useMock) {
  mock = http.createServer((req, res) => { let b = ''; req.on('data', c => (b += c)); req.on('end', () => { try { received.push(JSON.parse(b)); } catch {} res.end('{}'); }); });
  await new Promise(r => mock.listen(mockPort, '127.0.0.1', r));
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

const JOURNEYS = [
  { id: 1, name: 'Reparar un cilindro neumático', access: 'Reparar un cilindro neumático', path: '/servicios', service: 'neumatico-reparar', text: /reparación de un cilindro neumático/ },
  { id: 2, name: 'Fabricar un cilindro hidráulico', access: 'Cilindro hidráulico', path: '/cilindros-hidraulicos', service: 'hidraulico', text: /un cilindro hidráulico[\s\S]*¿Reparar o fabricar\?/ },
  { id: 3, name: 'Mecanizar una pieza bajo plano o muestra', access: 'Mecanizar una pieza', path: '/mecanizado', service: 'mecanizado', text: /mecanizado de una pieza/ },
  { id: 4, name: 'Válvula, conexión u otro componente', access: '^Neumática$', path: '/neumatica', service: 'componente', text: /componente neumático/ },
  { id: 5, name: 'Solo tengo una foto', access: 'Solo tengo una foto', path: null, service: 'foto', text: /no tengo la referencia/ },
];
const VIEWPORTS = {
  escritorio: { viewport: { width: 1366, height: 900 } },
  movil: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3, userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Mobile Safari/537.36' },
};

const browser = await chromium.launch({ ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}), headless: true });
const evidence = [];
try {
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    for (const paid of [true, false]) {
      for (const j of JOURNEYS) {
        const ctx = await browser.newContext({ ...vp, userAgent: vp.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36' });
        if (useMock) await ctx.route('https://cloud.umami.is/script.js', r => r.fulfill({ contentType: 'application/javascript', body: 'window.hits=[];window.umami={track:async p=>{window.hits.push(p)}};' }));
        for (const host of ['https://wa.me/**', 'https://api.whatsapp.com/**']) await ctx.route(host, r => r.fulfill({ contentType: 'text/html', body: 'ok' }));
        const page = await ctx.newPage();
        const errors = []; page.on('pageerror', e => errors.push(e.message));
        await page.goto(`${base}/${paid ? `?${PAID}` : ''}`, { waitUntil: 'networkidle' });

        // Acceso por necesidad en la portada
        const access = page.getByRole('navigation', { name: '¿Qué necesitas?' }).getByRole('link', { name: new RegExp(j.access) });
        await access.scrollIntoViewIfNeeded();
        assert.ok(await access.isVisible(), `${vpName}: acceso «${j.access}» visible`);

        let quoteLink = access;
        if (j.path) {
          await access.click();
          await page.waitForURL(`**${j.path}`);
          await page.waitForLoadState('networkidle');
          quoteLink = page.locator('main a[href^="/cotizacion"]').first();
          await quoteLink.scrollIntoViewIfNeeded();
          assert.ok(await quoteLink.isVisible(), `${vpName}: CTA visible en ${j.path}`);
        }
        const before = received.length;
        const waRequest = ctx.waitForEvent('request', { predicate: q => /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(q.url()), timeout: 15000 });
        const [popup] = await Promise.all([ctx.waitForEvent('page'), quoteLink.click()]);
        const waUrl = new URL((await waRequest).url());
        const message = waUrl.searchParams.get('text') || '';
        const clickedAt = new Date().toISOString();
        await popup.close();
        if (useMock) { const t = Date.now(); while (received.length === before && Date.now() - t < 4000) await sleep(50); await sleep(1000); }
        const events = received.slice(before).map(e => e.payload);

        assert.equal(waUrl.pathname, '/18092844336', 'número oficial');
        assert.match(message, j.text, `${vpName} recorrido ${j.id}: mensaje del servicio`);
        assert.equal(message.includes(PHRASE), paid, `${vpName} recorrido ${j.id}: frase de anuncio solo si es pagado`);
        assert.ok(!/·\s*G\b/.test(message), 'sin «· G»');
        if (useMock) {
          assert.equal(events.length, 1, `${vpName} recorrido ${j.id}: exactamente 1 evento`);
          assert.equal(events[0].name, 'quote_whatsapp_click');
          assert.equal(events[0].data.service, j.service);
          if (paid) { assert.equal(events[0].data.utm_source, 'google'); assert.equal(events[0].data.utm_medium, 'cpc'); assert.equal(events[0].data.utm_campaign, 'prueba_medicion'); }
          else assert.equal(events[0].data.utm_medium, undefined);
          const clientQuoteHits = await page.evaluate(() => (window.hits || []).filter(h => h.name === 'quote_whatsapp_click').length);
          assert.equal(clientQuoteHits, 0, 'el navegador no duplica el evento');
        }
        assert.deepEqual(errors, [], `${vpName} recorrido ${j.id}: sin errores de JavaScript`);
        evidence.push({ vista: vpName, pagado: paid, recorrido: j.id, nombre: j.name, pagina: j.path ?? '/ (acceso directo)', frase_ads: message.includes(PHRASE), eventos: useMock ? events.length : 'no medido (Umami real)', service: events[0]?.data?.service ?? null, utm_medium: events[0]?.data?.utm_medium ?? null, hora_utc: clickedAt, mensaje: message });
        await ctx.close();
      }
    }
  }
  console.log(`OK: ${evidence.length} recorridos (5 × escritorio/móvil × pagado/sin parámetros)`);
} finally {
  if (process.env.EVIDENCE_FILE) fs.writeFileSync(process.env.EVIDENCE_FILE, JSON.stringify({ base, umami: useMock ? 'simulado' : 'real de la vista previa', fecha: new Date().toISOString(), recorridos: evidence }, null, 2));
  await browser.close();
  mock?.close();
}
