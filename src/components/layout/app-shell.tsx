"use client";

import { OceanBackground } from "../ocean/ocean-background";
import { Navbar } from "./navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OceanBackground />
      <Navbar />
      <main className="relative z-10" style={{ paddingTop: 80, paddingBottom: 56, overflowX: "hidden" }}>
        {children}
      </main>
    </>
  );
}
