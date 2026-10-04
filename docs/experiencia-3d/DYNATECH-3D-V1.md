# Dynatech 3D v1 — Sistema visual

**Estado: dirección visual de Cilindros aprobada por el propietario el 4 de octubre de 2026.** El propietario autorizó expresamente publicar solo Cilindros el 4 de octubre de 2026, con una marca de agua discreta de Dynatech. Neumática está autorizada únicamente para desarrollo local; las demás categorías siguen detenidas. La prueba física en móvil sigue pendiente y no se presenta como realizada.

## Alcance y fuente

Se conserva Next.js, el motor Three.js, el modelo, la composición y las interacciones aprobadas. No se incorpora otra plataforma, gestor de estado, librería ni arquitectura. Los tokens se declaran en `.cylinder-page` dentro de `src/app/globals.css` y ya se consumen en esta presentación. Los parámetros 3D siguen en sus módulos actuales.

| Fuente | Responsabilidad |
|---|---|
| `src/app/globals.css`, bloque Cylinders | Tokens, tipografía, composición, controles, estados y responsive |
| `src/components/industrial/CylinderExperience.tsx` | HTML, texto y recorrido específico de Cilindros |
| `src/components/industrial/IndustrialStage.tsx` | Carga diferida, controles, selección, scroll y alternativas estáticas |
| `src/components/industrial/scene-engine.ts` | Cámara, luces, renderizado bajo demanda y gestos |
| `src/components/industrial/premium-cylinder.ts` | Geometría editorial, materiales, desmontaje y énfasis |
| `src/lib/industrial-scenes.ts` | Descripciones de componentes y registro de modelos aprobados |

## Tipografía, escala y espaciado

- IBM Plex Sans para titulares, texto y controles; IBM Plex Mono para etiquetas y numeración. Fuentes locales servidas por Next, pesos ya existentes; sin familias nuevas.
- Titulares desktop: `clamp(45px, 4.55vw, 72px)`, peso 500, interlínea 1.035, tracking -0.057em. Tablet: 46 px. Teléfono: `clamp(36px, 10.2vw, 48px)`.
- Texto: 15 px / 1.75 desktop; 13 px / 1.6 móvil. Información de selección: 11 px desktop y 12 px móvil. Etiquetas pequeñas se reservan para información secundaria, no instrucciones esenciales.
- Margen lateral: `--d3-gutter: 6%`. Columna editorial desktop: 31%, máximo 445 px; en el interior, 27%, máximo 375 px. La escena domina el área restante. En móvil se apilan texto, producto y controles.
- Escala de separación aplicada: 4, 6, 10, 12, 16, 23/27 y 30 px según densidad; 64 px entre bloques móviles, 100/110 px en bloques desktop. Mantener aire alrededor del producto y no superponer la ficha seleccionada.
- Geometría de Cilindros: escala constante 1.18. La cámara determina el encuadre y se retira al desmontar. Ese valor es de la ilustración, no una dimensión técnica ni una escala a copiar a otro producto.

## Color y contraste

| Token | Valor | Uso |
|---|---|---|
| `--d3-surface` | `#0b1016` | Fondo continuo |
| `--d3-text` | `#f0f2f2` | Titulares |
| `--d3-secondary` | `#bac6d0` | Párrafos e información de piezas |
| `--d3-muted` | `#9bafbf` | Instrucciones y pasos secundarios |
| `--d3-accent` | `#e4002b` | Identidad, CTA y subrayado seleccionado |
| `--d3-line` | `#c7daed33` | Divisores discretos |

Fondo de estudio: gradiente radial `#29323b → #151d25 → #0b1016`. Tipografía monumental y retícula de baja opacidad decoran sin competir con el producto. No usar neón ni recolorear una pieza roja para marcar selección. El contenido comercial posterior alterna grafito y `#e8edee` conservando continuidad.

## Materiales PBR

Valores del benchmark en `MeshStandardMaterial`:

| Acabado | Color | Metalness | Roughness | Intensidad de entorno |
|---|---|---:|---:|---:|
| Acero satinado | `#a4b2c0` | .98 | .32 + mapa sutil | 1.10 |
| Vástago pulido | `#e4eaf0` | 1 | .105 | 1.20 |
| Aluminio | `#91a0ad` | .78 | .44 | .82 |
| Tornillería | `#606d7b` | .96 | .23 | 1.05 |
| Sellos | `#202830` | 0 | .86 | .35 |

El mapa compartido del acero es procedural de 64 × 64, con mipmaps. La selección se amortigua: pieza elegida +16% de color base, las demás -32%; intensidad de entorno ±26%. Al deseleccionar se restauran los valores. Esto enfatiza la forma sin cambiar su identidad material.

Para otras categorías se reutiliza la diferenciación física de acabados. No asignar metalness de acero a plástico, vidrio o caucho. No convertir la ilustración genérica en una ficha técnica: dimensiones, tolerancias, marcas y prestaciones requieren fuentes aprobadas.

## Iluminación y cámara

- Estudio generado con RoomEnvironment/PMREM, luz principal blanca 3.7 en (4,6,5), hemisférica 1.2, rim frío `#c7dbef` de 2.6 en (-3,3,-4). Sin rim rojo en Cilindros.
- ACES Filmic, exposición 1.02, salida sRGB. Una luz proyecta sombras VSM: 512 móvil, 1024 desktop; opacidad de suelo .14 en esta presentación. No se añaden luces con sombras ni postprocesado para la selección.
- FOV: 30° ensamblado, hasta 32° abierto. Distancia desktop: `max(7.8, 23.5/aspect)`; móvil: `max(6.7, 14.8/aspect)`. Retirada progresiva al desmontar: 40% desktop / 48% móvil; ajustada por zoom.
- Zoom de la presentación: .85–1.12. Desplazamiento editorial fuera del grupo que gira para mantener el giro de 360° dentro de su área. No escalar geometría durante la apertura.
- En futuros modelos se conserva la perspectiva contenida y el criterio de encuadre, pero las distancias se recalculan a partir del producto; no se copian posiciones del cilindro.

## Easing, CTA y navegación por pasos

- `--d3-ease: cubic-bezier(.22,.8,.25,1)`, `--d3-fade: .65s`, `--d3-enter: .85s`. Cambio editorial: opacidad y desplazamiento vertical de 24 px.
- Montaje manual: 1.25 s, easing quintic `6t⁵ − 15t⁴ + 10t³`. Scroll amortiguado con factor 8; cámara 9; selección 10. Se detiene el renderizado cuando convergen.
- Pequeños desfases y diferencias de profundidad entre conjuntos. Los sellos se separan ligeramente solo al desmontar; en el estado ensamblado vuelven a su posición original.
- CTA comercial: `btn-primary`, rojo corporativo, texto blanco, forma industrial y flecha. Mantener `quoteHref()`/`emailQuoteHref()` y el contexto real de la solicitud. El botón claro de ensamblaje es un control del producto, no compite en color con la cotización.
- Tres pasos: Producto → Interior → Tu aplicación. Línea fina de progreso, numeración Mono y estado activo claro. El scroll cambia narrativa y apertura; pulsar ensamblar/desmontar tiene prioridad sobre la apertura automática. No secuestrar la rueda ni bloquear el scroll vertical.
- Otras categorías definirán su propio relato y acción comercial con contenido autorizado. La anatomía del cilindro y sus tres textos no son una plantilla literal.

## Interacción y responsive

Giro horizontal con mouse/touch, selección directa de piezas o botones, zoom acotado y montaje reversible. `aria-pressed`, información con `role=status` y foco visible. La selección combina contraste del objeto, subrayado, fondo tenue y un punto en el botón: no depende solo del color.

Breakpoints de composición: 1024 px (columnas), 600 px (teléfono), 360 px (compacto); ajuste de aire a partir de 1600 px. En móvil: párrafos de 13 px, selector de 12 px y 44 px de alto; botones de zoom 40 × 40; instrucciones en su propia fila. Se reserva espacio constante a la descripción para evitar saltos al seleccionar. Los controles del modelo están fuera de la silueta inicial.

La configuración de menor coste gráfico se activa por debajo de 900 px o con hasta cuatro núcleos. El cambio de composición y el perfil gráfico son decisiones distintas.

## Reduced-motion y rendimiento

- `prefers-reduced-motion: reduce`: imagen editorial y contenido HTML sin cargar la animación 3D; transición editorial desactivada. El cambio de preferencia durante la sesión se atiende.
- Sin JavaScript, WebGL, con ahorro de datos o hasta dos núcleos: alternativa estática y cotización accesibles. Ante pérdida del contexto: mostrar referencia editorial; no dejar una caja vacía.
- Importación dinámica después de entrar en el área visible y tener listas las fuentes. Un canvas por recorrido; recursos de Cilindros creados al entrar en su escena.
- Renderizar por demanda; detener en reposo, fuera de pantalla y al ocultarse la pestaña. Liberar geometrías, materiales, texturas y contexto al salir.
- DPR máximo 1.25 en perfil móvil / 1.75 desktop; 32/64 segmentos del modelo; antialias desactivado en perfil de menor coste. Sin bucle decorativo permanente, partículas ni descargas de modelos externos.
- Compresión, LOD y presupuestos de futuros GLB se decidirán con assets reales y medición. No añadir una cadena de optimización para archivos inexistentes.
- La emulación y los FPS locales sirven como regresión, no como prueba de GPU, batería o temperatura de un teléfono real.

## Reutilización y condiciones de avance

1. Usar este documento y la presentación aprobada como referencia de acabado y comportamiento.
2. Mantener fuentes comerciales, rutas, metadatos, formularios, contactos y analítica. Respetar el significado material y funcional de cada nuevo producto.
3. Reutilizar los tokens, las proporciones, el tratamiento de luz, los estados y las reglas de rendimiento. Adaptar cámara, geometría, relato y componentes al producto nuevo.
4. No crear otra plataforma ni generalizar la arquitectura ahora. `presentation` sigue siendo el modo editorial específico de Cilindros; no activarlo ciegamente en otra escena.
5. **Otras categorías detenidas hasta aprobar la prueba física y confirmar el rendimiento. Publicación no autorizada.** Registro: `PRUEBA-MOVIL-V1.md`.

Copia del benchmark aprobado anterior a estos ajustes: `C:/Users/senm1/Dynatech/recuperacion-cilindros-v1-aprobado-20261004`, con manifiesto SHA-256. Evidencia posterior: `docs/cilindros-premium/v1-ajustes/`. La aprobación de dirección no certifica todavía comportamiento en hardware físico.

## Firma visual y publicación de Cilindros

Marca de agua estática de Dynatech, decorativa y sin eventos de puntero. Visible en la escena y en su alternativa estática. Se conserva el modelo aprobado, cámara, materiales e interacciones. La publicación se prepara desde producción con una lista explícita de archivos: ruta de Cilindros, sus módulos, dependencias Three.js, estilos y color del encabezado solo en esa ruta. No se publican los cambios locales de portada, Neumática, Servicios, navegación comercial u otras categorías.
