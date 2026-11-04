import type { Metadata } from "next";
import { IndustrialServicePage } from "@/components/IndustrialServicePage";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { commercialMetadata } from "@/lib/seo";

const service = SERVICIOS_ADICIONALES[1];
const title = "Mecanizado de piezas en Santo Domingo · Cotiza";
const description =
  "Mecanizado en torno y fresadora para mantenimiento y compras de planta en Santo Domingo. Envía plano o muestra y cotiza por WhatsApp.";
export const metadata: Metadata = {
  ...commercialMetadata(title, description, `/${service.slug}`),
  title: { absolute: title },
  description,
};
export default function Page() { return <IndustrialServicePage service={service} />; }
