# Solicitudes por correo — 2 de octubre de 2026

## Comportamiento preparado

El botón «Cotizar por correo» de los bloques QuoteCTA abre `/cotizacion/correo`. Conserva la línea y el elemento solicitados mediante `tipo` y `nombre`. Reutiliza QuoteForm y `/api/cotizacion`: primero guarda la solicitud y después envía un aviso a `dynatechsrl@outlook.com`. Incluye empresa, contacto, teléfono, RNC cuando exista, artículos, cantidades, notas y enlaces de adjuntos. Reply-To permite responder al correo del cliente validado por la API.

La ruta `/cotizacion` y los botones de WhatsApp conservan su comportamiento. Los enlaces de correo de contacto general siguen siendo mailto. No se modifican APIs ni payloads de webhooks, bot de WhatsApp, DNS web, imágenes, catálogo, dependencias ni cron.

## Configuración aplicada con autorización del propietario

Resend: dominio `dynatech.com.do` verificado. Recepción desactivada. Clave «Dynatech web - avisos de solicitudes» con permiso Sending access restringido a ese dominio. Valor guardado directamente en Vercel como secreto; no se guardó en archivos ni se imprimió en el chat.

DNS en MiDominio.do, añadidos sin reemplazar registros:

| Tipo | Nombre | Destino / propósito | ID |
|---|---|---|---|
| TXT | resend._domainkey | Firma DKIM pública suministrada por Resend | 168653764 |
| CNAME | rsend | rsend.forge.rmta.net | 168653765 |
| CNAME | send | send.forge.rmta.net | 168653766 |

TTL: 7200, mínimo admitido por el proveedor. No se añadió DMARC opcional ni se modificaron los A de Vercel o el TXT de Google.

Variables de producción en Vercel: `LEAD_NOTIFY_EMAIL=dynatechsrl@outlook.com`, `RESEND_FROM=Dynatech Web <web@dynatech.com.do>` y `RESEND_API_KEY` como Secret. El remitente es una identidad técnica de envío, no un nuevo buzón de recepción ni un reemplazo del correo comercial público.

Las nuevas variables requieren despliegue para entrar en vigor. Base del trabajo: commit de producción `73c09562662be534707745b9bb076f5c3c327eb2`, rama local `codex/correo-solicitudes-20261002`, sin incorporar cambios no relacionados de otras copias. Publicación pendiente de autorización conforme a AGENTS.md.

## Verificación y límites

Dominio verificado en el panel de Resend. Valores de configuración y existencia de la clave comprobados en Vercel, sin revelar secretos. El aviso de correo tiene timeout, diagnóstico cuando falta configuración y logs sin contenido privado del proveedor; los webhooks tienen timeout para no retener indefinidamente la solicitud.

No hay cola persistente ni reintento automático del aviso. Si falla el proveedor, la solicitud sigue guardada. El mensaje de éxito confirma recepción de la solicitud, no entrega del correo. La API acepta y valida los datos del cliente; antispam y límites existentes se conservan.

Pruebas automatizadas de notifyLead usan HTTP simulado, sin correos reales. La prueba extremo a extremo pendiente, después del despliegue, debe comprobar solicitud guardada, mensaje aceptado/entregado y llegada a Outlook. No se han registrado ventas o cotizaciones reales por estas pruebas.

Validación final local: 5 pruebas de avisos pasan; tipos sin errores; lint sin errores (aviso preexistente de postcss); build de producción correcto con 26 rutas. Formulario abierto en Chrome sobre el build: tipo Neumática y descripción Conexiones precargados correctamente; empresa, contacto, adjuntos y botón de envío presentes. Revisión visual de escritorio realizada. No se envió el formulario local ni se ha confirmado recepción en Outlook.

Referencia de la API: https://resend.com/docs/api-reference/emails/send-email
