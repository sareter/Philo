"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const labelMap: Record<string, string> = {
  philosophen: "Philosophen",
  ismen: "Ismen",
  zeitleiste: "Zeitleiste",
  netzwerk: "Netzwerk",
  weltkarte: "Weltkarte",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-sm font-ui text-ink-light mb-6">
      <Link href="/" className="hover:text-bordeaux transition-colors">
        Start
      </Link>
      {segments.map((segment, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        const label =
          labelMap[segment] ||
          decodeURIComponent(segment)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-border-warm" />
            {isLast ? (
              <span className="text-ink font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-bordeaux transition-colors">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
