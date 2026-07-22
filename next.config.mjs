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
      { source: "/productos/fitting-recto", destination: "/categorias/conexiones-rapidas", permanent: true },
      { source: "/productos/fitting-tee", destination: "/categorias/conexiones-rapidas", permanent: true },
      { source: "/productos/fitting-codo-90", destination: "/categorias/conexiones-rapidas", permanent: true },
      { source: "/productos/fitting-union-recta", destination: "/categorias/conexiones-rapidas", permanent: true },
      { source: "/productos/fitting-union-y", destination: "/categorias/conexiones-rapidas", permanent: true },
      // El master único "Conectores Neumáticos" se reemplazó por 29 productos, uno por tipo real.
      { source: "/productos/conectores-neumaticos", destination: "/categorias/conexiones-rapidas", permanent: true },
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
    ];
  },
};

export default nextConfig;
