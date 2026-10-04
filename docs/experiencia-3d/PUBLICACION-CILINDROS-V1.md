# Publicación de Cilindros · Dynatech 3D v1

Autorización expresa del propietario: «Publicar solo Cilindros en la web pública», 4 de octubre de 2026. Añadir marca de agua de Dynatech.

## Alcance

- La experiencia aprobada de Cilindros, incluido scroll, giro, zoom limitado, desmontaje y selección.
- Firma discreta, estática, sin bloquear el producto ni los gestos.
- Color del encabezado limitado a la ruta de Cilindros. El resto conserva el diseño público anterior.
- Sin cambios en APIs, entorno, cron, formularios, analytics, redirecciones o datos comerciales.
- Base de recuperación: `4daf297d8bd394bbf93f8ee3967e528503b9938a`. Revertir este cambio mediante un nuevo commit, nunca reset ni force push.

## Verificación

- Typecheck, lint y build de producción: correctos. Lint conserva el aviso previo de PostCSS; build conserva la advertencia previa de middleware.
- 57 combinaciones de ruta y tamaño: correctas; sin errores de página ni desbordamiento. Incluye metadata/canonical, datos estructurados, redirecciones, WhatsApp, formularios con APIs simuladas, navegación móvil y contenido sin JavaScript.
- Analytics: SPA sin duplicados, WhatsApp y lead simulados, sin datos privados, sin cookies, rechazo previo/DNT y exclusión del admin: correctos.
- Cilindros: 1440, 1024, 768, 390 y 320 px; tres pasos de scroll, selección reversible, montaje manual y render detenido en reposo: correctos. Sin errores de página.
- Alternativas sin JavaScript, reduced-motion y pérdida de WebGL: contenido y CTA visibles.
- Gesto táctil emulado en Edge: correcto; 67 frames, 47.94 frames/s durante el arrastre medido. Es una medición de escritorio con emulación, no una garantía en teléfonos físicos.
- Capturas y video corto guardados en `docs/cilindros-premium/publicacion/`. El video se conserva como evidencia local.
- Modelo, cámara/motor, controles y contenido de la ruta se compararon byte por byte con la versión aprobada. Solo se añadió la marca de agua y se aisló la integración de estilos/encabezado de las demás categorías.

Las pruebas físicas de teléfono y los envíos reales de formularios con revisión administrativa no se consideran verificados. `/admin` local no tiene las variables necesarias; no se modificaron sus APIs ni su configuración.
