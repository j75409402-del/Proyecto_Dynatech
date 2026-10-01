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
    // El catálogo de SKUs (/productos, /categorias) se retiró el 30-sep-2026; desde el
    // 1-oct-2026 las líneas viven en páginas propias (/neumatica, /sensores, etc.). Todas las URLs viejas (incluidas las 151 redirecciones históricas, que vivían
    // bajo esos dos prefijos) caen en estas reglas. El orden importa: primero lo específico.
    const cilindros = "/cilindros-neumaticos";
    const sellos = "/sellos-y-componentes";
    return [
      { source: "/reparacion-cilindros-neumaticos", destination: "/servicios", permanent: true },
      { source: "/faq", destination: "/servicios#preguntas-frecuentes", permanent: true },
      { source: "/carrito", destination: "/cotizacion", permanent: true },
      { source: "/mapa-del-sitio", destination: "/", permanent: true },

      { source: "/categorias/:slug(cil.*)", destination: cilindros, permanent: true },
      { source: "/productos/:slug(cil.*)", destination: cilindros, permanent: true },

      { source: "/categorias/:slug(kit.*)", destination: sellos, permanent: true },
      { source: "/productos/:slug(kit.*)", destination: sellos, permanent: true },
      { source: "/categorias/:slug(accesorios-neumaticos.*)", destination: sellos, permanent: true },
      { source: "/productos/:slug(accesorios-neumaticos.*)", destination: sellos, permanent: true },

      // Líneas industriales (1-oct-2026): las URLs viejas de cada línea van a su página nueva.
      { source: "/categorias/:slug(neumatica|valvula.*|fitting.*|unidades-frl.*|manguera.*|conexiones-rapidas|racor.*|conector-neumatico.*|conectores-neumaticos.*|manifold.*|amortiguador.*|actuador.*|generador.*|bobina.*|silenciador.*|tapon.*)", destination: "/neumatica", permanent: true },
      { source: "/productos/:slug(neumatica|valvula.*|fitting.*|unidades-frl.*|manguera.*|conexiones-rapidas|racor.*|conector-neumatico.*|conectores-neumaticos.*|manifold.*|amortiguador.*|actuador.*|generador.*|bobina.*|silenciador.*|tapon.*)", destination: "/neumatica", permanent: true },
      { source: "/categorias/:slug(electrica|controles-electricos|control-electrico|rele.*|breaker.*|contactor.*|pulsador.*|temporizador.*|contador.*|luces-piloto.*|controladores-temperatura.*|conectores-industriales.*|arrancador.*|unidades-termicas.*|finales-de-carrera.*|fusible.*|bases-para-fusibles.*|accesorios-para-fusibles)", destination: "/control-electrico", permanent: true },
      { source: "/productos/:slug(electrica|controles-electricos|control-electrico|rele.*|breaker.*|contactor.*|pulsador.*|temporizador.*|contador.*|luces-piloto.*|controladores-temperatura.*|conectores-industriales.*|arrancador.*|unidades-termicas.*|finales-de-carrera.*|fusible.*|bases-para-fusibles.*|accesorios-para-fusibles)", destination: "/control-electrico", permanent: true },
      { source: "/categorias/:slug(sensor.*|fotocelda.*|modulos-amplificadores.*|amplificador.*|accesorios-sensores.*)", destination: "/sensores", permanent: true },
      { source: "/productos/:slug(sensor.*|fotocelda.*|modulos-amplificadores.*|amplificador.*|accesorios-sensores.*)", destination: "/sensores", permanent: true },
      { source: "/categorias/:slug(instrumentacion|interruptor.*|temperatura.*|termometro.*|flujo|transmisor.*|manometro.*|presion)", destination: "/instrumentacion", permanent: true },
      { source: "/productos/:slug(instrumentacion|interruptor.*|temperatura.*|termometro.*|flujo|transmisor.*|manometro.*|presion)", destination: "/instrumentacion", permanent: true },
      { source: "/categorias/:slug(resistencia.*|termocupla.*|alambre.*|materiales)", destination: "/resistencias-electricas", permanent: true },
      { source: "/productos/:slug(resistencia.*|termocupla.*|alambre.*|materiales)", destination: "/resistencias-electricas", permanent: true },

      // Cualquier otra URL del catálogo general.
      { source: "/productos/:path*", destination: "/", permanent: true },
      { source: "/categorias/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
