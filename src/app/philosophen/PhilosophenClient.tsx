"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import type { Philosoph } from "@/types";
import PhilosophCard from "@/components/philosophen/PhilosophCard";
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

const SORT_OPTIONS = [
  { value: "alpha", label: "A–Z" },
  { value: "chrono", label: "Chronologisch" },
];

export default function PhilosophenClient({
  philosophen,
}: {
  philosophen: Philosoph[];
}) {
  const [search, setSearch] = useState("");
  const [selectedEpochen, setSelectedEpochen] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("alpha");

  const fuse = useMemo(
    () =>
      new Fuse(philosophen, {
        keys: ["name", "kurzbeschreibung", "hauptstroemungen"],
        threshold: 0.3,
      }),
    [philosophen]
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
      : [...philosophen];

    if (selectedEpochen.length > 0) {
      result = result.filter((p) => selectedEpochen.includes(p.epoche));
    }

    if (sortBy === "chrono") {
      result.sort((a, b) => a.geboren.jahr - b.geboren.jahr);
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name, "de"));
    }

    return result;
  }, [search, selectedEpochen, sortBy, philosophen, fuse]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Philosophen</h1>
      <p className="text-ink-light mb-6">
        Entdecke {philosophen.length} Denkerinnen und Denker von der Antike bis
        zur Gegenwart.
      </p>

      <div className="space-y-4 mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Philosoph suchen..."
        />
        <FilterTags
          options={EPOCHEN}
          selected={selectedEpochen}
          onToggle={toggleEpoche}
          label="Epoche"
        />
        <div className="flex items-center gap-2 font-ui text-sm">
          <span className="text-xs font-semibold text-ink-light uppercase tracking-wider">
            Sortierung:
          </span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                sortBy === opt.value
                  ? "bg-bordeaux text-white"
                  : "bg-parchment-card border border-border-warm text-ink-light"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm font-ui text-ink-light mb-4">
        {filtered.length} Ergebnis{filtered.length !== 1 ? "se" : ""}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <PhilosophCard key={p.slug} philosoph={p} />
        ))}
      </div>
    </div>
  );
}
