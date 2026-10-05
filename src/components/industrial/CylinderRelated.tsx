import { Cog, Droplets, Wrench } from "lucide-react";
import { RelatedGrid, type RelatedItem } from "@/components/page/Blocks";

/** Enlazado interno entre las páginas de cilindros (AP-007 / WEB-010). Cada página se excluye a sí misma. */
const PAGES: RelatedItem[] = [
  { href: "/cilindros-neumaticos", title: "Cilindros neumáticos a la medida", desc: "Tipos de cilindro y fabricación bajo plano, muestra o medidas.", image: "/products/cilindros-neumaticos.jpg", label: "Ver tipos de cilindro" },
  { href: "/servicios", title: "Reparación de cilindros", desc: "Cambio de sellos, vástagos y componentes, con prueba antes de entregar.", image: "/cilindros/despues-cilindro-iso-32mm.jpg", label: "Ver reparación de cilindros" },
  { href: "/sellos-y-componentes", title: "Sellos y componentes", desc: "Kits de sellos, vástagos y piezas para tu cilindro.", image: "/products/kit-sello-cilindro-neumatico.jpg", label: "Ver sellos y componentes" },
  { href: "/cilindros-hidraulicos", title: "Cilindros hidráulicos", desc: "Fabricación y reparación de cilindros hidráulicos.", icon: Droplets, label: "Ver cilindros hidráulicos" },
  { href: "/mecanizado", title: "Mecanizado", desc: "Piezas bajo plano o muestra.", icon: Cog, label: "Ver mecanizado" },
];

export function CylinderRelated({ current, limit = 3 }: { current: string; limit?: number }) {
  // En /cilindros-neumaticos la foto "después" ya está en el antes/después de la página: icono en su lugar.
  const items = PAGES.filter((p) => p.href !== current).slice(0, limit)
    .map((p) => (current === "/cilindros-neumaticos" && p.href === "/servicios" ? { ...p, image: undefined, icon: Wrench } : p));
  return <RelatedGrid kicker="Relacionado" title="Más sobre cilindros" id="cilindros-relacionado" items={items} />;
}
