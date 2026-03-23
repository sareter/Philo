"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import Link from "next/link";
import type { Philosoph, RelationsData } from "@/types";
import { EPOCHE_FARBEN } from "@/types";
import FilterTags from "@/components/ui/FilterTags";

interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  epoche: string;
  connections: number;
}

interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  typ: string;
}

const EPOCHEN = [
  "Antike",
  "Mittelalter",
  "Renaissance",
  "Aufklärung",
  "19. Jahrhundert",
  "20. Jahrhundert",
  "Gegenwart",
];

export default function NetworkClient({
  philosophen,
  relations,
}: {
  philosophen: Philosoph[];
  relations: RelationsData;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [selectedEpochen, setSelectedEpochen] = useState<string[]>([]);

  const toggleEpoche = (epoche: string) => {
    setSelectedEpochen((prev) =>
      prev.includes(epoche)
        ? prev.filter((e) => e !== epoche)
        : [...prev, epoche]
    );
  };

  const drawGraph = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    if (!container) return;

    svg.selectAll("*").remove();

    const width = container.clientWidth;
    const height = 700;
    svg.attr("width", width).attr("height", height);

    // Filter by epoch
    const filteredPhilosophen =
      selectedEpochen.length > 0
        ? philosophen.filter((p) => selectedEpochen.includes(p.epoche))
        : philosophen;

    const slugSet = new Set(filteredPhilosophen.map((p) => p.slug));

    // Build nodes
    const connectionCount: Record<string, number> = {};
    relations.relationen.forEach((r) => {
      if (slugSet.has(r.von)) connectionCount[r.von] = (connectionCount[r.von] || 0) + 1;
      if (slugSet.has(r.zu)) connectionCount[r.zu] = (connectionCount[r.zu] || 0) + 1;
    });

    const nodes: NodeData[] = filteredPhilosophen.map((p) => ({
      id: p.slug,
      name: p.name,
      epoche: p.epoche,
      connections: connectionCount[p.slug] || 0,
    }));

    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    // Build links
    const links: LinkData[] = relations.relationen
      .filter((r) => nodeMap.has(r.von) && nodeMap.has(r.zu))
      .map((r) => ({
        source: r.von,
        target: r.zu,
        typ: r.typ,
      }));

    // Create simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeData, LinkData>(links)
          .id((d) => d.id)
          .distance(80)
      )
      .force("charge", d3.forceManyBody().strength(-120))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(20));

    const g = svg.append("g");

    // Zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom as never);

    // Links
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#D4C5B2")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1);

    // Nodes
    const node = g
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => Math.max(4, Math.min(d.connections * 2 + 4, 16)))
      .attr("fill", (d) => EPOCHE_FARBEN[d.epoche] || "#6B5344")
      .attr("stroke", "#FFFDF9")
      .attr("stroke-width", 1.5)
      .attr("cursor", "pointer")
      .on("click", (_event, d) => {
        setSelectedNode(d);
      })
      .call(
        (d3
          .drag<SVGCircleElement, NodeData>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })) as never
      );

    // Labels
    const label = g
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.name.split(" ").pop() || d.name)
      .attr("font-size", "9px")
      .attr("font-family", "Inter, sans-serif")
      .attr("fill", "#3D2B1F")
      .attr("text-anchor", "middle")
      .attr("dy", -12)
      .attr("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as NodeData).x!)
        .attr("y1", (d) => (d.source as NodeData).y!)
        .attr("x2", (d) => (d.target as NodeData).x!)
        .attr("y2", (d) => (d.target as NodeData).y!);
      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
      label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });

    return () => {
      simulation.stop();
    };
  }, [philosophen, relations, selectedEpochen]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Beziehungsnetzwerk</h1>
      <p className="text-ink-light mb-4">
        Interaktiver Graph im Obsidian-Stil. Ziehe Knoten, zoome mit dem
        Mausrad, klicke auf einen Philosophen für Details.
      </p>

      <div className="mb-4">
        <FilterTags
          options={EPOCHEN}
          selected={selectedEpochen}
          onToggle={toggleEpoche}
          label="Filter"
        />
      </div>

      <div className="flex gap-4">
        <div
          ref={containerRef}
          className="flex-1 bg-parchment-card border border-border-warm rounded-xl overflow-hidden"
        >
          <svg ref={svgRef} className="w-full" />
        </div>

        {selectedNode && (
          <div className="w-64 bg-parchment-card border border-border-warm rounded-xl p-4 shrink-0">
            <h3 className="font-bold font-[family-name:var(--font-display)] mb-2">
              {selectedNode.name}
            </h3>
            <p className="text-xs font-ui text-ink-light mb-1">
              {selectedNode.epoche}
            </p>
            <p className="text-xs font-ui text-ink-light mb-3">
              {selectedNode.connections} Verbindungen
            </p>
            <Link
              href={`/philosophen/${selectedNode.id}`}
              className="inline-block px-3 py-1.5 bg-bordeaux text-white rounded-lg text-sm font-ui hover:bg-bordeaux-light transition-colors"
            >
              Zum Profil
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {EPOCHEN.map((name) => (
          <span key={name} className="flex items-center gap-1.5 text-xs font-ui">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: EPOCHE_FARBEN[name] }}
            />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
