import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import('file:///C:/Users/senm1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const browser = await chromium.launch({channel:'msedge',headless:true});
const base = process.env.TEST_BASE_URL || 'http://localhost:3210';
const out = 'docs/b2b-20261030';
await mkdir(out,{recursive:true});
const results = [];
try {
 for (const width of [360,390,768,1440]) {
  const ctx = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  await ctx.route('https://cloud.umami.is/**',r=>r.abort());
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/',{waitUntil:'networkidle'});
  assert.match(await page.locator('h1').innerText(),/Suministros industriales para mantener tu operación en marcha/);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${width}`);
  assert.equal(await page.locator('.b2b-steps > li').count(),4);
  assert.equal(await page.locator('.b2b-categories > li').count(),9);
  const ctaContrast = await page.locator('.b2b-category .supply-quote').first().evaluate(el=>{
    const luminance = css => { const rgb=css.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722; };
    const style=getComputedStyle(el),a=luminance(style.color),b=luminance(style.backgroundColor);
    return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
  });
  assert.ok(ctaContrast>=4.5,`contraste CTA: ${ctaContrast}`);
  assert.equal(await page.locator('.b2b-hero a[href="/catalogo"]').count(),1);
  assert.equal(await page.locator('.b2b-hero a[href="/cilindros-neumaticos"]').count(),1);
  assert.equal(await page.locator('.b2b-hero a[href^="/cotizacion"]').count(),1);
  const schema = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.map(n=>JSON.parse(n.textContent)));
  assert.ok(schema.some(s=>s['@type']==='LocalBusiness'&&s.address.streetAddress==='Av. Rómulo Betancourt 2158'));
  assert.ok(await page.locator('footer a[href*="google.com/maps"]').count());
  await page.screenshot({path:`${out}/inicio-${width}.png`});
  if(width===1440||width===390) {
   await page.evaluate(async()=>{for(const im of document.images)im.loading='eager';await Promise.all([...document.images].map(im=>im.decode().catch(()=>{})));});
   await page.screenshot({path:`${out}/inicio-completo-${width}.png`,fullPage:true});
   await page.locator('#soluciones').screenshot({path:`${out}/categorias-${width}.png`});
   await page.locator('.b2b-process').screenshot({path:`${out}/proceso-${width}.png`});
  }
  assert.deepEqual(errors,[]);
  results.push({width,reducedMotion:true,overflow:false,consoleErrors:errors,location:'actual',categories:9,steps:4});
  await ctx.close();
 }
 const ctx = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const p = await ctx.newPage();await p.goto(base+'/');
 assert.ok(await p.locator('.b2b-hero h1').isVisible());
 assert.ok(await p.locator('.b2b-hero a[href^="/cotizacion"]').isVisible());
 assert.ok(await p.locator('.b2b-category h3').first().isVisible());
 await ctx.close();
 await writeFile(`${out}/b2b-responsive.json`,JSON.stringify({results,noJS:true},null,2));
 console.log('OK: B2B 360/390/768/1440, reduced-motion, contenido sin JS, ubicación actual y CTAs.');
} finally { await browser.close(); }
