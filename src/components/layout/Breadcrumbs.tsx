import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE } from "@/lib/constants";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Inicio", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE.url}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-steel-400">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-signal transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-steel-300" : undefined} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 text-steel-600" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
