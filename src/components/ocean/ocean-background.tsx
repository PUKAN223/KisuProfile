"use client";

import Image from "next/image";
import { DS } from "@/lib/ds";

export function OceanBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Image
        src="/landscape.jpg"
        alt=""
        fill
        priority
        quality={85}
        className="object-cover object-center"
        style={{
          filter: "brightness(0.45) contrast(1.05) saturate(0.4) grayscale(0.3) blur(2px)",
          transform: "scale(1.05)"
        }}
      />
      {/* Dark gray overlay — no blue tint */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(12,12,12,0.7)" }} />
    </div>
  );
}
