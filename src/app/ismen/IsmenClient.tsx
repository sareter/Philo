"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import type { Ismus } from "@/types";
import type { HierarchieKnoten } from "@/data/ismen-hierarchie";
import IsmusCard from "@/components/ismen/IsmusCard";
import IsmenBaum from "@/components/ismen/IsmenBaum";
import SearchBar from "@/components/ui/SearchBar";
import FilterTags from "@/components/ui/FilterTags";

const EPOCHEN = [
  "Antike",
  "Mittelalter",
  "Renaissance",
  "Aufklärung",
  "19. Jahrhundert",
  "20. Jahrhundert",
  "Gegenwart",
];

type Ansicht = "baum" | "liste";

export default function IsmenClient({
  ismen,
  hierarchie,
}: {
  ismen: Ismus[];
  hierarchie: HierarchieKnoten[];
}) {
  const [ansicht, setAnsicht] = useState<Ansicht>("baum");
  const [search, setSearch] = useState("");
  const [selectedEpochen, setSelectedEpochen] = useState<string[]>([]);

  const fuse = useMemo(
    () =>
      new Fuse(ismen, {
        keys: ["name", "kurzbeschreibung", "kernthesen"],
        threshold: 0.3,
      }),
    [ismen]
  );

  const toggleEpoche = (epoche: string) => {
    setSelectedEpochen((prev) =>
      prev.includes(epoche)
        ? prev.filter((e) => e !== epoche)
        : [...prev, epoche]
    );
  };

  const filtered = useMemo(() => {
    let result = search
      ? fuse.search(search).map((r) => r.item)
      : [...ismen];

    if (selectedEpochen.length > 0) {
      result = result.filter((i) => selectedEpochen.includes(i.epoche));
    }

    return result.sort((a, b) => a.name.localeCompare(b.name, "de"));
  }, [search, selectedEpochen, ismen, fuse]);

  // Bei aktiver Suche/Filter automatisch zur Liste wechseln
  const zeigeListeWennFilter =
    search.length > 0 || selectedEpochen.length > 0;
  const aktuelleAnsicht = zeigeListeWennFilter ? "liste" : ansicht;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Philosophische Strömungen</h1>
      <p className="text-ink-light mb-6">
        Entdecke {ismen.length} philosophische Ismen und Denkrichtungen –
        hierarchisch geordnet vom Oberbegriff bis zur Spezialströmung.
      </p>

      {/* Ansicht-Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex bg-border-warm/20 rounded-lg p-0.5">
          <button
            onClick={() => setAnsicht("baum")}
            className={`px-3 py-1.5 text-sm font-ui rounded-md transition-all ${
              aktuelleAnsicht === "baum"
                ? "bg-parchment-card shadow-sm text-ink font-semibold"
                : "text-ink-light hover:text-ink"
            }`}
          >
            Stammbaum
          </button>
          <button
            onClick={() => setAnsicht("liste")}
            className={`px-3 py-1.5 text-sm font-ui rounded-md transition-all ${
              aktuelleAnsicht === "liste"
                ? "bg-parchment-card shadow-sm text-ink font-semibold"
                : "text-ink-light hover:text-ink"
            }`}
          >
            Liste
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Ismus suchen..."
        />
        {aktuelleAnsicht === "liste" && (
          <FilterTags
            options={EPOCHEN}
            selected={selectedEpochen}
            onToggle={toggleEpoche}
            label="Epoche"
          />
        )}
      </div>

      {aktuelleAnsicht === "baum" ? (
        <IsmenBaum hierarchie={hierarchie} ismen={ismen} />
      ) : (
        <>
          <p className="text-sm font-ui text-ink-light mb-4">
            {filtered.length} Ergebnis{filtered.length !== 1 ? "se" : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((ismus) => (
              <IsmusCard key={ismus.slug} ismus={ismus} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
