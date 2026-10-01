import type { IncrementalCache } from "@opennextjs/aws/types/overrides";
import staticAssetsCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Next.js 16.3 guarda las páginas pre-generadas con claves nuevas
 * ("/route-cache/APP_PAGE/<sha256>/$/sensores"), pero el adaptador de Cloudflare
 * (@opennextjs/cloudflare 1.20) las publica con la clave clásica ("/sensores").
 * Sin esta traducción, cada visita vuelve a renderizar la página en vez de servirla
 * pre-generada. Es de solo lectura: el sitio no usa revalidación (ISR).
 */
const ROUTE_CACHE_KEY = /^\/route-cache\/[^/]+\/[0-9a-f]{64}\/\$(\/.*)$/;

function legacyKey(key: string): string {
  return ROUTE_CACHE_KEY.exec(key)?.[1] ?? key;
}

const routeCacheIncrementalCache: IncrementalCache = {
  // Mismo nombre que la caché original: el paso de deploy lo usa para copiar las páginas.
  name: staticAssetsCache.name,
  get: (key, cacheType) => staticAssetsCache.get(legacyKey(key), cacheType),
  // Solo lectura (igual que el original), pero sin llenar el log de errores en cada visita.
  set: async () => {},
  delete: async () => {},
};

export default routeCacheIncrementalCache;
