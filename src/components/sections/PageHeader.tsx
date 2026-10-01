import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappGeneral } from "@/lib/whatsapp";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  image?: { src: string; alt: string };
  quoteHref?: string;
  quoteLabel?: string;
};

/** Encabezado de páginas internas: texto corto + una sola imagen grande. */
export function PageHeader({
  eyebrow,
  title,
  body,
  image,
  quoteHref = "/cotizacion",
  quoteLabel = "Solicitar cotización",
}: Props) {
  return (
    <section className="border-b border-black/5">
      <div className="container-max py-14 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-signal" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h1 className="font-display text-display-lg text-surface mb-6">{title}</h1>
          <p className="text-lg text-steel-300 leading-relaxed mb-8 max-w-xl">{body}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={quoteHref} className="btn-primary">
              {quoteLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={whatsappGeneral()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden border border-black/10 bg-carbon-800">
            <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
