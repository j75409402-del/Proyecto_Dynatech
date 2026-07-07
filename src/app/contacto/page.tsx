import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos. Estamos en Santo Domingo, República Dominicana.",
};

export default function ContactoPage() {
  return (
    <div className="container-max py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Info */}
        <div>
          <div className="eyebrow mb-3">Contacto</div>
          <h1 className="font-display text-display-lg text-surface mb-4">
            Hablemos.
          </h1>
          <p className="text-lg text-steel-300 leading-relaxed mb-10 max-w-lg">
            Si es urgente, WhatsApp o teléfono son el camino más rápido. El formulario está bien pa'
            consultas que no corren.
          </p>

          <div className="space-y-6">
            <ContactBlock
              icon={<MessageSquare className="h-5 w-5" />}
              label="WhatsApp"
              value="Respuesta inmediata"
              href={whatsappGeneral()}
              external
            />
            <ContactBlock
              icon={<Phone className="h-5 w-5" />}
              label="Teléfono"
              value={CONTACT.phone}
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            />
            <ContactBlock
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
            <ContactBlock
              icon={<MapPin className="h-5 w-5" />}
              label="Dirección"
              value={CONTACT.address}
            />
            <ContactBlock
              icon={<Clock className="h-5 w-5" />}
              label="Horario"
              value={CONTACT.hours}
            />
          </div>
        </div>

        {/* Form */}
        <div className="border border-white/10 p-6 sm:p-8 bg-carbon-800">
          <div className="eyebrow mb-4 pb-2 border-b border-white/10">Formulario</div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function ContactBlock({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4 py-3 border-b border-white/5 group">
      <div className="text-signal shrink-0 mt-0.5">{icon}</div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-techno text-steel-400 mb-0.5">
          {label}
        </div>
        <div className="text-surface group-hover:text-signal transition-colors">
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }
  return content;
}
