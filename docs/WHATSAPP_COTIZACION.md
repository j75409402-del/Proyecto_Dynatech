# Cotización por WhatsApp — flujo principal (AP-004, 4-oct-2026)

Decisión del dueño: el prospecto va **directo a WhatsApp Business** (+1 809-284-4336, `CONTACT.whatsapp = 18092844336`). El formulario web deja de ser CTA.

## Flujo
1. Todos los CTA de cotización enlazan a `/cotizacion?item=…&linea=…&tpl=…` (`quoteHref`, `whatsappGeneral`, `whatsappCylinderService`, `whatsappSolucion` → `src/lib/quote.ts`).
2. Al hacer clic, `CommercialTracking` añade `from=<página>`, las UTM de la sesión y `nt=1` si la analítica está rechazada/DNT; publica `quote_whatsapp_click` en `dataLayer` (para GTM/GA4 futuro).
3. `src/app/cotizacion/page.tsx` (servidor) arma el mensaje precargado, registra `quote_whatsapp_click` en Umami vía `after()` (no retrasa al usuario) y redirige 307 a `https://wa.me/18092844336?text=…`.
4. Sin JavaScript también funciona (redirección de servidor; origen por `Referer`, que los CTA internos envían porque usan `rel="noopener"` sin `noreferrer`). Clic central (`auxclick`) también añade origen/UTM.
5. Limitaciones conocidas: peticiones HEAD de escáneres con agente de navegador y dobles clics cuentan; el envío servidor a Umami usa la IP del servidor (geografía/sesión aproximadas). Verificar en el panel de Umami tras el primer despliegue.

## Cotización por necesidad (oct-2026)
`/cotizacion?svc=<clave>` arma un mensaje corto propio y mide el servicio. Claves (`QUOTE_SERVICES` en `src/lib/quote.ts`):

| `svc` | Mensaje empieza con | `product` |
|---|---|---|
| `neumatico-reparar` | quiero cotizar la reparación de un cilindro neumático | `reparacion_cilindro_neumatico` |
| `neumatico-fabricar` | … la fabricación de un cilindro neumático | `fabricacion_cilindro_neumatico` |
| `hidraulico` | … un cilindro hidráulico (¿reparar o fabricar?) | `cilindro_hidraulico` |
| `hidraulico-reparar` / `hidraulico-fabricar` | … reparación / fabricación de un cilindro hidráulico | `reparacion_…` / `fabricacion_cilindro_hidraulico` |
| `mecanizado` | … el mecanizado de una pieza | `mecanizado` |
| `componente` | busco un componente neumático (válvula, conexión, FRL u otro) | `componente_neumatico` |
| `foto` | no tengo la referencia. Les envío fotos de la pieza… | `identificar_por_foto` |

Todos invitan a empezar con una foto y piden como máximo dos datos; el resto se pregunta en la conversación. `item` opcional se añade como «Sobre: …». Un `svc` desconocido se ignora (mensaje general). El botón flotante móvil elige el `svc` según la página (`SERVICE_BY_PATH`). CTA único en todo el sitio: «Cotizar por WhatsApp» (se retiró el botón contiguo «WhatsApp» que abría el mismo canal).

## Medición (Umami → evento `quote_whatsapp_click`, propiedades)
| Propiedad | Origen |
|---|---|
| `source_page` | `from` (clic) o `Referer`; `direct` si no hay |
| `product` | `svc` → `item` → `linea` → plantilla → ruta de origen (`PRODUCT_BY_PATH`) |
| `service` | clave `svc`, si el CTA la lleva |
| `line` | `linea` si existe |
| `utm_source/medium/campaign/term/content` | URL de /cotizacion o primera visita de la sesión |
| `channel` | `whatsapp` |
No se envían mensajes, teléfonos ni datos personales. No se mide con DNT, GPC, rechazo de analítica, bots ni prefetch del navegador. Umami cliente **no** recibe `quote_whatsapp_click` (evita doble conteo): la cifra oficial es la del servidor. Clics a `wa.me` directos (garantías, devoluciones, formulario de contacto) siguen como `whatsapp_click`.

Reglas: enlazar `/cotizacion` siempre con `<a>`, nunca con `<Link>` (el prefetch de Next contaría clics). Para campañas usar `https://www.dynatech.com.do/cotizacion?item=…&utm_source=…&utm_medium=…&utm_campaign=…`.

## Atribución de Google Ads (14-oct-2026, aprobado por el dueño)
- Una visita es de **anuncio pagado** solo si trae `utm_source=google` **y** `utm_medium=cpc` (en la URL de `/cotizacion` o guardados en la sesión desde la primera página). Entonces el mensaje de WhatsApp termina con la línea «Vengo de un anuncio de Google» (`PAID_AD_PHRASE` en `src/lib/quote.ts`).
- La frase va **también con la analítica rechazada**; en ese caso no se envía ningún evento (`nt=1`).
- Orgánica de Google, `utm_medium` distinto de `cpc` o sin parámetros: sin frase.
- Las UTM viven en `sessionStorage` (por pestaña): navegar entre páginas conserva el origen pagado; una pestaña nueva sin parámetros no lo hereda.
- Sufijo de URL final de los anuncios: `utm_source=google&utm_medium=cpc&utm_campaign=dyn_taller&utm_content={adgroupid}&utm_term={keyword}`.
- Prueba: `tests/ads-attribution.test.mjs` (clic pagado, navegación, pestaña nueva, orgánica, sin parámetros, analítica rechazada; exactamente 1 evento por clic con consentimiento).

## Legado (no borrado todavía)
- `/cotizacion/correo` → redirección **307** a `/cotizacion` (`next.config.mjs`; revertir = borrar la línea). Fuera del sitemap.
- Se conservan `src/app/cotizacion/correo/page.tsx`, `src/components/forms/QuoteForm.tsx`, `/api/cotizacion`, `/api/upload-adjunto` (posible webhook/n8n externo y tabla `quotes` que lee `/admin`).
- Retiro definitivo: cuando `quotes` no reciba filas nuevas en 30 días tras publicar (revisar en /admin) y se confirme que ningún webhook externo usa `/api/cotizacion`.

## Pruebas
`tests/whatsapp-quote.test.mjs` (servidor + navegador escritorio/móvil, Umami simulado vía `UMAMI_API_URL`), `tests/ads-attribution.test.mjs` (atribución de Google Ads), `tests/journeys-ads.test.mjs` (los cinco recorridos desde la portada, escritorio y móvil, con y sin anuncio pagado) y actualizados `commercial`, `analytics`, `seo-organic`.

## Embudo: qué cuenta cada cifra (oct-2026)
No mezclar etapas: un clic no es una conversación ni una cotización.

| Etapa | Fuente | Cómo se cuenta |
|---|---|---|
| 1. Clic de cotización | Umami, evento `quote_whatsapp_click` (servidor) | Por `source_page`, `product`, `service` y UTM. Incluye a quien abre WhatsApp y no escribe. |
| 2. Conversación real | WhatsApp Business | Mensaje recibido que conserva la línea «(Desde www.dynatech.com.do/…)». Etiquetar el chat «Web» y el servicio. |
| 3. Cotización enviada | Registro comercial (hoja o /admin) | Una fila por cotización: fecha, servicio, origen (web/Ads/correo), monto. Sin datos de contacto en la analítica. |
| 4. Venta cobrada | Contabilidad | Factura cobrada vinculada a la fila de la cotización; margen y comisión se calculan aquí. |

Umami se mantiene como fuente de clics; no se añade otra herramienta. Si más adelante se usa Google Ads, importar solo el evento de clic (etapa 1) y no sumarlo a Umami en el mismo informe.
