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
      // "Fitting" -> "Conectores neumáticos": consolidados en un solo producto maestro configurable.
      { source: "/productos/fitting-recto", destination: "/productos/conectores-neumaticos", permanent: true },
      { source: "/productos/fitting-tee", destination: "/productos/conectores-neumaticos", permanent: true },
      { source: "/productos/fitting-codo-90", destination: "/productos/conectores-neumaticos", permanent: true },
      { source: "/productos/fitting-union-recta", destination: "/productos/conectores-neumaticos", permanent: true },
      { source: "/productos/fitting-union-y", destination: "/productos/conectores-neumaticos", permanent: true },
      // Productos convertidos a configurador de variantes — slug genérico sin código de referencia.
      { source: "/productos/sensor-omron-e2e-x10me1", destination: "/productos/sensor-inductivo-omron", permanent: true },
      { source: "/productos/valvula-smc-vf3130-5dz", destination: "/productos/valvula-neumatica-smc-5-2", permanent: true },
      { source: "/productos/manguera-neumatica-pu", destination: "/productos/manguera-neumatica", permanent: true },
    ];
  },
};

export default nextConfig;
