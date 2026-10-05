import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { CONTACT, NAV, SITE, SOCIAL, emailHref } from "@/lib/constants";
import { SOLUCIONES } from "@/lib/soluciones";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappCylinderService } from "@/lib/whatsapp";
import { hoursLines } from "@/components/page/TrustStrip";

const solutionLinks = SOLUCIONES.map((s) => ({ label: s.name, href: `/${s.slug}` }));

/** Cilindros y servicios industriales (antes mezclados en "Empresa"). */
const serviceLinks = [
  { label: "Cilindros neumáticos",   href: "/cilindros-neumaticos" },
  { label: "Reparación de cilindros", href: "/servicios" },
  { label: "Sellos y componentes",   href: "/sellos-y-componentes" },
  ...NAV.especialidades,
];

const companyLinks = [
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
        <Reveal className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand + tagline */}
          <div className="col-span-2 lg:col-span-3">
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
                <div className="font-mono text-xs uppercase tracking-[0.08em] text-steel-400 mt-0.5">
                  Ingeniería · SRL
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-steel-500" lang="en">
                  {SITE.brandTagline}
                </div>
              </div>
            </div>
            <p className="text-sm text-steel-300 leading-relaxed max-w-sm">
              {SITE.description}
            </p>
          </div>

          {/* Productos */}
          <div className="lg:col-span-2">
            <div className="eyebrow mb-4">Productos</div>
            <ul className="space-y-1">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center text-sm text-steel-200 hover:text-signal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cilindros y servicios */}
          <div className="lg:col-span-2">
            <div className="eyebrow mb-4">Cilindros y servicios</div>
            <ul className="space-y-1">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center text-sm text-steel-200 hover:text-signal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappCylinderService()}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-10 items-center text-sm text-steel-200 hover:text-signal transition-colors"
                >
                  Cotizar cilindro por WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Empresa + ayuda / legal */}
          <div className="lg:col-span-2">
            <div className="eyebrow mb-4">Empresa</div>
            <ul className="space-y-1">
              {[...companyLinks, ...legalLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center text-sm text-steel-200 hover:text-signal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-2 min-w-0 sm:col-span-1 lg:col-span-3">
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
                  className="-my-2.5 inline-flex min-h-10 items-center hover:text-surface transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <a
                  href={emailHref()}
                  className="min-w-0 [overflow-wrap:anywhere] hover:text-surface transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <span>{hoursLines().map((l) => <span key={l} className="block">{l}</span>)}</span>
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
              className="inline-flex min-h-10 items-center text-steel-400 hover:text-signal transition-colors"
            >
              Instagram
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center text-steel-400 hover:text-signal transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
