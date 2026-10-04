import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
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
    assert.deepEqual(schemas.find(s=>s['@type']==='LocalBusiness').openingHoursSpecification, [
      {'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:'08:00',closes:'17:00'},
      {'@type':'OpeningHoursSpecification',dayOfWeek:['Saturday'],opens:'08:00',closes:'12:00'}
    ]);
    const whatsapp=new URL(await page.getByRole('link',{name:'Cotizar válvula por WhatsApp',exact:true}).getAttribute('href'));
    assert.equal(whatsapp.hostname,'wa.me');assert.equal(whatsapp.pathname,'/18092844336');
    assert.ok(whatsapp.searchParams.get('text').includes('Válvulas neumáticas'));
    const email=await page.getByRole('link',{name:'Cotizar por correo',exact:true}).first().getAttribute('href');
    assert.equal(new URL(email,base).searchParams.get('tipo'),'Neumática');
    await page.screenshot({path:`docs/seo-organico-20261003/valvulas-${width}.png`,fullPage:true});
  }
  await page.goto(base+'/neumatica');
  const nav=page.getByRole('navigation',{name:'Subcategorías de Neumática',exact:true});
  assert.equal(await nav.getByRole('link',{name:'Válvulas neumáticas',exact:true}).getAttribute('href'),'/valvulas-neumaticas');
  assert.equal(await nav.locator('a[href="#conexiones"]').count(),1);
  await nav.getByRole('link',{name:'Válvulas neumáticas',exact:true}).click();
  await page.waitForURL(base+'/valvulas-neumaticas');
  assert.equal(new URL(page.url()).pathname,'/valvulas-neumaticas');
  const catalog={exports:{},require:()=>new Proxy({}, {get:()=>()=>{}})};
  vm.runInNewContext(ts.transpileModule(await readFile('src/lib/soluciones.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,catalog);
  let navigationLinks=0;
  for(const line of catalog.exports.SOLUCIONES){
    await page.goto(base+'/'+line.slug);
    const navigation=page.getByRole('navigation',{name:'Subcategorías de '+line.name,exact:true});
    for(const sub of line.subcategorias){
      assert.equal(await navigation.getByRole('link',{name:sub.title,exact:true}).getAttribute('href'),sub.href ?? '#'+sub.id);
      if(!sub.href)assert.equal(await page.locator('[id="'+sub.id+'"]').count(),1);
      navigationLinks++;
    }
  }
  const noJS=await browser.newContext({javaScriptEnabled:false});
  const staticPage=await noJS.newPage();await staticPage.goto(base+'/valvulas-neumaticas');
  assert.ok(await staticPage.locator('h1').isVisible());
  assert.ok(await staticPage.getByRole('link',{name:'Cotizar válvula por WhatsApp',exact:true}).isVisible());
  await noJS.close();
  await writeFile('docs/seo-organico-20261003/enlaces-verificados.json',JSON.stringify({results,navigationLinks,hoursVerified:true,widths:[390,768,1440],canonical:true,indexable:true,jsonLd:'JSON parseado y relaciones verificadas; no Rich Results Test',cta:true,withoutJavaScript:true},null,2));
  console.log(JSON.stringify({links:results.length,navigationLinks,widths:3,result:'OK'}));
}finally{await browser.close();}
