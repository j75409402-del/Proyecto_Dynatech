> 4-oct-2026: flujo principal de cotización = WhatsApp (AP-004). Ver `docs/WHATSAPP_COTIZACION.md`. Formulario por correo legado; no restaurarlo como CTA sin pedido del dueño.

# HANDOFF — Dynatech Web (1-oct-2026)

Resumen para el próximo agente. El detalle está en `PROJECT_CONTEXT.md` y `AUDITORIA_COMPLETA.md`.

## Estado actual

- **Producción:** `https://www.dynatech.com.do` en **Vercel** (deploy automático desde `main`). Funciona y está verificado.
- **Qué es el sitio:**
  - Proveedor industrial B2B **bajo cotización**: sin precios, carrito ni inventario.
  - Tiene 5 páginas de línea: `/neumatica`, `/control-electrico`, `/sensores`, `/instrumentacion` y `/resistencias-electricas`.
  - Los **cilindros neumáticos** son la línea destacada: `/cilindros-neumaticos`, `/servicios` y `/sellos-y-componentes`.
- **Catálogo de SKUs:** retirado el 30-sep-2026 (`75f0337`). **No restaurarlo** sin pedido del dueño. Sigue en git (`6178629`) y en las tablas de Supabase.
- **Hosting Cloudflare:** preparado (`00ba341`, `docs/CLOUDFLARE.md`), probado en local y **no desplegado**.

## Git

| | |
|---|---|
| Branch | `main` (sincronizada con `origin/main`) |
| Último commit de código | `00ba341` Prepara el hosting en Cloudflare Workers (OpenNext) |
| Commit de esta entrega | El siguiente a `00ba341` en `main`: "Documentación de entrega…". Solo contiene documentación |
| Último commit estable desplegado | `00ba341` (verificado en producción el 1-oct-2026) |
| Versión actual del sitio (contenido) | `bbf24f1` (5 líneas + seguridad) + `5703927` (menú "Productos") |
| Versión con el catálogo de SKUs | `6178629` (8-sep-2026) |
| Versión solo cilindros | `75f0337` (30-sep-2026) |
| Rama relacionada | `origin/claude/dynatech-redesign-ptmqty` (`e1b9b52`): borrador viejo, **no compila, no usar** |
| Cambios sin commit | Ninguno en el código. La carpeta local `Claude outputs/` no se versiona (contiene copias de estos documentos) |

## Qué NO tocar sin aprobación del dueño

1. **No restaurar el catálogo de SKUs** ni inventar productos, marcas, servicios, especificaciones, precios, inventario, teléfonos, emails ni dominios.
2. **No eliminar las redirecciones** de `next.config.mjs`.
3. **Contratos de las APIs:**
   - `/api/cotizacion` y `/api/contacto` no deben cambiar (puede haber un n8n; NO VERIFICADO).
   - `/api/upload-adjunto` ya cambió el 1-oct (ver PROJECT_CONTEXT §9).
4. **Supabase:**
   - No ejecutar `npm run db:reset` ni `npm run db:seed` contra producción.
   - No borrar tablas, ni `quotes`, ni `contact_messages`, ni las del catálogo archivado.
5. **No borrar imágenes** de `public/`.
6. **No tocar el cron keepalive** (`vercel.json`, `/api/keepalive`, `custom-worker.ts`).
7. **No cambiar `middleware.ts` a `proxy.ts`** mientras se piense usar Cloudflare.
8. **No subir secretos**, no modificar `.env.local` y no exponer la service-role key.
9. **Mantener la identidad visual:** rojo `#E4002B`, IBM Plex, radios mínimos.

## Archivos para leer primero

1. `src/lib/soluciones.ts`: las 5 líneas, sus subcategorías y textos (fuente única).
2. `src/lib/servicios.ts`: servicios de cilindros y opciones del formulario.
3. `src/lib/constants.ts`: datos de empresa y menú.
4. `src/components/soluciones/SolucionPage.tsx` y `src/components/home/HomeSections.tsx`.
5. `src/components/forms/QuoteForm.tsx`, `src/app/api/cotizacion/route.ts` y `src/app/api/upload-adjunto/route.ts`.
6. `src/middleware.ts`, `src/lib/supabase/middleware.ts`, `src/lib/adminEmails.ts` y `src/app/admin/`.
7. `next.config.mjs` (redirecciones).
8. `docs/CLOUDFLARE.md` y `wrangler.jsonc` (si se migra el hosting).

## Prioridades (detalle en AUDITORIA_COMPLETA §11)

1. **Lo hace el dueño:** cerrar los registros públicos de Supabase Auth. Hoy están abiertos.
2. **Probar con el dueño** un envío real de cotización con adjunto y verlo en `/admin`.
3. **Aviso de leads:** configurar Resend (`RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`) o confirmar el webhook. Hoy nadie recibe aviso automático.
4. **Hosting:** quedarse en Vercel Pro (≈ 20 USD/mes) o completar Cloudflare. Faltan la cuenta, las variables y mover los nameservers en NIC.do.
5. **Bucket de adjuntos:** decidir si pasa de público a privado.
6. **Media:** imagen OG general, `LocalBusiness`, Lighthouse y no ocultar secciones hasta hidratar, migraciones desfasadas, `.gitattributes` y `CRON_SECRET`.

## Confirmar con el dueño antes de cambiar

- Cualquier producto, subcategoría, marca o servicio nuevo. Pidió y quedaron fuera por no estar documentados: transformadores de control, reguladores eléctricos y tableros eléctricos.
- Si los banners de las líneas pueden seguir mostrando logos de terceros.
- El texto del hero de la home.
- Cambio de hosting o de dominio y plan de Supabase.
- Hacer privado el bucket de adjuntos.
- Agregar un botón flotante de WhatsApp, analítica o píxeles.
- Datos de contacto: número de la dirección y LinkedIn (NO VERIFICADO).
- Textos legales (borrador genérico).

## Validación al 1-oct-2026

```
npx tsc --noEmit     → 0 errores
npm run lint         → 0 errores, 1 aviso (postcss.config.mjs: import/no-anonymous-default-export)
npm run build        → OK, 25 rutas; aviso esperado "middleware file convention is deprecated"
npm audit --omit=dev → 0 vulnerabilidades
```
