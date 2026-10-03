import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { CONTACT, SITE, SOCIAL, emailHref } from "@/lib/constants";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { SOLUCIONES } from "@/lib/soluciones";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappCylinderService } from "@/lib/whatsapp";

const solutionLinks = SOLUCIONES.map((s) => ({ label: s.name, href: `/${s.slug}` }));

const companyLinks = [
  { label: "Cilindros neumáticos",   href: "/cilindros-neumaticos" },
  { label: "Servicios",              href: "/servicios" },
  { label: "Sellos y componentes",   href: "/sellos-y-componentes" },
  ...SERVICIOS_ADICIONALES.map((s) => ({ label: s.name, href: `/${s.slug}` })),
  { label: "Nosotros",               href: "/nosotros" },
  { label: "Contacto",               href: "/contacto" },
];

const legalLinks = [
  { label: "Garantías",            href: "/garantias" },
  { label: "Devoluciones",         href: "/devoluciones" },
  { label: "Privacidad",           href: "/privacidad" },
  { label: "Términos y condiciones", href: "/terminos" },
];

export function Footer() {
  return (
    <footer className="site-footer bg-surface text-white border-t border-white/10">
      <div className="container-max py-16">
        <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand + tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo-mark.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <div>
                <div className="font-display font-semibold text-surface leading-none">
                  {SITE.shortName}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-techno text-steel-400 mt-0.5">
                  Ingeniería · SRL
                </div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-steel-500">
                  {SITE.brandTagline}
                </div>
              </div>
            </div>
            <p className="text-sm text-steel-300 leading-relaxed max-w-sm">
              {SITE.description}
            </p>
          </div>

          {/* Productos */}
          <div>
            <div className="eyebrow mb-4">Productos</div>
            <ul className="space-y-2">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-200 hover:text-signal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <div className="eyebrow mb-4">Empresa</div>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-200 hover:text-signal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappCylinderService()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-steel-200 hover:text-signal transition-colors"
                >
                  Cotiza tu cilindro por WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Ayuda / legal */}
          <div>
            <div className="eyebrow mb-4">Ayuda</div>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-200 hover:text-signal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <div className="eyebrow mb-4">Contacto</div>
            <ul className="space-y-3 text-sm text-steel-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="font-mono hover:text-surface transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <a
                  href={emailHref()}
                  className="hover:text-surface transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="hairline my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-steel-400 font-mono">
            © {new Date().getFullYear()} {SITE.name} SRL · RNC {SITE.rnc} · Santo Domingo, RD
          </p>
          <div className="flex gap-4 text-sm">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-steel-400 hover:text-signal transition-colors"
            >
              Instagram
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-steel-400 hover:text-signal transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
