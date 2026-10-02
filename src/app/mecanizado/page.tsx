import { IndustrialServicePage } from "@/components/IndustrialServicePage";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { commercialMetadata } from "@/lib/seo";

const service = SERVICIOS_ADICIONALES[1];
export const metadata = commercialMetadata(service.title, service.description, `/${service.slug}`);
export default function Page() { return <IndustrialServicePage service={service} />; }
