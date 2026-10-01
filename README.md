# Dynatech Ingeniería — Sitio web

Sitio B2B de **Dynatech Ingeniería SRL** (Santo Domingo, República Dominicana). Es un proveedor industrial que trabaja **bajo cotización**: neumática, control eléctrico, sensores, instrumentación y resistencias eléctricas, y como línea destacada, fabricación, reparación y reconstrucción de cilindros neumáticos.

Producción: `https://www.dynatech.com.do` (Vercel).

**Antes de cambiar algo, lee:**
- `AGENTS.md`: reglas para agentes de programación (Codex las lee automáticamente).
- `HANDOFF.md`: resumen para continuar el proyecto.
- `PROJECT_CONTEXT.md`: cómo está construido.
- `AUDITORIA_COMPLETA.md`: estado real, pruebas y pendientes.
- `docs/CLOUDFLARE.md`: hosting alternativo preparado.

## Stack

Next.js 16.3 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · framer-motion · react-hook-form + zod · Supabase (formularios, admin y Storage) · Vercel. Opcional: Cloudflare Workers con `@opennextjs/cloudflare`.

## Arranque

```bash
npm ci
cp .env.example .env.local     # completar (ver PROJECT_CONTEXT.md §12)
npm run dev                    # http://localhost:3000
```

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm start` | Build y servidor de producción (Next/Vercel) |
| `npm run lint` | ESLint (`eslint.config.mjs`) |
| `npx tsc --noEmit` | Chequeo de tipos |
| `npm run preview` | Build para Cloudflare + servidor local (workerd) |
| `npm run deploy` | Build + deploy a Cloudflare (requiere `wrangler login`) |
| `npm run db:types` | Regenera `src/types/database.types.ts` desde un Supabase **local** |
| `npm run db:reset`, `npm run db:seed` | ⚠️ **Destructivos.** Solo contra Supabase local, **nunca contra producción** |

## Reglas

- Todo es bajo cotización: no hay precios, carrito ni inventario público.
- El catálogo de SKUs se retiró el 30-sep-2026; queda en git (`6178629`). No restaurarlo sin aprobación.
- No inventar productos, marcas, servicios ni datos de contacto. Las fuentes únicas son `src/lib/soluciones.ts`, `src/lib/servicios.ts` y `src/lib/constants.ts`.
- No eliminar las redirecciones de `next.config.mjs` ni imágenes de `public/`.
- No subir secretos. `.env.local` está fuera de git.
