import Image from "next/image";

/**
 * Foto de un trabajo real del taller (confirmada por el dueño el 15-oct-2026). Pie descriptivo:
 * no afirma cómo se fabricaron los cilindros.
 * Es la única imagen del sitio rotulada como «Foto real»; las demás son de referencia o de catálogo.
 * Versión recortada de la FOTO ORIGINAL (15-oct-2026): menos suelo y pared, los cinco cilindros completos
 * y una corrección suave de luz, sin retoque del contenido. Original: public/cilindros/trabajo-real-cilindros-dynatech.jpg.
 * public/cilindros/taller-cilindros-neumaticos.jpg queda sin usar hasta que el dueño confirme su origen:
 * sus placas «DYNATECH» salen ilegibles y la pared y el suelo no coinciden con el original, así que no
 * debe rotularse «Foto real» sin esa confirmación.
 * La etiqueta va fuera de la fotografía, debajo, para no tapar los cilindros.
 * No añadir datos del cliente, plazos ni capacidades a este pie sin confirmación.
 */
export function RealWorkPhoto({ className = "", sizes = "(max-width: 767px) 100vw, 520px" }: { className?: string; sizes?: string }) {
  return (
    <figure className={`real-work-photo ${className}`}>
      <div className="real-work-frame">
        <Image
          src="/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg"
          alt="Cuatro cilindros neumáticos y un cilindro usado, alineados sobre el piso del taller"
          width={915}
          height={549}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption>
        <span className="real-work-label">Foto real · taller Dynatech</span>
        <span className="block">Cilindros neumáticos en nuestro taller.</span>
      </figcaption>
    </figure>
  );
}
