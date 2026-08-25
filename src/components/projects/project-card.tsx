"use client";

import { motion } from "framer-motion";
import { DS, b } from "@/lib/ds";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  link: string;
}

// Deterministic tilt + offset per card index
const CARD_STYLES = [
  { rotate: -2.2, x: 6, originY: "top" },
  { rotate: 1.8, x: -10, originY: "bottom" },
  { rotate: -1.2, x: 4, originY: "top" },
  { rotate: 2.5, x: -6, originY: "bottom" },
  { rotate: -0.8, x: 8, originY: "top" },
];

export function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const tilt = CARD_STYLES[index % CARD_STYLES.length];

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 24, rotate: tilt.rotate * 1.8 }}
      animate={{ opacity: 1, y: 0, rotate: tilt.rotate }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 160, damping: 20 }}
      whileHover={{ rotate: 0, y: -6, transition: { duration: 0.22 } }}
      whileTap={{ scale: 0.97 }}
      style={{
        translateX: tilt.x,
        transformOrigin: `50% ${tilt.originY === "top" ? "0%" : "100%"}`,
        cursor: "pointer",
        position: "relative",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <div
        className="transition-all duration-300 bg-[#121212]/85 group-hover:bg-[#1e1e1e]/90 border border-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md"
        style={{
          padding: "20px 20px 18px",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{
            fontFamily: DS.font, fontSize: 13, fontWeight: 600,
            color: DS.text, margin: 0, lineHeight: 1.3,
          }}>
            {project.title}
          </h3>
          <ArrowUpRight
            size={14}
            className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
            style={{ color: DS.text3, flexShrink: 0, marginLeft: 12, marginTop: 1 }}
          />
        </div>

        {/* Description */}
        <p style={{
          fontFamily: DS.font, fontSize: 10, color: DS.text2,
          margin: "0 0 14px", lineHeight: 1.75,
        }}>
          {project.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.technologies.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: DS.font, fontSize: 8,
                color: DS.text3, border: b,
                padding: "3px 9px", letterSpacing: "0.05em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
