import { writeFile, mkdir } from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'https://www.dynatech.com.do';
const output = process.env.SEO_AUDIT_OUTPUT || 'docs/seo-organico-20261003/produccion.json';
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const results = await Promise.all(routes.map(async path => {
  const response = await fetch(base + path);
  const html = await response.text();
  const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(m => m[0]);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  return {path, status:response.status, title:html.match(/<title>(.*?)<\/title>/s)?.[1],
    description:attr(tags.find(t => /name="description"/.test(t)) || '', 'content'),
    canonical:attr(tags.find(t => /rel="canonical"/.test(t)) || '', 'href'),
    robots:attr(tags.find(t => /name="robots"/.test(t)) || '', 'content'),
    h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(m => m[1].replace(/<[^>]+>/g,'')),
    ogTitle:attr(tags.find(t => /property="og:title"/.test(t)) || '', 'content'),
    ogUrl:attr(tags.find(t => /property="og:url"/.test(t)) || '', 'content'),
    schemaTypes:schemas.map(s => s['@type']),
    business:schemas.find(s => s['@type'] === 'LocalBusiness'),
    internalLinks:[...new Set([...html.matchAll(/href="(\/[^"#]*)"/g)].map(m => m[1]))],
    imagesWithoutAlt:[...html.matchAll(/<img\b[^>]*>/g)].filter(m => !/alt="/.test(m[0])).length,
    umami:html.includes('4bbea860-f2e7-4268-9476-190563eeab0a')};
}));
await mkdir(output.slice(0,output.lastIndexOf('/')), {recursive:true});
const robots = await (await fetch(base+'/robots.txt')).text();
await writeFile(output,JSON.stringify({date:new Date().toISOString(),base,sitemapCount:routes.length,robots,results},null,2));
console.log(JSON.stringify({base,pages:results.length,statuses:[...new Set(results.map(r=>r.status))],badH1:results.filter(r=>r.h1.length!==1).map(r=>r.path),missingMeta:results.filter(r=>!r.title||!r.description||!r.canonical).map(r=>r.path),output}));
