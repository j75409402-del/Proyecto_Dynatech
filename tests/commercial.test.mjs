import assert from 'node:assert/strict';
import { writeFile, mkdir } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'file:///C:/Users/senm1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');

const base = process.env.TEST_BASE_URL || 'http://localhost:3198';
const browser = await chromium.launch({ ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : { channel: 'msedge' }), headless: true });
const page = await browser.newPage();
// Las verificaciones locales no deben contaminar la analítica del negocio.
await page.route('https://cloud.umami.is/**', route => route.abort());
const errors = [];
const checks = [];
page.on('pageerror', e => errors.push(e.message));
await mkdir('docs/seo-verificacion', { recursive: true });
try {
  const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
  const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.dynatech\.com\.do([^<]*)<\/loc>/g)].map(m => m[1] || '/');
  assert.equal(routes.length, 19); // /cotizacion/correo salió del sitemap (AP-004); +/gabinetes-electricos (WEB-020)
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'load' });
      assert.equal(response.status(), 200, route);
      const result = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        overflow: document.documentElement.scrollWidth > innerWidth,
        schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)),
      }));
      assert.equal(result.h1, 1, route);
      assert.ok(result.title && result.description, route);
      assert.equal(result.canonical, `https://www.dynatech.com.do${route}`, route);
      assert.equal(result.overflow, false, `${width} ${route}`);
      assert.ok(result.schemas.some(s => s['@type'] === 'LocalBusiness' && s['@id'].endsWith('#business')));
      checks.push({ route, width, status: response.status(), title: result.title, overflow: result.overflow });
      if (width === 390 && ['/cilindros-hidraulicos', '/mecanizado', '/', '/servicios'].includes(route)) {
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += 750) {
            window.scrollTo(0, y);
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
          window.scrollTo(0, 0);
        });
        assert.equal(await page.evaluate(() => [...document.images].filter(image => !image.naturalWidth).length), 0, `Imágenes ${route}`);
        await page.screenshot({ path: `docs/seo-verificacion/${route === '/' ? 'inicio' : route.slice(1)}-390.png`, fullPage: true });
      }
    }
  }
  for (const [path, expected] of [['/reparacion-cilindros-neumaticos', '/servicios'], ['/categorias/neumatica', '/neumatica'], ['/categorias/sensores-autonics', '/sensores'], ['/carrito', '/cotizacion']]) {
    const response = await page.request.get(base + path, { maxRedirects: 0 });
    assert.equal(response.status(), 308);
    assert.equal(response.headers().location, expected);
  }
  assert.equal((await page.request.get(base + '/no-existe')).status(), 404);
  const admin = await page.request.get(base + '/admin', { maxRedirects: 0 });
  const adminStatus = admin.status();
  // Sin variables locales de Supabase esta ruta devuelve 500: registrar la limitación.
  if (adminStatus === 307) assert.ok(admin.headers().location.includes('/admin/login'));
  const login = await page.request.get(base + '/admin/login');
  assert.ok((await login.text()).includes('noindex'));

  await page.goto(base + '/cilindros-hidraulicos');
  await page.evaluate(() => document.addEventListener('click', e => { if (e.target.closest('a')) e.preventDefault(); }));
  await page.getByRole('link', { name: 'Cotiza cilindros hidráulicos por WhatsApp', exact: true }).click();
  const events = await page.evaluate(() => window.dataLayer);
  assert.equal(events.filter(e => e.event === 'quote_whatsapp_click').length, 1);
  assert.equal(events[0].page_path, '/cilindros-hidraulicos');
  assert.equal(events[0].source_page, '/cilindros-hidraulicos');
  assert.equal(events[0].product, 'cilindros_hidraulicos');
  assert.ok(!JSON.stringify(events).includes('text='));

  await page.goto(base + '/contacto');
  await page.evaluate(() => document.addEventListener('click', e => { if (e.target.closest('a')) e.preventDefault(); }));
  await page.locator('main a[href^="tel:"]').click();
  await page.locator('main a[href^="mailto:"]').click();
  assert.deepEqual(await page.evaluate(() => window.dataLayer.map(e => e.event)), ['phone_click', 'email_click']);
  // AP-004: sin formulario de cotización compitiendo con WhatsApp.
  await page.goto(base + '/mecanizado');
  assert.equal(await page.getByRole('link', { name: 'Cotizar por correo', exact: true }).count(), 0);
  const correo = await page.request.get(base + '/cotizacion/correo', { maxRedirects: 0 });
  assert.equal(correo.status(), 307);
  assert.equal(correo.headers().location, '/cotizacion');

  await page.goto(base + '/contacto');
  await page.locator('#name').fill('Contacto de prueba');
  await page.locator('#email').fill('prueba@example.com');
  await page.locator('#message').fill('Consulta industrial de prueba sin envío real.');
  await page.route('**/api/contacto', route => route.fulfill({ status: 201, contentType: 'application/json', body: '{"ok":true}' }));
  await page.waitForTimeout(3100);
  await page.getByRole('button', { name: /Enviar/ }).click();
  await page.getByText('Mensaje enviado', { exact: true }).waitFor();
  assert.equal(await page.evaluate(() => window.dataLayer.filter(e => e.event === 'generate_lead' && e.channel === 'contact_form').length), 1);

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Menú', exact: true }).click();
  assert.ok(await page.getByRole('link', { name: 'Servicios', exact: true }).first().isVisible());
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJS.newPage();
  await staticPage.goto(base + '/mecanizado');
  assert.ok(await staticPage.getByRole('heading', { level: 1 }).isVisible());
  assert.ok(await staticPage.getByRole('link', { name: 'Cotiza mecanizado por WhatsApp', exact: true }).isVisible());
  await noJS.close();
  assert.deepEqual(errors, []);
  await writeFile('docs/seo-verificacion/resultados.json', JSON.stringify({ checks, errors, admin: { status: adminStatus, verified: adminStatus === 307, note: adminStatus === 307 ? 'Redirección sin sesión' : 'NO VERIFICADO: faltan variables locales de Supabase' }, additional: ['redirecciones', '404', 'login noindex', 'clic WhatsApp sin datos personales', 'formulario por correo retirado del flujo (307)', 'conversión de contacto con API simulada', 'menú móvil', 'contenido sin JavaScript'] }, null, 2));
  console.log(JSON.stringify({ pagesAndViewports: checks.length, errors, result: 'OK' }));
} finally { await browser.close(); }
