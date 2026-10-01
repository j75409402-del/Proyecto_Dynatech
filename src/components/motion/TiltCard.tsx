import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Se conserva por compatibilidad con las páginas actuales. */
  max?: number;
  glare?: boolean;
};

/** Envoltorio sin animación para mantener tarjetas estables y ligeras en mouse y móvil. */
export function TiltCard({ children, className }: Props) {
  return <div className={cn("group/tilt relative", className)}>{children}</div>;
}
