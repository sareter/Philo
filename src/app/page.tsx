import Link from "next/link";
import { getAllPhilosophen, getAllIsmen } from "@/lib/data";
import { BookOpen, Clock, Network, Globe } from "lucide-react";
import { EPOCHE_FARBEN } from "@/types";
import HomeQuote from "@/components/ui/HomeQuote";

const EPOCHEN_INFO = [
  { name: "Antike", zeit: "600 v. Chr. – 500 n. Chr.", beschreibung: "Die Wiege der westlichen Philosophie" },
  { name: "Mittelalter", zeit: "500 – 1400", beschreibung: "Scholastik und christliche Philosophie" },
  { name: "Renaissance", zeit: "1400 – 1600", beschreibung: "Wiedergeburt antiker Ideale" },
  { name: "Aufklärung", zeit: "1600 – 1800", beschreibung: "Das Zeitalter der Vernunft" },
  { name: "19. Jahrhundert", zeit: "1800 – 1900", beschreibung: "Idealismus, Materialismus, Existenzphilosophie" },
  { name: "20. Jahrhundert", zeit: "1900 – 2000", beschreibung: "Analytische und kontinentale Philosophie" },
  { name: "Gegenwart", zeit: "2000 – heute", beschreibung: "Zeitgenössisches Denken" },
];

export default function HomePage() {
  const philosophen = getAllPhilosophen();
  const ismen = getAllIsmen();

  const alleZitate = philosophen.flatMap((p) =>
    p.zitate.map((z) => ({ ...z, philosoph: p.name, slug: p.slug }))
  );

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-bordeaux">Philosophia</span>
        </h1>
        <p className="text-xl text-ink-light max-w-2xl mx-auto leading-relaxed">
          Eine interaktive Reise durch die Geschichte der Philosophie.
          Entdecke {philosophen.length} Philosophen, {ismen.length} Strömungen
          und ihre Verbindungen.
        </p>
      </div>

      {/* Zitat des Tages */}
      {alleZitate.length > 0 && <HomeQuote zitate={alleZitate} />}

      {/* Schnellzugriff */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { href: "/philosophen", icon: BookOpen, label: "Philosophen", count: philosophen.length },
          { href: "/ismen", icon: BookOpen, label: "Ismen", count: ismen.length },
          { href: "/zeitleiste", icon: Clock, label: "Zeitleiste", count: null },
          { href: "/netzwerk", icon: Network, label: "Netzwerk", count: null },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-parchment-card border border-border-warm rounded-xl p-4 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <item.icon size={28} className="mx-auto text-bordeaux mb-2" />
            <p className="font-semibold font-[family-name:var(--font-display)]">
              {item.label}
            </p>
            {item.count && (
              <p className="text-sm font-ui text-ink-light">{item.count} Einträge</p>
            )}
          </Link>
        ))}
      </div>

      {/* Epochen */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 divider-ornament">Epochen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EPOCHEN_INFO.map((epoche) => {
            const farbe = EPOCHE_FARBEN[epoche.name] || "#6B5344";
            const count = philosophen.filter((p) => p.epoche === epoche.name).length;
            return (
              <Link
                key={epoche.name}
                href={`/philosophen?epoche=${encodeURIComponent(epoche.name)}`}
                className="bg-parchment-card border border-border-warm rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: farbe }}
                  />
                  <h3 className="font-semibold font-[family-name:var(--font-display)]">
                    {epoche.name}
                  </h3>
                </div>
                <p className="text-xs font-ui text-ink-light mb-1">
                  {epoche.zeit}
                </p>
                <p className="text-sm text-ink-light">{epoche.beschreibung}</p>
                {count > 0 && (
                  <p className="text-xs font-ui text-bordeaux mt-2">
                    {count} Philosophen
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Weltkarte Link */}
      <section className="text-center">
        <Link
          href="/weltkarte"
          className="inline-flex items-center gap-2 px-6 py-3 bg-bordeaux text-white rounded-xl hover:bg-bordeaux-light transition-colors font-ui"
        >
          <Globe size={20} />
          Weltkarte erkunden
        </Link>
      </section>
    </div>
  );
}
