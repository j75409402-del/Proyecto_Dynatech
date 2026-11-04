import type { Metadata } from "next";
import { IndustrialServicePage } from "@/components/IndustrialServicePage";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { commercialMetadata } from "@/lib/seo";

const service = SERVICIOS_ADICIONALES[0];
const title = "Cilindros hidráulicos en Santo Domingo · Cotiza";
const description =
  "Reparación y fabricación de cilindros hidráulicos para mantenimiento y compras de planta en Santo Domingo. Plano, foto o muestra. Cotiza por WhatsApp.";
export const metadata: Metadata = {
  ...commercialMetadata(title, description, `/${service.slug}`),
  title: { absolute: title },
  description,
};
export default function Page() { return <IndustrialServicePage service={service} />; }
