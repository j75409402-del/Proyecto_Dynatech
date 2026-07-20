-- Parte 2: cantidad real de stock (reemplaza min_order_qty/"consultar" en la UI pública) y
-- sistema de variantes (una ficha de producto con varias medidas/roscas/modelos, ej. un
-- "Fitting Tee" con varias combinaciones tubo/rosca en vez de una página por SKU).

alter table public.products
    add column if not exists stock_quantity integer;

comment on column public.products.stock_quantity is
    'Cantidad física disponible. NULL = no trackeada (se muestra "disponible bajo pedido"). 0 = agotado.';

create table public.product_variants (
    id           uuid primary key default gen_random_uuid(),
    product_id   uuid not null references public.products(id) on delete cascade,
    sku          text not null unique,
    label        text not null,                 -- ej. "1/4" NPT"
    attributes   jsonb not null default '{}',    -- ej. {"medida": "8mm", "rosca": "1/4\" NPT"}
    stock_status text not null default 'consultar',
    stock_quantity integer,
    price        numeric,
    weight_kg    numeric,
    sort_order   integer not null default 0,
    active       boolean not null default true,
    created_at   timestamptz not null default now(),
    updated_at   timestamptz not null default now()
);

create index product_variants_product_id_idx on public.product_variants(product_id);

alter table public.product_variants enable row level security;

create policy "variantes visibles al publico"
    on public.product_variants for select
    using (active = true);

-- Adjuntos de cotización: bucket público "cotizacion-adjuntos" ya creado vía Storage API
-- (no requiere esta migración). Las subidas pasan por /api/upload-adjunto con service_role,
-- así que no hace falta política de INSERT anónima sobre el bucket.
