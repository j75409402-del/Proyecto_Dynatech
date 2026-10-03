-- Public forms write through the existing validated server API using service_role.
-- No lead rows, WhatsApp objects, catalog policies or bucket visibility are changed.
drop policy if exists "cualquiera puede solicitar cotizacion" on public.quotes;
drop policy if exists "cualquiera puede enviar mensaje" on public.contact_messages;
revoke all on table public.quotes, public.contact_messages from public, anon, authenticated;
grant select, insert, update, delete on table public.quotes, public.contact_messages to service_role;
-- Fix mutable search_path without changing trigger code or its bindings.
alter function public.trigger_set_timestamp() set search_path = pg_catalog;
