-- =====================================================================
-- Dynatech Ingeniería SRL - Schema inicial
-- Catálogo B2B industrial: neumática, automatización, instrumentación
-- =====================================================================

-- Extensiones
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- búsqueda fuzzy en nombres/SKUs

-- =====================================================================
-- CATEGORÍAS (jerárquicas: familia > subcategoría)
-- =====================================================================
create table public.categories (
    id           uuid primary key default uuid_generate_v4(),
    slug         text unique not null,
    name         text not null,
    description  text,
    icon         text, -- nombre de ícono lucide-react
    image_url    text,
    parent_id    uuid references public.categories(id) on delete set null,
    sort_order   int  default 0,
    featured     boolean default false,
    created_at   timestamptz default now(),
    updated_at   timestamptz default now()
);

create index categories_parent_idx on public.categories(parent_id);
create index categories_slug_idx   on public.categories(slug);

-- =====================================================================
-- MARCAS (Festo, SMC, Siemens, etc.)
-- =====================================================================
create table public.brands (
    id           uuid primary key default uuid_generate_v4(),
    slug         text unique not null,
    name         text not null,
    description  text,
    logo_url     text,
    website      text,
    country      text,
    featured     boolean default false,
    sort_order   int default 0,
    created_at   timestamptz default now()
);

create index brands_slug_idx on public.brands(slug);

-- =====================================================================
-- PRODUCTOS
-- specs jsonb permite fichas técnicas flexibles por categoría
-- ej: { "presion_max": "10 bar", "conexion": "1/4 NPT", "material": "aluminio" }
-- =====================================================================
create table public.products (
    id              uuid primary key default uuid_generate_v4(),
    sku             text unique not null,
    slug            text unique not null,
    name            text not null,
    short_desc      text,
    description     text,
    category_id     uuid references public.categories(id) on delete set null,
    brand_id        uuid references public.brands(id) on delete set null,
    images          text[] default '{}',
    thumbnail_url   text,
    specs           jsonb default '{}'::jsonb, -- ficha técnica flexible
    datasheet_url   text, -- PDF de la marca
    price           numeric(12, 2), -- opcional, muchos B2B no publican precio
    price_visible   boolean default false,
    currency        text default 'DOP',
    stock_status    text default 'consultar' check (stock_status in ('en_stock', 'bajo_pedido', 'consultar', 'agotado')),
    lead_time_days  int,
    min_order_qty   int default 1,
    active          boolean default true,
    featured        boolean default false,
    search_tags     text, -- palabras clave adicionales pa' búsqueda
    created_at      timestamptz default now(),
    updated_at      timestamptz default now()
);

create index products_category_idx  on public.products(category_id);
create index products_brand_idx     on public.products(brand_id);
create index products_slug_idx      on public.products(slug);
create index products_sku_idx       on public.products(sku);
create index products_active_idx    on public.products(active) where active = true;
create index products_featured_idx  on public.products(featured) where featured = true;
create index products_specs_idx     on public.products using gin(specs);
-- Índice trigram pa' búsqueda por SKU y nombre
create index products_name_trgm_idx on public.products using gin(name gin_trgm_ops);
create index products_sku_trgm_idx  on public.products using gin(sku gin_trgm_ops);

-- =====================================================================
-- COTIZACIONES (leads del formulario o del botón WhatsApp)
-- =====================================================================
create table public.quotes (
    id              uuid primary key default uuid_generate_v4(),
    quote_number    text unique not null default ('COT-' || to_char(now(), 'YYYYMMDD') || '-' || substr(uuid_generate_v4()::text, 1, 6)),
    -- Cliente
    company_name    text not null,
    contact_name    text not null,
    email           text not null,
    phone           text not null,
    rnc             text, -- Registro Nacional Contribuyente (DR)
    city            text,
    -- Contenido
    items           jsonb not null default '[]'::jsonb,
    -- ej: [{ "product_id": "...", "sku": "...", "name": "...", "quantity": 5, "notes": "..." }]
    message         text,
    -- Estado
    status          text default 'nuevo' check (status in ('nuevo', 'en_revision', 'enviada', 'cerrada_ganada', 'cerrada_perdida')),
    source          text default 'web' check (source in ('web', 'whatsapp', 'email', 'telefono', 'presencial')),
    assigned_to     text, -- email del vendedor
    internal_notes  text,
    created_at      timestamptz default now(),
    updated_at      timestamptz default now()
);

create index quotes_status_idx  on public.quotes(status);
create index quotes_email_idx   on public.quotes(email);
create index quotes_created_idx on public.quotes(created_at desc);

-- =====================================================================
-- MENSAJES DE CONTACTO (formulario general, no cotización)
-- =====================================================================
create table public.contact_messages (
    id           uuid primary key default uuid_generate_v4(),
    name         text not null,
    email        text not null,
    phone        text,
    company      text,
    subject      text,
    message      text not null,
    handled      boolean default false,
    created_at   timestamptz default now()
);

create index contact_messages_created_idx on public.contact_messages(created_at desc);

-- =====================================================================
-- TRIGGERS pa' updated_at
-- =====================================================================
create or replace function public.trigger_set_timestamp()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_timestamp_categories before update on public.categories
    for each row execute function public.trigger_set_timestamp();
create trigger set_timestamp_products before update on public.products
    for each row execute function public.trigger_set_timestamp();
create trigger set_timestamp_quotes before update on public.quotes
    for each row execute function public.trigger_set_timestamp();

-- =====================================================================
-- ROW LEVEL SECURITY
-- Público: lee catálogo (categorías, marcas, productos activos)
-- Público: inserta cotizaciones y mensajes de contacto
-- Solo admin (service_role) puede modificar catálogo o leer leads
-- =====================================================================
alter table public.categories       enable row level security;
alter table public.brands           enable row level security;
alter table public.products         enable row level security;
alter table public.quotes           enable row level security;
alter table public.contact_messages enable row level security;

-- Catálogo público (solo SELECT)
create policy "categorias visibles al publico"
    on public.categories for select
    using (true);

create policy "marcas visibles al publico"
    on public.brands for select
    using (true);

create policy "productos activos visibles al publico"
    on public.products for select
    using (active = true);

-- Cotizaciones: cualquiera puede insertar, solo staff puede leer
create policy "cualquiera puede solicitar cotizacion"
    on public.quotes for insert
    with check (true);

-- Mensajes de contacto: cualquiera puede insertar
create policy "cualquiera puede enviar mensaje"
    on public.contact_messages for insert
    with check (true);

-- Nota: SELECT / UPDATE / DELETE en quotes y contact_messages solo via service_role
--       (bypass RLS automático). Pa' un admin panel autenticado, agrega policies
--       basadas en auth.uid() aquí.
