import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE, CONTACT } from "@/lib/constants";
import { CommercialTracking } from "@/components/CommercialTracking";
import { CookielessAnalytics } from "@/components/CookielessAnalytics";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#business`,
  legalName: SITE.legalName,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo-mark.png`,
  description: SITE.description,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.streetAddress,
    addressLocality: CONTACT.locality,
    addressCountry: "DO",
  },
};

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
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
      className={`${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="bg-carbon text-surface antialiased flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CommercialTracking />
        <CookielessAnalytics websiteId="4bbea860-f2e7-4268-9476-190563eeab0a" scriptUrl="https://cloud.umami.is/script.js" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
