/**
 * Pasarela «trabajos de nuestro taller» bajo la portada (oct-2026).
 *
 * REGLA: solo fotos y videos REALES del taller de Dynatech, con origen confirmado por el dueño.
 * Nada generado con IA, de catálogo ni de otra empresa. Pies breves, sin medidas, materiales,
 * clientes ni características que no estén confirmados. No repetir la misma imagen en la portada.
 *
 * Excluidas a propósito (19-oct-2026):
 * - antes/despues-cilindro-iso-32mm.jpg: origen sin confirmar (siguen en la sección «Antes y después»).
 * - taller-cilindros-neumaticos.jpg: origen sin confirmar (ver RealWorkPhoto.tsx).
 * - taller-reparando.jpg, taller-portada-v2.webp, cilindros-nuevos.jpg: imágenes de referencia/IA.
 *
 * Faltan (pedir al dueño): más cilindros neumáticos terminados, fabricación y reparación en proceso.
 */
export type TrabajoTaller =
  | { kind: "foto"; src: string; width: number; height: number; alt: string; caption: string }
  | { kind: "video"; src: string; poster: string; alt: string; caption: string };

export const TRABAJOS_TALLER: readonly TrabajoTaller[] = [
  {
    // Confirmada por el dueño el 15-oct-2026. El 19-oct: el cliente trajo el oxidado (derecha) y se
    // fabricaron los nuevos; medida 160 x 150 (diámetro x carrera, mm). Sin cantidad en el pie.
    kind: "foto",
    src: "/cilindros/trabajo-real-cilindros-dynatech.jpg",
    width: 960,
    height: 1280,
    alt: "Cilindros neumáticos nuevos fabricados en el taller de Dynatech junto al cilindro oxidado que sirvió de muestra",
    caption: "Antes y después: el cliente trajo el cilindro oxidado (a la derecha) y fabricamos los nuevos. 160 x 150 mm.",
  },
  {
    // Video enviado por el dueño el 19-oct-2026: «cilindro hidráulico fabricado».
    kind: "video",
    src: "/taller/cilindro-hidraulico-fabricado-video.mp4",
    poster: "/taller/cilindro-hidraulico-fabricado-poster.jpg",
    alt: "Video real del taller: cilindro hidráulico fabricado en el torno",
    caption: "Cilindro hidráulico fabricado en nuestro taller.",
  },
  {
    // Foto enviada por el dueño (15-oct); el 19-oct pidió el pie «Fabricación de eje».
    kind: "foto",
    src: "/taller/torno-eje-fresadora.jpg",
    width: 768,
    height: 1024,
    alt: "Fabricación de un eje en el torno del taller de Dynatech; al fondo, la fresadora",
    caption: "Fabricación de eje.",
  },
  {
    kind: "foto",
    src: "/taller/torno-pieza-larga-polipasto.jpg",
    width: 900,
    height: 1600,
    alt: "Cilindro hidráulico largo montado en el torno, sostenido con un polipasto en el taller de Dynatech",
    caption: "Para las piezas largas usamos el polipasto.",
  },
  {
    kind: "video",
    src: "/taller/torno-eje-video.mp4",
    poster: "/taller/torno-eje-video-poster.jpg",
    alt: "Video real del taller: cilindro hidráulico en el torno",
    caption: "Trabajo real, grabado en el taller.",
  },
];
