// Worker de Cloudflare: usa el handler que genera OpenNext y le agrega la tarea diaria
// (cron) que antes hacía Vercel: llamar /api/keepalive para que Supabase Free no se pause.
// @ts-expect-error -- .open-next/worker.js se genera en el build (opennextjs-cloudflare build)
import { default as handler } from "./.open-next/worker.js";

type Env = { CRON_SECRET?: string };

export default {
  fetch: handler.fetch,

  async scheduled(_event: unknown, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }) {
    const headers: Record<string, string> = {};
    if (env.CRON_SECRET) headers.authorization = `Bearer ${env.CRON_SECRET}`;
    const req = new Request("https://www.dynatech.com.do/api/keepalive", { headers });
    ctx.waitUntil(
      handler.fetch(req, env, ctx).then(async (res: Response) => {
        console.log("keepalive:", res.status, await res.text());
      }),
    );
  },
};

// OpenNext puede exportar Durable Objects para la caché; se re-exportan por si se activan.
// @ts-expect-error -- generado en el build
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
