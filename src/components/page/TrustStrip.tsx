import { CONTACT, SITE } from "@/lib/constants";

/** Horario corto a partir de CONTACT.hours ("Lunes a Viernes · 8:00 AM - 5:00 PM · Sábado · …"). */
export function shortHours(hours: string = CONTACT.hours) {
  const [weekdays, weekdayHours, saturday, saturdayHours] = hours.split(" · ");
  if (!saturdayHours) return hours;
  const abbr = (d: string) => d.replace("Lunes a Viernes", "Lun–Vie").replace("Sábado", "Sáb");
  const clean = (h: string) => h.replace(/:00/g, "").replace(" - ", "–");
  return `${abbr(weekdays)} ${clean(weekdayHours)} · ${abbr(saturday)} ${clean(saturdayHours)}`;
}

/** Horario en dos partes (días laborables / sábado) para mostrarlo sin cortes raros. */
export function hoursLines(hours: string = CONTACT.hours): string[] {
  const parts = hours.split(" · ");
  if (parts.length !== 4) return [hours];
  return [`${parts[0]} · ${parts[1]}`, `${parts[2]} · ${parts[3]}`];
}

/**
 * Franja de confianza (solo datos verificables de `constants.ts`, MENSAJES-Y-SEO D1).
 * - `cilindros`: añade "Prueba de funcionamiento antes de entregar" (solo aplica a reparación de cilindros).
 * - `lineas`: sin ese ítem, para las líneas de suministro.
 */
export function TrustStrip({ variant = "lineas" }: { variant?: "cilindros" | "lineas" }) {
  const items = [
    `${CONTACT.locality}, República Dominicana`,
    `RNC ${SITE.rnc}`,
    shortHours(),
    "Zonas francas y sector privado",
    ...(variant === "cilindros" ? ["Prueba de funcionamiento antes de entregar"] : []),
  ];
  return (
    <div className="home-trust" data-variant={variant}>
      <ul className="container-max" aria-label="Datos de la empresa">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
