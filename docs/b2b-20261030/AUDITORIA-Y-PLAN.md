# WEB-030 · Transformación comercial B2B — auditoría y plan

Fecha: 30 de octubre de 2026. Estado: desarrollo local; no publicado.

## Base y respaldo

- Repositorio existente, base origin/main `1a78844`, rama de trabajo `web-b2b-20261030`.
- Referencia de respaldo: `backup/antes-b2b-20261030` → `1a78844`.
- Worktree: `C:/Users/senm1/Dynatech/web-b2b-20261030`. No es otro proyecto ni otra plataforma: comparte el historial Git y conserva el mismo despliegue.
- Los otros worktrees y sus cambios pendientes no se modificaron. No push ni cambios de producción.

## Auditoría antes de editar

Next.js 16.3.8 App Router, React 19, TypeScript, Tailwind, Three.js y Framer Motion. Despliegue actual en Vercel mediante main; adaptación Cloudflare existente sin activar. Fuentes: package.json, next.config.mjs, vercel.json, AGENTS.md, HANDOFF.md, PROJECT_CONTEXT.md, AUDITORIA_COMPLETA.md y código actual.

- Portada: HomeSections / IndustrialSections. Jerarquía anterior dominada por reparación, fabricación y mecanizado; repetición de contenido del taller antes del suministro.
- Catálogo `/catalogo`: categorías, no inventario/SKUs. Seis líneas publicadas en cinco grupos: neumática, control eléctrico, gabinetes eléctricos, sensores, instrumentación y resistencias. Hidráulica tiene página de servicio de cilindros; no se verificó un catálogo general hidráulico.
- WhatsApp: helpers de whatsapp.ts y quote.ts → `/cotizacion` → número 18092844336. Atribución y medición de conversión existentes conservadas.
- Umami: CookielessAnalytics, CommercialTracking y quote-event. ID público y contratos sin cambios.
- Formulario: ContactForm y `/api/contacto`; no se añade otro ni se cambia su contrato. APIs de cotización, administración, Supabase y cron intactos.
- SEO: sitemap de 20 rutas, canonical por página, schema global y servicios, redirecciones heredadas. No se elimina ni cambia una URL.
- Ubicación: centralizada en constants.ts; mapas en Footer, Contacto y Nosotros. Las FAQs leen CONTACT.address. LocalBusiness global incluye calle y horarios.
- Servicios: `/servicios`, `/cilindros-neumaticos`, `/cilindros-hidraulicos`, `/mecanizado`, sellos y componentes. Se preservan páginas y contenido técnico. El modelo, materiales e interacción 3D de Cilindros se conservan. La verificación posterior detectó un fallo previo de reposo de cámara (también reproducido en la web pública); se corrigió únicamente la convergencia del FOV. Ver cilindros-fallo-preexistente.json.

## Dirección visual y comercial

1. Hero oscuro con identidad roja e IBM Plex, título solicitado, fotografía real de cilindros y dos CTA: Solicitar cotización / Explorar catálogo.
2. Categorías visibles, priorizadas y con enlaces concretos; cada cotización arrastra el nombre disponible. Sin carrusel obligatorio para descubrir productos.
3. Compras, Mantenimiento e Ingeniería; atención a manufactureras y zonas francas sin clientes ficticios.
4. Proceso de cuatro pasos con orden de compra y condiciones sujetas a cotización.
5. Ventajas comprobables y contacto por WhatsApp/correo. Taller, experiencia 3D, galería y comparador conservados después de los bloques comerciales.
6. Estilos de portada aislados, sin canvas nuevo ni animación automática. Responsive y reduced-motion del sistema vigente.

Fotografía protagonista: `/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg`, recorte existente de foto confirmada por el dueño en trabajos-taller.ts. No se presenta como inventario. Las imágenes de categoría siguen rotuladas como referencia. La misma foto se excluye de la galería de inicio para no duplicarla; el archivo original permanece intacto.

## Preparación de mudanza — INACTIVA

`src/lib/operations.ts`: location = physical y todos los servicios = current. La dirección 2158, los mapas, ambos teléfonos y los horarios siguen visibles. Ninguna nueva dirección, cierre o traslado anunciado.

El modo commercial-only sustituye la dirección pública por Santo Domingo, República Dominicana, elimina los enlaces de llegada y la calle del schema, y usa Organization sin horarios de atención presencial. Los horarios comerciales de CONTACT se conservan. Este modo está cubierto por una prueba aislada, no activado en la web.

Los estados de disponibilidad técnica son independientes de la ubicación. confirm-before-booking muestra una nota de consulta previa en las páginas técnicas, sin eliminar rutas. No equivale a anunciar cierre ni suspensión. Cualquier cambio real de prestación exige revisar también textos, FAQs y schema de servicios; no basta con cambiar un interruptor.

## Pendientes cuando exista confirmación

- Confirmar fecha efectiva, atención presencial, domicilio publicable, horarios comerciales y continuidad de cada servicio.
- Solicitar autorización HQ para publicación. Revisar páginas de servicio y sus FAQs, schema, metadatos, fotos y mensajes comerciales con la información confirmada.
- Activar solo el estado autorizado; probar footer, Contacto, Nosotros, FAQs y JSON-LD. Si hay nueva sede, actualizar la fuente central con evidencia antes de publicar.
- Google Business Profile / Maps: verificar reglas vigentes y si el negocio atiende presencialmente o en área de servicio; retirar/actualizar la dirección según el caso real, ajustar horarios y enlaces, evitar duplicados. Requiere autorización separada; no se realizaron acciones externas.
- Revisión independiente y aprobación visual. No activar campañas ni modificar Google Ads.

La venta del inmueble y la mudanza no están confirmadas. Rendimiento físico en un móvil real, operación real del backend y métricas de producción deben declararse aparte de las pruebas locales.
