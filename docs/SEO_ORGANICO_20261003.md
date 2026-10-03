# SEO orgánico de Dynatech — primera ejecución, 3 de octubre de 2026

## 1. Estado real y evidencia

Base de código aislada: `33e3a6b160b43830fd340c2835b709dcc7e07c1d`, conservando la analítica Umami recién conectada. No se intervino en el checkout donde el propietario realiza otros cambios. Auditoría HTTP actual de las **18 páginas del sitemap**: todas responden 200, un H1, título, descripción, canonical e instrucciones index/follow. Ver `seo-organico-20261003/produccion.json` con fecha y metadatos. Se revisaron además las fuentes del menú, categorías, servicios, cotización, robots y redirecciones históricas.

La home y las líneas comerciales ya tienen Open Graph propio. Cuatro páginas legales heredan la URL OG de inicio: prioridad baja, sin cambiar sus textos legales. La web es de suministro/servicios bajo cotización; no hay un catálogo actual de modelos, inventario, precios ni carrito. No restaurar el catálogo archivado para aparentar cobertura SEO.

El SEO técnico básico funciona. No se justifica reconstruir la web ni cambiar URLs que ya tienen visibilidad. Canonical correcto no significa que Google haya indexado una página. La herramienta de búsqueda pública devuelve páginas de Dynatech para cilindros, sensores, resistencias, hidráulicos y mecanizado; eso es evidencia de descubrimiento en esa herramienta, **no prueba de posición en Google ni de mejora causada por esta ejecución**.

## 2. Oferta real encontrada

Fuente comercial única: `src/lib/soluciones.ts` y `src/lib/servicios.ts`.

| Línea | Subcategorías actuales |
|---|---|
| Neumática (8) | Cilindros; válvulas; conexiones/conectores/fittings; FRL/reguladores; mangueras PU, nylon y PVC; accesorios (actuadores, amortiguadores, vacío, soportes, bobinas, manifolds, sensores); kits de sellos/vástagos; fabricación/reparación |
| Control eléctrico (7) | Contactores/relés/térmicos; breakers/arrancadores manuales; fusibles/portafusibles; pulsadores/selectores/pilotos; temporizadores/contadores/controladores; finales de carrera/micro switch; conectores industriales |
| Sensores (8) | Inductivos; capacitivos; fotoeléctricos/fotoceldas; magnéticos/proximidad; presión; temperatura; nivel/flujo; amplificadores/módulos/accesorios |
| Instrumentación (5) | Presión/manómetros/transmisores/interruptores; temperatura/termómetros/termopozos; flujo/caudalímetros; nivel; medición/control |
| Resistencias (4) | Cartucho; termocuplas/RTD/conectores; alambre/resistencias planas; solicitudes bajo especificación |

Servicios: fabricación, reparación, reconstrucción, bajo muestra/plano, cambio de sellos y cilindros personalizados; kits, vástagos y componentes bajo medida. Servicios complementarios confirmados: fabricar/reparar cilindros hidráulicos y mecanizado evaluado según solicitud.

**No confirmado como oferta actual:** venta de motores, gabinetes/tableros completos, programación PLC/proyectos integrales de automatización, hidráulica general, bombas y mangueras hidráulicas. No confundir una aplicación (protección de motores o componentes para tableros) con venta del equipo completo. Grado marino y ampliaciones comerciales deben reconciliarse con las decisiones vigentes antes de añadirlos a la web.

## 3. Mapa de intenciones y arquitectura

Mapa completo: `seo-organico-20261003/mapa-keywords.csv` y `.json`, **48 grupos** con variantes técnicas/comerciales, singular/plural cuando procede, República Dominicana/Santo Domingo, destino, prioridad y decisión. Las variantes son candidatos basados en la oferta, no volumen/demanda demostrada. No se inventaron volúmenes ni posiciones.

| Intención principal | Destino | Decisión |
|---|---|---|
| Proveedor/componentes neumáticos | `/neumatica` | Conservar página general y mejorar navegación |
| Cilindro neumático, tipos, a medida | `/cilindros-neumaticos` | Conservar; no duplicar página por ciudad |
| Fabricación/reparación/reconstrucción | `/servicios` y anclas del servicio | Conservar página y enriquecer con casos reales confirmados |
| Válvula/electroválvula neumática | `/valvulas-neumaticas` | Una página específica preparada con tipos ya documentados y datos para cotizar |
| FRL, conexiones, mangueras, accesorios | Secciones de `/neumatica` | Mantener ahora; páginas propias solo si hay contenido distinto y evidencia comercial |
| Controles/componentes eléctricos industriales | `/control-electrico` | Título/descripcion plural y navegación a tipos actuales |
| Sensores, fotoceldas y proximidad | `/sensores` | Conservar página comercial y sus secciones |
| Presión, temperatura, caudal y nivel | `/instrumentacion` | Conservar; enlaces cruzados y contenido comercial por aplicación |
| Resistencias/cartucho, termocuplas/RTD | `/resistencias-electricas` | Conservar; priorizar especificaciones para cotizar |
| Sellos, kits y vástagos | `/sellos-y-componentes` | Conservar página de componentes |
| Fabricación/reparación hidráulicos | `/cilindros-hidraulicos` | Conservar; no crear hidráulica general no confirmada |
| Mecanizado de pieza bajo plano/muestra | `/mecanizado` | Conservar; ampliar con casos y alcance comprobados |
| Cotización y contacto | `/cotizacion/correo`, `/contacto`, WhatsApp | Mantener contexto del componente y medir intención/solicitud |

Un fragmento `#` organiza una página y **no es una URL indexable independiente**. Las categorías amplias sirven como página principal; las páginas específicas atienden intenciones distintas. La home mantiene su prioridad comercial de cilindros neumáticos. No crear ciudades falsas, marcas nuevas ni cientos de fichas.

## 4. Consultas y competencia

Registro de ocho consultas actuales de búsqueda web: `seo-organico-20261003/busquedas.json` contiene consulta, fecha y páginas devueltas. Esta herramienta **no proporciona un ranking Google fiable**. Las consultas sin una página de Dynatech en la muestra no prueban ausencia del índice.

Muestra directa de Google, 3-oct-2026, ubicación mostrada Santo Domingo de Guzmán por IP, opción visible **“Estos resultados no están personalizados”**:

**Consulta:** `válvulas neumáticas industriales Santo Domingo`. Primeros enlaces orgánicos: 1 Lezcano `/productos/valvulas/`, 2 Aving `/neumatica-industrial/`, 3 VZ `/product-category/valvulas-de-control/`; después Garlas, MOBE Industrial, ABACO, Enercom, PLM y A&C. Dynatech no aparece en los enlaces orgánicos de la primera página observada. El bloque local mostró Minecon, TISA y Cemadom. Es una muestra fechada, no un ranking nacional permanente. La muestra personalizada previa sí incluía VZ en el bloque local, demostrando la variabilidad. No hay posiciones Google verificadas para las otras siete consultas: se interrumpió la conexión del navegador.

| Grupo | Competidores/páginas reales investigados | Relevancia probable (inferencia) y oportunidad |
|---|---|---|
| Neumática/cilindros | [Aving](https://avingsuministrosyservicios.net/neumatica-industrial/), [SYRSA servicios](https://www.syrsa.do/servicios/), [VZ cilindros](https://vzcontroles.com/product-category/cilindros/), [A&C](https://aycdominicana.com/instrumentacion-industrial/) | Cobertura de componentes o servicios específicos. Separar claramente suministro de fabricación/reparación y aportar fotos/casos propios |
| Válvulas | [VZ categoría](https://vzcontroles.com/product-category/valvulas-de-control/), [Refriabreu ficha](https://refriabreu.com/producto/electrovalvula-neumatica-5-2-1-4-h-npt-dc-24v/), [Garlas ficha](https://www.garlascontrol.com/producto/serie-63-valvula-solenoide-de-4-y-3-vias/), [Lezcano](https://www.lezcano.com.do/productos/valvulas/) | Destinos específicos, identificadores/configuraciones y cotización. Lezcano visto en Google; apertura directa falló, no se auditó su HTML. Dynatech necesita página útil propia sin inventario/modelos ficticios |
| Controles/componentes | [WR](https://www.wrautomatizaciones.com/), [Soluman](https://solumanindustrial.com/), [Grupo Komatsu categoría](https://grupokomatsu.com/index.php?controller=category&id_category=22), [CPG](https://cpgingenieria.net/) | Lenguaje comercial de controles y categorías de contactores. Mejorar el destino existente y después valorar una página de contactores con contenido verificable |
| Sensores | [Control Engineering ficha](https://ce.com.do/producto/sensor-actuador/), [Garlas](https://www.garlascontrol.com/), [Tecniventas](https://tecniventas.com/instrumentacin-industrial-y-control-de-procesos) | Tipos y aplicaciones. Facilitar referencia/alimentación/salida/fotos para obtener solicitudes calificadas, sin agregar marcas o modelos |
| Instrumentación | [Tecniventas división](https://tecniventas.com/instrumentacin-industrial-y-control-de-procesos), [Garlas](https://www.garlascontrol.com/), [INDUSERV ficha oficial](https://www.co.endress.com/es/grupo-endress-hauser/elgrupo-endresshauser/red-global-endress-hauser/RepDominicana), [GVTEC](https://www.gvtecsrl.com/) | Páginas por variables y aplicaciones. Diferenciar compra de instrumento de cursos/calibración; Dynatech no debe prometer calibración o acreditaciones |
| Resistencias/termocuplas | [VZ ficha cartucho](https://vzcontroles.com/producto/resistencia-de-cartucho-5-8-x-3-220v-270w/), VZ categoría RTD enlazada en su catálogo | Coincidencia con formato/dimensiones/voltaje/potencia. Pedir esos datos en la solicitud; no copiar disponibilidad ni precio. Garlas termorresistencias es competencia adyacente de temperatura, no prueba de fabricación de resistencias calefactoras |
| Hidráulicos/sellos | [El Mundo Hidráulico](https://elmundohidraulico.com/), [SYRSA](https://www.syrsa.do/servicios/), [Talleres Dittren](https://talleresdittren.com/), [Wimparts](https://wimpartsrd.com/servicios/) | Servicios descritos y evidencia del taller. Mejorar la confianza con trabajos reales de cilindros; no añadir bombas/cromado/pruebas no confirmados |
| Mecanizado | [Grupo Dermlun procesos](https://grupodermlungd.com/procesos), [Equiprec](https://equiprec.com/fabricaciones-y-reparaciones/), [Vigomisa](https://vigomisa.com/), [A&C](https://aycdominicana.com/) | Describen procesos y casos. Añadir a Dynatech plano/muestra, objetivo y resultado de trabajos propios, sin asumir capacidades CNC/materiales/tolerancias |

No hay evidencia para afirmar cuáles son los mayores competidores por facturación. Se excluyeron sitios de otros países y negocios de neumáticos de vehículos. Las búsquedas genéricas mezclan formación, regulación y gomas; priorizar consultas que identifican componente y necesidad industrial. Ninguna observación revela por sí sola el peso de enlaces/autoridad en el algoritmo.

## 5. Oportunidades prioritarias

1. **P1:** válvulas neumáticas: intención comercial específica y ausencia en la primera página Google observada. Preparada página diferenciada, conectada con neumática, cilindros, conexiones y FRL.
2. **P1:** controles eléctricos/contactores: mejorar lenguaje singular/plural y acceso a los repuestos reales. No dispersar relevancia hacia motores/gabinetes no confirmados.
3. **P1:** mantener captación de fabricación/reparación de cilindros con casos propios y seguimiento de solicitudes; conservar las páginas visibles y evitar canibalizarlas.
4. **P2:** instrumentación/sensores/resistencias: validar consultas por tipo y aplicación, mejorar información para cotizar. Crear subpáginas solo con evidencia y suficiente contenido distinto.
5. **P2:** consistencia de dirección completa y señales del taller; verificar número antes de publicar corrección y seguir una estrategia uniforme de reseñas reales sin incentivo ni selección de estrellas.

## 6. Cambios implementados para revisión

- Página `/valvulas-neumaticas` basada en válvulas ya ofrecidas: configuraciones documentadas, qué enviar para evaluar compatibilidad, CTA WhatsApp/correo con contexto, imagen existente, enlaces relacionados, canonical, Open Graph/Twitter, BreadcrumbList y Service.
- Enlace desde la subcategoría real de Neumática y entrada de sitemap: 18 → 19 URLs.
- Navegación de subcategorías en las cinco líneas para facilitar acceso sin cambiar sus URLs.
- Título y descripción de controles eléctricos con variante comercial plural; Open Graph y Twitter consistentes.
- Enlace de sensores de nivel/flujo hacia Instrumentación completa, en lugar de solo el bloque de flujo.
- Catálogos de datos estructurados con URLs reales de detalle/ancla; LocalBusiness con país atendido y horario publicado lunes-viernes 08:30–17:00.
- Línea base HTTP, mapa y scripts de verificación. Analítica real conservada; pruebas locales bloquean Umami para no contaminar estadísticas.

No se alteraron formularios/API, Supabase, cron, secretos, hosting, dominio, imágenes existentes, redirecciones ni prioridad de la home. Los cambios de código están en una copia aislada y **no publicados**.

## 7. SEO local y autorizaciones pendientes

Nombre legal, teléfono +1 (809) 284-4336, WhatsApp `wa.me/18092844336`, correo y horario son consistentes en el código y web actual. La web omite el número de Av. Rómulo Betancourt. En una revisión anterior del perfil se vio **2158**; no se volvió a comprobar el perfil en esta ejecución, por fallo de conexión. No se modificó la dirección. Verificar contra el perfil/ubicación real antes de publicarla.

Estado del perfil documentado previamente, **no confirmado de nuevo ahora**: categoría principal proveedor de equipos industriales, reparación hidráulica secundaria, fabricante de partes para maquinarias solicitado, servicios y WhatsApp configurados, web con UTM. Revisar aceptación de categoría pendiente, horario, servicios y enlace actual cuando la conexión funcione. No cambiar el nombre para añadir keywords ni crear sucursales.

Para autoridad local: mantener un solo NAP completo, responder reseñas auténticas y pedir reseña a clientes atendidos mediante el mismo proceso para todos, sin incentivar opiniones ni filtrar insatisfechos. Publicar fotos propias del trabajo con contexto comprobado. No enviar mensajes a clientes sin autorización para ese envío.

**Publicación pendiente de decisión del propietario:** nueva página y paquete de mejoras. `AGENTS.md` exige confirmación antes de push a main, que publica Vercel. Entregar cambios concretos, probados, en rama de revisión. Motores/gabinetes/servicios nuevos y cualquier cambio empresarial siguen pendientes de confirmar. No se requiere contratar otra herramienta ni cambiar hosting.

## 8. Pruebas

- TypeScript: correcto. ESLint: cero errores, un aviso preexistente de `postcss.config.mjs`.
- Build de producción Next.js: **Turbopack y webpack correctos**, incluida la nueva ruta estática. El primer intento Turbopack falló por el enlace local de node_modules fuera de su raíz; el intento final pasó ajustando temporalmente la raíz local al directorio padre. `next.config.mjs` se restauró exactamente al terminar, sin cambios de configuración para desplegar. Webpack produjo avisos relacionados con middleware/Edge/Supabase; Turbopack mantuvo el aviso de middleware. No se alteró ese código.
- Auditoría HTTP de la propuesta compilada: 19 rutas, todas 200, un H1 y metadatos/canonical. `seo-organico-20261003/propuesta.json`.
- `tests/commercial.test.mjs`: **57 combinaciones** de página/tamaño (390, 768, 1440), sin desbordamiento ni errores JavaScript. Canonical, títulos, descriptions y JSON-LD; redirecciones, 404, login noindex, menú móvil, contactos y formularios **con API simulada**. Evidencia en `pruebas-comerciales.json`. Admin autenticado, entrega de correo y persistencia de solicitudes reales no verificados en esta copia sin secretos.
- `tests/seo-organic.test.mjs`: **44 destinos únicos** del mapa con status/fragmentos correctos; nueva página a tres anchos, canonical e index/follow, relaciones Service/BreadcrumbList/LocalBusiness, WhatsApp/correo contextual y contenido/CTA visible sin JavaScript. Capturas `valvulas-390.png`, `valvulas-768.png`, `valvulas-1440.png` y `enlaces-verificados.json`.
- Datos estructurados parseados y referencias verificadas: no equivale a elegibilidad de resultados enriquecidos ni a una aprobación de Google Rich Results Test. Indexabilidad técnica tampoco prueba indexación actual de la nueva URL, que todavía no está publicada.
- La revisión de main al terminar mostró `45bf6ee`, con seis archivos de migraciones nuevos respecto a la base. No hay solapamiento con los archivos SEO; se conservan para la integración. No se ejecutaron migraciones ni se cambiaron datos.

## 9. Medición durante las siguientes semanas

Umami existente preservado, ID público `4bbea860-f2e7-4268-9476-190563eeab0a`; no se añadió otro colector. La auditoría de HTML confirmó su configuración en producción, **no entrega de eventos ni cifras actuales del panel**. Eventos actuales: `whatsapp_click`, `phone_click`, `email_click`, `quote_form_open`, `generate_lead`. Clic de WhatsApp es intención, no conversación/venta. `generate_lead` indica respuesta aceptada del formulario, no cierre comercial.

Search Console: propiedad de dominio disponible en una revisión previa; **informes de rendimiento y estado actual no consultados en esta ejecución**. La conexión navegador se interrumpió. Windsor.ai solicitó autorización pero no devolvió cuentas/datos; no inventar cifras ni considerar la conexión completada.

| Frecuencia/ventana | Fuente y filtro | Medida/decisión |
|---|---|---|
| Al publicar y a 7–14 días | Search Console inspección de nueva URL, canonical y sitemap | Ver descubrimiento/indexación real. Una petición de indexación no garantiza inclusión ni posición |
| Semanal, últimos 28 días contra 28 anteriores completos | Search Console, búsqueda web, país República Dominicana, consulta/página/dispositivo; separar consultas Dynatech/no marca | Impresiones, clics, CTR, posición media por grupo; no comparar ventanas de diferente duración |
| Semanal | Umami páginas de entrada/referente y eventos por ruta | Clics de WhatsApp/teléfono/correo y solicitudes de formularios; observar límites DNT/bloqueadores |
| Semanal | Seguimiento comercial autorizado de solicitudes | Conversaciones calificadas, cotizaciones emitidas, valor cotizado, ventas cerradas y línea; evita atribuir ventas desde un clic |
| 4–8 semanas de datos completos | Cruce de consultas, página y solicitudes | Mejorar páginas con impresiones y bajo CTR; ampliar tipos con demanda/solicitudes; no crear páginas por intuición únicamente |

Plantilla `seo-organico-20261003/seguimiento.csv`: vacía hasta tener datos reales. No hay aumentos de tráfico/ventas demostrados todavía. Las metas de facturación requieren medir ticket y tasa de cierre: solicitudes necesarias = meta de ventas / (ticket medio × tasa de cierre), con valores reales, no supuestos.

## 10. Próxima acción

Revisar la vista previa y publicar el paquete probado; después comprobar la nueva URL en producción y Search Console. Continuar con controles eléctricos/contactores según consultas reales y añadir casos propios de cilindros. Usar las fotos/videos suministrados solo con descripción comprobada del trabajo; no convertir una foto del torno en prueba de un tipo de cilindro/material/capacidad no confirmado.
