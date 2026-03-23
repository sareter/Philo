"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

interface SidebarItem {
  slug: string;
  name: string;
  epoche?: string;
}

export default function LayoutShell({
  children,
  philosophen,
  ismen,
}: {
  children: React.ReactNode;
  philosophen: SidebarItem[];
  ismen: SidebarItem[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Navbar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <Sidebar open={sidebarOpen} philosophen={philosophen} ismen={ismen} />
      <main
        className={`transition-all duration-300 min-h-[calc(100vh-3.5rem)] ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
