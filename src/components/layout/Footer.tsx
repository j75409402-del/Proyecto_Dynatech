import Link from "next/link";
import Image from "next/image";
import { CALL_PHONES, CONTACT, MAPS_URL, NAV, SITE, SOCIAL, emailHref, telHref } from "@/lib/constants";
import { SOLUCIONES } from "@/lib/soluciones";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappCylinderService } from "@/lib/whatsapp";
import { hoursLines } from "@/components/page/TrustStrip";

const solutionLinks = [{ label: "Catálogo completo", href: "/catalogo" }, ...SOLUCIONES.map((s) => ({ label: s.name, href: `/${s.slug}` }))];

/** Cilindros y servicios industriales (antes mezclados en "Empresa"). */
const serviceLinks = [...NAV.cilindros, ...NAV.especialidades];

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
                src="/brand/dynatech-badge.png"
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
            <div className="eyebrow mb-4">Suministro industrial</div>
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
            <div className="eyebrow mb-4">Taller y componentes</div>
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
                  Cotizar por WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Empresa + ayuda / legal (móvil: a todo el ancho en 2 columnas, sin hueco al lado) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <div className="eyebrow mb-4">Empresa</div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:block sm:space-y-1">
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
            <dl className="footer-facts">
              <div>
                <dt>Dirección</dt>
                <dd>{CONTACT.address}{MAPS_URL && (<a href={MAPS_URL} target="_blank" rel="noopener">Cómo llegar</a>)}</dd>
              </div>
              <div>
                <dt>Teléfonos</dt>
                <dd>{CALL_PHONES.map((p) => <a key={p} href={telHref(p)}>{p}</a>)}</dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd><a href={emailHref()} className="[overflow-wrap:anywhere]">{CONTACT.email}</a></dd>
              </div>
              <div>
                <dt>Horario</dt>
                <dd>{hoursLines().map((l) => <span key={l}>{l}</span>)}</dd>
              </div>
            </dl>
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
