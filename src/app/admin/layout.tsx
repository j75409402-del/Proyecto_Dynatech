import type { Metadata } from "next";

// El panel interno nunca debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Panel interno",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
