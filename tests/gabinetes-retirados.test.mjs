// La línea de gabinetes eléctricos se retiró el 12-nov-2026. No debe volver al menú,
// al catálogo, al formulario ni al sitemap, y la URL vieja tiene que seguir en 301.
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import nextConfig from '../next.config.mjs';

const redirects = await nextConfig.redirects();
const redirect = redirects.find((rule) => rule.source === '/gabinetes-electricos');
assert.ok(redirect, 'falta el redirect de /gabinetes-electricos');
assert.equal(redirect.destination, '/control-electrico');
assert.equal(redirect.statusCode, 301);

let pageExists = true;
try {
  await access(new URL('../src/app/gabinetes-electricos/page.tsx', import.meta.url));
} catch {
  pageExists = false;
}
assert.equal(pageExists, false, 'la página de gabinetes no debe existir');

const soluciones = await readFile(new URL('../src/lib/soluciones.ts', import.meta.url), 'utf8');
assert.equal(/gabinete/i.test(soluciones), false, 'soluciones.ts sigue ofreciendo gabinetes');

const visibles = [
  '../src/app/page.tsx',
  '../src/app/layout.tsx',
  '../src/app/aplicaciones/page.tsx',
  '../src/components/home/HomeSections.tsx',
];
for (const file of visibles) {
  const text = await readFile(new URL(file, import.meta.url), 'utf8');
  assert.equal(/gabinete/i.test(text), false, file);
}

const correo = await readFile(new URL('../src/lib/correo.ts', import.meta.url), 'utf8');
assert.match(correo, /"\/gabinetes-electricos": "Control eléctrico"/);
assert.equal(correo.includes('Gabinetes eléctricos'), false);

const sitemap = await readFile(new URL('../src/app/sitemap.ts', import.meta.url), 'utf8');
assert.equal(sitemap.includes('SOLUCIONES'), true);
assert.equal(/entry\("\/gabinetes-electricos"/.test(sitemap), false);

console.log('OK: gabinetes fuera de la oferta; /gabinetes-electricos → 301 /control-electrico');
