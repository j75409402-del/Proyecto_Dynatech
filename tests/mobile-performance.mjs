import { writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'file:///C:/Users/senm1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  for (const route of ['/', '/sensores', '/cilindros-hidraulicos']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.mobileMetrics = { lcpMs: null, cls: 0 };
      new PerformanceObserver(list => { const entries = list.getEntries(); window.mobileMetrics.lcpMs = entries[entries.length - 1].startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.mobileMetrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    const session = await context.newCDPSession(page);
    await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await session.send('Network.enable');
    await session.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
    await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3198') + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    results.push({ route, ...(await page.evaluate(() => window.mobileMetrics)) });
    await context.close();
  }
  await writeFile('docs/seo-verificacion/rendimiento-movil.json', JSON.stringify({ note: 'Una muestra local por ruta, CPU 4x y red 1.6 Mbps/150 ms. No equivale a Lighthouse ni Core Web Vitals de usuarios reales.', results }, null, 2));
  console.log(JSON.stringify(results));
} finally { await browser.close(); }
