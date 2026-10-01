import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { CONTACT, NAV, SITE, SOCIAL } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-carbon-800 border-t border-black/5">
      <div className="container-max py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9" />
              <div>
                <div className="font-display font-semibold text-surface leading-none">{SITE.shortName}</div>
                <div className="font-mono text-[9px] uppercase tracking-techno text-steel-400 mt-0.5">
                  Ingeniería · SRL
                </div>
              </div>
            </div>
            <p className="text-sm text-steel-300 leading-relaxed max-w-xs">
              Cilindros neumáticos a la medida para la industria, fábricas y Zona Franca.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-4">Navegación</div>
            <ul className="space-y-2">
              {[...NAV.main, NAV.quote].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-steel-200 hover:text-signal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Contacto</div>
            <ul className="space-y-3 text-sm text-steel-200">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <a href={whatsappGeneral()} target="_blank" rel="noopener noreferrer" className="font-mono hover:text-signal transition-colors">
                  {CONTACT.phone} · WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-signal transition-colors break-all">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs text-steel-400">
          <p className="font-mono">
            © {new Date().getFullYear()} {SITE.name} SRL · RNC {SITE.rnc} · Santo Domingo, RD
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacidad" className="hover:text-signal transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-signal transition-colors">Términos</Link>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-signal transition-colors">Instagram</a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-signal transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
