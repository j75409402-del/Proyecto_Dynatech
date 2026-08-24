/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // Racores neumáticos -> Accesorios Neumáticos -> Fittings Neumáticos (135 referencias
      // organizadas en 13 familias).
      { source: "/categorias/conexiones-rapidas", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/accesorios-neumaticos", destination: "/categorias/fittings-neumaticos", permanent: true },
      // "Fitting" -> "Conectores neumáticos": consolidados en un solo producto maestro configurable.
      { source: "/productos/fitting-recto", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/fitting-tee", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/fitting-codo-90", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/fitting-union-recta", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/fitting-union-y", destination: "/categorias/fittings-neumaticos", permanent: true },
      // El master único "Conectores Neumáticos" se reemplazó por 29 productos, uno por tipo real.
      { source: "/productos/conectores-neumaticos", destination: "/categorias/fittings-neumaticos", permanent: true },
      // Los 29 se redujeron a 4 tipos esenciales (recto/codo/T/Y) — los otros 25 slugs redirigen
      // a la categoría, y los 4 que sobrevivieron cambiaron de slug al renombrarse.
      { source: "/productos/conector-recto-macho", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/conector-recto-hembra", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/union-reductora", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/codo-hembra", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/codo-union", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/t-reductora", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/t-macho", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/cruz", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/pasamuros", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/tapon", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/tapon-macho", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/silenciador", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/regulador-de-caudal-recto", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/regulador-de-caudal-codo", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/check-valve", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/acople-rapido-macho", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/acople-rapido-hembra", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/conector-espiral", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/conector-giratorio", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/adaptador-bsp", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/adaptador-npt", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/adaptador-macho", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/adaptador-hembra", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/conector-doble-codo", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/conector-push-in-universal", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/union-recta", destination: "/productos/conector-recto", permanent: true },
      { source: "/productos/codo-macho", destination: "/productos/codo-de-90", permanent: true },
      { source: "/productos/t-igual", destination: "/productos/conector-en-t", permanent: true },
      { source: "/productos/conector-y", destination: "/productos/conector-en-y", permanent: true },
      // Productos convertidos a configurador de variantes — slug genérico sin código de referencia.
      { source: "/productos/sensor-omron-e2e-x10me1", destination: "/productos/sensor-inductivo-omron", permanent: true },
      { source: "/productos/valvula-smc-vf3130-5dz", destination: "/productos/valvula-neumatica-smc-5-2", permanent: true },
      { source: "/productos/manguera-neumatica-pu", destination: "/productos/manguera-neumatica", permanent: true },
      { source: "/productos/cilindro-festo-adn-32-25-a-p-a", destination: "/productos/cilindro-compacto-iso-21287", permanent: true },
      // Resistencias de cartucho -> Resistencia para Máquina de Inyección de Plástico (19 -> 1 producto maestro).
      { source: "/categorias/resistencias-cartucho", destination: "/categorias/resistencias-maquinas-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-3-4x1-100w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-7-8x1-75w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-7-8x1-100w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-1-3-8x3-4-150w-240v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-1-1-2x3-4-125w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-1-1-2x3-4-125w-240v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-1-1-2x1-150w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-1-1-2x2-1-2-400w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-1-3-4x2-175w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-1-3-4x2-350w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-2x1-200w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-2x1-200w-240v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-2x3-600w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-2-1-2x1-300w-240v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-2-1-2x1-1-2-350w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-3x1-300w-120v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-3x2-300w-240v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-3x2-600w-240v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      { source: "/productos/resistencia-cartucho-3-1-2x1-350w-240v", destination: "/productos/resistencia-maquina-inyeccion-plastico", permanent: true },
      // Cilindros Neumáticos (7 productos individuales) -> Cilindros Festo (1 solo listado unificado).
      // NOTA: el slug "/categorias/cilindros-neumaticos" se reutiliza ahora para la categoría
      // agrupadora real (Cilindros Neumáticos = Festo+Bimba+American+SMC) — ya no redirige.
      { source: "/productos/cil-festo-dsnu-20-125-ppv-a-19240", destination: "/productos/cilindros-festo", permanent: true },
      { source: "/productos/cil-festo-dsnu-25-50-ppv-a-19246", destination: "/productos/cilindros-festo", permanent: true },
      { source: "/productos/cilindro-festo-dnc-4-3-5-ppv-a-178074", destination: "/productos/cilindros-festo", permanent: true },
      { source: "/productos/cilindro-festo-dsnu-50-25-ppv-a-196040", destination: "/productos/cilindros-festo", permanent: true },
      { source: "/productos/cilindro-festo-dsw-32-160-p-b-161426", destination: "/productos/cilindros-festo", permanent: true },
      { source: "/productos/cilindro-festo-advu-32-30-p-a-156535", destination: "/productos/cilindros-festo", permanent: true },
      { source: "/productos/cilindro-festo-advu-40-20-pa-156543", destination: "/productos/cilindros-festo", permanent: true },
      // R432-08/R432-10 vuelven a la tabla unificada de Válvulas Neumáticas EMC (ya no
      // tienen ficha propia).
      { source: "/productos/valvula-manual-5-3-r432-08", destination: "/categorias/valvulas-neumaticas", permanent: true },
      { source: "/productos/valvula-manual-5-3-r432-10", destination: "/categorias/valvulas-neumaticas", permanent: true },
      // "Sensores Autonics" y "Automatización Industrial Autonics" mezclaban varias familias
      // reales — se separaron en 8 productos/categorías por familia (ver tableCategories.ts).
      // NOTA: el slug "/productos/sensores-autonics" se reutiliza ahora para el producto real
      // (Inductivos+Capacitivos+Fotoeléctricos+Amplificadores Autonics fusionados) — ya no redirige.
      { source: "/productos/automatizacion-industrial-autonics", destination: "/categorias/electrica", permanent: true },
      // "Filtro RL SMC" se eliminó por completo (pedido explícito del cliente, hard delete).
      { source: "/categorias/filtro-rl-smc", destination: "/categorias/neumatica", permanent: true },
      { source: "/productos/filtro-rl-smc", destination: "/categorias/neumatica", permanent: true },
      // "Sensores para Cilindros SMC" se eliminó por completo (pedido explícito del cliente).
      { source: "/categorias/sensores-cilindros-smc", destination: "/categorias/neumatica", permanent: true },
      { source: "/productos/sensores-cilindros-smc", destination: "/categorias/neumatica", permanent: true },
      // Reorganización de Fittings Neumáticos: T's dispersas unificadas en "Unión T",
      // duplicados de Reguladores de Flujo/Bulkhead/Codos fusionados en una sola categoría.
      { source: "/categorias/tes-uniones-roscadas", destination: "/categorias/union-t", permanent: true },
      { source: "/productos/tes-uniones-roscadas", destination: "/productos/union-t", permanent: true },
      { source: "/categorias/uniones-t-smc", destination: "/categorias/union-t", permanent: true },
      { source: "/productos/uniones-t-smc", destination: "/productos/union-t", permanent: true },
      { source: "/categorias/reducciones-neumaticas", destination: "/categorias/uniones-roscadas", permanent: true },
      { source: "/productos/reducciones-neumaticas", destination: "/productos/uniones-roscadas", permanent: true },
      { source: "/categorias/reguladores-flujo-smc", destination: "/categorias/reguladores-flujo", permanent: true },
      { source: "/productos/reguladores-flujo-smc", destination: "/productos/reguladores-flujo", permanent: true },
      { source: "/categorias/bulkhead-smc", destination: "/categorias/bulkhead-neumatico", permanent: true },
      { source: "/productos/bulkhead-smc", destination: "/productos/bulkhead-neumatico", permanent: true },
      { source: "/categorias/codos-manguera", destination: "/categorias/codos-neumaticos", permanent: true },
      { source: "/productos/codos-manguera", destination: "/productos/codos-neumaticos", permanent: true },
      // "Llaves de Paso" se eliminó por completo (pedido explícito del cliente, hard delete).
      { source: "/categorias/llaves-paso-neumaticas", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/llaves-paso-neumaticas", destination: "/categorias/fittings-neumaticos", permanent: true },
      // "Herramientas y Software IFM" y "Adaptadores IFM" se eliminaron por completo
      // (pedido explícito del cliente, hard delete).
      { source: "/categorias/herramientas-software-ifm", destination: "/categorias/accesorios-sensores", permanent: true },
      { source: "/productos/herramientas-software-ifm", destination: "/categorias/accesorios-sensores", permanent: true },
      { source: "/categorias/adaptadores-ifm", destination: "/categorias/accesorios-sensores", permanent: true },
      { source: "/productos/adaptadores-ifm", destination: "/categorias/accesorios-sensores", permanent: true },
      // Inductivos, Capacitivos, Fotoeléctricos y Amplificadores Autonics se unificaron en
      // "Sensores Autonics" (un solo tile, un solo listado con separador por tipo).
      { source: "/categorias/amplificadores-autonics", destination: "/categorias/sensores-autonics", permanent: true },
      { source: "/productos/amplificadores-autonics", destination: "/categorias/sensores-autonics", permanent: true },
      { source: "/productos/sensores-inductivos-autonics", destination: "/categorias/sensores-autonics", permanent: true },
      { source: "/productos/sensores-capacitivos-autonics", destination: "/categorias/sensores-autonics", permanent: true },
      { source: "/productos/sensores-fotoelectricos-autonics", destination: "/categorias/sensores-autonics", permanent: true },
      // Inductivos IFM, Capacitivos IFM y Fotoeléctricos IFM (categorías, ya sin el Autonics
      // adentro) se unificaron en "Sensores IFM" (un solo tile, un solo listado por tipo).
      { source: "/categorias/sensores-inductivos", destination: "/categorias/sensores-ifm", permanent: true },
      { source: "/categorias/sensores-capacitivos", destination: "/categorias/sensores-ifm", permanent: true },
      { source: "/categorias/sensores-fotoelectricos", destination: "/categorias/sensores-ifm", permanent: true },
      { source: "/productos/sensores-inductivos-ifm", destination: "/categorias/sensores-ifm", permanent: true },
      { source: "/productos/sensores-capacitivos-ifm", destination: "/categorias/sensores-ifm", permanent: true },
      { source: "/productos/sensores-fotoelectricos-ifm", destination: "/categorias/sensores-ifm", permanent: true },
      // Reestructuración Tipo -> Marca del catálogo (pedido del cliente). Fittings Neumáticos:
      // 11 categorías por tipo (mezclaban EMC/PISCO/SPC/SMC/otras en el texto) -> 5 tiles por
      // marca, con "Tipo" como filtro dentro de cada una. No hay un destino único correcto por
      // slug viejo (cada tipo tenía varias marcas mezcladas), así que todos van al padre.
      { source: "/categorias/conectores-rectos", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/conectores-rectos", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/codos-neumaticos", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/codos-neumaticos", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/union-t", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/union-t", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/uniones-roscadas", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/uniones-roscadas", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/reguladores-flujo", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/reguladores-flujo", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/bulkhead-neumatico", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/bulkhead-neumatico", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/uniones-manguera", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/uniones-manguera", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/uniones-y", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/uniones-y", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/tapones-neumaticos", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/tapones-neumaticos", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/blue-cap", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/blue-cap", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/categorias/silenciadores-neumaticos", destination: "/categorias/fittings-neumaticos", permanent: true },
      { source: "/productos/silenciadores-neumaticos", destination: "/categorias/fittings-neumaticos", permanent: true },
      // Accesorios Neumáticos: 7 categorías 100% SMC (Kits de Sellos/Actuadores/Amortiguadores/
      // Generadores de Vacío/Bases y Soportes/Bobinas/Manifold) -> un solo tile "SMC".
      { source: "/categorias/kits-sello-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/productos/kits-sello-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/categorias/actuadores-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/productos/actuadores-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/categorias/amortiguadores-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/productos/amortiguadores-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/categorias/generadores-vacio-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/productos/generadores-vacio-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/categorias/bases-soportes-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/productos/bases-soportes-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/categorias/bobinas-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/productos/bobinas-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/categorias/manifold-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      { source: "/productos/manifold-smc", destination: "/categorias/accesorios-neumaticos-smc", permanent: true },
      // Válvulas de Descarga Rápida SMC y Cheque Neumático SMC se fusionaron a la tabla
      // existente de Válvulas Neumáticas SMC (nuevo campo "tipo" las distingue).
      { source: "/categorias/valvulas-descarga-rapida-smc", destination: "/categorias/valvulas-neumaticas-smc", permanent: true },
      { source: "/productos/valvulas-descarga-rapida-smc", destination: "/categorias/valvulas-neumaticas-smc", permanent: true },
      { source: "/categorias/cheque-neumatico-smc", destination: "/categorias/valvulas-neumaticas-smc", permanent: true },
      { source: "/productos/cheque-neumatico-smc", destination: "/categorias/valvulas-neumaticas-smc", permanent: true },
      // Accesorios de Sensores: Conectores/Cables/Soportes y Bases IFM -> un solo tile "IFM".
      { source: "/categorias/conectores-sensores-ifm", destination: "/categorias/accesorios-sensores-ifm", permanent: true },
      { source: "/productos/conectores-sensores-ifm", destination: "/categorias/accesorios-sensores-ifm", permanent: true },
      { source: "/categorias/cables-sensores-ifm", destination: "/categorias/accesorios-sensores-ifm", permanent: true },
      { source: "/productos/cables-sensores-ifm", destination: "/categorias/accesorios-sensores-ifm", permanent: true },
      { source: "/categorias/soportes-bases-ifm", destination: "/categorias/accesorios-sensores-ifm", permanent: true },
      { source: "/productos/soportes-bases-ifm", destination: "/categorias/accesorios-sensores-ifm", permanent: true },
      // "Presión" era un envoltorio con un solo contenido real (Interruptor de Presión) —
      // se aplanó: Interruptor de Presión y Sensores de presión pasan a ser hijos directos
      // de Instrumentación (pedido del cliente: "dice solo Presión y está mal").
      { source: "/categorias/presion", destination: "/categorias/interruptores-presion-smc", permanent: true },
    ];
  },
};

export default nextConfig;
