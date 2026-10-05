import type { Metadata } from "next";
import { commercialMetadata } from "@/lib/seo";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT, SITE, emailHref } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { PageHero } from "@/components/page/PageHero";
import { Band } from "@/components/page/Blocks";
import { shortHours } from "@/components/page/TrustStrip";

export const metadata: Metadata = {
  ...commercialMetadata("Contacta a Dynatech Ingeniería SRL", "Contacta a Dynatech en Santo Domingo para cotizar servicios y suministros industriales en República Dominicana.", "/contacto"),
  title: "Contacto y cotizaciones industriales en Santo Domingo",
  description: "Contacta a Dynatech Ingeniería SRL en Santo Domingo. Cotiza servicios y suministros industriales para empresas y zonas francas en República Dominicana.",
  alternates: { canonical: "/contacto" },
};

/** Canales de contacto (datos tal como están en constants.ts). WhatsApp es el canal principal de cotización. */
function ContactPanel() {
  return (
    <div className="contact-panel">
      <a href={whatsappGeneral()} target="_blank" rel="noopener" className="contact-main">
        <WhatsAppIcon className="h-7 w-7 shrink-0" />
        <span>
          <span className="contact-label">WhatsApp · canal principal</span>
          <span className="contact-value">{CONTACT.whatsappDisplay}</span>
        </span>
        <ArrowUpRight className="ml-auto h-5 w-5 shrink-0" aria-hidden="true" />
      </a>
      <ul>
        <li>
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span><span className="contact-label">Teléfono</span><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="contact-value">{CONTACT.phone}</a></span>
        </li>
        <li>
          <Mail className="h-5 w-5" aria-hidden="true" />
          <span><span className="contact-label">Correo</span><a href={emailHref()} className="contact-value [overflow-wrap:anywhere]">{CONTACT.email}</a></span>
        </li>
        <li>
          <Clock className="h-5 w-5" aria-hidden="true" />
          <span><span className="contact-label">Horario</span><span className="contact-value">{CONTACT.hours}</span></span>
        </li>
        <li>
          <MapPin className="h-5 w-5" aria-hidden="true" />
          {/* PENDIENTE CAPITÁN: número exacto en Av. Rómulo Betancourt y enlace de Google Maps. */}
          <span><span className="contact-label">Dirección</span><span className="contact-value">{CONTACT.address}</span></span>
        </li>
      </ul>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <div>
      <PageHero
        crumbs={[{ label: "Contacto" }]}
        kicker={`${SITE.legalName} · RNC ${SITE.rnc}`}
        title="Contacta a Dynatech Ingeniería"
        lead={<p>Para cotizar, escríbenos por WhatsApp: es nuestro canal principal. Envía la referencia, la cantidad, la aplicación y tu ciudad. También puedes llamar, escribir un correo o usar el formulario.</p>}
        quoteHref={whatsappGeneral()}
        secondary={{ href: "#formulario", label: "Usar el formulario" }}
        note={`Atención: ${shortHours()}.`}
        visual={<ContactPanel />}
        trust={false}
      />

      <Band tone="light" id="formulario" labelledBy="formulario-titulo">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-kicker">Formulario</p>
            <h2 id="formulario-titulo" className="section-title">¿Prefieres escribirnos?</h2>
            <p className="mt-5 max-w-md leading-relaxed text-steel-300">Déjanos tu mensaje y te respondemos por correo o teléfono. Para cotizaciones, WhatsApp es la vía directa.</p>
            <ul className="mt-8 space-y-3 text-[15px] text-steel-200">
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 bg-signal" aria-hidden="true" />Referencia, código o foto de la placa</li>
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 bg-signal" aria-hidden="true" />Plano, muestra o medidas (mm o pulgadas)</li>
              <li className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 bg-signal" aria-hidden="true" />Cantidad, aplicación y ciudad</li>
            </ul>
          </div>
          <div className="border border-black/10 bg-white p-6 sm:p-8 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Band>
    </div>
  );
}
