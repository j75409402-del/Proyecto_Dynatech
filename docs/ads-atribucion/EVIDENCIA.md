# Evidencia de pruebas · atribución de Google Ads, recorridos a WhatsApp y foto real

Rama `mejora/conversion-cotizacion-whatsapp` · PR #3. **Publicado el 15-oct-2026** con la aprobación del dueño: merge `12b3b92` en `main` (contenido idéntico a `fb914a9`). Las secciones 1 a 6 se hicieron antes de publicar; la 7 es la verificación en producción.

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

**Implicación para medir Ads:** en esta muestra de 10 clics llegaron 9. Es un resultado puntual, no una tasa de pérdida permanente: la muestra es muy pequeña y la causa no quedó registrada. Mientras tanto, el número de conversaciones de WhatsApp con la frase es la cifra de referencia y Umami se usa como indicador.

**Pendiente técnico:** el envío del servidor descarta los errores sin registrarlos. Hay que añadir un diagnóstico (estado HTTP o tiempo agotado, sin datos personales) para saber por qué se pierde un evento.

## 4 · Analítica desactivada en Preview

`NEXT_PUBLIC_DISABLE_ANALYTICS=1`, tipo config, **solo en el entorno Preview** de Vercel (15-oct-2026). Con esa variable el ID de Umami queda vacío al compilar: el navegador no carga el script y `/cotizacion` no envía el evento del servidor. Producción no cambia. La comprobación en la nueva vista previa está en la sección 5.

La variable solo afecta a los despliegues compilados después de crearla. Las vistas previas anteriores (`45f62cb`, `047c667`, `319baf8`, `a93435a`) siguen enviando a Umami: no hay que usarlas para probar.

## 5 · Verificación tras desactivar la analítica en Preview

Primera vista previa compilada con la variable: commit `b973e3f`, `proyecto-dynatech-lmwhyba01-…vercel.app`.

- En el navegador: el ID de Umami está vacío, la página no carga `script.js` de Umami y no sale ninguna petición a `cloud.umami.is`.
- Clic normal a las 20:53:21 UTC (16:53 en Santo Domingo), desde /mecanizado sin parámetros: WhatsApp se abre con el mensaje del servicio, sin la frase.
- Clic con anuncio simulado a las 20:53:36 UTC, desde /cilindros-hidraulicos con `utm_source=google&utm_medium=cpc&utm_campaign=prueba_medicion`: el mensaje termina en «Vengo de un anuncio de Google».
- **Umami, de 20:45 a 20:56 UTC: 0 eventos `quote_whatsapp_click`** y ninguna visita desde `lmwhyba01`. Solo aparecen 2 visitas de página a las 20:50 desde la vista previa anterior `wchzk67v8` (commit `a93435a`, compilada antes de la variable). Son pruebas y entran en la regla de exclusión de la sección 3.

## 6 · Foto real

[`foto-real-antes-despues.jpg`](./foto-real-antes-despues.jpg): a la izquierda el original y a la derecha el recorte publicado (`public/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg`).

- Recorte 5:3 (915×549) desde el original de 960×1280: queda menos pared y suelo, y los cinco cilindros completos, incluidos los vástagos y las bases.
- Luz: curva suave que aclara sombras y medios tonos y deja las altas luces casi intactas (píxeles quemados: 2,8 % antes, 3,1 % después); +4 % de saturación; nitidez ligera. Sin retoque del contenido.
- La etiqueta «Foto real · taller Dynatech» pasa debajo de la imagen. La columna se amplía de 360 a 520 px y el marco cambia de 4:5 a 5:3.
- El original se conserva en el repositorio (restaurado tras el merge con `a93435a`, que lo había borrado).
- `public/cilindros/taller-cilindros-neumaticos.jpg` (commit `a93435a` del otro chat): **el dueño confirmó el 15-oct-2026 que fue retocada con IA.** Se conserva en el repositorio pero no se usa. Con «Foto real» solo se rotula la foto original.
- Del commit `a93435a` se conservan los títulos y el pie descriptivos («Cilindros neumáticos del taller»).

## 7 · Verificación en producción (15-oct-2026)

Merge `12b3b92` (padres `de5734f` y `fb914a9`; sin diferencias con `fb914a9`). Despliegue de producción listo a las 21:07:09 UTC (17:07 en Santo Domingo). Antes de fusionar se comprobó que la rama seguía en `fb914a9` y `main` en `de5734f`, sin commits nuevos.

Navegador de la app de Claude, ancho 483 px, **con la analítica rechazada** en www.dynatech.com.do. Por eso estas pruebas no envían eventos (los clics llevan `nt=1`).

- **Analítica activa en producción:** el ID de Umami `4bbea860-…` está en la página. La variable `NEXT_PUBLIC_DISABLE_ANALYTICS=1` sigue solo en Preview.
- **Foto:** el recorte de la original carga en la portada y en /cilindros-neumaticos; la etiqueta queda fuera de la imagen y la imagen con IA no aparece.
- **3D** en /cilindros-neumaticos: `is-ready`, three.js r186, nivel «medium», sin desbordamiento horizontal.
- **Teléfonos:** `tel:+18092844336` y `tel:+18098542800` en la portada y /contacto.
- **WhatsApp** (no se envió ningún mensaje; solo se abrió la página de WhatsApp):
  - 21:10:05 UTC, /mecanizado sin parámetros: `phone=18092844336`, mensaje de mecanizado, sin la frase.
  - 21:10:58 UTC, /cilindros-hidraulicos con `utm_source=google&utm_medium=cpc&utm_campaign=prueba_medicion`: mensaje de cilindro hidráulico que termina en «Vengo de un anuncio de Google».
- **Umami, de 20:56 a 21:11 UTC:** 0 eventos `quote_whatsapp_click` y 0 visitas de `www.dynatech.com.do`. Solo 9 visitas de página desde un iPhone en RD (20:58–21:00 UTC), con origen vercel.com, en la vista previa antigua `wchzk67v8` (commit `a93435a`, anterior a la variable). Es la revisión del dueño desde el celular y queda **excluida** por la regla de la sección 3.

**Exclusión de los resultados comerciales:** descontar los eventos con `utm_campaign=prueba_medicion`, las visitas de `*.vercel.app` y cualquier evento de producción del 15-oct-2026 entre 21:05 y 21:15 UTC (no hubo ninguno).
