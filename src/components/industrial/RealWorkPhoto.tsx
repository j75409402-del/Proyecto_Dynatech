import Image from "next/image";

/**
 * Foto de un trabajo real del taller (confirmada por el dueño el 15-oct-2026). Pie descriptivo:
 * no afirma cómo se fabricaron los cilindros.
 * Es la única imagen del sitio rotulada como «Foto real»; las demás son de referencia o de catálogo.
 * No añadir datos del cliente, plazos ni capacidades a este pie sin confirmación.
 */
export function RealWorkPhoto({ className = "", sizes = "(max-width: 767px) 100vw, 520px" }: { className?: string; sizes?: string }) {
  return (
    <figure className={`real-work-photo ${className}`}>
      <div className="real-work-frame">
        <Image
          src="/cilindros/taller-cilindros-neumaticos.jpg"
          alt="Cuatro cilindros neumáticos y un cilindro usado, alineados sobre el piso del taller"
          width={1448}
          height={1086}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
        <span className="img-note is-real">Foto real · taller Dynatech</span>
      </div>
      <figcaption>Trabajo real del taller: cilindros neumáticos.</figcaption>
    </figure>
  );
}
