import Image from "next/image";

/**
 * Foto de un trabajo real del taller (confirmada por el dueño el 15-oct-2026).
 * Es la única imagen del sitio rotulada como «Foto real»; las demás son de referencia o de catálogo.
 * No añadir datos del cliente, plazos ni capacidades a este pie sin confirmación.
 */
export function RealWorkPhoto({ className = "", sizes = "(max-width: 767px) 100vw, 360px" }: { className?: string; sizes?: string }) {
  return (
    <figure className={`real-work-photo ${className}`}>
      <div className="real-work-frame">
        <Image
          src="/cilindros/trabajo-real-cilindros-dynatech.jpg"
          alt="Cuatro cilindros neumáticos con placa Dynatech y un cilindro usado, sobre el piso del taller"
          width={960}
          height={1280}
          sizes={sizes}
          className="h-full w-full object-cover object-[50%_62%]"
        />
        <span className="img-note is-real">Foto real · taller Dynatech</span>
      </div>
      <figcaption>Trabajo real del taller: cilindros neumáticos con placa Dynatech.</figcaption>
    </figure>
  );
}
