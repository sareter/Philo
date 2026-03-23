"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";

interface SidebarItem {
  slug: string;
  name: string;
  epoche?: string;
}

export default function Sidebar({
  open,
  philosophen,
  ismen,
}: {
  open: boolean;
  philosophen: SidebarItem[];
  ismen: SidebarItem[];
}) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const isPhilosophenSection =
    pathname.startsWith("/philosophen") ||
    pathname === "/" ||
    pathname.startsWith("/zeitleiste") ||
    pathname.startsWith("/netzwerk") ||
    pathname.startsWith("/weltkarte");
  const isIsmenSection = pathname.startsWith("/ismen");

  const items = isIsmenSection ? ismen : philosophen;
  const basePath = isIsmenSection ? "/ismen" : "/philosophen";
  const title = isIsmenSection ? "Ismen" : "Philosophen";

  const fuse = useMemo(
    () => new Fuse(items, { keys: ["name"], threshold: 0.3 }),
    [items]
  );

  const filteredItems = search
    ? fuse.search(search).map((r) => r.item)
    : items;

  if (!open) return null;

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-sidebar-bg text-sidebar-text z-40 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-white/10">
        <h2 className="text-sm font-semibold font-ui uppercase tracking-wider text-gold mb-2">
          {title}
        </h2>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sidebar-text/50"
          />
          <input
            type="text"
            placeholder="Suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white/10 rounded text-sm font-ui placeholder:text-sidebar-text/40 focus:outline-none focus:ring-1 focus:ring-gold/50"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {filteredItems.map((item) => {
          const href = `${basePath}/${item.slug}`;
          const isActive = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              className={`block px-3 py-1.5 rounded text-sm font-ui transition-colors ${
                isActive
                  ? "bg-bordeaux text-white"
                  : "hover:bg-white/10 text-sidebar-text/80"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
        {filteredItems.length === 0 && (
          <p className="text-sm text-sidebar-text/40 px-3 py-2 font-ui">
            Keine Ergebnisse
          </p>
        )}
      </nav>
    </aside>
  );
}
