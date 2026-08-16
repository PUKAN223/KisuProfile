"use client";

import { motion } from "framer-motion";
import { DS, b } from "@/lib/ds";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 44,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px",
        background: "rgba(12,12,12,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: b,
      }}
    >
      <span style={{ fontFamily: DS.font, fontSize: 11, fontWeight: 600, color: DS.text, letterSpacing: "0.05em" }}>
        {profile.name.toUpperCase()}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontFamily: DS.font, fontSize: 10, color: DS.text2 }}>TH</span>
        <div style={{ width: 1, height: 10, background: DS.border2 }} />
        <span style={{ fontFamily: DS.font, fontSize: 10, color: DS.text3 }}>EN</span>
      </div>
    </motion.header>
  );
}
