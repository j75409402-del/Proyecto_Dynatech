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
    // El catálogo (/productos, /categorias) se retiró al enfocar el sitio en cilindros
    // neumáticos. Todas las URLs viejas (incluidas las 151 redirecciones históricas, que vivían
    // bajo esos dos prefijos) caen en estas reglas. El orden importa: primero lo específico.
    const cilindros = "/cilindros-neumaticos";
    const sellos = "/sellos-y-componentes";
    return [
      { source: "/reparacion-cilindros-neumaticos", destination: "/servicios", permanent: true },
      { source: "/faq", destination: "/servicios#preguntas-frecuentes", permanent: true },
      { source: "/carrito", destination: "/cotizacion", permanent: true },
      { source: "/mapa-del-sitio", destination: "/", permanent: true },

      { source: "/categorias/neumatica", destination: cilindros, permanent: true },
      { source: "/categorias/:slug(cil.*)", destination: cilindros, permanent: true },
      { source: "/productos/:slug(cil.*)", destination: cilindros, permanent: true },

      { source: "/categorias/:slug(kit.*)", destination: sellos, permanent: true },
      { source: "/productos/:slug(kit.*)", destination: sellos, permanent: true },
      { source: "/categorias/:slug(accesorios-neumaticos.*)", destination: sellos, permanent: true },
      { source: "/productos/:slug(accesorios-neumaticos.*)", destination: sellos, permanent: true },

      // Líneas descontinuadas (sensores, fusibles, instrumentación, etc.) y el catálogo general.
      { source: "/productos/:path*", destination: "/", permanent: true },
      { source: "/categorias/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
