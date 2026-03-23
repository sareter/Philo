import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { getAllPhilosophen, getAllIsmen } from "@/lib/data";

export const metadata: Metadata = {
  title: "Philosophia – Interaktiv Philosophie lernen",
  description:
    "Eine umfassende deutschsprachige Webapp zum Entdecken von Philosophen, Strömungen und Ideen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const philosophen = getAllPhilosophen().map((p) => ({
    slug: p.slug,
    name: p.name,
    epoche: p.epoche,
  }));
  const ismen = getAllIsmen().map((i) => ({
    slug: i.slug,
    name: i.name,
    epoche: i.epoche,
  }));

  return (
    <html lang="de">
      <body className="min-h-screen bg-parchment text-ink antialiased">
        <LayoutShell philosophen={philosophen} ismen={ismen}>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
