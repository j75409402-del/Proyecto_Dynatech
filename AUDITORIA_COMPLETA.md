# Auditoría técnica — Sitio web de Dynatech Ingeniería SRL

**Versión de este documento:** 1-oct-2026 (actualiza la auditoría del 30-sep-2026 hecha sobre `75f0337`).
**Código auditado:** `main` en `00ba341`, idéntico a `origin/main` y desplegado en Vercel. Este documento se agrega en un commit posterior que solo contiene documentación.
**Convenciones:**
- ✅ funciona y se probó
- 🟡 parcial
- ❌ pendiente o no funciona
- **NO VERIFICADO** = no se pudo comprobar

Nada se marca como resuelto si no se comprobó.

---

## 0. Resumen ejecutivo

### Estado del sitio

- **Catálogo de SKUs:** retirado el 30-sep (`75f0337`). Ya no hay productos individuales, buscador, filtros, fichas ni carrito. El último commit con catálogo es `6178629`.
- **Desde el 1-oct (`bbf24f1`):** el sitio presenta otra vez las 5 líneas industriales (Neumática, Control eléctrico, Sensores, Instrumentación, Resistencias eléctricas) como **páginas de categoría**, con subcategorías y botón de cotizar, pero sin SKUs. Los cilindros neumáticos siguen como línea destacada.
- **Bajo cotización:** todo sigue así, sin precios, carrito ni inventario público.
- **Datos del catálogo viejo:** siguen archivados en Supabase (169 productos y 82 categorías) y en git.

> Nota: si un documento anterior dice que el sitio está "solo enfocado en cilindros", eso fue cierto únicamente entre el 30-sep y el 1-oct.

### Diagnóstico rápido

| Área | Estado |
|---|---|
| TypeScript (`npx tsc --noEmit`) | ✅ 0 errores |
| Build (`npm run build`) | ✅ Compila. 25 rutas: todas las públicas estáticas; `/admin` y `/api/*` dinámicas. Aviso esperado: "middleware file convention is deprecated" (ver §7) |
| Lint (`npm run lint`) | ✅ Funciona desde el 1-oct: 0 errores, 1 aviso (`import/no-anonymous-default-export` en `postcss.config.mjs`) |
| Dependencias (`npm audit --omit=dev`) | ✅ 0 vulnerabilidades (Next 16.3.8) |
| Producción (Vercel) | ✅ Las 16 URLs del sitemap responden 200; `/no-existe` responde 404; `/admin` redirige al login |
| Formularios en producción | 🟡 Validaciones y protecciones probadas. **Nunca se probó un envío real completo en producción** y la tabla `quotes` tiene 0 filas |
| Seguridad | 🟡 Mejoró mucho, pero los **registros de Supabase Auth siguen abiertos** y el bucket de adjuntos es público |
| Aviso de leads | 🟡 El panel muestra las solicitudes; el correo automático existe en el código pero no está configurado |
| Rendimiento | 🟡 No se volvió a medir con Lighthouse. Se corrigió el H1 oculto del hero; las demás secciones siguen apareciendo con animación |
| Hosting Cloudflare | 🟡 Preparado y probado en local; **no desplegado** |

---

## 1. Qué funciona (verificado)

**En producción (`https://www.dynatech.com.do`, 1-oct-2026):**
- **Páginas:** las 16 URLs públicas responden 200: `/`, las 5 líneas, `/cilindros-neumaticos`, `/servicios`, `/sellos-y-componentes`, `/nosotros`, `/contacto`, `/cotizacion` y las 4 legales.
- **Sitemap:** `/sitemap.xml` tiene 16 URLs.
- **robots.txt:** bloquea `/api/` y `/admin`.
- **404:** `/no-existe` muestra la página propia en español.
- **Dominio:** `dynatech.com.do` redirige 308 a `www`.
- **Redirecciones del catálogo viejo** (308, muestra probada):
  - `/categorias/sensores-autonics` va a `/sensores`.
  - `/categorias/fusibles` va a `/control-electrico`.
  - `/categorias/neumatica` va a `/neumatica`.
  - `/reparacion-cilindros-neumaticos` va a `/servicios`.
  - `/faq` va a `/servicios#preguntas-frecuentes`.
  - `/carrito` va a `/cotizacion`.
  - `/productos` va a `/`.
- **Admin:**
  - `/admin` sin sesión responde 307 a `/admin/login`.
  - `/admin/login` lleva `noindex, nofollow`.
- **Keepalive:** `/api/keepalive` responde `{"ok":true}`, así que las variables de Supabase están bien en Vercel.
- **Subida de adjuntos:**
  - `/api/upload-adjunto` rechaza tipos no permitidos (400) y archivos de más de 10 MB (400).
  - Con datos válidos devuelve una URL firmada.
- **Datos visibles:**
  - Email `dynatechsrl@outlook.com`.
  - Teléfono `+1 (809) 284-4336`.
  - WhatsApp `wa.me/18092844336`.
  - Canonical en `https://www.dynatech.com.do`.

**En local (`next start` y Edge headless/Playwright):**
- **Menú "Productos":** abre con clic y cierra con Escape o al sacar el mouse. Se ve completo desde 1024 px sin desbordarse.
- **Menú móvil:** funciona.
- **Sin scroll horizontal** a 390, 1024, 1280 y 1440 px en home, líneas, cotización y 404.
- **Precarga del formulario:** `/cotizacion?nombre=Válvulas neumáticas&tipo=Neumática` preselecciona "Neumática" y pone "Válvulas neumáticas" en la descripción.
- **Anti-spam:**
  - `Origin` de otro sitio responde 403.
  - El campo trampa lleno y el envío demasiado rápido responden 201 falso, sin guardar.
  - El sexto envío de contacto en 10 minutos responde 429.

**Contra Supabase de producción (script, solo con un archivo de prueba de 1×1 px que luego se borró):**
- Se probó crear la URL firmada, subir con `PUT`, leer la URL pública (200) y borrar. Funciona, incluso sin cabecera `apikey`.

**Cloudflare (local, con workerd):**
- Las páginas sirven desde caché (`x-nextjs-cache: HIT`, unos 35 ms).
- Las imágenes se optimizan a AVIF; un banner baja de 222 KB a unos 26 KB.
- Funcionan las redirecciones, la redirección del admin y la navegación interna sin errores de consola.
- El cron llama a `/api/keepalive`. En local responde 500 porque no hay variables de Supabase; en producción NO VERIFICADO.
- El paquete pesa 1,8 MB comprimido, por debajo del límite de 3 MB del plan gratis.

## 2. Qué NO pudo verificarse

| Tema | Por qué |
|---|---|
| Envío real completo de una cotización o contacto en producción, con adjunto desde el navegador | No se quiso crear un lead falso ni disparar webhooks. **Lo debe probar el dueño** |
| Login real al panel `/admin` y la vista de cotizaciones/mensajes con sesión | No se tienen credenciales (correcto). Solo se probó la redirección sin sesión |
| Variables de Vercel: webhooks, `ADMIN_EMAILS`, `RESEND_*`, `NEXT_PUBLIC_*` de contacto | Sin acceso al panel de Vercel. Solo se dedujo lo que se ve en producción (ver PROJECT_CONTEXT §12) |
| Si hay un n8n u otro consumidor del webhook | NO VERIFICADO |
| Plan actual de Supabase (Free o Pro) | NO VERIFICADO |
| Rendimiento real (Lighthouse) después de los cambios | No se volvió a medir |
| Cloudflare en producción | No hay cuenta ni deploy |
| Número de la dirección, existencia del LinkedIn, origen de las fotos del hero y antes/después | NO VERIFICADO |

---

## 3. Seguridad

| # | Hallazgo | Estado |
|---|---|---|
| S1 | Next.js con vulnerabilidades críticas (≤16.3.5) | ✅ Resuelto: 16.3.8 y `npm audit fix` dejan 0 vulnerabilidades |
| S2 | Cualquier usuario autenticado era admin | ✅ Resuelto en código: lista de correos (`ADMIN_EMAILS`, por defecto `dynatechgerencia@outlook.com`) en el middleware, la página y las server actions |
| S3 | **Registros públicos de Supabase Auth abiertos** (`disable_signup=false`, verificado el 1-oct) | ❌ **Pendiente del dueño:** Supabase → Authentication → desactivar "Allow new users to sign up". El código ya no da acceso a esas cuentas, pero conviene cerrarlo |
| S4 | Adjuntos de más de 4,5 MB fallaban en Vercel | ✅ Resuelto: subida directa con URL firmada. Mecanismo probado en Storage de producción; flujo completo desde el navegador NO VERIFICADO |
| S5 | Sin anti-spam en los formularios | 🟡 Parcial: límite por IP, campo trampa, tiempo mínimo y control de origen. **El límite es en memoria por instancia** (best effort en serverless). Sin captcha |
| S6 | Bucket `cotizacion-adjuntos` público | ❌ Pendiente: planos y fotos quedan en URLs públicas (nombres aleatorios). Pasarlo a privado exige URLs firmadas de lectura en el admin. Decisión del dueño |
| S7 | URLs firmadas solicitables sin enviar cotización | 🟡 Limitado a 15 por IP cada 10 minutos y por los límites del bucket. No hay limpieza de archivos huérfanos |
| S8 | `CRON_SECRET` no configurado | 🟡 `/api/keepalive` es público. Solo lee 1 fila; riesgo bajo |
| S9 | Tipo de archivo validado por MIME declarado, no por contenido | 🟡 El bucket además restringe tipos y tamaño |
| S10 | Secretos en el repositorio | ✅ Revisado: solo hay marcadores en `.env.example` y el README |

## 4. Rendimiento

| # | Hallazgo (auditoría del 30-sep) | Estado |
|---|---|---|
| R1 | LCP lento: H1 del hero con `opacity:0` hasta hidratar | 🟡 Corregido el H1 y el texto del hero (se pintan con el HTML). El resto de secciones (`Reveal`) siguen arrancando ocultas. **No re-medido** |
| R2 | CLS en `/cotizacion` por `<Suspense>` | 🟡 Se reservó altura en el fallback (`min-h`). **No re-medido** |
| R3 | TBT por `HeroScene` y animaciones en bucle | ❌ Sin cambios |
| R4 | framer-motion en todas las páginas, unos 670 KB de JS sin comprimir | ❌ Sin cambios (no re-medido) |
| R5 | Banners de 150–220 KB | ✅ `next/image` los sirve en AVIF/WebP del tamaño adecuado |
| R6 | Puntos rojos animados del hero sobre el H1 | ❌ Pendiente |

## 5. SEO

| # | Hallazgo | Estado |
|---|---|---|
| E1 | Canonical faltaba en `/`, contacto, cotización y legales | ✅ Resuelto: todas las páginas públicas lo tienen |
| E2 | Sin imagen Open Graph | 🟡 Las 5 líneas usan su banner como `og:image`; la home y las demás **no tienen**. Falta una imagen general 1200×630 |
| E3 | OG title/url iguales en todas las páginas | 🟡 Las 5 líneas tienen OG propio; el resto hereda el del layout |
| E4 | `/admin/login` indexable | ✅ Resuelto (`noindex` + robots) |
| E5 | Sin `LocalBusiness` (horario, geo, `sameAs`) | ❌ Pendiente. La dirección no tiene número (NO VERIFICADO) |
| E6 | 404 en inglés | ✅ Resuelto |
| E7 | Sitemap | ✅ 16 URLs estáticas |
| E8 | Search Console y analítica | ❌ No existen |
| E9 | Dominio inconsistente (`dynatech.do` en README y `.env.example`) | ✅ Resuelto en documentación. Código y producción usan `www.dynatech.com.do` |

## 6. Supabase

| # | Hallazgo | Estado |
|---|---|---|
| B1 | Registros de Auth abiertos | ❌ Ver S3 |
| B2 | Migraciones desfasadas (`products.internal_code` y bucket fuera de migraciones) | ❌ Pendiente |
| B3 | Tablas del catálogo sin uso público | Correcto y a propósito: archivadas, **no borrar** |
| B4 | `quotes` y `contact_messages` con 0 filas | Dato al 1-oct-2026. Nunca entró un lead por la web |
| B5 | Proyecto Free se pausa tras 7 días sin actividad | ✅ Mitigado: cron diario a `/api/keepalive` en Vercel (y en Cloudflare cuando se use) |
| B6 | Plan de Supabase | NO VERIFICADO. Con el sitio actual alcanza el plan Free; bajarlo lo decide el dueño en Billing |
| B7 | `npm run db:reset` / `db:seed` son destructivos | ⚠️ No ejecutar contra producción |

## 7. Vercel

| # | Hallazgo | Estado |
|---|---|---|
| V1 | Plan Pro (≈ 20 USD/mes). Hobby prohíbe el uso comercial | Informativo. Alternativa preparada en Cloudflare |
| V2 | Límite de 4,5 MB del cuerpo | ✅ Ver S4 |
| V3 | Aviso en el build: `middleware` deprecado | Esperado. Se usa `middleware.ts` en vez de `proxy.ts` porque el adaptador de Cloudflare no soporta el proxy en Node. No afecta a Vercel |
| V4 | Aviso de npm por scripts de instalación (`unrs-resolver`) | ✅ Resuelto con `allowScripts` en `package.json` (esbuild, workerd, unrs-resolver) |
| V5 | Variables de entorno | Ver PROJECT_CONTEXT §12. Parcialmente NO VERIFICADO |

## 8. Panel `/admin`

| # | Hallazgo | Estado |
|---|---|---|
| A1 | Gestionaba el inventario y la configuración del catálogo retirado | ✅ Reemplazado por la vista de cotizaciones (con estado) y mensajes (atendido/pendiente). Retirados `AdminProductList`, `AdminSettingsForm`, `/admin/configuracion` y `siteSettings.ts` |
| A2 | Sin roles | ✅ Lista de correos autorizados (ver S2) |
| A3 | Vista con sesión real | NO VERIFICADO (sin credenciales) |
| A4 | Comparte el layout público (Navbar/Footer visibles en el panel) | ❌ Pendiente menor |

## 9. Diseño y UX (seguimiento del 30-sep)

| Hallazgo | Estado |
|---|---|
| "Contacto" no estaba en el menú | ✅ Está |
| Menú completo solo desde 1280 px | ✅ Desde 1024 px |
| Botones píldora vs cuadrados | ✅ Unificados (cuadrados) en header y menú móvil |
| Celda vacía en "Cómo trabajamos" en tablet | ✅ El último paso ocupa 2 columnas |
| Espacio blanco entre QuoteCTA y footer | ✅ Quitado |
| "PDF, JPG, PNG" sin mencionar WEBP | ✅ Corregido |
| ContactForm sin respaldo por WhatsApp | ✅ Agregado |
| Inputs de 14 px (zoom en iOS) | ❌ Pendiente |
| `/servicios` con hero sin imagen | ❌ Pendiente |
| Botón flotante de WhatsApp en móvil | ❌ No existe; requiere aprobación del dueño |
| Logo SVG | ❌ No existe |
| Admin con layout público | ❌ Pendiente menor |

## 10. Contenido que requiere confirmación del dueño

- **Logos de terceros en los banners de las 5 líneas:** Schneider, ABB, Omron, Eaton, WIKA, Ashcroft, SICK, Banner, Panasonic, Airtac, entre otros. Son banners aprobados antes por el dueño, pero muestran marcas.
- **Ítems pedidos por el dueño que no están documentados en el catálogo** y por eso no se publicaron: transformadores de control, reguladores eléctricos y tableros eléctricos.
- **Hero de la home:** volvió a "Soluciones industriales para empresas que no pueden detenerse" (frase anterior del dueño). "CILINDROS NEUMÁTICOS A LA MEDIDA" quedó como título de la sección destacada.
- **Textos de aplicaciones** de cada línea (genéricos, sin marcas ni especificaciones).
- **Páginas legales:** borrador genérico, no revisado por un abogado.

## 11. Pendientes prioritarios

**Alta**
1. Cerrar los registros de Supabase Auth (S3). Lo hace el dueño, en 1 minuto.
2. Probar un envío real de cotización con adjunto en producción y revisarlo en `/admin` (§2).
3. Configurar el aviso de leads: Resend (`RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, idealmente dominio verificado y `RESEND_FROM`) o confirmar `QUOTE_WEBHOOK_URL`.
4. Decidir hosting: quedarse en Vercel Pro o completar Cloudflare (`docs/CLOUDFLARE.md`).
5. Decidir si el bucket de adjuntos pasa a privado (S6).

**Media**
6. Imagen Open Graph general y OG por página (E2, E3); `LocalBusiness` (E5).
7. Rendimiento: medir con Lighthouse; no ocultar secciones hasta hidratar; aligerar `HeroScene` (R1–R4).
8. Alinear migraciones con la base real (B2).
9. `.gitattributes` (`* text=auto eol=lf`) para evitar cambios falsos por CRLF.
10. `CRON_SECRET` en Vercel/Cloudflare (S8).

**Baja**
11. Inputs de 16 px en móvil; hero de `/servicios` con imagen; botón flotante de WhatsApp (si se aprueba); logo SVG; layout propio del admin.
12. Limpiar código sin uso (`formatCurrency` y `slugify` en `utils.ts`, tipos del catálogo en `types/index.ts`, clases `.sku-tag` y `.spec-*`).
