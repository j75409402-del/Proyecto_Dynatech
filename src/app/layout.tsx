import { locationSchema } from "@/lib/operations";
import type { Metadata } from "next";
import { Barlow, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE, CONTACT, ANALYTICS, PUBLIC_LOCATION } from "@/lib/constants";
import { CommercialTracking } from "@/components/CommercialTracking";
import { CookielessAnalytics } from "@/components/CookielessAnalytics";
import { VercelWebAnalytics } from "@/components/VercelWebAnalytics";
import { MobileQuoteFab } from "@/components/layout/MobileQuoteFab";
import { RevealObserver } from "@/components/motion/RevealObserver";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  ...locationSchema(PUBLIC_LOCATION),
  "@id": `${SITE.url}/#business`,
  legalName: SITE.legalName,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/dynatech-logo.png`,
  description:
    "Dynatech Ingeniería SRL es un suplidor industrial en República Dominicana. Lo principal son los cilindros neumáticos: suministro, fabricación y reparación. También válvulas, unidades FRL, conexiones y mangueras; control eléctrico, gabinetes eléctricos, sensores, instrumentación y resistencias eléctricas. Piezas originales Festo y SMC por código. Mecanizado en torno y fresadora, y cilindros hidráulicos.",
  email: CONTACT.email,
  telephone: [CONTACT.phone, CONTACT.phone2],
  knowsAbout: [
    "Cilindros neumáticos",
    "Fabricación de cilindros neumáticos",
    "Reparación de cilindros neumáticos",
    "Piezas originales Festo",
    "Piezas originales SMC",
    "Válvulas neumáticas",
    "Unidades FRL",
    "Neumática industrial",
    "Control eléctrico industrial",
    "Gabinetes eléctricos",
    "Sensores industriales",
    "Instrumentación industrial",
    "Resistencias eléctricas",
    "Cilindros hidráulicos",
    "Mecanizado en torno y fresadora",
  ],
  areaServed: { "@type": "Country", name: "República Dominicana" },
};

const display = Barlow({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "proveedor industrial República Dominicana",
    "neumática industrial",
    "control eléctrico industrial",
    "sensores industriales",
    "instrumentación industrial",
    "resistencias eléctricas industriales",
    "cilindros neumáticos República Dominicana",
    "reparación de cilindros neumáticos",
    "Dynatech",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_DO",
    type: "website",
    images: [{
      url: "/industrial-editorial.webp",
      width: 1536,
      height: 1024,
      alt: "Imagen editorial de maquinaria industrial",
    }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-DO"
      className={`${display.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-[#F4F5F6] font-sans text-surface antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CommercialTracking />
        <CookielessAnalytics websiteId={ANALYTICS.umamiWebsiteId} scriptUrl={ANALYTICS.umamiScriptUrl} />
        <VercelWebAnalytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileQuoteFab />
        <RevealObserver />
      </body>
    </html>
  );
}
