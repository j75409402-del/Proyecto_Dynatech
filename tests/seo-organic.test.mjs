import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'file:///C:/Users/senm1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const base=process.env.TEST_BASE_URL || 'http://localhost:3203';
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext();
await context.route('https://cloud.umami.is/**',r=>r.abort());
const page=await context.newPage();
const results=[];
try{
  const map=JSON.parse(await readFile('docs/seo-organico-20261003/mapa-keywords.json','utf8'));
  for(const target of [...new Set(map.rows.map(r=>r.target))]){
    const url=new URL(target,base);
    const response=await page.request.get(url.origin+url.pathname);
    assert.equal(response.status(),200,target);
    await page.goto(url.href,{waitUntil:'load'});
    if(url.hash)assert.equal(await page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).count(),1,target);
    results.push({target,status:response.status(),fragmentVerified:!!url.hash});
  }
  for(const width of [390,768,1440]){
    await page.setViewportSize({width,height:900});
    await page.goto(base+'/valvulas-neumaticas');
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.dynatech.com.do/valvulas-neumaticas');
    assert.ok((await page.locator('meta[name="robots"]').getAttribute('content')).includes('index'));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const schemas=await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.map(n=>JSON.parse(n.textContent)));
    assert.ok(schemas.some(s=>s['@type']==='BreadcrumbList'));
    assert.ok(schemas.some(s=>s['@type']==='Service'&&s.provider['@id']==='https://www.dynatech.com.do/#business'));
    assert.ok(schemas.some(s=>s['@type']==='LocalBusiness'&&s.openingHoursSpecification.opens==='08:30'));
    const whatsapp=new URL(await page.getByRole('link',{name:'Cotizar válvula por WhatsApp',exact:true}).getAttribute('href'));
    assert.equal(whatsapp.hostname,'wa.me');assert.equal(whatsapp.pathname,'/18092844336');
    assert.ok(whatsapp.searchParams.get('text').includes('Válvulas neumáticas'));
    const email=await page.getByRole('link',{name:'Cotizar por correo',exact:true}).first().getAttribute('href');
    assert.equal(new URL(email,base).searchParams.get('tipo'),'Neumática');
    await page.screenshot({path:`docs/seo-organico-20261003/valvulas-${width}.png`,fullPage:true});
  }
  await page.goto(base+'/neumatica');
  assert.ok(await page.locator('main a[href="/valvulas-neumaticas"]').count());
  const noJS=await browser.newContext({javaScriptEnabled:false});
  const staticPage=await noJS.newPage();await staticPage.goto(base+'/valvulas-neumaticas');
  assert.ok(await staticPage.locator('h1').isVisible());
  assert.ok(await staticPage.getByRole('link',{name:'Cotizar válvula por WhatsApp',exact:true}).isVisible());
  await noJS.close();
  await writeFile('docs/seo-organico-20261003/enlaces-verificados.json',JSON.stringify({results,widths:[390,768,1440],canonical:true,indexable:true,jsonLd:'JSON parseado y relaciones verificadas; no Rich Results Test',cta:true,withoutJavaScript:true},null,2));
  console.log(JSON.stringify({links:results.length,widths:3,result:'OK'}));
}finally{await browser.close();}
