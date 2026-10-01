# Hosting en Cloudflare Workers (reemplazo de Vercel)

El sitio corre en Cloudflare con el adaptador OpenNext (`@opennextjs/cloudflare`).
Vercel sigue funcionando en paralelo hasta que el dominio apunte a Cloudflare.

## Archivos
- `wrangler.jsonc`: Worker `dynatech-web`, assets, imágenes (binding `IMAGES`) y cron diario 13:00 UTC.
- `custom-worker.ts`: handler de OpenNext + tarea diaria que llama `/api/keepalive` (Supabase Free).
- `open-next.config.ts` + `cloudflare/route-cache-incremental-cache.ts`: sirve las páginas
  pre-generadas desde los assets. La traducción de claves es necesaria con Next 16.3 y
  @opennextjs/cloudflare 1.20; revisar si se puede quitar al actualizar el adaptador.
- `src/middleware.ts` (no `proxy.ts`): OpenNext todavía no soporta el proxy en runtime Node.

## Comandos
- `npm run preview`: build de Cloudflare + servidor local (workerd).
- `npm run deploy`: build + deploy (requiere `wrangler login`).

## Workers Builds (deploy automático desde GitHub)
- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`

## Variables (Settings → Variables and Secrets, y también como Build variables)
Obligatorias: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` (secreta). Copiar el resto que exista en Vercel:
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`,
`NEXT_PUBLIC_CONTACT_PHONE`, `QUOTE_WEBHOOK_URL`, `CONTACT_WEBHOOK_URL`, `ADMIN_EMAILS`,
`CRON_SECRET`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `RESEND_FROM`.

## Dominio
Los nameservers de dynatech.com.do están en midominio.do (NIC.do). Para usar Cloudflare:
agregar el dominio en Cloudflare (plan Free), cambiar los nameservers en NIC.do a los que
indique Cloudflare, y en el Worker agregar los Custom Domains `www.dynatech.com.do` y
`dynatech.com.do` (con una Redirect Rule de `dynatech.com.do` a `https://www.dynatech.com.do`).
