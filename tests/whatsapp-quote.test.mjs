// Flujo principal /cotizacion → WhatsApp Business (AP-004, 4-oct-2026).
// Uso: iniciar `next start` con UMAMI_API_URL=http://127.0.0.1:<MOCK_PORT>/api/send y luego
//   TEST_BASE_URL=http://localhost:3197 MOCK_PORT=3196 node tests/whatsapp-quote.test.mjs
// No envía nada real a Umami ni a WhatsApp: ambos se interceptan.
import assert from 'node:assert/strict';
import http from 'node:http';
const { chromium, devices } = await import(process.env.PLAYWRIGHT_MODULE || 'file:///C:/Users/senm1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');

const base = process.env.TEST_BASE_URL || 'http://localhost:3197';
const mockPort = Number(process.env.MOCK_PORT || 3196);
const OFFICIAL = '18092844336'; // src/lib/constants.ts CONTACT.whatsapp (confirmado en PROJECT_CONTEXT y WhatsApp Business)
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';

// Umami simulado: recibe los eventos que el servidor envía con after().
const received = [];
const mock = http.createServer((req, res) => { let b = ''; req.on('data', c => b += c); req.on('end', () => { try { received.push(JSON.parse(b)); } catch {} res.end('{}'); }); });
await new Promise(r => mock.listen(mockPort, '127.0.0.1', r));
const waitEvents = async (n, ms = 3000) => { const t = Date.now(); while (received.length < n && Date.now() - t < ms) await new Promise(r => setTimeout(r, 50)); return received.length; };

async function hit(path, headers = {}) {
  const r = await fetch(base + path, { redirect: 'manual', headers: { 'user-agent': BROWSER_UA, ...headers } });
  return { status: r.status, location: r.headers.get('location') || '', robots: r.headers.get('x-robots-tag') };
}
const text = loc => new URL(loc).searchParams.get('text') || '';
const results = [];
const ok = (name) => { results.push(name); };

try {
  // 1) Redirección con contexto completo + evento en servidor
  let r = await hit('/cotizacion?item=Cilindros%20hidr%C3%A1ulicos&from=%2Fcilindros-hidraulicos&utm_source=google&utm_medium=cpc&utm_campaign=cilindros-oct');
  assert.equal(r.status, 307);
  assert.ok(r.location.startsWith(`https://wa.me/${OFFICIAL}?text=`), r.location);
  assert.match(text(r.location), /^Hola Dynatech, solicito cotización sobre Cilindros hidráulicos\./);
  assert.match(text(r.location), /\(Desde www\.dynatech\.com\.do\/cilindros-hidraulicos\)/);
  assert.match(text(r.location), /¿Fabricar o reparar\?:\nDiámetro x carrera/);
  await waitEvents(1);
  assert.equal(received.length, 1);
  const ev = received[0].payload;
  assert.equal(received[0].type, 'event');
  assert.equal(ev.name, 'quote_whatsapp_click');
  assert.equal(ev.website, '4bbea860-f2e7-4268-9476-190563eeab0a');
  assert.deepEqual(ev.data, { channel: 'whatsapp', source_page: '/cilindros-hidraulicos', product: 'cilindros_hidraulicos', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'cilindros-oct' });
  ok('redirección + evento servidor con source_page, product y UTM');

  // 2) Sin parámetros: origen por Referer, producto por ruta
  r = await hit('/cotizacion', { referer: 'https://www.dynatech.com.do/neumatica?x=1' });
  assert.equal(r.status, 307); assert.ok(r.location.startsWith(`https://wa.me/${OFFICIAL}?text=`));
  await waitEvents(2); assert.equal(received[1].payload.data.source_page, '/neumatica'); assert.equal(received[1].payload.data.product, 'neumatica');
  ok('origen por Referer');

  // 3) Plantilla de cilindros y línea
  r = await hit('/cotizacion?tpl=cilindro');
  assert.match(text(r.location), /reparación \/ fabricación de un cilindro neumático/);
  assert.match(text(r.location), /Diámetro x carrera/); assert.match(text(r.location), /foto, plano o placa/);
  await waitEvents(3); assert.equal(received[2].payload.data.product, 'cilindros_neumaticos'); assert.equal(received[2].payload.data.source_page, 'direct');
  r = await hit('/cotizacion?linea=Sensores&tpl=solucion');
  assert.match(text(r.location), /solicito cotización sobre Sensores\./); assert.ok(!/Diámetro/.test(text(r.location)));
  await waitEvents(4); assert.equal(received[3].payload.data.product, 'sensores');
  ok('plantillas cilindro y línea');

  // 4) No se mide: DNT, GPC, nt=1, bots, prefetch — pero la redirección funciona igual
  const before = received.length;
  for (const [path, headers] of [['/cotizacion', { dnt: '1' }], ['/cotizacion', { 'sec-gpc': '1' }], ['/cotizacion?nt=1', {}], ['/cotizacion', { 'user-agent': 'Googlebot/2.1' }], ['/cotizacion', { 'sec-purpose': 'prefetch;prerender' }], ['/cotizacion', { purpose: 'prefetch' }]]) {
    const x = await hit(path, headers); assert.equal(x.status, 307); assert.ok(x.location.includes(`wa.me/${OFFICIAL}`));
  }
  await new Promise(r => setTimeout(r, 800)); assert.equal(received.length, before);
  ok('privacidad: DNT/GPC/rechazo, bots y prefetch del navegador no se miden');
  // Prefetch de Next: imposible porque ningún <Link> apunta a /cotizacion (solo <a>); se verifica en el HTML.
  for (const path of ['/', '/servicios', '/cilindros-neumaticos']) {
    const html = await (await fetch(base + path)).text();
    assert.ok(!/<link[^>]+href="\/cotizacion/i.test(html), `sin prefetch de /cotizacion en ${path}`);
  }

  // 5) Datos inyectados no salen como HTML/controles; rutas externas no se aceptan como origen
  r = await hit('/cotizacion?item=%3Cscript%3Ex%3C%2Fscript%3E%0A%0Ahack&from=https%3A%2F%2Fevil.example%2Fx');
  assert.ok(!text(r.location).includes('<script>')); await waitEvents(before + 1); assert.equal(received.at(-1).payload.data.source_page, 'direct');
  r = await hit('/cotizacion?nombre=V%C3%A1lvula%205%2F2&tipo=Neum%C3%A1tica&nt=1'); assert.match(text(r.location), /sobre Válvula 5\/2 · Línea: Neumática/);
  r = await hit('/cotizacion?item=Cilindro%E2%80%AEevil&nt=1'); assert.ok(!text(r.location).includes('\u202e'));
  ok('saneamiento de parámetros y compatibilidad nombre/tipo');

  // 6) Formulario retirado del flujo
  const correo = await fetch(base + '/cotizacion/correo?nombre=x', { redirect: 'manual' });
  assert.equal(correo.status, 307); assert.equal(new URL(correo.headers.get('location'), base).pathname, '/cotizacion');
  const carrito = await fetch(base + '/carrito', { redirect: 'manual' }); assert.equal(carrito.status, 308); assert.equal(carrito.headers.get('location'), '/cotizacion');
  const sitemap = await (await fetch(base + '/sitemap.xml')).text(); assert.ok(!sitemap.includes('/cotizacion/correo'));
  ok('formulario por correo fuera del flujo (307 → /cotizacion, fuera del sitemap)');

  // 7) Navegador: escritorio y móvil, clic real desde páginas de producto y servicio
  const browser = await chromium.launch({ ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : { channel: 'msedge' }), headless: true });
  try {
    for (const [label, opts] of [['escritorio', { viewport: { width: 1440, height: 900 }, userAgent: BROWSER_UA }], ['móvil', { ...devices['iPhone 13'] }]]) {
      const ctx = await browser.newContext(opts);
      await ctx.route('https://cloud.umami.is/**', route => route.abort());
      const opened = [];
      // La navegación a wa.me es un 307 del servidor; se registra la petición (no se intercepta un redirect).
      ctx.on('request', req => { if (new URL(req.url()).hostname === 'wa.me') opened.push(req.url()); });
      await ctx.route('https://wa.me/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>WhatsApp (simulado)</title>' }));
      const page = await ctx.newPage();
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      for (const [path, linkName, product] of [['/cilindros-hidraulicos?utm_source=facebook&utm_medium=social&utm_campaign=hidraulicos', 'Solicitar cotización', 'cilindros_hidraulicos'], ['/valvulas-neumaticas', 'Solicitar cotización', null], ['/servicios', null, null]]) {
        await page.goto(base + path, { waitUntil: 'load' });
        assert.equal(await page.locator('a[href*="/cotizacion/correo"]').count(), 0, `sin CTA de correo en ${path}`);
        assert.equal(await page.getByText('Cotizar por correo', { exact: false }).count(), 0, `sin texto de correo en ${path}`);
        // WEB-020 (decisión del Capitán 05-oct): CTA principal "Solicitar cotización" (→ /cotizacion → WhatsApp); se busca dentro de <main> (no el del menú).
        const link = linkName ? page.locator('main').getByRole('link', { name: linkName, exact: true }).first() : page.locator('main a[href^="/cotizacion"]').first();
        assert.ok(await link.isVisible(), `CTA WhatsApp visible en ${path} (${label})`);
        const n = opened.length;
        const [popup] = await Promise.all([ctx.waitForEvent('page', { timeout: 10000 }), link.click()]);
        await popup.waitForLoadState('load').catch(() => {});
        await new Promise(r => setTimeout(r, 300));
        assert.equal(opened.length, n + 1, `WhatsApp abierto desde ${path} (${label})`);
        const wa = new URL(opened.at(-1));
        assert.equal(wa.hostname, 'wa.me'); assert.equal(wa.pathname, `/${OFFICIAL}`); assert.match(wa.searchParams.get('text'), /^Hola Dynatech/);
        const dl = await page.evaluate(() => (window.dataLayer || []).filter(e => e.event === 'quote_whatsapp_click').at(-1));
        assert.equal(dl.source_page, path.split('?')[0]);
        if (product) assert.equal(dl.product, product);
        if (path.includes('utm_source')) { assert.equal(dl.utm_source, 'facebook'); assert.equal(dl.utm_campaign, 'hidraulicos'); }
        assert.ok(!JSON.stringify(dl).includes('Hola'), 'el mensaje no va a la analítica');
        await popup.close();
      }
      // UTM de primera visita se conserva en la navegación interna
      await page.goto(base + '/servicios', { waitUntil: 'load' });
      const href = await page.evaluate(() => { const a = document.querySelector('main a[href^="/cotizacion"]'); a.addEventListener('click', e => e.preventDefault(), { once: true }); a.click(); return a.href; });
      assert.ok(href.includes('utm_source=facebook') && href.includes('from=%2Fservicios'), href);
      // Sin JS / Referer: el CTA envía Referer (sin noreferrer)
      assert.equal(await page.locator('a[href^="/cotizacion"][rel~="noreferrer"]').count(), 0);
      assert.deepEqual(errors, []);
      await ctx.close();
      ok(`clic real ${label}: abre wa.me/${OFFICIAL} con mensaje, mide origen/producto/UTM`);
    }
  } finally { await browser.close(); }
  console.log(JSON.stringify({ result: 'OK', checks: results, serverEvents: received.length }, null, 2));
} finally { mock.close(); }
