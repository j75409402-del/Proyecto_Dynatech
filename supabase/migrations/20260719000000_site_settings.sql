-- Configuración editable desde el panel admin (catálogo PDF, contadores de la sección
-- "Estadísticas" del home) sin necesidad de tocar código ni hacer un deploy.
create table public.site_settings (
    key        text primary key,
    value      text,
    updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Lectura pública (el home necesita leerlas sin sesión); solo service_role escribe.
create policy "site_settings visibles al publico"
    on public.site_settings for select
    using (true);

insert into public.site_settings (key, value) values
    ('catalog_pdf_url', null),
    ('stat_productos', '500+'),
    ('stat_marcas', '20+'),
    ('stat_clientes', '100+'),
    ('stat_respuesta', '24h')
on conflict (key) do nothing;
