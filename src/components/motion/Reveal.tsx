type Props = {
  children: React.ReactNode;
  className?: string;
  /** Retardo de entrada en segundos (se limita a 0.3 s en CSS para no frenar la lectura). */
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Contenedor con entrada sobria. El contenido es visible en el HTML inicial: solo
 * `RevealObserver` (en layout) marca como pendientes los bloques que están bajo el pliegue
 * y los muestra al entrar en pantalla. Sin JS o con prefers-reduced-motion no se anima nada.
 */
export function Reveal({ children, className, delay }: Props) {
  return (
    <div
      className={className}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${Math.min(delay, 0.3)}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
