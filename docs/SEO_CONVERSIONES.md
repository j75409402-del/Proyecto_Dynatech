# SEO y captación comercial — 2 de octubre de 2026

Implementado sobre el proyecto existente y recuperado en `C:/Users/senm1/Dynatech/web-recuperada-20261002`, rama local `mejora-captacion-20261002`, basada en `origin/main` (`73c09562662be534707745b9bb076f5c3c327eb2`). El repositorio anterior tenía un enlace Git roto; se conservó intacta esa copia y se integraron sus cambios en una clonación del repositorio original. Cambios **sin publicar**.

## Diagnóstico y cambios

- Prioridad confirmada de nuevo por el dueño: **cilindros neumáticos como línea principal**. Los hidráulicos y el mecanizado son servicios complementarios. Inicio mantiene hero, bloque destacado y CTA centrados en neumáticos; títulos y descripción de empresa refuerzan esa prioridad, y el pie de página enlaza primero la línea neumática.

- La web pública y el proyecto destacan cilindros neumáticos y cinco líneas complementarias. Se conservaron hero, identidad, imágenes, categorías, enlaces de WhatsApp y redirecciones históricas.
- Faltaban páginas para cilindros hidráulicos y mecanizado. El dueño confirmó esos servicios en su petición actual. Se añadieron `/cilindros-hidraulicos` y `/mecanizado` con solicitudes distintas, información para cotizar y límites de evaluación. No se añadieron marcas, capacidades de máquinas, tolerancias ofrecidas, stock, certificaciones ni promesas de entrega.
- Se enlazaron desde inicio, servicios y pie de página. Se añadieron al sitemap y al selector del formulario. Toda la oferta nueva reside en `src/lib/servicios.ts`.
- Se reforzaron títulos locales de las cinco categorías, inicio, contacto y servicios; descripción de inicio y empresa; metadatos sociales por página comercial. El H1 de servicios identifica los cilindros neumáticos explícitamente.
- Cada categoría ahora explica qué información facilita cotizar: conexiones en neumática, etiqueta eléctrica, conexión y salida de sensores, rango y unidades en instrumentación, dimensiones y potencia de resistencias. Datos en `src/lib/soluciones.ts`.
- Se añadió `LocalBusiness` con identificador estable y dirección publicada. Los servicios nuevos y las categorías referencian esa entidad; las páginas nuevas incluyen breadcrumbs. No se inventaron coordenadas, número de calle ni reseñas.
- Contacto ahora invita a cotizar para empresas y zonas francas. Se sustituyó la promesa de respuesta inmediata por una acción concreta de WhatsApp.
- Se conservaron `next/image`, contenido visible en HTML y entradas de formulario de 16 px, mejoras que ya estaban en la copia actual. La muestra local no justificó una nueva intervención en rendimiento.

## Medición implementada y límite actual

`src/components/CommercialTracking.tsx` registra mediante delegación los enlaces existentes; `src/lib/conversions.ts` envía objetos a `window.dataLayer` y al evento local `dynatech:conversion`. Sin almacenamiento, llamadas de red ni bibliotecas externas de analítica.

| Evento | Qué significa |
|---|---|
| `whatsapp_click` | Clic hacia WhatsApp; no confirma una conversación ni una venta |
| `phone_click` | Clic de llamada |
| `email_click` | Clic de correo |
| `quote_form_open` | Clic hacia el formulario de cotización |
| `generate_lead` | API de formulario respondió con éxito; canal `quote_form` o `contact_form` |

Solo se incluyen `event`, `channel`, `page_path` sin query y `placement` para los enlaces (`header`, `footer`, `content`). No se envían nombres, emails, teléfonos, empresa, números de cotización, texto de WhatsApp, adjuntos ni valores del formulario. No se registra actividad del admin. El formulario de cotización excluye la respuesta ficticia `COT-RECIBIDA` del filtro antispam; contacto aplica el filtro existente.

**Pendiente:** el dueño confirmó que no tiene cuenta GA4/GTM. Crear una cuenta bajo su titularidad y conectar una sola vez los eventos a su colector. Actualmente se pueden verificar en el navegador, pero no quedan estadísticas persistentes. No se añadió un ID ficticio ni se instaló un píxel. Con GTM, crear desencadenantes Custom Event para estos cinco nombres y mapear canal/ruta/ubicación; usar `generate_lead` como solicitud registrada y tratar los clics como intención. Revisar la configuración de consentimiento y política aplicable de la cuenta antes de activar el colector. No mapear una misma acción dos veces con medición automática y etiquetas personalizadas.

## Verificación

- `npm run typecheck`: OK.
- `npm run lint`: 0 errores; un aviso preexistente de `postcss.config.mjs`.
- `npm run build`: OK; rutas públicas estáticas. Se conservan avisos existentes de middleware y lockfile externo.
- `node --test tests/notify.test.mjs`: 5 pruebas correctas, sin enviar correos reales.
- `node tests/commercial.test.mjs`: 18 URLs del sitemap a 390, 768 y 1440 px (54 comprobaciones), status 200, un H1, canonical, título, descripción, JSON-LD válido como JSON y ausencia de desbordamiento. Esto no sustituye el Rich Results Test de Google.
- Redirecciones históricas representativas, 404, noindex del login, menú móvil, contenido/CTA sin JavaScript, carga de imágenes móviles y ausencia de errores de JavaScript: OK.
- Eventos WhatsApp, llamada, correo y apertura de formulario: OK. Cotización hidráulica precargada: OK. Fallo de cotización no genera evento y ofrece respaldo WhatsApp. Cotización/contacto correctos generan un evento por envío: OK, **con API simulada**.
- `/admin` devuelve 500 en local por falta de variables de Supabase. Acceso real al panel, persistencia de leads, adjuntos de producción y entrega de correo: **NO VERIFICADO** en esta intervención. No se alteraron contratos de API, tablas, secretos, cron ni configuración de hosting.
- `node tests/mobile-performance.mjs`: muestra final del repositorio recuperado con CPU 4x y red 1.6 Mbps/150 ms: LCP inicio 1.392 s, sensores 1.076 s, hidráulicos 1.020 s; CLS 0 en las tres. Son muestras locales, **no Lighthouse ni Core Web Vitals de producción**, y no prueban una mejora frente al estado anterior.

Evidencia: `docs/seo-verificacion/resultados.json`, `rendimiento-movil.json` y cuatro capturas móviles. Los scripts usan Edge y el Playwright del runtime local; admiten `PLAYWRIGHT_MODULE` (nombre de módulo o URL file), `TEST_BASE_URL`, y el script comercial admite `BROWSER_EXECUTABLE`.

## Oportunidades comerciales pendientes

1. Publicar los cambios revisados. La recuperación de Git ya está resuelta; `AGENTS.md` exige confirmación antes de push a main, que publica automáticamente.
2. Conectar medición persistente y verificar en producción un envío real autorizado, su aviso por correo y su recepción en admin. Las pruebas simuladas no confirman entrega.
3. Verificar Search Console y Google Business Profile: dominio, sitemap, dirección exacta y perfiles reales. No crear ubicaciones ficticias. Revisar el marcado con [Google Rich Results Test](https://search.google.com/test/rich-results).
4. Usar búsquedas y solicitudes reales para decidir páginas específicas sobre válvulas neumáticas, sensores u otras subcategorías ya documentadas. Publicarlas solo si cuentan con información técnica útil y contenido distinto; no crear páginas repetidas por ciudades o marcas.
5. Añadir casos reales de reparación y mecanizado con fotos autorizadas, problema, trabajo y resultado confirmados. Ayudarían a evaluar al proveedor sin inventar experiencia.
6. Obtener métricas de campo después de publicar para decidir optimizaciones de móvil. Medir clic → conversación calificada → cotización → venta con el seguimiento comercial de la empresa.

No se puede afirmar un aumento de clientes, tráfico o ventas todavía: las mejoras no están publicadas y no existe una comparación de conversiones.


## Rediseño autorizado para revisión (2 de octubre de 2026)

El propietario amplió el alcance a un diseño profesional, con imágenes, y pidió ver el resultado antes de publicarlo. La portada ahora prioriza cilindros neumáticos con un hero dividido, fotografías existentes, bloques de fabricación/reparación/componentes y una explicación de cómo solicitar cotización. Hidráulicos y mecanizado permanecen como servicios complementarios. Navegación, cierre comercial y pie de página se ajustaron al mismo sistema visual. Las categorías cuentan con alternativas diferenciadas de WhatsApp y formulario por correo.

Se conservaron las imágenes existentes; no se añadieron clientes, marcas, certificaciones, inventario ni nuevas fotografías presentadas como trabajos reales. La imagen del hero se describe como referencia en su texto alternativo. Antes de publicar conviene sustituir las referencias editoriales por fotografías propias autorizadas si se dispone de ellas.

La vista previa se entrega localmente, sin push ni despliegue. Las comprobaciones comerciales se repitieron con 54 combinaciones de ruta/tamaño sin errores JavaScript ni desbordamiento; las pruebas de correo son simuladas. Capturas: diseno-desktop.png, diseno-mobile.png y diseno-completo.png.

Validación final del rediseño: typecheck y build correctos; lint sin errores (aviso preexistente de postcss). Muestra móvil local CPU 4x y red 1.6 Mbps/150 ms: LCP inicio 1.020 s, sensores 0.996 s, hidráulicos 0.968 s; CLS 0. Las cifras corresponden a la vista previa local, no a rendimiento de campo ni a resultados comerciales.


### Portada v2 solicitada por el propietario

Se sustituyó la imagen del técnico por una nueva ilustración fotográfica generada con IA, usando la portada anterior como referencia. No representa un empleado, instalación ni trabajo real verificado. Se conserva el texto alternativo de imagen de referencia. El logo original se compone en HTML con su archivo existente y texto legible, separado de la imagen, evitando deformaciones generativas. Asset optimizado: public/cilindros/taller-portada-v2.webp. Se conserva la fotografía anterior. Typecheck, lint sin errores y build correctos; imagen cargada y sin desbordamiento a 390/1440 px. Capturas portada-v2-390.png y portada-v2-1440.png. Publicación pendiente de aprobación expresa del propietario.
