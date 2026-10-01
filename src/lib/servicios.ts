import { SOLUCIONES } from "@/lib/soluciones";
import { Factory, Wrench, RotateCcw, FileText, ShieldCheck, Ruler, PackageCheck, Settings2, type LucideIcon } from "lucide-react";

export type Oferta = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Página donde se detalla. */
  href: string;
};

/**
 * Lista comercial de Dynatech (dada por el cliente). Las descripciones salen del contenido
 * que ya estaba publicado en la página de cilindros — no agregar servicios que no estén aquí.
 */
export const SERVICIOS: Oferta[] = [
  {
    id: "fabricacion",
    icon: Factory,
    title: "Fabricación de cilindros neumáticos",
    desc: "Fabricación de cilindros completos a medida, incluso cuando el original ya no está disponible.",
    href: "/servicios#fabricacion",
  },
  {
    id: "reparacion",
    icon: Wrench,
    title: "Reparación de cilindros neumáticos",
    desc: "Diagnóstico y reparación completa, con repuesto de calidad y prueba de funcionamiento antes de la entrega.",
    href: "/servicios#reparacion",
  },
  {
    id: "reconstruccion",
    icon: RotateCcw,
    title: "Reconstrucción de cilindros",
    desc: "Desarme completo, reemplazo de los componentes dañados, ensamblaje con las tolerancias correctas y prueba.",
    href: "/servicios#reconstruccion",
  },
  {
    id: "bajo-muestra-o-plano",
    icon: FileText,
    title: "Fabricación bajo muestra o plano",
    desc: "Fabricamos a partir de una muestra física o de tus especificaciones técnicas.",
    href: "/servicios#bajo-muestra-o-plano",
  },
  {
    id: "cambio-de-sellos",
    icon: ShieldCheck,
    title: "Cambio de sellos",
    desc: "Reemplazo de sellos por repuesto de calidad para eliminar fugas de aire.",
    href: "/servicios#cambio-de-sellos",
  },
  {
    id: "personalizados",
    icon: Settings2,
    title: "Cilindros neumáticos personalizados",
    desc: "Cilindros fabricados según las medidas y especificaciones de tu aplicación.",
    href: "/servicios#personalizados",
  },
];

export const COMPONENTES: Oferta[] = [
  {
    id: "kits-de-sellos",
    icon: PackageCheck,
    title: "Kits de sellos",
    desc: "Kits de sellos para la reparación y el mantenimiento de cilindros neumáticos.",
    href: "/sellos-y-componentes#kits-de-sellos",
  },
  {
    id: "vastagos",
    icon: Ruler,
    title: "Vástagos y barras cromadas",
    desc: "Vástagos cromados fabricados a medida, con el acabado y la tolerancia del original.",
    href: "/sellos-y-componentes#vastagos",
  },
];

/** Opciones del formulario de cotización, agrupadas (mismo orden que la oferta comercial). */
export const GRUPOS_DE_SOLICITUD = [
  {
    label: "Cilindros neumáticos",
    options: [
      ...SERVICIOS.map((s) => s.title),
      ...COMPONENTES.map((c) => c.title),
      "Componentes bajo medida (camisa, tapa, pistón)",
    ],
  },
  { label: "Soluciones industriales", options: SOLUCIONES.map((s) => s.name) },
];

export const TIPOS_DE_SOLICITUD: readonly string[] = [
  ...GRUPOS_DE_SOLICITUD.flatMap((g) => g.options),
  "Otro",
];
