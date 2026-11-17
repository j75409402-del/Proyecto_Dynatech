"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Copy, Mail, X } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { pageLabel, siteHost } from "@/lib/correo";

/**
 * «Cotizar por correo» (17-nov-2026). Antes era solo <a href="/correo"> → 307 al mailto:
 * en una PC o un móvil sin app de correo configurada el clic no hacía nada visible.
 * Ahora abre un panel con el correo visible y copiable, el enlace a la app de correo
 * (sigue pasando por /correo, que mide el clic), Gmail, Outlook y el formulario de /contacto.
 */
export function CorreoButton({ item, className = "ta-btn-line" }: { item?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname() || "/";
  const panelId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); }
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const appHref = item ? `/correo?item=${encodeURIComponent(item)}` : "/correo";
  const label = pageLabel(pathname);
  const subject = `Cotización – ${label} (web)`;
  const body = `Hola, vengo de la página de ${label} en ${siteHost()} y quiero cotizar:${item ? ` ${item}` : ""}`;
  const to = CONTACT.email;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  async function copy() {
    try { await navigator.clipboard.writeText(to); } catch {
      const t = document.createElement("textarea"); t.value = to; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch { /* sin portapapeles: el correo queda visible */ }
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span ref={wrapRef} className="ta-correo">
      <button type="button" className={className} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
        <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
        Cotizar por correo
      </button>
      {open && (
        <span id={panelId} role="dialog" aria-label="Cotizar por correo" className="ta-correo-panel">
          <span className="ta-correo-top">
            <span className="ta-correo-label">Escríbenos a</span>
            <button type="button" className="ta-correo-x" aria-label="Cerrar" onClick={() => setOpen(false)}><X className="h-4 w-4" aria-hidden="true" /></button>
          </span>
          <span className="ta-correo-addr">
            <span className="ta-correo-email">{to}</span>
            <button type="button" className="ta-correo-copy" onClick={copy}>
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </span>
          <span className="ta-correo-links">
            <a href={appHref}>Abrir mi app de correo</a>
            <a href={gmail} target="_blank" rel="noopener">Gmail</a>
            <a href={outlook} target="_blank" rel="noopener">Outlook</a>
            <a href="/contacto#formulario">Formulario de la web</a>
          </span>
        </span>
      )}
    </span>
  );
}
