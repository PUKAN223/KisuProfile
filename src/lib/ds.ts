// ─── Shared design-system tokens (mirrors globals.css) ───────────────
export const DS = {
  bg:      "#0c0c0c",
  surf:    "#141414",
  surf2:   "#1e1e1e",
  border:  "rgba(255,255,255,0.07)",
  border2: "rgba(255,255,255,0.13)",
  text:    "#f0f0f0",
  text2:   "#888888",
  text3:   "#444444",
  teal:    "#26c6a8",
  purple:  "#9575cd",
  pink:    "#f06292",
  amber:   "#ffb74d",
  red:     "#ef4444",
  font:    "'JetBrains Mono', ui-monospace, monospace",
} as const;

export const b = `1px solid ${DS.border}`;
export const b2 = `1px solid ${DS.border2}`;
