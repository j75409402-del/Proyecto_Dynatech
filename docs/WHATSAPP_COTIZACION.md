# Cotización por WhatsApp — flujo principal (AP-004, 4-oct-2026)

Decisión del dueño: el prospecto va **directo a WhatsApp Business** (+1 809-284-4336, `CONTACT.whatsapp = 18092844336`). El formulario web deja de ser CTA.

## Flujo
1. Todos los CTA de cotización enlazan a `/cotizacion?item=…&linea=…&tpl=…` (`quoteHref`, `whatsappGeneral`, `whatsappCylinderService`, `whatsappSolucion` → `src/lib/quote.ts`).
2. Al hacer clic, `CommercialTracking` añade `from=<página>`, las UTM de la sesión y `nt=1` si la analítica está rechazada/DNT; publica `quote_whatsapp_click` en `dataLayer` (para GTM/GA4 futuro).
3. `src/app/cotizacion/page.tsx` (servidor) arma el mensaje precargado, registra `quote_whatsapp_click` en Umami vía `after()` (no retrasa al usuario) y redirige 307 a `https://wa.me/18092844336?text=…`.
4. Sin JavaScript también funciona (redirección de servidor; origen por `Referer`, que los CTA internos envían porque usan `rel="noopener"` sin `noreferrer`). Clic central (`auxclick`) también añade origen/UTM.
5. Limitaciones conocidas: peticiones HEAD de escáneres con agente de navegador y dobles clics cuentan; el envío servidor a Umami usa la IP del servidor (geografía/sesión aproximadas). Verificar en el panel de Umami tras el primer despliegue.

## Medición (Umami → evento `quote_whatsapp_click`, propiedades)
| Propiedad | Origen |
|---|---|
| `source_page` | `from` (clic) o `Referer`; `direct` si no hay |
| `product` | `item` → `linea` → plantilla → ruta de origen (`PRODUCT_BY_PATH`) |
| `line` | `linea` si existe |
| `utm_source/medium/campaign/term/content` | URL de /cotizacion o primera visita de la sesión |
| `channel` | `whatsapp` |
No se envían mensajes, teléfonos ni datos personales. No se mide con DNT, GPC, rechazo de analítica, bots ni prefetch del navegador. Umami cliente **no** recibe `quote_whatsapp_click` (evita doble conteo): la cifra oficial es la del servidor. Clics a `wa.me` directos (garantías, devoluciones, formulario de contacto) siguen como `whatsapp_click`.

Reglas: enlazar `/cotizacion` siempre con `<a>`, nunca con `<Link>` (el prefetch de Next contaría clics). Para campañas usar `https://www.dynatech.com.do/cotizacion?item=…&utm_source=…&utm_medium=…&utm_campaign=…`.

## Legado (no borrado todavía)
- `/cotizacion/correo` → redirección **307** a `/cotizacion` (`next.config.mjs`; revertir = borrar la línea). Fuera del sitemap.
- Se conservan `src/app/cotizacion/correo/page.tsx`, `src/components/forms/QuoteForm.tsx`, `/api/cotizacion`, `/api/upload-adjunto` (posible webhook/n8n externo y tabla `quotes` que lee `/admin`).
- Retiro definitivo: cuando `quotes` no reciba filas nuevas en 30 días tras publicar (revisar en /admin) y se confirme que ningún webhook externo usa `/api/cotizacion`.

## Pruebas
`tests/whatsapp-quote.test.mjs` (servidor + navegador escritorio/móvil, Umami simulado vía `UMAMI_API_URL`), y actualizados `commercial`, `analytics`, `seo-organic`.
