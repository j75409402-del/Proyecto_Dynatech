import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import routeCacheIncrementalCache from "./cloudflare/route-cache-incremental-cache";

// Todas las páginas públicas son estáticas (sin ISR): la caché se lee directo de los assets
// del deploy, sin R2 ni KV. Ver cloudflare/route-cache-incremental-cache.ts.
export default defineCloudflareConfig({
  incrementalCache: routeCacheIncrementalCache,
});
