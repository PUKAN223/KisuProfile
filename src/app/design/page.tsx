"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────
const FONT = "'JetBrains Mono', ui-monospace, monospace";

const C = {
  bg:       "#0c0c0c",
  surface:  "#141414",
  surface2: "#1e1e1e",
  border:   "rgba(255,255,255,0.07)",
  border2:  "rgba(255,255,255,0.13)",
  text:     "#f0f0f0",
  text2:    "#888888",
  text3:    "#444444",
  blue:     "#8892a4",
  pink:     "#f06292",
  purple:   "#9575cd",
  teal:     "#26c6a8",
  amber:    "#ffb74d",
  red:      "#ef4444",
} as const;

// ─── Clean SVG Illustrations (no glow, no gradients) ─────────────────

function IllustrationGrid() {
  const cols = 14, rows = 8;
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background grid */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * 20}
            y={r * 20}
            width={19}
            height={19}
            fill="none"
            stroke={C.border}
            strokeWidth="0.5"
          />
        ))
      )}
      {/* Highlighted cells — blue accent */}
      {[[2,1],[3,1],[4,1],[2,2],[4,2],[2,3],[3,3],[4,3]].map(([c,r]) => (
        <rect key={`h-${r}-${c}`} x={c*20} y={r*20} width={19} height={19} fill={C.blue} fillOpacity="0.12" stroke={C.blue} strokeOpacity="0.35" strokeWidth="0.5" />
      ))}
      {/* Teal accent cells */}
      {[[8,4],[9,4],[10,4],[8,5],[10,5]].map(([c,r]) => (
        <rect key={`t-${r}-${c}`} x={c*20} y={r*20} width={19} height={19} fill={C.teal} fillOpacity="0.08" stroke={C.teal} strokeOpacity="0.3" strokeWidth="0.5" />
      ))}
      {/* Corner dots */}
      <circle cx="80" cy="60" r="2" fill={C.blue} fillOpacity="0.9" />
      <circle cx="200" cy="100" r="2" fill={C.teal} fillOpacity="0.9" />
      <circle cx="140" cy="20" r="1.5" fill={C.purple} fillOpacity="0.7" />
    </svg>
  );
}

function IllustrationTerminal() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Window frame */}
      <rect x="8" y="8" width="264" height="144" fill="#141414" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
      {/* Title bar */}
      <rect x="8" y="8" width="264" height="28" fill="#1e1e1e" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
      {/* Traffic lights — as squares, no circles */}
      <rect x="20" y="18" width="8" height="8" fill={C.red} fillOpacity="0.6" />
      <rect x="32" y="18" width="8" height="8" fill={C.amber} fillOpacity="0.6" />
      <rect x="44" y="18" width="8" height="8" fill={C.teal} fillOpacity="0.6" />
      {/* Title */}
      <text x="140" y="26" textAnchor="middle" fontSize="8" fill={C.text3} fontFamily={FONT}>terminal</text>
      {/* Prompt lines */}
      <text x="20" y="52" fontSize="8" fill={C.teal} fontFamily={FONT}>$</text>
      <text x="30" y="52" fontSize="8" fill={C.text2} fontFamily={FONT}>npm run dev</text>
      <text x="20" y="66" fontSize="8" fill={C.text3} fontFamily={FONT}>▲ Next.js 16.3.1 ready on :3000</text>
      <text x="20" y="80" fontSize="8" fill={C.text3} fontFamily={FONT}>✓ Compiled in 475ms</text>
      <text x="20" y="94" fontSize="8" fill={C.teal} fontFamily={FONT}>$</text>
      {/* Blinking cursor rect */}
      <rect x="30" y="86" width="6" height="10" fill={C.blue} fillOpacity="0.85" />
      {/* Horizontal separator */}
      <line x1="20" y1="108" x2="260" y2="108" stroke={C.border} strokeWidth="0.5" strokeDasharray="4 4" />
      <text x="20" y="122" fontSize="7" fill={C.text3} fontFamily={FONT}>Local:   http://localhost:3000</text>
      <text x="20" y="134" fontSize="7" fill={C.text3} fontFamily={FONT}>Network: http://192.168.1.1:3000</text>
    </svg>
  );
}

function IllustrationSchema() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Three connected boxes */}
      {/* Box 1 */}
      <rect x="10" y="55" width="70" height="50" fill="#1e1e1e" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
      <rect x="10" y="55" width="70" height="14" fill="#8892a4" fillOpacity="0.15" strokeWidth="0" />
      <text x="45" y="65" textAnchor="middle" fontSize="7" fill={C.blue} fontFamily={FONT}>profile</text>
      <text x="18" y="79" fontSize="6.5" fill={C.text3} fontFamily={FONT}>name: str</text>
      <text x="18" y="90" fontSize="6.5" fill={C.text3} fontFamily={FONT}>role: str</text>
      <text x="18" y="101" fontSize="6.5" fill={C.text3} fontFamily={FONT}>status: enum</text>
      {/* Box 2 */}
      <rect x="105" y="20" width="70" height="60" fill="#1e1e1e" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
      <rect x="105" y="20" width="70" height="14" fill={C.teal} fillOpacity="0.12" strokeWidth="0" />
      <text x="140" y="30" textAnchor="middle" fontSize="7" fill={C.teal} fontFamily={FONT}>projects</text>
      <text x="113" y="44" fontSize="6.5" fill={C.text3} fontFamily={FONT}>id: uuid</text>
      <text x="113" y="55" fontSize="6.5" fill={C.text3} fontFamily={FONT}>title: str</text>
      <text x="113" y="66" fontSize="6.5" fill={C.text3} fontFamily={FONT}>stack: str[]</text>
      <text x="113" y="77" fontSize="6.5" fill={C.text3} fontFamily={FONT}>status: enum</text>
      {/* Box 3 */}
      <rect x="105" y="100" width="70" height="50" fill="#1e1e1e" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
      <rect x="105" y="100" width="70" height="14" fill={C.purple} fillOpacity="0.12" strokeWidth="0" />
      <text x="140" y="110" textAnchor="middle" fontSize="7" fill={C.purple} fontFamily={FONT}>music</text>
      <text x="113" y="124" fontSize="6.5" fill={C.text3} fontFamily={FONT}>track: str</text>
      <text x="113" y="135" fontSize="6.5" fill={C.text3} fontFamily={FONT}>progress: f32</text>
      {/* Connectors */}
      <line x1="80" y1="75" x2="105" y2="50" stroke={C.border2} strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="80" y1="85" x2="105" y2="125" stroke={C.border2} strokeWidth="0.75" strokeDasharray="3 3" />
      {/* Arrow heads */}
      <polygon points="103,47 108,52 113,47" fill={C.border2} />
      <polygon points="103,128 108,122 113,128" fill={C.border2} />
      {/* Box 4 */}
      <rect x="210" y="55" width="60" height="50" fill="#1e1e1e" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
      <rect x="210" y="55" width="60" height="14" fill={C.amber} fillOpacity="0.1" strokeWidth="0" />
      <text x="240" y="65" textAnchor="middle" fontSize="7" fill={C.amber} fontFamily={FONT}>ping</text>
      <text x="218" y="79" fontSize="6.5" fill={C.text3} fontFamily={FONT}>state: enum</text>
      <text x="218" y="90" fontSize="6.5" fill={C.text3} fontFamily={FONT}>ts: datetime</text>
      <line x1="175" y1="50" x2="210" y2="68" stroke={C.border2} strokeWidth="0.75" strokeDasharray="3 3" />
      <polygon points="208,65 213,70 218,65" fill={C.border2} />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────

const COLORS: { name: string; hex: string; role: string; on: string }[] = [
  { name: "bg",       hex: "#080c12",              role: "Page background",    on: C.text2  },
  { name: "surface",  hex: "#0d1420",              role: "Card / panel",       on: C.text2  },
  { name: "surface2", hex: "#111927",              role: "Nested surface",     on: C.text2  },
  { name: "border",   hex: "rgba(255,255,255,.07)",role: "Default border",     on: C.text3  },
  { name: "text",     hex: "#eef2f7",              role: "Primary text",       on: C.surface },
  { name: "text2",    hex: "#7a8fa8",              role: "Secondary text",     on: C.surface },
  { name: "text3",    hex: "#3d5165",              role: "Muted / disabled",   on: C.surface },
  { name: "blue",     hex: "#4a9eff",              role: "Primary accent",     on: C.bg     },
  { name: "teal",     hex: "#26c6a8",              role: "Success / active",   on: C.bg     },
  { name: "purple",   hex: "#9575cd",              role: "Secondary accent",   on: C.bg     },
  { name: "pink",     hex: "#f06292",              role: "Highlight",          on: C.bg     },
  { name: "amber",    hex: "#ffb74d",              role: "Warning",            on: C.bg     },
];

const TYPE_SCALE = [
  { label: "display",  size: 36, weight: 700 },
  { label: "heading-1",size: 24, weight: 600 },
  { label: "heading-2",size: 18, weight: 600 },
  { label: "heading-3",size: 14, weight: 500 },
  { label: "body",     size: 13, weight: 400 },
  { label: "small",    size: 11, weight: 400 },
  { label: "label",    size: 11, weight: 500, upper: true },
];

const SPACING = [2, 4, 8, 12, 16, 24, 32, 48, 64, 96];

// ─── Primitives ───────────────────────────────────────────────────────

const BORDER_CARD = `1px solid ${C.border}`;
const BORDER_STRONG = `1px solid ${C.border2}`;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: FONT, fontSize: 10, color: C.text3, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
      {children}
    </p>
  );
}

function SectionDivider({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
      <span style={{ fontFamily: FONT, fontSize: 10, color: C.blue, letterSpacing: "0.1em" }}>{num}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
      <span style={{ fontFamily: FONT, fontSize: 10, color: C.text3, letterSpacing: "0.1em", textTransform: "uppercase" }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FONT }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header style={{ borderBottom: BORDER_CARD }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px 56px" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontFamily: FONT, fontSize: 10, color: C.blue, letterSpacing: "0.12em" }}>KISU / DESIGN-SYSTEM</span>
              <span style={{ fontFamily: FONT, fontSize: 10, color: C.text3, border: BORDER_CARD, padding: "2px 8px" }}>v1.0</span>
            </div>

            <h1 style={{ fontFamily: FONT, fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: C.text, lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Design System
            </h1>

            <p style={{ fontFamily: FONT, fontSize: 13, color: C.text2, maxWidth: 480, lineHeight: 1.75, marginBottom: 32 }}>
              Tokens, type, components, and illustrations.<br />
              Everything in JetBrains Mono. No glow. No noise.
            </p>

            {/* Navigation pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["color", "typography", "spacing", "components", "illustration", "elevation"].map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  style={{ fontFamily: FONT, fontSize: 11, color: C.text3, border: BORDER_CARD, padding: "6px 12px", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.15s, border-color 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.border2; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.text3; e.currentTarget.style.borderColor = C.border; }}
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────── */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px", display: "flex", flexDirection: "column", gap: 80 }}>

        {/* 01 · Color */}
        <Section id="color">
          <SectionDivider num="01" title="Color" />
          <Label>Palette · click to copy hex</Label>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 2, border: BORDER_CARD }}>
            {COLORS.map((col) => (
              <button
                key={col.name}
                onClick={() => copy(col.hex)}
                style={{ display: "flex", flexDirection: "column", textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: 0 }}
              >
                {/* Swatch */}
                <div style={{ width: "100%", height: 48, background: col.hex, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {copied === col.hex && (
                    <span style={{ fontFamily: FONT, fontSize: 9, color: col.name === "bg" || col.name === "surface" || col.name === "surface2" || col.name === "border" ? C.text2 : C.bg }}>
                      copied
                    </span>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: "10px 12px", background: C.surface, borderTop: BORDER_CARD }}>
                  <p style={{ fontFamily: FONT, fontSize: 11, color: C.text, marginBottom: 2 }}>{col.name}</p>
                  <p style={{ fontFamily: FONT, fontSize: 9, color: C.text3 }}>{col.role}</p>
                </div>
              </button>
            ))}
          </div>
        </Section>

        {/* 02 · Typography */}
        <Section id="typography">
          <SectionDivider num="02" title="Typography" />
          <Label>JetBrains Mono — all weights</Label>

          <div style={{ border: BORDER_CARD, background: C.surface, overflow: "hidden" }}>
            {TYPE_SCALE.map((t, i) => (
              <div
                key={t.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 20,
                  padding: "16px 20px",
                  borderBottom: i < TYPE_SCALE.length - 1 ? BORDER_CARD : "none",
                  background: i % 2 === 0 ? C.surface : C.bg,
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 9, color: C.text3, width: 80, flexShrink: 0, letterSpacing: "0.06em" }}>
                  {t.size}px/{t.weight}
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: t.size,
                    fontWeight: t.weight,
                    color: C.text,
                    flex: 1,
                    lineHeight: 1.2,
                    textTransform: t.upper ? "uppercase" : "none",
                    letterSpacing: t.upper ? "0.12em" : t.size > 18 ? "-0.02em" : "0",
                  }}
                >
                  {t.upper ? "LABEL UPPERCASE" : t.size > 18 ? "The quick brown fox" : t.label}
                </span>
                <span style={{ fontFamily: FONT, fontSize: 9, color: C.text3, flexShrink: 0 }}>{t.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 03 · Spacing */}
        <Section id="spacing">
          <SectionDivider num="03" title="Spacing" />
          <Label>4px base unit</Label>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SPACING.map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontFamily: FONT, fontSize: 9, color: C.text3, width: 32, textAlign: "right", flexShrink: 0 }}>{s}</span>
                <div style={{ width: s * 2, height: 14, background: C.surface2, border: BORDER_CARD, flexShrink: 0 }}>
                  <div style={{ width: "100%", height: "100%", background: C.blue, opacity: 0.25 }} />
                </div>
                <span style={{ fontFamily: FONT, fontSize: 9, color: C.text3 }}>px</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 04 · Components */}
        <Section id="components">
          <SectionDivider num="04" title="Components" />

          {/* Buttons */}
          <Label>Button</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
            {[
              { label: "Primary",     bg: C.blue,    color: C.bg,    border: C.blue },
              { label: "Ghost",       bg: "none",    color: C.blue,  border: C.blue, opacity: 0.4 },
              { label: "Surface",     bg: C.surface2,color: C.text,  border: C.border2 },
              { label: "Destructive", bg: "none",    color: C.red,   border: C.red, opacity: 0.35 },
              { label: "Muted",       bg: "none",    color: C.text3, border: C.border },
            ].map((b) => (
              <button
                key={b.label}
                style={{
                  fontFamily: FONT, fontSize: 11, padding: "8px 16px",
                  background: b.bg === "none" ? "transparent" : b.bg,
                  color: b.color, cursor: "pointer",
                  border: `1px solid ${b.border}`, opacity: 1,
                  letterSpacing: "0.05em",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Badges */}
          <Label>Badge</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
            {[
              { label: "active",    bg: "rgba(38,198,168,0.1)",  color: C.teal,   border: "rgba(38,198,168,0.3)"  },
              { label: "building",  bg: "rgba(74,158,255,0.1)",  color: C.blue,   border: "rgba(74,158,255,0.3)"  },
              { label: "archived",  bg: "transparent",           color: C.text3,  border: C.border                },
              { label: "new",       bg: "rgba(240,98,146,0.1)",  color: C.pink,   border: "rgba(240,98,146,0.3)"  },
              { label: "warning",   bg: "rgba(255,183,77,0.1)",  color: C.amber,  border: "rgba(255,183,77,0.3)"  },
            ].map((b) => (
              <span
                key={b.label}
                style={{ fontFamily: FONT, fontSize: 10, padding: "4px 10px", background: b.bg, color: b.color, border: `1px solid ${b.border}`, letterSpacing: "0.08em" }}
              >
                {b.label}
              </span>
            ))}
          </div>

          {/* Status indicators */}
          <Label>Status</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
            {[
              { label: "● online",   color: C.teal   },
              { label: "● building", color: C.blue   },
              { label: "● idle",     color: C.amber  },
              { label: "● offline",  color: C.text3  },
            ].map((s) => (
              <span key={s.label} style={{ fontFamily: FONT, fontSize: 11, color: s.color, letterSpacing: "0.05em" }}>
                {s.label}
              </span>
            ))}
          </div>

          {/* Input */}
          <Label>Input</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320, marginBottom: 40 }}>
            <input
              type="text"
              placeholder="Type something..."
              style={{ fontFamily: FONT, fontSize: 12, padding: "10px 12px", background: C.surface, border: BORDER_CARD, color: C.text, outline: "none" }}
            />
            <input
              type="text"
              defaultValue="kisu.dev"
              style={{ fontFamily: FONT, fontSize: 12, padding: "10px 12px", background: C.surface, border: `1px solid ${C.blue}`, color: C.text, outline: "none", opacity: 0.7 }}
            />
          </div>

          {/* Cards */}
          <Label>Card</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 1, background: C.border, border: BORDER_CARD }}>
            {/* Project card */}
            <div style={{ padding: 20, background: C.surface, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.text }}>Fastory</span>
                <span style={{ fontFamily: FONT, fontSize: 9, color: C.teal, border: `1px solid rgba(38,198,168,0.3)`, padding: "2px 8px", letterSpacing: "0.08em" }}>active</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 11, color: C.text2, lineHeight: 1.65 }}>AI business assistant — build, automate, scale.</p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {["Next.js", "Elysia", "MCP"].map((t) => (
                  <span key={t} style={{ fontFamily: FONT, fontSize: 9, color: C.text3, background: C.bg, border: BORDER_CARD, padding: "3px 8px", letterSpacing: "0.05em" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* Music card */}
            <div style={{ padding: 20, background: C.surface, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, background: C.surface2, border: BORDER_CARD, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: FONT, fontSize: 14, color: C.text3 }}>♪</span>
                </div>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 12, fontWeight: 500, color: C.text }}>Blinding Lights</p>
                  <p style={{ fontFamily: FONT, fontSize: 10, color: C.text3, marginTop: 2 }}>The Weeknd</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ height: 2, background: C.surface2, border: BORDER_CARD }}>
                  <div style={{ width: "42%", height: "100%", background: C.blue }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: FONT, fontSize: 9, color: C.text3 }}>1:44</span>
                  <span style={{ fontFamily: FONT, fontSize: 9, color: C.text3 }}>4:10</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 05 · Illustration */}
        <Section id="illustration">
          <SectionDivider num="05" title="Illustration" />
          <Label>SVG illustration language — geometric, no glow</Label>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 1, background: C.border, border: BORDER_CARD, marginBottom: 24 }}>
            {[
              { svg: <IllustrationGrid />,     label: "grid / cells" },
              { svg: <IllustrationTerminal />, label: "terminal / code" },
              { svg: <IllustrationSchema />,   label: "schema / relations" },
            ].map(({ svg, label }) => (
              <div key={label} style={{ background: C.surface, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ height: 160 }}>{svg}</div>
                <span style={{ fontFamily: FONT, fontSize: 10, color: C.text3, letterSpacing: "0.08em", textAlign: "center" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 1, background: C.border, border: BORDER_CARD }}>
            {[
              ["Flat geometry only",    "no gradients, no glow, no blur"],
              ["Grid-based composition","all elements on a logical grid"],
              ["Mono text in SVGs",     "JetBrains Mono inside illustrations"],
              ["Max 3 accent colors",   "blue, teal, purple preferred"],
            ].map(([title, desc]) => (
              <div key={title} style={{ padding: "16px 20px", background: C.surface }}>
                <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 500, color: C.text, marginBottom: 6 }}>{title}</p>
                <p style={{ fontFamily: FONT, fontSize: 10, color: C.text3, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 06 · Elevation */}
        <Section id="elevation">
          <SectionDivider num="06" title="Elevation" />
          <Label>Layering via surface color — no shadow effects</Label>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {[
              { name: "bg",         color: C.bg,       label: "Page bg" },
              { name: "surface",    color: C.surface,  label: "Card" },
              { name: "surface-2",  color: C.surface2, label: "Nested" },
              { name: "border",     color: "transparent", label: "Border stroke", isBorder: true },
              { name: "border-2",   color: "transparent", label: "Border active",  isBorder2: true },
            ].map((e) => (
              <div key={e.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 72, height: 72,
                    background: (e as any).isBorder || (e as any).isBorder2 ? C.surface : e.color,
                    border: (e as any).isBorder2 ? BORDER_STRONG : BORDER_CARD,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: FONT, fontSize: 9, color: C.text3 }}>{e.name}</span>
                </div>
                <span style={{ fontFamily: FONT, fontSize: 9, color: C.text3, letterSpacing: "0.06em" }}>{e.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer style={{ borderTop: BORDER_CARD, paddingTop: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.text }}>KISU / DESIGN-SYSTEM</p>
              <p style={{ fontFamily: FONT, fontSize: 10, color: C.text3, marginTop: 4, letterSpacing: "0.06em" }}>
                JetBrains Mono · Dark · No glow · v1.0
              </p>
            </div>
            <a
              href="/"
              style={{ fontFamily: FONT, fontSize: 10, color: C.text3, textDecoration: "none", border: BORDER_CARD, padding: "8px 16px", letterSpacing: "0.06em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.text3)}
            >
              ← back to site
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
