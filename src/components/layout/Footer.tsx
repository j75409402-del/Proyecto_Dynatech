import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, FileDown } from "lucide-react";
import { CONTACT, SITE, SOCIAL } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteSettings } from "@/lib/siteSettings";

const categoryLinks = [
  { label: "Neumática",             href: "/categorias/neumatica" },
  { label: "Instrumentación",       href: "/categorias/instrumentacion" },
  { label: "Sensores y fotoceldas", href: "/categorias/sensores" },
  { label: "Controles eléctricos",  href: "/categorias/electrica" },
];

const companyLinks = [
  { label: "Nosotros",     href: "/nosotros" },
  { label: "Catálogo",     href: "/productos" },
  { label: "Cotización",   href: "/cotizacion" },
  { label: "Contacto",     href: "/contacto" },
];

const legalLinks = [
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Garantías",            href: "/garantias" },
  { label: "Devoluciones",         href: "/devoluciones" },
  { label: "Privacidad",           href: "/privacidad" },
  { label: "Términos y condiciones", href: "/terminos" },
];

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-carbon-900 border-t border-black/5 mt-24">
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
              </div>
            </div>
            <p className="text-sm text-steel-300 leading-relaxed max-w-sm">
              {SITE.description}
            </p>
          </div>

          {/* Categorías */}
          <div>
            <div className="eyebrow mb-4">Catálogo</div>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
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
              {settings.catalog_pdf_url && (
                <li>
                  <a
                    href={settings.catalog_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-steel-200 hover:text-signal transition-colors"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    Descargar catálogo
                  </a>
                </li>
              )}
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
                  href={`mailto:${CONTACT.email}`}
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
            <Link href="/mapa-del-sitio" className="text-steel-400 hover:text-signal transition-colors">
              Mapa del sitio
            </Link>
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
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-steel-400 hover:text-signal transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
