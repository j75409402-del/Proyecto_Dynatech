"use client";

/**
 * Antes (WEB-010): ocultaba los bloques bajo el pliegue y los mostraba al entrar en pantalla.
 * Oct-2026 (pedido del dueño: sin animaciones decorativas que distraigan o ralenticen): se
 * desactiva. Con desplazamientos rápidos o saltos a un ancla (#datos, #catalogo) dejaba
 * secciones en blanco. `Reveal` sigue como contenedor y el contenido se ve siempre.
 */
export function RevealObserver() {
  return null;
}
