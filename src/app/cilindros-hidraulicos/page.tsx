import type { Metadata } from "next";
import { IndustrialServicePage } from "@/components/IndustrialServicePage";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { commercialMetadata } from "@/lib/seo";

const service = SERVICIOS_ADICIONALES[0];
const title = "Proveedor de cilindros hidráulicos en República Dominicana · Dynatech";
const description = "Suplidor de cilindros hidráulicos en Santo Domingo: fabricación y reparación en el taller. Plano, foto o muestra.";
export const metadata: Metadata = {
  ...commercialMetadata(title, description, `/${service.slug}`),
  title: { absolute: title },
  description,
};
export default function Page() { return <IndustrialServicePage service={service} />; }
