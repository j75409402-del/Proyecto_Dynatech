# WEB-030 · Entrega local para revisión

30 de octubre de 2026 · Ejecutor: web · Estado propuesto: REVIEW (no cierre ni aprobación propia).

**Vista previa:** http://127.0.0.1:3210/ — mismo proyecto Next.js, rama `web-b2b-20261030`. No publicado, sin push. La pestaña de vista previa queda abierta en la aplicación. El servidor es local y requiere que este equipo siga encendido.

## Qué cambió

- Portada con el titular solicitado, fotografía propia confirmada, CTA **Solicitar cotización** al flujo existente y **Explorar catálogo**.
- Categorías prioritarias basadas en la oferta real: cilindros, válvulas, FRL/accesorios, servicio de cilindros hidráulicos y las líneas industriales actuales. Gabinetes eléctricos sigue accesible. Consulta abierta para otros componentes, sin inventar catálogo ni existencias.
- Bloques de Compras, Mantenimiento e Ingeniería; proceso en cuatro pasos con orden de compra, condiciones sujetas a cotización, ventajas verificables y contacto por WhatsApp/correo.
- Nosotros, introducción del catálogo, contacto y metadatos coherentes con suministro B2B. Ninguna URL, categoría, formulario, integración ni imagen válida se eliminó. El catálogo sigue siendo una referencia para cotizar; sin carrito ni precios.
- Galería real, comparador antes/después y servicios técnicos conservados más abajo. Cilindros 3D tiene entrada visible desde el hero y su bloque propio.
- Configuración de ubicación y disponibilidad técnica preparada pero **inactiva**. La dirección Av. Rómulo Betancourt 2158, mapas, teléfonos, horarios y servicios actuales permanecen visibles.
- Corrección puntual de rendimiento de Cilindros: a alta frecuencia de render, el umbral del FOV impedía acabar la transición de cámara. Se reprodujo también en la web pública antes de corregirlo. Ahora converge y deja de dibujar cuando está quieto. No cambiaron modelo, materiales, composición ni controles.

## Verificación

| Comprobación | Resultado |
|---|---|
| TypeScript y compilación Next.js | OK |
| ESLint | 0 errores; 1 aviso previo en postcss.config.mjs |
| Páginas comerciales | 60 combinaciones: 20 rutas × 390/768/1440 px; sin errores JS ni desbordamiento |
| SEO | 42 destinos y 32 enlaces de subcategorías; canonical, sitemap, schema y redirecciones conservados |
| Portada B2B | 360/390/768/1440 px, sin JS y reduced-motion; contraste de CTA ≥4.5:1 |
| WhatsApp | 9 grupos de comprobaciones, número oficial y mensajes con contexto; 20 eventos recibidos por servidor simulado |
| Anuncios / atribución | 6 grupos (7 casos); 20 recorridos desde portada en desktop/móvil, pagados y orgánicos |
| Umami | Sin cookies, sin duplicados ni datos privados; DNT, rechazo anterior y admin excluido |
| Contacto y correo | Formulario con API simulada; 5 pruebas de avisos por correo, sin envío real |
| Eventos de cotización | 6 casos de éxito, latencia y fallos, con API simulada |
| Política operativa | Estado actual preservado; escenario futuro probado aisladamente sin activarlo |
| Cilindros | 5 tamaños (320–1440 px), scroll, selección, ensamblado/exploded, reposo; fallback sin JS, reduced-motion y pérdida WebGL; arrastre táctil emulado |
| Supabase | Proyecto ACTIVE_HEALTHY; tablas de leads presentes con RLS, inspección solo de metadatos |

Medición móvil local (CPU 4×, red 1.6 Mbps / 150 ms): LCP de inicio **1.584 s**, sensores **1.428 s**, hidráulicos **1.592 s**; CLS **0** en las tres muestras. Son muestras emuladas en este equipo, no Core Web Vitals de clientes ni una prueba física en teléfono.

Umami se verificó con un build habilitado y receptores simulados. La compilación final de vista previa usa `NEXT_PUBLIC_DISABLE_ANALYTICS=1` solo en el proceso de build/servidor, para no contaminar métricas; no se cambió el ID, contrato ni configuración de producción.

## Evidencias

- `verificacion.json`, `commercial.json`, `seo-organic.json`, `b2b-responsive.json`.
- `ads-attribution.json`, `journeys-ads.json`, `rendimiento-movil.json`.
- `build.log`, `typecheck.log`, `lint.log`.
- `cilindros-regresion/pruebas.json`, `touch-performance.json` y capturas de los tres estados.
- `cilindros-fallo-preexistente.json` y capturas de comparación de la web pública.
- Capturas: `inicio-1440.png`, `inicio-390.png`, `inicio-completo-1440.png`, `inicio-completo-390.png`, categorías y proceso en ambos tamaños.

## Límites y pendientes

- Falta la validación física en móvil y la aprobación visual del usuario.
- No se enviaron formularios, correos ni mensajes reales. Administración y escritura real a Supabase no se probaron localmente: esta copia no tiene sus variables de entorno. Conectar el plugin no las instala automáticamente.
- Supabase no se modificó. Sus avisos de seguridad existentes y enlaces de remediación están en `SUPABASE-LECTURA.md` para revisión independiente; no se abrieron políticas de datos.
- Mudanza, nueva dirección y continuidad futura de servicios: pendientes de confirmación. Checklist detallado en `AUDITORIA-Y-PLAN.md`. Google Business Profile, Maps, Ads, DNS y hosting no se tocaron.
- Publicar requiere revisión independiente y aprobación de producción mediante HQ. No se solicitó ni ejecutó publicación en esta tarea de vista previa.

## Respaldo y reversión

Base `origin/main` en `1a78844`; respaldo `backup/antes-b2b-20261030`. Todos los cambios están en una rama local del repositorio existente. No se tocaron los worktrees de otros trabajos. La reversión eventual sería un revert del commit local tras revisión; no requiere reset ni reescritura del historial.
