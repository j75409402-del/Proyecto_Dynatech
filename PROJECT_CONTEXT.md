> Analítica actual, 3-oct-2026: Umami Cloud Hobby gratuito, sin cookies de analítica ni aviso. ID público 4bbea860-f2e7-4268-9476-190563eeab0a. GA4 dejó de cargarse; cuenta conservada. Eventos manuales, sin query/hash ni datos de formularios, admin excluido, DNT y rechazo anterior respetados. Ver docs/SEO_CONVERSIONES.md.

> GA4 conectado por solicitud del propietario: G-9JET3799ZE, GoogleAnalytics.tsx con consentimiento opcional y eventos comerciales controlados. Ver docs/SEO_CONVERSIONES.md.

# PROJECT_CONTEXT.md — Dynatech Web

> Prioridad comercial confirmada por el dueño, 2-oct-2026: cilindros neumáticos primero; cilindros hidráulicos y mecanizado como servicios complementarios. Mantener esa jerarquía en inicio, SEO, CTA y enlaces.

> SEO y captación, 2-oct-2026: páginas `/cilindros-hidraulicos` y `/mecanizado` basadas en oferta confirmada por el dueño; enlaces, sitemap de 18 URLs y opciones del formulario. Metadatos comerciales locales, LocalBusiness y eventos comerciales sin datos personales. Cambios locales probados, no publicados. El dueño no tiene cuenta GA4/GTM; hay que crearla para estadísticas persistentes. Ver `docs/SEO_CONVERSIONES.md`. Repositorio recuperado en `C:/Users/senm1/Dynatech/web-recuperada-20261002`, rama `mejora-captacion-20261002`, base `origin/main` en `73c0956`. Se preservaron los cambios previos del formulario y avisos de correo.

> Correo, 2-oct-2026: preparada la ruta `/cotizacion/correo` con el formulario existente; QuoteCTA enlaza allí conservando el contexto. Resend tiene el dominio verificado y las variables de producción guardadas en Vercel para enviar a `dynatechsrl@outlook.com`. Publicación y prueba real pendientes. APIs/webhooks mantienen su contrato; se añadió Reply-To validado y timeout en webhooks. Ver `docs/CORREO_SOLICITUDES.md`.

> Contexto para el agente de programación que continúe este proyecto.
> **Estado documentado: 1-oct-2026.** Commit de referencia: el último de `main` que incluya este archivo. El último commit de código antes de esta documentación es `00ba341`.
> Ver también: `HANDOFF.md` (resumen corto), `AUDITORIA_COMPLETA.md` (estado real y pendientes) y `docs/CLOUDFLARE.md` (hosting alternativo preparado).
> Convención: **NO VERIFICADO** = no se pudo comprobar desde el código ni desde las pruebas hechas.

---

## 1. Qué es Dynatech

**Dynatech Ingeniería SRL** es una empresa de Santo Domingo, República Dominicana (RNC 133-45350-9). Es un proveedor industrial B2B para empresas, fábricas y zonas francas. Todo se vende **bajo cotización**: no hay precios, carrito, checkout ni inventario público.

Líneas que presenta la web hoy:

1. Neumática
2. Control eléctrico
3. Sensores
4. Instrumentación
5. Resistencias eléctricas

Además, como **línea destacada**: fabricación, reparación y reconstrucción de **cilindros neumáticos** (cambio de sellos, kits de sellos, vástagos cromados, fabricación bajo muestra o plano, cilindros personalizados).

## 2. Objetivo comercial de la web

Generar **solicitudes de cotización**. Prioridad acordada con el dueño:

visibilidad de soluciones → confianza → contacto → solicitud de cotización → WhatsApp / email.

Cada página termina en un bloque de cotización (`QuoteCTA`) con botón al formulario `/cotizacion` y botón de WhatsApp.

## 3. Historia que debes conocer (no la repitas)

| Fecha | Commit | Qué pasó |
|---|---|---|
| hasta 8-sep-2026 | `6178629` | **Última versión con el catálogo de SKUs**: productos y categorías leídos de Supabase, buscador, filtros, fichas de producto, carrito de cotización (~150 redirecciones). |
| 30-sep-2026 | `75f0337` | Se **retiró el catálogo** y el sitio se enfocó solo en cilindros neumáticos (motivo: bajar el gasto de Supabase, que se había pasado del límite de egress). |
| 1-oct-2026 | `bbf24f1` | El dueño pidió presentar otra vez las **5 líneas industriales**, pero **sin** volver al catálogo de SKUs: una página por línea con subcategorías y botón de cotizar. Cilindros quedan como línea destacada. También se corrigieron pendientes de seguridad (ver auditoría). |
| 1-oct-2026 | `5703927` | El menú "Soluciones" pasó a llamarse "Productos". |
| 1-oct-2026 | `00ba341` | Se **preparó** (no se desplegó) el hosting en Cloudflare Workers como alternativa más barata a Vercel. |

- El catálogo viejo sigue en el historial de git: `git show 6178629:<ruta>`.
- **No restaures el catálogo de SKUs** sin pedido explícito del dueño.
- La rama remota `claude/dynatech-redesign-ptmqty` (`e1b9b52`) es un borrador viejo que **no compila**. Ignórala.

## 4. Stack

| Área | Tecnología |
|---|---|
| Framework | Next.js **16.3.8**, App Router, Turbopack |
| UI | React 19, TypeScript 5.9 (`strict`), alias `@/*` → `src/*` |
| Estilos | Tailwind CSS 3.4 + `src/app/globals.css` (clases `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.card`, `.eyebrow`, `.container-max`, `.section-pad`, `.grid-bg`) |
| Animación | framer-motion 12 (`Reveal`, `TiltCard`, `HeroScene`) |
| Formularios | react-hook-form + zod (validación en cliente y servidor) |
| Íconos | lucide-react + `WhatsAppIcon` propio |
| Backend | Route Handlers (`src/app/api/*`) + Server Actions (`src/app/admin/actions.ts`) |
| Datos | Supabase (Postgres + RLS + Auth + Storage). **Las páginas públicas no leen la base.** |
| Hosting en producción | **Vercel** (plan Pro, visto en el panel del dueño). Proyecto: `j75409402-dels-projects/proyecto-dynatech` |
| Hosting alternativo | Cloudflare Workers con `@opennextjs/cloudflare` 1.20.7: **preparado y probado en local, NO desplegado** |
| Lint | ESLint 9 + `eslint-config-next` 16.3.8 (`eslint.config.mjs`) |
| Fuentes | IBM Plex Sans + IBM Plex Mono (`next/font/google`) |
| Tests / CI / analítica | **No existen** |

## 5. Estructura del proyecto

```
src/
  middleware.ts               Protege /admin/* (antes proxy.ts; ver §11)
  app/
    layout.tsx                Fuentes, metadata global, JSON-LD Organization, Navbar/main/Footer
    page.tsx                  Home: Hero → SolucionesIndustriales → CilindrosDestacados → ComoTrabajamos → QuoteCTA
    not-found.tsx             404 en español
    neumatica/  control-electrico/  sensores/  instrumentacion/  resistencias-electricas/
                              Páginas de línea (plantilla SolucionPage; neumatica agrega bloque de cilindros)
    cilindros-neumaticos/     Tipos de cilindro, fabricar vs reparar, qué necesitamos para cotizar
    servicios/                6 servicios de cilindros (anclas), antes/después, FAQ (+JSON-LD Service y FAQPage)
    sellos-y-componentes/     Kits de sellos, vástagos, componentes bajo medida
    nosotros/  contacto/  cotizacion/
    garantias/  devoluciones/  privacidad/  terminos/   (components/legal/LegalPage)
    robots.ts  sitemap.ts     sitemap estático (16 URLs)
    admin/                    layout (noindex), login, page (cotizaciones y mensajes), actions.ts
    api/cotizacion            POST → tabla quotes (+ webhook + correo opcional)
    api/contacto              POST → tabla contact_messages (+ webhook + correo opcional)
    api/upload-adjunto        POST JSON → devuelve URL firmada de subida a Storage
    api/keepalive             GET (cron) → lee 1 fila de site_settings
  components/
    layout/     Navbar (desplegable "Productos"), Footer, Breadcrumbs (+JSON-LD)
    home/       Hero, HomeSections
    soluciones/ SolucionPage (plantilla de las 5 líneas)
    cta/        QuoteCTA + quoteHref(item, tipo)
    forms/      QuoteForm, ContactForm
    motion/     Reveal, TiltCard, HeroScene
    ui/         Input, Textarea, Label, Accordion
    legal/      LegalPage
    icons/      WhatsAppIcon
  lib/
    constants.ts     SITE, CONTACT, SOCIAL, NAV          ← datos de empresa y menú (fuente única)
    soluciones.ts    SOLUCIONES (5 líneas, subcategorías, aplicaciones)  ← fuente única
    servicios.ts     SERVICIOS, COMPONENTES (cilindros), GRUPOS_DE_SOLICITUD, TIPOS_DE_SOLICITUD
    whatsapp.ts      whatsappLink, whatsappGeneral, whatsappCylinderService, whatsappSolucion, whatsappQuoteRequest
    adminAuth.ts / adminEmails.ts   Lista de correos autorizados del admin
    antispam.ts      Límite por IP, campo trampa, tiempo mínimo, control de origen
    notify.ts        Aviso de leads por correo (Resend, opcional)
    uploadAdjunto.ts Subida directa navegador → Supabase Storage
    leads.ts         Estados de cotización
    supabase/        client.ts (navegador), server.ts (createClient con cookies / createServiceClient), middleware.ts
  types/  database.types.ts (generado por Supabase CLI; incluye tablas del catálogo viejo), index.ts
supabase/   migrations/ (3), seed.sql, config.toml
public/     117 archivos (~12 MB); 11 en uso (ver §15)
cloudflare/ route-cache-incremental-cache.ts   (solo hosting Cloudflare)
custom-worker.ts, wrangler.jsonc, open-next.config.ts, public/_headers, .dev.vars.example   (solo Cloudflare)
vercel.json  cron diario de Vercel
docs/CLOUDFLARE.md
```

## 6. Rutas

| Ruta | Tipo | Contenido |
|---|---|---|
| `/` | estática | Home |
| `/neumatica`, `/control-electrico`, `/sensores`, `/instrumentacion`, `/resistencias-electricas` | estáticas | Páginas de línea |
| `/cilindros-neumaticos`, `/servicios`, `/sellos-y-componentes` | estáticas | Línea destacada de cilindros |
| `/nosotros`, `/contacto`, `/cotizacion` | estáticas | |
| `/garantias`, `/devoluciones`, `/privacidad`, `/terminos` | estáticas | Legales (borrador genérico, no revisado por abogado) |
| `/sitemap.xml`, `/robots.txt`, `/icon.png` | estáticas | |
| `/admin/login` | estática | Login (noindex) |
| `/admin` | dinámica | Cotizaciones y mensajes recibidos |
| `/api/cotizacion`, `/api/contacto`, `/api/upload-adjunto`, `/api/keepalive` | dinámicas | |

Ninguna página pública consulta Supabase al navegar.

## 7. Componentes principales

| Componente | Notas |
|---|---|
| `Navbar` | Sticky. Desde `lg` (1024 px): desplegable **"Productos"** (5 líneas + grupo de cilindros), Cilindros neumáticos, Servicios, Nosotros, Contacto, botón WhatsApp y botón rojo "Solicita tu cotización". Debajo de 1024 px: menú hamburguesa. |
| `Footer` | Columnas Productos / Empresa / Ayuda / Contacto, RNC, Instagram, LinkedIn. |
| `Hero` | H1 "Soluciones industriales para empresas que no pueden detenerse" (sin `opacity:0` inicial, por LCP), foto del taller, chips "Cotizamos a partir de". |
| `SolucionPage` | Plantilla de línea: Hero (banner) → bloque destacado opcional → subcategorías → aplicaciones → otras líneas → QuoteCTA. JSON-LD Service. |
| `QuoteCTA` | Bloque oscuro de cierre. Props: `eyebrow`, `title`, `text`, `quoteItem`, `quoteTipo`, `whatsappHref`. |
| `QuoteForm` / `ContactForm` | Ver §9. |

## 8. Supabase

- Proyecto: `hkubisdxytxogadatlif` (`https://hkubisdxytxogadatlif.supabase.co`). Plan actual: **NO VERIFICADO** (el dueño pasó a un plan pago en sep-2026; si ya lo bajó a Free, no se sabe).

| Tabla | Uso | Estado verificado el 1-oct-2026 |
|---|---|---|
| `quotes` | Cotizaciones del formulario | **0 filas** (nunca entró una cotización por la web) |
| `contact_messages` | Formulario de contacto | 0 filas |
| `products` / `categories` / `product_variants` / `brands` | Catálogo viejo, **archivado**. No se muestra en la web. | 169 productos, 82 categorías |
| `site_settings` | Solo la lee el cron keepalive | existe |

- **Storage:** bucket `cotizacion-adjuntos`, **público**, límite 10 MB, tipos PNG/JPEG/WEBP/PDF. Se creó por API y no está en las migraciones. Vacío al 1-oct.
- **Auth:** 1 usuario, `dynatechgerencia@outlook.com`. Los **registros públicos están ABIERTOS** (`disable_signup=false`). Lo tiene que cerrar el dueño en el panel de Supabase.
- **Desfase de esquema:** `products.internal_code` existe en la base y en `database.types.ts` pero no en las migraciones.

## 9. APIs y formularios

### `POST /api/cotizacion` (contrato sin cambios desde el catálogo)

```json
{ "company_name": "...", "contact_name": "...", "email": "...", "phone": "...",
  "rnc": "opcional", "city": "opcional",
  "items": [{ "sku": "", "name": "...", "quantity": 1, "notes": "..." }],
  "message": "opcional" }
```

- Respuesta: `201 {"quote_number":"COT-AAAAMMDD-xxxxxx"}`.
- **Campos opcionales nuevos (1-oct), los ignora zod y no llegan al webhook:** `sitio_web` (campo trampa) y `_t` (timestamp de carga del formulario).
- **Respuestas nuevas:**
  - `403` si `Origin` es de otro sitio.
  - `429` si una IP pasa de 5 envíos en 10 minutos.
  - `503` si faltan las variables de Supabase.
  - Si detecta un bot, responde `201 {"quote_number":"COT-RECIBIDA"}` sin guardar nada.

### `POST /api/contacto`

Body `{name, email, phone?, company?, subject?, message}`. Mismas protecciones; responde `201 {"ok":true}`.

### `POST /api/upload-adjunto` (contrato CAMBIADO el 1-oct)

- **Antes:** multipart con el archivo.
- **Ahora:** JSON `{name, type, size}` → `{uploadUrl, publicUrl, apikey}`. El navegador sube el archivo con `PUT` a `uploadUrl` (ver `src/lib/uploadAdjunto.ts`). Así se evita el límite de 4,5 MB del cuerpo en Vercel.
- `apikey` es la clave pública anon. El servidor pone el nombre del archivo (`AAAA-MM-DD/<timestamp>-<aleatorio>.<ext>`).
- Límite: 15 solicitudes por IP cada 10 minutos.

### `QuoteForm` (`/cotizacion`)

- **Campos:** tipo* (select agrupado: "Cilindros neumáticos" y "Soluciones industriales"), cantidad*, descripción*, "¿Con qué información cuentas?" (chips), hasta 3 adjuntos de 10 MB, empresa*, contacto*, email*, teléfono*, RNC y ciudad.
- **Precarga:**
  - `?nombre=X` preselecciona X si es una opción; si no, elige "Otro" y pone X en la descripción.
  - `?tipo=Y&nombre=X` preselecciona la línea Y y pone X en la descripción.
  - Los enlaces se arman con `quoteHref(item, tipo)`.
- **Si el envío falla**, muestra un botón "Enviar por WhatsApp" con la solicitud ya redactada.

### `ContactForm` (`/contacto`)

Si falla, ofrece WhatsApp.

## 10. Webhooks, correo y WhatsApp

- **Webhooks opcionales:** `QUOTE_WEBHOOK_URL` y `CONTACT_WEBHOOK_URL` (POST con el JSON del lead, pensado para n8n). Si están configurados en Vercel: **NO VERIFICADO**.
- **Correo:**
  - `src/lib/notify.ts` manda el aviso de lead por Resend solo si existen `RESEND_API_KEY` y `LEAD_NOTIFY_EMAIL`.
  - Si existen en Vercel: **NO VERIFICADO**. Probablemente no, porque el dueño no ha creado la cuenta.
  - Sin `RESEND_FROM` se usa `onboarding@resend.dev`, que solo entrega al dueño de la cuenta Resend.
  - No se envía acuse de recibo al cliente.
- **WhatsApp:**
  - Solo enlaces `wa.me/<CONTACT.whatsapp>?text=...` con mensaje precargado, desde `src/lib/whatsapp.ts`.
  - No hay API de WhatsApp Business ni botón flotante.
  - Número en producción (verificado en el HTML): `18092844336`.

## 11. Panel `/admin`

- **Acceso:**
  - Supabase Auth (email + contraseña) **y** el correo debe estar en `ADMIN_EMAILS` (separados por coma).
  - Sin esa variable, solo entra `dynatechgerencia@outlook.com`.
  - Lo controlan `src/middleware.ts`, `src/lib/supabase/middleware.ts`, `getAdminUser()` en la página y `requireAdmin()` en las server actions.
- **Contenido:**
  - Últimas 100 cotizaciones (con estado editable: nuevo, en revisión, enviada, cerrada ganada, cerrada perdida) y enlaces a los adjuntos.
  - Últimos 100 mensajes de contacto (marcar atendido o pendiente).
- **Ya no existen** el inventario de productos ni `/admin/configuracion`; se retiraron el 1-oct.
- **Tiene `noindex`** y `robots.txt` lo bloquea.
- **`middleware.ts` en vez de `proxy.ts`:** el adaptador de Cloudflare no soporta el proxy de Next 16, que corre en Node. En Vercel funciona igual, con un aviso de "deprecated" en el build.

## 12. Variables de entorno

| Variable | Uso | En producción (Vercel) |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL` | Conexión | Configurada (los formularios y el keepalive responden) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY` | Clave pública | Configurada (la devuelve `/api/upload-adjunto`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Escrituras del servidor. **Secreta** | Configurada (el keepalive y las URLs firmadas funcionan) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | Datos visibles | NO VERIFICADO si existen. Lo que se ve en producción coincide con los valores por defecto de `constants.ts` |
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap, JSON-LD | NO VERIFICADO. El canonical en producción sale `https://www.dynatech.com.do` (correcto) |
| `QUOTE_WEBHOOK_URL`, `CONTACT_WEBHOOK_URL` | Webhooks | NO VERIFICADO |
| `ADMIN_EMAILS` | Admins | NO VERIFICADO (sin ella aplica el valor por defecto) |
| `CRON_SECRET` | Protege `/api/keepalive` | **No está configurada**: el endpoint responde sin token |
| `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `RESEND_FROM` | Aviso de leads | NO VERIFICADO (probablemente no) |

- `.env.local` (local, fuera de git) apunta a un Supabase local. **No lo modifiques ni lo subas.**
- `.env.example` solo tiene marcadores.

## 13. Vercel (producción actual)

- Dominio `www.dynatech.com.do` apunta a Vercel (A `76.76.21.21`). `dynatech.com.do` redirige 308 a www.
- Los nameservers del dominio están en `dns1-4.midominio.do` (NIC.do).
- El deploy es automático al hacer push a `main` (integración GitHub↔Vercel).
- Cron en `vercel.json`: `GET /api/keepalive` a diario a las 13:00 UTC, para que Supabase Free no pause el proyecto.
- Plan: Pro (≈ 20 USD/mes). El plan Hobby de Vercel prohíbe el uso comercial, así que no sirve para Dynatech.

## 14. Hosting alternativo: Cloudflare (preparado, no desplegado)

Ver `docs/CLOUDFLARE.md`.

- **Resumen:**
  - `npm run preview` levanta el sitio en workerd local.
  - `npm run deploy` lo despliega; requiere cuenta y `wrangler login`, que el dueño no ha hecho.
  - `custom-worker.ts` reemplaza el cron de Vercel.
  - `cloudflare/route-cache-incremental-cache.ts` traduce las claves de caché nuevas de Next 16.3 al formato que espera OpenNext 1.20. Sin eso, cada visita renderiza la página.
- **Probado en local:** todas las páginas sirven desde caché, las imágenes se optimizan, las redirecciones, el admin y el cron funcionan.
- **Falta:**
  1. Cuenta de Cloudflare.
  2. Conectar el repo (Workers Builds).
  3. Copiar las variables.
  4. Mover los nameservers en NIC.do.
  5. Agregar los dominios.

## 15. SEO

- Cada página pública tiene `title`, `description` y canonical.
- JSON-LD:
  - `Organization` en todas.
  - `BreadcrumbList` en las páginas con migas.
  - `Service` en las 5 líneas y en `/servicios`.
  - `FAQPage` en `/servicios`.
- `sitemap.xml` estático con 16 URLs. `robots.txt` bloquea `/api/` y `/admin`.
- Las páginas de línea tienen `og:image` (su banner). La home **no tiene** `og:image`.

## 16. Redirecciones (`next.config.mjs`, 22 reglas 308)

- `/reparacion-cilindros-neumaticos` → `/servicios`; `/faq` → `/servicios#preguntas-frecuentes`; `/carrito` → `/cotizacion`; `/mapa-del-sitio` → `/`.
- `/categorias|productos/cil*` → `/cilindros-neumaticos`; `kit*` y `accesorios-neumaticos*` → `/sellos-y-componentes`.
- Las URLs viejas de cada línea van a su página nueva:
  - `valvula*`, `fitting*`, `unidades-frl*`, etc. → `/neumatica`
  - `electrica`, `rele*`, `fusible*`, `finales-de-carrera*`, etc. → `/control-electrico`
  - `sensor*`, `fotocelda*`, etc. → `/sensores`
  - `instrumentacion`, `temperatura*`, `manometro*`, etc. → `/instrumentacion`
  - `resistencia*`, `termocupla*`, `alambre*`, `materiales` → `/resistencias-electricas`
- Cualquier otra `/productos/*` o `/categorias/*` → `/`.
- El orden importa (específicas primero). **No las elimines:** preservan el posicionamiento de las URLs del catálogo viejo.

## 17. Imágenes

- `public/` tiene 117 archivos (~12 MB). **Solo 11 están en uso:**
  - `logo-mark.png`
  - `cilindros/` (taller-reparando, antes-…, despues-…)
  - `products/cilindros-neumaticos.jpg` y `products/kit-sello-cilindro-neumatico.jpg`
  - los 5 banners de `banners/` (neumatica-industrial, controles-electricos, sensores-fotoceldas, instrumentacion-procesos, resistencias-electricas-industriales)
- **No borres las demás.** Son del catálogo archivado y la base apunta a ellas.
- Los banners los diseñó y aprobó el dueño, pero **muestran logos de terceros** (Schneider, ABB, WIKA, Omron, SICK, Airtac…). Está pendiente su confirmación.
- No hay logo en SVG ni imagen Open Graph general.

## 18. Diseño

- Tema claro.
  - Rojo de marca **`#E4002B`** (`signal`), hover `#C40024`, suave `#FEE7EB`.
  - Texto casi negro `#0B0D10` (`surface`).
  - **Ojo:** `carbon-*` son blancos y grises claros (fondos), y `surface` es el oscuro.
- Tipografía: IBM Plex Sans para el texto e IBM Plex Mono para eyebrows y datos.
- Radios de 2–4 px, rejillas con separadores de 1 px, corner brackets rojos, eyebrows numerados ("01 · …").
- Respeta `prefers-reduced-motion`.

## 19. Cómo arrancar

```bash
git clone https://github.com/j75409402-del/Proyecto_Dynatech && cd Proyecto_Dynatech
npm ci
cp .env.example .env.local      # poner credenciales (pedirlas al dueño o usar Supabase local)
npm run dev                     # http://localhost:3000
npx tsc --noEmit                # typecheck
npm run lint                    # ESLint (0 errores; 1 aviso en postcss.config.mjs)
npm run build                   # build de Vercel/Next
npm run preview                 # build + servidor local de Cloudflare (opcional)
```

Los archivos usan CRLF en Windows. Con un git sin `core.autocrlf` pueden aparecer cambios falsos de fin de línea.

## 20. Reglas — qué NO modificar sin aprobación del dueño

1. **No restaures el catálogo de SKUs** (productos individuales, buscador, carrito).
2. **No inventes** productos, subcategorías, marcas, servicios, especificaciones, precios, inventario, datos de contacto ni dominios.
   - La oferta vive en `src/lib/soluciones.ts` (sacada del catálogo viejo) y `src/lib/servicios.ts` (dada por el cliente).
3. **Fuente única:** datos de empresa en `constants.ts`; líneas en `soluciones.ts`; servicios de cilindros en `servicios.ts`.
4. **No elimines las redirecciones** de `next.config.mjs`.
5. **No cambies el contrato** de `/api/cotizacion` ni de `/api/contacto` (JSON y webhook) sin documentarlo: puede haber un n8n conectado (NO VERIFICADO).
6. **No ejecutes** `npm run db:reset` ni `npm run db:seed` contra producción, ni borres tablas. `quotes` y `contact_messages` guardan leads reales; las del catálogo guardan el inventario archivado.
7. **No borres imágenes** de `public/`.
8. **No toques el cron keepalive** (`vercel.json`, `/api/keepalive`, `custom-worker.ts`).
9. **No subas secretos** ni modifiques `.env.local`.
10. **Identidad visual:** rojo `#E4002B`, logo, IBM Plex, radios mínimos.
11. **Páginas nuevas:**
    - Deben llevar `metadata` (title, description, canonical), `Breadcrumbs` y `QuoteCTA`, y agregarse a `sitemap.ts`.
    - Si van en el menú, agregarlas a `NAV` o `SOLUCIONES`.
    - Los CTA de cotización deben usar `quoteHref()`.
12. Textos en español de RD, tuteo.
# SEO orgánico, 3-oct-2026

Primera ejecución completa de investigación y mapa en `docs/SEO_ORGANICO_20261003.md`. Copia aislada desde `33e3a6b`; se conservan Umami, las cinco líneas y servicios actuales. Se prepara `/valvulas-neumaticas` como detalle de una subcategoría existente, navegación de subcategorías, metadata plural de controles, enlaces y horario de LocalBusiness. Sin nuevos modelos, inventario, servicios integrales ni cambios de APIs/datos/hosting. Publicación pendiente de revisión del propietario; ver pruebas y límites en el informe.


## Publicación autorizada de Cilindros — 2026-10-04

El propietario aprobó la dirección Dynatech 3D v1 y autorizó expresamente publicar solo Cilindros con marca de agua de Dynatech. Entrega aislada desde `4daf297`; conserva la web pública de las demás categorías. Se mantienen rutas, datos comerciales, APIs, formularios, analítica, SEO y configuración de hosting. El encabezado oscuro se aplica exclusivamente a `/cilindros-neumaticos`. La prueba física en móvil continúa pendiente. Ver `docs/experiencia-3d/PUBLICACION-CILINDROS-V1.md` para validación.


### Acceso a Cilindros desde la portada — 2026-10-04

El propietario señaló que no encontraba la experiencia publicada desde la portada real. Se añade una entrada visible de Cilindros en 3D inmediatamente bajo el encabezado de inicio, y se identifica claramente el enlace en los menús desktop y móvil. Se conserva el hero comercial, WhatsApp, formularios, rutas y la experiencia 3D aprobada. No se incorpora ninguna escena nueva a otras categorías.

Validado antes de publicar: typecheck, lint (solo aviso previo), build; acceso desde la portada visible sin desplazar y enlaces de menú en 320, 390, 768, 1024 y 1440 px; llegada a Cilindros también sin JavaScript y con reduced-motion; 57 combinaciones comerciales y suite de analytics correctas. Evidencia en `docs/cilindros-premium/acceso-portada/local/verificacion.json`.
