import Image from "next/image";

/**
 * Fotos y video reales del taller (enviados por el dueño el 15-oct-2026). Según el dueño, las
 * piezas en el torno son cilindros hidráulicos (los del piso, en la otra foto, son neumáticos).
 * Pies en lenguaje natural, sin afirmar cliente, medidas, tolerancias ni plazos.
 * El video no se reproduce solo: se abre con el botón de play.
 */
export const TALLER_FOTOS = [
  {
    src: "/taller/torno-eje-fresadora.jpg",
    width: 768,
    height: 1024,
    alt: "Cilindro hidráulico montado en el torno del taller de Dynatech; al fondo, la fresadora",
    caption: "Cilindro hidráulico en proceso.",
  },
  {
    src: "/taller/torno-pieza-larga-polipasto.jpg",
    width: 900,
    height: 1600,
    alt: "Cilindro hidráulico largo montado en el torno, sostenido con un polipasto en el taller de Dynatech",
    caption: "Para las piezas largas usamos el polipasto.",
  },
] as const;

type Src = (typeof TALLER_FOTOS)[number]["src"];

export function TallerGallery({ video = true, omitir = [] }: { video?: boolean; /** Fotos que ya están en el hero de la página. */ omitir?: Src[] }) {
  return (
    <div className="taller-gallery">
      {TALLER_FOTOS.filter((f) => !omitir.includes(f.src)).map((f) => (
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
              aria-label="Video real del taller: cilindro hidráulico en el torno"
            />
            <span className="img-note is-real is-top">Video real · taller Dynatech</span>
          </div>
          <figcaption>Trabajo real, grabado en el taller.</figcaption>
        </figure>
      )}
    </div>
  );
}
