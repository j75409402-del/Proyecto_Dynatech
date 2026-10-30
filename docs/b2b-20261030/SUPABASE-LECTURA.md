# Supabase · verificación de lectura — WEB-030

30-oct-2026. Plugin Supabase solicitado por el usuario durante la implementación.

- Cuenta Primary: proyecto hkubisdxytxogadatlif, coincide con PROJECT_CONTEXT.md. Estado devuelto por Supabase: ACTIVE_HEALTHY; PostgreSQL 17.
- La otra conexión corresponde al software financiero y no se utilizó para consultar ni modificar su base.
- Consulta de metadatos, sin leer mensajes ni cotizaciones: public.contact_messages y public.quotes existen y tienen RLS activado, sin políticas públicas. El código actual escribe mediante createServiceClient desde API routes, no desde el navegador. No se añadieron políticas ni accesos.
- No se recuperaron ni mostraron claves. No se modificaron tablas, funciones, autenticación, archivos ni registros. No se enviaron leads de prueba reales.
- La copia local no tiene variables de Supabase. El formulario se probó con respuesta API simulada y /admin devuelve 500 local por falta de configuración. Conectar el plugin permite revisar el proyecto, pero no configura por sí solo el entorno de Next.js.

## Avisos existentes del asesor (sin cambios)

- INFO: RLS sin políticas en quotes, contact_messages y dos tablas del bot. Es compatible con acceso exclusivo de servidor; no justifica abrir datos al público. [Documentación](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy).
- WARN: extensión pg_trgm en public. Revisar en tarea de seguridad independiente antes de mover dependencias. [Remediación](https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public).
- WARN: protección de contraseñas filtradas desactivada. Revisar disponibilidad y autorización antes de cambiar Auth. [Remediación](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

Se consultó el changelog vigente y la guía oficial de Next.js. No se implementaron cambios de Supabase en esta tarea. La lectura de metadatos no verifica el envío real de formularios ni reemplaza una prueba autenticada de administración.
