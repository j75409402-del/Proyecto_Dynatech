# Evidencia de pruebas · atribución de Google Ads, recorridos a WhatsApp y foto real

Rama `mejora/conversion-cotizacion-whatsapp` · PR #3 (borrador). Nada de esto está en producción: `main` sigue en `de5734f`.

Hay tres tipos de prueba y no se mezclan:

| Tipo | Qué valida | Qué NO valida |
|---|---|---|
| **Local** (build `next start` en un contenedor; fuentes de Google y Umami simulados) | Lógica del mensaje, número de eventos que envía el servidor, recorridos, regresiones | Fuentes reales, 3D con GPU, Umami real |
| **Vista previa de Vercel** (navegador real) | Fuentes, 3D, recorridos y mensaje de WhatsApp en el despliegue | Por sí sola, lo que registra Umami |
| **Panel de Umami Cloud** (consulta a la API con la sesión del dueño) | Eventos que de verdad llegaron | — |

**Ningún evento de estas pruebas es una conversión comercial.**

## 1 · Local

- `tests/ads-attribution.test.mjs`: 7/7. Datos en [`atribucion-local.json`](./atribucion-local.json).
  - Clic pagado, navegación dentro de la sesión, pestaña nueva sin parámetros, orgánica sin UTM, Google con `utm_medium=organic`, sin parámetros, y clic pagado con la analítica rechazada.
  - Con consentimiento: exactamente 1 evento por clic. Con la analítica rechazada: 0.
- `tests/journeys-ads.test.mjs`: 20/20, es decir, 5 recorridos × escritorio/móvil × pagado/sin parámetros. Datos en [`recorridos-local.json`](./recorridos-local.json).
- Además: `tsc`, `lint` (0 errores), `build`, `whatsapp-quote`, `analytics` y `commercial`, que incluye los dos teléfonos.

## 2 · Vista previa de Vercel (15-oct-2026, commit `45f62cb`)

Navegador de la app de Claude en el equipo del dueño, en escritorio 1366×900 y en móvil 375×812 con Android emulado.

- Fuentes IBM Plex Sans 400/500/600 e IBM Plex Mono 400, servidas por la propia web.
- 3D en /cilindros-neumaticos: listo; nivel «high» en escritorio y «medium» en móvil; más de 1.200 fotogramas; sin desbordamiento horizontal.
- Los cinco recorridos desde «¿Qué necesitas?» llegan a `api.whatsapp.com/send?phone=18092844336`. El mensaje es el de cada servicio y termina en «Vengo de un anuncio de Google» cuando la visita trae `utm_source=google&utm_medium=cpc`. Sin anuncio, la frase no aparece.
- Segundo teléfono (commit `047c667`): «+1 (809) 284-4336 · +1 (809) 854-2800» en la barra superior; dos enlaces `tel:` en el menú móvil, el pie, /contacto y /nosotros.

### Clics de prueba en la vista previa (con `utm_campaign=prueba_medicion`)

Horas en UTC; Santo Domingo = UTC−4, así que 20:14 UTC = 4:14 p. m.

| # | Clic (registro) | Vista | Recorrido | ¿Llegó a Umami? | Hora en Umami |
|---|---|---|---|---|---|
| 1 | ≈20:13:55 | Escritorio | Reparar neumático (/servicios) | Sí | 20:14:00 |
| 2 | 20:14:36 | Escritorio | Cilindro hidráulico | Sí | 20:14:37 |
| 3 | 20:15:03 | Escritorio | Mecanizado | **No** | — |
| 4 | 20:15:29 | Escritorio | Componente (/neumatica) | Sí | 20:15:30 |
| 5 | 20:15:42 | Escritorio | Solo tengo una foto | Sí | 20:15:43 |
| 6 | 20:17:10 | Móvil | Reparar neumático | Sí | 20:17:10 |
| 7 | 20:17:34 | Móvil | Cilindro hidráulico | Sí | 20:17:35 |
| 8 | 20:17:59 | Móvil | Mecanizado | Sí | 20:18:00 |
| 9 | 20:18:22 | Móvil | Componente | Sí | 20:18:23 |
| 10 | 20:18:37 | Móvil | Solo tengo una foto | Sí | 20:18:37 |

Sin evento, como se esperaba:
- 20:14:17: clic programado por script, bloqueado por el navegador como ventana emergente; no hubo petición.
- 20:16:17: visita sin anuncio con la analítica rechazada.

## 3 · Verificación en Umami Cloud

Consulta del 15-oct-2026 al sitio `4bbea860-…`, de 20:10 a 20:25 UTC (16:10–16:25 en Santo Domingo).

- **9** eventos `quote_whatsapp_click`, todos con `utm_campaign=prueba_medicion` y `utm_medium=cpc`.
- `service`: neumatico-reparar 2, hidraulico 2, componente 2, foto 2, mecanizado 1.
- Llegaron 9 de los 10 clics. Falta el n.º 3 (escritorio, mecanizado, 20:15:03 UTC). El clic sí abrió WhatsApp con la frase, así que el evento se perdió en el envío desde el servidor (`after()` → `cloud.umami.is/api/send`, con 3 s de límite). Ese envío ignora los errores sin registrarlos y la causa no se puede comprobar. No hubo duplicados.
- No hubo ningún otro `quote_whatsapp_click` en el intervalo, así que no se mezclaron clics reales.
- Las 25 visitas de página del intervalo vienen de los dominios `proyecto-dynatech-…vercel.app`.

**Exclusión de los resultados comerciales:** en cualquier informe, descontar los eventos con `utm_campaign=prueba_medicion` y las visitas de página de dominios `*.vercel.app`. En este intervalo eso son los 9 eventos de la tabla; no queda ninguna conversión real.

**Implicación para medir Ads:** en esta muestra se perdió 1 de 10 clics. El número de conversaciones de WhatsApp con la frase sigue siendo la cifra de referencia; Umami se usa como indicador.

## 4 · Analítica desactivada en Preview

`NEXT_PUBLIC_DISABLE_ANALYTICS=1`, tipo config, **solo en el entorno Preview** de Vercel (15-oct-2026). Con esa variable el ID de Umami queda vacío al compilar: el navegador no carga el script y `/cotizacion` no envía el evento del servidor. Producción no cambia. La comprobación en la nueva vista previa está en la sección 5.

## 5 · Verificación tras desactivar la analítica en Preview

Pendiente de completar con el despliegue de este commit.

## 6 · Foto real

[`foto-real-antes-despues.jpg`](./foto-real-antes-despues.jpg): a la izquierda el original y a la derecha el recorte publicado (`public/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg`).

- Recorte 5:3 (915×549) desde el original de 960×1280: queda menos pared y suelo, y los cinco cilindros completos, incluidos los vástagos y las bases.
- Luz: curva suave que aclara sombras y medios tonos y deja las altas luces casi intactas (píxeles quemados: 2,8 % antes, 3,1 % después); +4 % de saturación; nitidez ligera. Sin retoque del contenido.
- La etiqueta «Foto real · taller Dynatech» pasa debajo de la imagen. La columna se amplía de 360 a 520 px y el marco cambia de 4:5 a 5:3.
- El original se conserva en el repositorio (restaurado tras el merge con `a93435a`, que lo había borrado).
- `public/cilindros/taller-cilindros-neumaticos.jpg` (commit `a93435a` del otro chat) queda **sin usar** hasta que el dueño confirme su origen. Las placas «DYNATECH» salen ilegibles y la pared, el suelo y el óxido del cilindro usado no coinciden con la foto original, lo que indica una imagen generada o retocada con IA. Con «Foto real» solo se rotula la foto original. NO VERIFICADO.
- Del commit `a93435a` se conservan los títulos y el pie descriptivos («Cilindros neumáticos del taller»).
