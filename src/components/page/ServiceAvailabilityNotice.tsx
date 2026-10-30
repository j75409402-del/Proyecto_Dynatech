import { OPERATIONS, serviceNotice, type TechnicalService } from "@/lib/operations";

/** Inactivo mientras la continuidad operativa actual siga confirmada. */
export function ServiceAvailabilityNotice({ service }: { service: TechnicalService }) {
  const message = serviceNotice(OPERATIONS.services[service]);
  if (!message) return null;
  return <aside aria-label="Disponibilidad del servicio" className="border-b border-signal/30 bg-white text-surface"><div className="container-max py-5 text-sm leading-relaxed"><strong>Antes de coordinar un trabajo. </strong>{message}</div></aside>;
}
