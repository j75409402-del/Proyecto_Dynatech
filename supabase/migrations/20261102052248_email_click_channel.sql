-- Canal del clic en whatsapp_clicks: whatsapp (filas ya existentes) o email.
-- No se aplica sola: hay que ejecutarla a mano en Supabase, después de
-- 20261102042300_whatsapp_clicks.sql. No borra ni altera quotes ni contact_messages.

alter table public.whatsapp_clicks
  add column channel text not null default 'whatsapp';

alter table public.whatsapp_clicks
  add constraint whatsapp_clicks_channel_check
  check (channel in ('whatsapp', 'email'));

comment on column public.whatsapp_clicks.channel is
  'Canal medido: whatsapp (por defecto) o email. Sin IP ni datos personales.';
