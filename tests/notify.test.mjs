import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Ejecutar el helper real con HTTP simulado, sin correos ni datos externos.
const source = await readFile(new URL('../src/lib/notify.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
}).outputText;
const { notifyLead } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

test('avisos por correo: configuración, contenido y fallos', async (t) => {
  const original = { fetch: globalThis.fetch, error: console.error };
  const envNames = ['RESEND_API_KEY', 'LEAD_NOTIFY_EMAIL', 'RESEND_FROM'];
  const env = Object.fromEntries(envNames.map((key) => [key, process.env[key]]));
  let requests = [];
  let errors = [];
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return new Response('{}', { status: 200 });
  };
  console.error = (...args) => errors.push(args);
  try {
    await t.test('sin configuración no envía y deja diagnóstico', async () => {
      delete process.env.RESEND_API_KEY;
      delete process.env.LEAD_NOTIFY_EMAIL;
      await notifyLead('Prueba', ['Contenido']);
      assert.equal(requests.length, 0);
      assert.equal(errors.length, 1);
    });
    await t.test('envía datos escapados, destinatarios y respuesta al cliente', async () => {
      process.env.RESEND_API_KEY = 'test-only';
      process.env.LEAD_NOTIFY_EMAIL = ' equipo@example.com, , ventas@example.com ';
      process.env.RESEND_FROM = 'Dynatech <web@example.com>';
      await notifyLead('Solicitud\r\nPrueba', ['<script>cliente</script>', 'https://example.com/?q="x"'], 'cliente@example.com');
      const request = requests.at(-1);
      const body = JSON.parse(request.options.body);
      assert.equal(request.url, 'https://api.resend.com/emails');
      assert.deepEqual(body.to, ['equipo@example.com', 'ventas@example.com']);
      assert.equal(body.reply_to, 'cliente@example.com');
      assert.equal(body.from, process.env.RESEND_FROM);
      assert.equal(body.subject, 'Solicitud  Prueba');
      assert.match(body.html, /&lt;script&gt;/);
      assert.doesNotMatch(body.html, /<script>|<a /);
      assert.ok(request.options.signal instanceof AbortSignal);
    });
    await t.test('un rechazo HTTP no falla ni filtra el cuerpo del proveedor', async () => {
      globalThis.fetch = async () => new Response('PRIVATE_PROVIDER_RESPONSE', { status: 403 });
      await assert.doesNotReject(notifyLead('Prueba', ['Contenido']));
      assert.equal(errors.at(-1).at(-1), 403);
      assert.doesNotMatch(JSON.stringify(errors), /PRIVATE_PROVIDER_RESPONSE|test-only/);
    });
    await t.test('un fallo de red no hace fallar la solicitud', async () => {
      globalThis.fetch = async () => { throw new Error('PRIVATE_NETWORK_DETAILS'); };
      await assert.doesNotReject(notifyLead('Prueba', ['Contenido']));
      assert.doesNotMatch(JSON.stringify(errors), /PRIVATE_NETWORK_DETAILS/);
    });
  } finally {
    globalThis.fetch = original.fetch;
    console.error = original.error;
    for (const key of envNames) {
      if (env[key] === undefined) delete process.env[key];
      else process.env[key] = env[key];
    }
    requests = [];
    errors = [];
  }
});
