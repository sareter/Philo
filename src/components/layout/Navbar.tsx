"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Clock, Network, Globe, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Startseite", icon: null },
  { href: "/philosophen", label: "Philosophen", icon: BookOpen },
  { href: "/ismen", label: "Ismen", icon: BookOpen },
  { href: "/zeitleiste", label: "Zeitleiste", icon: Clock },
  { href: "/netzwerk", label: "Netzwerk", icon: Network },
  { href: "/weltkarte", label: "Weltkarte", icon: Globe },
];

export default function Navbar({
  onToggleSidebar,
  sidebarOpen,
}: {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-parchment-light/95 backdrop-blur border-b border-border-warm">
      <div className="flex items-center h-14 px-4">
        <button
          onClick={onToggleSidebar}
          className="mr-3 p-1.5 rounded-lg hover:bg-border-warm/30 transition-colors font-ui"
          aria-label="Sidebar umschalten"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/" className="flex items-center gap-2 mr-8">
          <span className="text-xl font-bold text-bordeaux font-[family-name:var(--font-display)]">
            Philosophia
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 font-ui text-sm">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-bordeaux text-white"
                    : "text-ink-light hover:bg-border-warm/30"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {link.icon && <link.icon size={15} />}
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-auto md:hidden p-1.5 rounded-lg hover:bg-border-warm/30"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-warm bg-parchment-light p-2 font-ui text-sm">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-bordeaux text-white"
                    : "text-ink-light hover:bg-border-warm/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon size={15} />}
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
