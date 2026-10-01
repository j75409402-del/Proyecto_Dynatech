type Props = {
  children: React.ReactNode;
  className?: string;
  /** Se conserva por compatibilidad con las llamadas actuales; el contenido ya no se oculta al hidratar. */
  delay?: number;
  y?: number;
  once?: boolean;
};

/** Contenedor estático: el contenido queda visible desde el HTML inicial y no depende de hidratación. */
export function Reveal({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
