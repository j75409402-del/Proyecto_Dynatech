import type { Metadata } from "next";
import { IndustrialServicePage } from "@/components/IndustrialServicePage";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { commercialMetadata } from "@/lib/seo";

const service = SERVICIOS_ADICIONALES[1];
const title = "Mecanizado industrial en República Dominicana · Dynatech";
const description = "Mecanizado de piezas en República Dominicana con torno y fresadora, bajo plano o muestra.";
export const metadata: Metadata = {
  ...commercialMetadata(title, description, `/${service.slug}`),
  title: { absolute: title },
  description,
};
export default function Page() { return <IndustrialServicePage service={service} />; }
