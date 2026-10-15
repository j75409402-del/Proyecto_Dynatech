import Image from "next/image";

/**
 * Foto de un trabajo real del taller (confirmada por el dueño el 15-oct-2026).
 * Es la única imagen del sitio rotulada como «Foto real»; las demás son de referencia o de catálogo.
 * Versión recortada (15-oct-2026): menos suelo y pared, los cinco cilindros completos y una corrección
 * suave de luz, sin retoque del contenido. El original sigue en public/cilindros/trabajo-real-cilindros-dynatech.jpg.
 * La etiqueta va fuera de la fotografía, debajo, para no tapar los cilindros.
 * No añadir datos del cliente, plazos ni capacidades a este pie sin confirmación.
 */
export function RealWorkPhoto({ className = "", sizes = "(max-width: 767px) 100vw, 520px" }: { className?: string; sizes?: string }) {
  return (
    <figure className={`real-work-photo ${className}`}>
      <div className="real-work-frame">
        <Image
          src="/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg"
          alt="Cuatro cilindros neumáticos con placa Dynatech y un cilindro usado, sobre el piso del taller"
          width={915}
          height={549}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption>
        <span className="real-work-label">Foto real · taller Dynatech</span>
        <span className="block">Trabajo real del taller: cilindros neumáticos con placa Dynatech.</span>
      </figcaption>
    </figure>
  );
}
