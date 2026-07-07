<<<<<<< HEAD
# Dynatech Ingeniería — Catálogo Web

Plataforma B2B para catálogo industrial de Dynatech Ingeniería SRL.
Neumática, automatización, instrumentación, sensores y materiales industriales para el mercado dominicano.

**Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + Supabase (Postgres + RLS) + Vercel.

---

## 1. Setup rápido

```bash
# Instalar deps
npm install

# Copiar variables de entorno
cp .env.example .env.local
# → completa las variables (ver sección 3)

# Levantar dev server
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## 2. Supabase

### 2.1 Crear el proyecto

1. Crea un proyecto nuevo en [supabase.com](https://supabase.com/dashboard) (región: `us-east-1` para latencia baja desde DR).
2. Guarda de una vez: `Project URL`, `anon key` y `service_role key` — van al `.env.local`.

### 2.2 Aplicar schema + seed

**Opción A — Dashboard (más rápido para arrancar):**
- Ve a `SQL Editor` en el dashboard.
- Pega el contenido de `supabase/migrations/20260704000000_initial_schema.sql` → Run.
- Pega el contenido de `supabase/seed.sql` → Run.

**Opción B — CLI de Supabase (recomendada a mediano plazo):**
```bash
# Instala CLI si no la tienes
npm i -g supabase

# Loguea y linkea el proyecto
supabase login
supabase link --project-ref TU_PROJECT_REF

# Aplica migración y seed
supabase db push
npm run db:seed
```

### 2.3 Regenerar los tipos de TypeScript

Los tipos en `src/types/database.types.ts` son un stub inicial. Cuando modifiques el schema, regéneralos:

```bash
# Contra el proyecto remoto
supabase gen types typescript --project-id TU_PROJECT_REF > src/types/database.types.ts

# O contra el schema local (si usas supabase start)
npm run db:types
```

### 2.4 Storage (imágenes de productos)

En el dashboard de Supabase:
1. `Storage` → crear bucket `products` (público).
2. `Storage` → crear bucket `brands` (público).
3. Sube las imágenes y usa la URL pública en el campo `images[]` / `thumbnail_url` de cada producto.

---

## 3. Variables de entorno

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...          # server-only, NUNCA exponer

# Contacto (visibles en la web)
NEXT_PUBLIC_WHATSAPP_NUMBER=1809XXXXXXX      # sin + ni espacios
NEXT_PUBLIC_CONTACT_EMAIL=ventas@dynatech.do
NEXT_PUBLIC_CONTACT_PHONE=+1 (809) XXX-XXXX
NEXT_PUBLIC_SITE_URL=https://dynatech.do

# Webhooks opcionales (n8n / Slack / Discord)
QUOTE_WEBHOOK_URL=                            # se dispara cuando entra una cotización
CONTACT_WEBHOOK_URL=                          # se dispara cuando entra un mensaje
```

---

## 4. Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                    → Home (Hero + Categorías + Productos destacados + Marcas)
│   ├── productos/                  → Catálogo con filtros
│   ├── productos/[slug]/           → Detalle de producto + botón cotizar
│   ├── categorias/[slug]/          → Página de categoría
│   ├── marcas/[slug]/              → Página de marca
│   ├── cotizacion/                 → Formulario de cotización (multi-ítem)
│   ├── contacto/                   → Contacto + formulario
│   ├── nosotros/                   → Empresa
│   └── api/
│       ├── cotizacion/route.ts     → POST → inserta en `quotes` + webhook
│       └── contacto/route.ts       → POST → inserta en `contact_messages` + webhook
├── components/
│   ├── layout/     → Navbar, Footer, WhatsAppFab
│   ├── home/       → Hero, FeaturedCategories, FeaturedProducts, BrandsMarquee, ValueProps
│   ├── product/    → ProductCard, SpecTable, ProductFilters, QuoteButton
│   ├── forms/      → QuoteForm, ContactForm  (react-hook-form + zod)
│   └── ui/         → Input, Textarea, Label
├── lib/
│   ├── supabase/   → Clientes browser (RLS) y server (RLS + service)
│   ├── constants.ts, utils.ts, whatsapp.ts
└── types/
    ├── database.types.ts   → Tipos generados por Supabase CLI
    └── index.ts            → Tipos de dominio (Product, Category, Quote, etc.)

supabase/
├── migrations/     → Schema + índices + RLS + triggers
└── seed.sql        → Categorías, marcas y 6 productos de ejemplo
```

---

## 5. Modelo de datos

- **categories** — jerárquico (parent_id). Incluye categorías destacadas para la home.
- **brands** — Festo, SMC, Siemens, Schneider, Parker, Omron, WIKA, E+H (con seed).
- **products** — SKU, slug, precio opcional, `specs` como JSONB, `stock_status`, imágenes, tags de búsqueda.
- **quotes** — cotizaciones entrantes; `quote_number` auto-generado (`COT-YYYYMMDD-xxxxxx`).
- **contact_messages** — mensajes del formulario de contacto.

**RLS activo:**
- Lectura pública en `categories`, `brands`, `products` (solo `active = true`).
- Inserción pública en `quotes` y `contact_messages`.
- Cero acceso público a lectura/edición de leads — solo `service_role` desde el backend.

---

## 6. Deploy a Vercel

```bash
# Push a un repo de GitHub primero
git init
git add .
git commit -m "feat: initial catalog"
git branch -M main
git remote add origin git@github.com:dynatech-do/web.git
git push -u origin main
```

En [vercel.com](https://vercel.com):
1. `Add New Project` → importa el repo.
2. **Environment Variables:** copia todas las del `.env.local` (marca `SUPABASE_SERVICE_ROLE_KEY` como sensible).
3. Deploy.
4. `Domains` → agrega `dynatech.do` y `www.dynatech.do`.
5. En tu registrador DNS: apunta el `A` al IP de Vercel o `CNAME` a `cname.vercel-dns.com`.

---

## 7. Checklist post-launch

- [ ] Reemplazar el RNC placeholder en `Footer.tsx` por el real.
- [ ] Colocar el logo real en `/public/logo.svg` (y favicon en `/public/favicon.ico`).
- [ ] Subir imágenes reales de productos al bucket `products` de Supabase Storage y actualizar `thumbnail_url` / `images[]`.
- [ ] Subir logos reales de marcas al bucket `brands` y actualizar `logo_url`.
- [ ] Ajustar los metadatos SEO en `src/app/layout.tsx` (title, description, OG image).
- [ ] Configurar el número real de WhatsApp Business en `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- [ ] Conectar el webhook de n8n para cotizaciones (`QUOTE_WEBHOOK_URL`) — dispara notificación a WhatsApp/Slack.
- [ ] Google Search Console + sitemap (`next-sitemap` recomendado).
- [ ] Google Business Profile enlazado al dominio.
- [ ] Meta Pixel + Google Analytics 4 (agrégalos en `layout.tsx` con `next/script`).
- [ ] Panel admin para gestionar productos y ver leads (fase 2 — o usa el dashboard de Supabase directo).

---

## 8. Scripts disponibles

```bash
npm run dev         # Dev server con Turbopack
npm run build       # Build de producción
npm run start       # Servir el build
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run db:types    # Regenera tipos desde el schema local
npm run db:reset    # Resetea la BD local (¡destructivo!)
npm run db:seed     # Ejecuta seed.sql contra la BD linkeada
```

---

## 9. Notas de diseño

- **Paleta:** carbón (`#0E1116`) + rojo señal (`#E4002B`) + acero + un toque de amarillo hazard para estados de advertencia.
- **Tipografía:** Space Grotesk (display) + Inter (body) + JetBrains Mono (SKUs, specs).
- **Radios:** mínimos (2–4px) → estética industrial, no SaaS genérico.
- **Signature:** las tarjetas de producto simulan un datasheet técnico (corner brackets, spec table monoespaciada, pill de SKU).

Todo el sistema visual está en `tailwind.config.ts` + `src/app/globals.css`. Toca eso primero antes de ir componente por componente.

---

## 10. Preguntas frecuentes

**¿Cómo agrego un producto nuevo?**
Por ahora: dashboard de Supabase → `Table Editor` → `products` → `Insert row`. En fase 2 armamos un CMS interno.

**¿Cómo veo las cotizaciones que entran?**
Dashboard de Supabase → `Table Editor` → `quotes`. Filtra por `status = 'nuevo'`. Cuando conectes el webhook, además te llega notificación a n8n/WhatsApp.

**¿Por qué los precios están ocultos por defecto?**
En B2B industrial el precio depende de volumen, plazo y proyecto — mejor pedir cotización que quemar margen mostrando lista pública. Cada producto tiene `price_visible` (bool) por si quieres mostrar precio en algunos SKU específicos.

---

Made for Dynatech Ingeniería SRL · Santo Domingo, RD
=======
# Proyecto_Dynatech
>>>>>>> dd78708ada92792c1effec289a8a34274e3aeb4f
