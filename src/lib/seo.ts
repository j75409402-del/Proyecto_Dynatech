import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export function commercialMetadata(title: string, description: string, path: string, image = "/industrial-editorial.webp"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE.name, locale: "es_DO", type: "website", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
