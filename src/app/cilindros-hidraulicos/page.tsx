import { IndustrialServicePage } from "@/components/IndustrialServicePage";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { commercialMetadata } from "@/lib/seo";

const service = SERVICIOS_ADICIONALES[0];
export const metadata = commercialMetadata("Cilindros hidráulicos: fabricación y reparación en RD", service.description, `/${service.slug}`);
export default function Page() { return <IndustrialServicePage service={service} />; }
