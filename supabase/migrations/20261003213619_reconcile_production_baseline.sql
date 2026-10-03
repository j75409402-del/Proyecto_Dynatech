-- Reproduce objects and grants observed in the read-only production snapshot.
-- Historical July migrations remain unchanged. Never use this as a blind history repair.
alter table public.products add column if not exists internal_code text;
do $$ begin
  if not exists(select 1 from pg_constraint where conrelid='public.products'::regclass and conname='products_internal_code_key') then
    alter table public.products add constraint products_internal_code_key unique (internal_code);
  end if;
end $$;
-- Explicit grants make replay independent of Supabase platform default privileges.
grant all on table public.categories, public.brands, public.products, public.quotes,
 public.contact_messages, public.site_settings, public.product_variants to anon, authenticated, service_role;
grant all on table public.whatsapp_bot_deliveries, public.whatsapp_bot_sessions to service_role;
grant execute on function public.trigger_set_timestamp() to public, anon, authenticated, service_role;
-- Do not overwrite an existing production bucket or its contents/configuration.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('cotizacion-adjuntos','cotizacion-adjuntos',true,10000000,
 array['image/png','image/jpeg','image/webp','application/pdf'])
on conflict (id) do nothing;
