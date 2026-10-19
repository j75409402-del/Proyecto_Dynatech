/**
 * Pasarela «Cilindros neumáticos: trabajos de nuestro taller» (portada, oct-2026).
 *
 * REGLA: solo fotografías REALES del taller de Dynatech, con origen confirmado por el dueño.
 * Nada generado con IA, de catálogo ni de otra empresa. Pies breves, sin medidas, materiales,
 * clientes ni características que no estén confirmados.
 *
 * Excluidas a propósito (19-oct-2026):
 * - antes/despues-cilindro-iso-32mm.jpg: origen sin confirmar (siguen en la sección «Antes y después»).
 * - taller-cilindros-neumaticos.jpg: origen sin confirmar (ver RealWorkPhoto.tsx).
 * - taller-reparando.jpg, taller-portada-v2.webp, cilindros-nuevos.jpg: imágenes de referencia/IA.
 *
 * Fotos que faltan para completar la pasarela (pedirlas al dueño):
 * cilindros terminados (de cerca, con buena luz), fabricación en proceso, reparación
 * (desarme, cambio de sellos, prueba) y antes/después del MISMO cilindro.
 *
 * `src` es la versión de la pasarela (recortada); `full` es la foto original que se abre al ampliar.
 */
export type TrabajoNeumatico = {
  src: string;
  width: number;
  height: number;
  full: string;
  fullWidth: number;
  fullHeight: number;
  alt: string;
  caption: string;
};

export const TRABAJOS_NEUMATICOS: readonly TrabajoNeumatico[] = [
  {
    // Confirmada por el dueño el 15-oct-2026. El 19-oct indicó: el de la derecha (oxidado) fue la muestra
    // para fabricar cilindros nuevos; medida 160 x 150 (diámetro x carrera, mm). Sin cantidad en el pie (dijo «tres»; la foto muestra cuatro).
    src: "/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg",
    width: 915,
    height: 549,
    full: "/cilindros/trabajo-real-cilindros-dynatech.jpg",
    fullWidth: 960,
    fullHeight: 1280,
    alt: "Cilindros neumáticos nuevos fabricados en el taller de Dynatech junto al cilindro oxidado que sirvió de muestra",
    caption: "A la derecha, el cilindro oxidado que nos dieron de muestra; a la izquierda, los nuevos que fabricamos. 160 x 150 mm.",
  },
];
