"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, FolderOpen, Music2, Send } from "lucide-react";
import { DS, b } from "@/lib/ds";

const ITEMS = [
  { icon: Home,       label: "Home",     id: "home"    },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Music2,     label: "Music",    id: "music"   },
  { icon: Send,       label: "Ping",     id: "ping"    },
];

export function BottomNavigation() {
  const [active, setActive] = useState("home");

  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        height: 56,
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        background: "rgba(12,12,12,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: b,
      }}
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 4, background: "none", border: "none", cursor: "pointer",
              color: isActive ? DS.text : DS.text3,
              transition: "color 0.15s",
              position: "relative",
            }}
            aria-label={item.label}
          >
            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                style={{
                  position: "absolute", top: 6, width: 3, height: 3,
                  borderRadius: "50%", background: DS.text,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
            <span style={{ fontFamily: DS.font, fontSize: 8, letterSpacing: "0.08em" }}>
              {item.label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}
