import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Clock, FileCheck2, Gauge, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappGeneral } from "@/lib/whatsapp";
import { CONTACT, SITE } from "@/lib/constants";

/** Horario corto a partir de CONTACT.hours ("Lunes a Viernes · 8:00 AM - 5:00 PM · Sábado · …"). */
function shortHours(hours: string) {
  const [weekdays, weekdayHours, saturday, saturdayHours] = hours.split(" · ");
  if (!saturdayHours) return hours;
  const abbr = (d: string) => d.replace("Lunes a Viernes", "Lun–Vie").replace("Sábado", "Sáb");
  const clean = (h: string) => h.replace(/:00/g, "").replace(" - ", "–");
  return `${abbr(weekdays)} ${clean(weekdayHours)} · ${abbr(saturday)} ${clean(saturdayHours)}`;
}

export function Hero() {
  const trust = [
    { icon: MapPin, text: `${CONTACT.locality}, RD` },
    { icon: FileCheck2, text: `RNC ${SITE.rnc}` },
    { icon: Clock, text: shortHours(CONTACT.hours) },
    { icon: Building2, text: "Atendemos zonas francas y sector privado" },
    { icon: Gauge, text: "Prueba de funcionamiento antes de entregar" },
  ];
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-grid container-max">
        <div className="home-hero-copy">
          <p className="home-hero-kicker"><span aria-hidden="true" />Ingeniería industrial · República Dominicana</p>
          <h1 id="home-hero-title" className="home-hero-title">
            <span className="home-hero-brand">Dynatech Ingeniería<span className="sr-only"> —</span></span>{" "}
            Cilindros neumáticos y soluciones industriales <span className="text-signal">en RD.</span>
          </h1>
          <p className="home-hero-lead">
            Fabricamos y reparamos cilindros neumáticos a la medida, incluso cuando el original ya no está disponible.
            Y cotizamos neumática, válvulas, sensores, instrumentación, control eléctrico y resistencias para tu planta.
          </p>
          <div className="home-hero-actions" data-fab-hide="">
            <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-14 px-6">
              <WhatsAppIcon className="h-5 w-5" />Cotizar por WhatsApp<ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/cilindros-neumaticos" className="btn-secondary home-hero-secondary min-h-14 px-6">
              Ver cilindros neumáticos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="home-hero-note">Envíanos una foto, el plano, la muestra o las medidas por WhatsApp y te cotizamos.</p>
        </div>
        <figure className="home-hero-visual">
          <Image
            src="/cilindros/taller-reparando.jpg"
            alt="Imagen de referencia: técnico reparando un cilindro neumático en el taller"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="object-cover"
          />
          <figcaption>
            <span>Línea principal</span>
            Fabricación · Reparación · Reconstrucción
          </figcaption>
        </figure>
      </div>
      <div className="home-trust">
        <ul className="container-max" aria-label="Datos de la empresa">
          {trust.map((item) => (
            <li key={item.text}>
              <item.icon className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
