import { Building2, Clock, FileCheck2, Gauge, MapPin } from "lucide-react";
import { CONTACT, SITE } from "@/lib/constants";

/** Horario corto a partir de CONTACT.hours ("Lunes a Viernes · 8:00 AM - 5:00 PM · Sábado · …"). */
export function shortHours(hours: string = CONTACT.hours) {
  const [weekdays, weekdayHours, saturday, saturdayHours] = hours.split(" · ");
  if (!saturdayHours) return hours;
  const abbr = (d: string) => d.replace("Lunes a Viernes", "Lun–Vie").replace("Sábado", "Sáb");
  const clean = (h: string) => h.replace(/:00/g, "").replace(" - ", "–");
  return `${abbr(weekdays)} ${clean(weekdayHours)} · ${abbr(saturday)} ${clean(saturdayHours)}`;
}

/**
 * Franja de confianza (solo datos verificables de `constants.ts`, MENSAJES-Y-SEO D1).
 * - `cilindros`: añade "Prueba de funcionamiento antes de entregar" (solo aplica a reparación de cilindros).
 * - `lineas`: sin ese ítem, para las líneas de suministro.
 */
export function TrustStrip({ variant = "lineas" }: { variant?: "cilindros" | "lineas" }) {
  const items = [
    { icon: MapPin, text: `${CONTACT.locality}, RD` },
    { icon: FileCheck2, text: `RNC ${SITE.rnc}` },
    { icon: Clock, text: shortHours() },
    { icon: Building2, text: "Atendemos zonas francas y sector privado" },
    ...(variant === "cilindros" ? [{ icon: Gauge, text: "Prueba de funcionamiento antes de entregar" }] : []),
  ];
  return (
    <div className="home-trust" data-variant={variant}>
      <ul className="container-max" aria-label="Datos de la empresa">
        {items.map((item) => (
          <li key={item.text}>
            <item.icon className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
