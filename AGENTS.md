# AGENTS.md — Instrucciones para agentes de programación (Codex, Claude, etc.)

Proyecto: sitio web de **Dynatech Ingeniería SRL** (`https://www.dynatech.com.do`).
Proveedor industrial B2B **bajo cotización**: sin precios, carrito ni inventario público.

## Lee primero, en este orden

1. `HANDOFF.md`: estado actual, qué no tocar y prioridades.
2. `PROJECT_CONTEXT.md`: arquitectura, rutas, APIs, Supabase, variables y reglas.
3. `AUDITORIA_COMPLETA.md`: qué funciona, qué se probó y pendientes.
4. `docs/CLOUDFLARE.md`: solo si el trabajo es sobre el hosting.

## Comandos

```bash
npm ci                 # instalar
npm run dev            # desarrollo (http://localhost:3000)
npx tsc --noEmit       # tipos
npm run lint           # ESLint (hoy: 0 errores, 1 aviso conocido en postcss.config.mjs)
npm run build          # build de producción (Next/Vercel)
npm run preview        # build + servidor local de Cloudflare (opcional)
```

Antes de dar un cambio por terminado: `npx tsc --noEmit`, `npm run lint` y `npm run build` deben pasar. **No ocultes errores.**

## Reglas obligatorias

- **No restaures el catálogo de SKUs** (productos individuales, buscador, carrito). Se retiró a propósito; está en git (`6178629`).
- **No inventes** productos, subcategorías, marcas, servicios, especificaciones, precios, inventario, teléfonos, emails ni dominios. Si falta información, pregúntale al dueño. Si algo no se pudo comprobar, escribe `NO VERIFICADO`.
- **Fuentes únicas de contenido:**
  - `src/lib/soluciones.ts`: las 5 líneas.
  - `src/lib/servicios.ts`: cilindros y opciones del formulario.
  - `src/lib/constants.ts`: datos de empresa y menú.
- **Nunca** ejecutes `npm run db:reset` ni `npm run db:seed` contra producción. No borres tablas de Supabase (`quotes` y `contact_messages` guardan leads).
- **No elimines** las redirecciones de `next.config.mjs` ni imágenes de `public/`.
- **No cambies el contrato** de `/api/cotizacion` ni de `/api/contacto` (JSON y webhook) sin documentarlo en `PROJECT_CONTEXT.md`.
- **No toques** el cron keepalive (`vercel.json`, `src/app/api/keepalive`, `custom-worker.ts`).
- **No renombres** `src/middleware.ts` a `proxy.ts`: el adaptador de Cloudflare no soporta el proxy en Node.
- **No subas secretos**, no modifiques `.env.local` y no imprimas claves en logs ni commits.
- **Diseño:**
  - Mantén la identidad: rojo `#E4002B` (`signal`), IBM Plex Sans/Mono, radios mínimos y estilo industrial.
  - Usa las clases existentes (`btn-primary`, `container-max`, `section-pad`, `eyebrow`) y los componentes `Reveal`, `QuoteCTA` y `Breadcrumbs`.
- **Páginas nuevas:** `metadata` con canonical, `Breadcrumbs` y `QuoteCTA` al final, entrada en `sitemap.ts`. Los CTA de cotización usan `quoteHref()`.
- **Textos** en español de República Dominicana, con tuteo.

## Git y deploy

- Rama `main`. **Cada push a `main` publica la web en Vercel.** Pide confirmación al dueño antes de hacer push.
- No hagas `reset`, `rebase` ni `push --force`, y no borres historial.
- Commits pequeños y descriptivos. Si cambias algo importante, actualiza `PROJECT_CONTEXT.md` y `AUDITORIA_COMPLETA.md`.

## Confirmar con el dueño antes de

- Agregar productos, líneas, marcas o servicios.
- Cambiar textos comerciales importantes (hero, legales) o datos de contacto.
- Cambiar hosting, dominio o plan de Supabase, o hacer privado el bucket de adjuntos.
- Agregar analítica, píxeles o un botón flotante de WhatsApp.
