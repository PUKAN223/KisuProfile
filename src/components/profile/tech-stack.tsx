"use client";

import { motion } from "framer-motion";
import { DS, b } from "@/lib/ds";
import { techStack, allTech } from "@/data/techstack";
import { Icon } from "@iconify/react";

// ── Infinite marquee strip ──────────────────────────────────────────────
function Marquee() {
  // Duplicate for seamless loop
  const items = [...allTech, ...allTech];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: b,
        borderBottom: b,
        padding: "10px 0",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: `linear-gradient(90deg, ${DS.bg} 0%, transparent 80px, transparent calc(100% - 80px), ${DS.bg} 100%)`,
      }} />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 0, width: "max-content" }}
      >
        {items.map((tech, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "0 18px",
            }}>
              <Icon icon={tech.icon} style={{ color: tech.color, fontSize: 14 }} />
              <span style={{
                fontFamily: DS.font, fontSize: 10, color: DS.text2,
                whiteSpace: "nowrap",
              }}>
                {tech.name}
              </span>
            </div>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: tech.color, opacity: 0.6, flexShrink: 0 }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Category group ───────────────────────────────────────────────────────
function CategoryGroup({ category, color, items, index }: {
  category: string;
  color: string;
  items: { name: string, icon: string }[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.06 * index }}
      style={{ paddingBottom: 24 }}
    >
      {/* Category label */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span style={{ fontFamily: DS.font, fontSize: 8, color: DS.text3, letterSpacing: "0.12em" }}>
          {category.toUpperCase()}
        </span>
      </div>

      {/* Tech pills with icons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((item) => (
          <motion.div
            key={item.name}
            title={item.name}
            whileHover={{ color: DS.text, scale: 1.1, transition: { duration: 0.1 } }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 34, height: 34,
              color: DS.text2,
              cursor: "default",
              transition: "color 0.1s, transform 0.1s",
              background: DS.surf,
              borderRadius: 6,
            }}
          >
            <Icon icon={item.icon} style={{ color: color, fontSize: 16 }} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────
export function TechStack() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Section label */}
      <div style={{ padding: "0 24px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.12em" }}>
            TECH STACK
          </span>
          <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3 }}>
            {String(techStack.reduce((a, g) => a + g.items.length, 0)).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div style={{ marginBottom: 32 }}>
        <Marquee />
      </div>

      {/* Categorized grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-12" style={{ padding: "0 24px" }}>
        {techStack.map((group, i) => (
          <CategoryGroup
            key={group.category}
            category={group.category}
            color={group.color}
            items={group.items}
            index={i}
          />
        ))}
      </div>
    </motion.section>
  );
}
