import { Wind, Cpu, Gauge, Radar, Zap, Wrench, Package, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Wind,
  Cpu,
  Gauge,
  Radar,
  Zap,
  Wrench,
};

/** Resuelve el nombre de ícono guardado en category.icon a un componente lucide. Cae a Package si no hay match. */
export function CategoryIcon({ name, className }: { name: string | null; className?: string }) {
  const Icon = (name && ICONS[name]) || Package;
  return <Icon className={className} />;
}
