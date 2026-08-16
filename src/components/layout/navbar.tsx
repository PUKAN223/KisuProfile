"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DS, b } from "@/lib/ds";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Education", href: "#education" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
];

export function Navbar() {
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple scroll spy
      const sections = NAV_ITEMS.map((item) => document.querySelector(item.href));
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement | null;
        if (section && section.offsetTop <= scrollPos) {
          setActive(NAV_ITEMS[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 24,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none", // Let clicks pass through the container
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "6px 8px",
          background: scrolled ? "rgba(12,12,12,0.85)" : "rgba(12,12,12,0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: b,
          borderRadius: 100,
          pointerEvents: "auto",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              style={{
                position: "relative",
                padding: "8px 16px",
                fontFamily: DS.font,
                fontSize: 10,
                color: isActive ? DS.text : DS.text3,
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color 0.2s",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = DS.text2;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = DS.text3;
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 100,
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.8 }}
                />
              )}
              {item.label}
            </a>
          );
        })}
      </nav>
    </motion.header>
  );
}
