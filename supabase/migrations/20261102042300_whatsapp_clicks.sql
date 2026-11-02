-- Clics de /cotizacion hacia WhatsApp. Sin IP ni datos personales.
-- No se aplica sola: hay que ejecutarla a mano en Supabase. No borra ni altera quotes ni contact_messages.
-- RLS activo. anon y authenticated no leen ni escriben. Solo service_role inserta.

create table public.whatsapp_clicks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  item text,
  linea text,
  svc text,
  tpl text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  user_agent text,
  constraint whatsapp_clicks_item_len check (item is null or char_length(item) <= 60),
  constraint whatsapp_clicks_linea_len check (linea is null or char_length(linea) <= 60),
  constraint whatsapp_clicks_svc_len check (svc is null or char_length(svc) <= 40),
  constraint whatsapp_clicks_tpl_len check (tpl is null or char_length(tpl) <= 20),
  constraint whatsapp_clicks_source_page_len check (source_page is null or char_length(source_page) <= 120),
  constraint whatsapp_clicks_utm_source_len check (utm_source is null or char_length(utm_source) <= 80),
  constraint whatsapp_clicks_utm_medium_len check (utm_medium is null or char_length(utm_medium) <= 80),
  constraint whatsapp_clicks_utm_campaign_len check (utm_campaign is null or char_length(utm_campaign) <= 80),
  constraint whatsapp_clicks_referrer_len check (referrer is null or char_length(referrer) <= 300),
  constraint whatsapp_clicks_user_agent_len check (user_agent is null or char_length(user_agent) <= 200)
);

alter table public.whatsapp_clicks enable row level security;
alter table public.whatsapp_clicks force row level security;

revoke all on table public.whatsapp_clicks from public, anon, authenticated;
grant insert on table public.whatsapp_clicks to service_role;

comment on table public.whatsapp_clicks is
  'Clics medidos en /cotizacion. Sin columna de IP ni datos personales. Escritura solo con service_role; sin lectura pública.';
