import Image from "next/image";

/**
 * Fotos y video reales del taller (enviados por el dueño el 15-oct-2026). Pies descriptivos:
 * dicen qué se ve, sin afirmar cliente, plazo, medidas ni tolerancias.
 * El video no se reproduce solo (sin animación que distraiga): se abre con el botón de play.
 */
export const TALLER_FOTOS = [
  {
    src: "/taller/torno-eje-fresadora.jpg",
    width: 768,
    height: 1024,
    alt: "Eje largo montado en el torno del taller de Dynatech; al fondo, la fresadora",
    caption: "Eje en el torno del taller. Al fondo, la fresadora.",
  },
  {
    src: "/taller/torno-pieza-larga-polipasto.jpg",
    width: 900,
    height: 1600,
    alt: "Pieza de gran longitud montada en el torno, sostenida con un polipasto en el taller de Dynatech",
    caption: "Pieza larga en el torno, con polipasto para manejarla.",
  },
] as const;

export function TallerGallery({ video = true, desde = 0 }: { video?: boolean; /** Omite las primeras fotos (p. ej. si ya están en el hero). */ desde?: number }) {
  return (
    <div className="taller-gallery">
      {TALLER_FOTOS.slice(desde).map((f) => (
        <figure key={f.src}>
          <div className="taller-gallery-frame">
            <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="(max-width: 767px) 100vw, 33vw" className="h-full w-full object-cover" />
            <span className="img-note is-real">Foto real · taller Dynatech</span>
          </div>
          <figcaption>{f.caption}</figcaption>
        </figure>
      ))}
      {video && (
        <figure>
          <div className="taller-gallery-frame">
            <video
              src="/taller/torno-eje-video.mp4"
              poster="/taller/torno-eje-video-poster.jpg"
              controls
              playsInline
              muted
              preload="none"
              width={480}
              height={848}
              className="h-full w-full object-cover"
              aria-label="Video real del taller: eje girando en el torno"
            />
            <span className="img-note is-real is-top">Video real · taller Dynatech</span>
          </div>
          <figcaption>Eje girando en el torno del taller (26 s, sin sonido).</figcaption>
        </figure>
      )}
    </div>
  );
}
