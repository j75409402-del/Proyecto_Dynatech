/**
 * WEB-030: preparación INACTIVA. La mudanza no está confirmada.
 * Cambiar estos estados requiere confirmación operativa, revisión de contenido y aprobación
 * de publicación. Nunca definir una dirección nueva por inferencia. Ver docs/b2b-20261030.
 */
export type LocationMode = "physical" | "commercial-only";
export type ServiceState = "current" | "confirm-before-booking";
export type TechnicalService = "pneumatic-cylinders" | "hydraulic-cylinders" | "machining";
export const OPERATIONS: { location: LocationMode; services: Record<TechnicalService, ServiceState> } = {
  location: "physical",
  services: { "pneumatic-cylinders": "current", "hydraulic-cylinders": "current", machining: "current" },
};

type LocationDetails = { address: string; streetAddress: string; locality: string };
export function publicLocation(mode: LocationMode, current: LocationDetails) {
  const physical = mode === "physical";
  return {
    address: physical ? current.address : `${current.locality}, República Dominicana`,
    streetAddress: physical ? current.streetAddress : undefined,
    locality: current.locality,
    mapUrl: physical ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(current.address)}` : undefined,
  };
}

/** Sin sede pública: Organization conserva identidad, ciudad y área atendida, sin sede ficticia. */
export function locationSchema(location: ReturnType<typeof publicLocation>) {
  return {
    "@type": location.mapUrl ? "LocalBusiness" : "Organization",
    address: { "@type": "PostalAddress", addressLocality: location.locality, addressCountry: "DO", ...(location.streetAddress ? { streetAddress: location.streetAddress } : {}) },
    ...(location.mapUrl ? {
      hasMap: location.mapUrl,
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "12:00" },
      ],
    } : {}),
  };
}

export function serviceNotice(state: ServiceState): string | undefined {
  return state === "confirm-before-booking" ? "Consulta la disponibilidad actual de este servicio antes de coordinar un trabajo. El alcance, lugar de atención y plazo se confirman en tu cotización." : undefined;
}
