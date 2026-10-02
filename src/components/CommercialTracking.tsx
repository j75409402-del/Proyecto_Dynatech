"use client";

import { useEffect } from "react";
import { trackCommercialEvent } from "@/lib/conversions";

/** Delegación: cubre también menú móvil y enlaces que aparecen tras enviar un formulario. */
export function CommercialTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const element = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(element instanceof HTMLAnchorElement)) return;
      const url = new URL(element.href, window.location.href);
      const placement = element.closest("header") ? "header" : element.closest("footer") ? "footer" : "content";
      if (url.protocol === "https:" && url.hostname === "wa.me") {
        trackCommercialEvent("whatsapp_click", "whatsapp", placement);
      } else if (url.protocol === "tel:") {
        trackCommercialEvent("phone_click", "phone", placement);
      } else if (url.protocol === "mailto:") {
        trackCommercialEvent("email_click", "email", placement);
      } else if (url.origin === window.location.origin && url.pathname === "/cotizacion/correo") {
        trackCommercialEvent("quote_form_open", "form", placement);
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
