"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cursor-effects.module.css";

interface Ripple {
  x: number;
  y: number;
  id: number;
  isTouch?: boolean;
}

export function CursorEffects() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Detect touch capability once on mount
    isTouchDevice.current = "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    const addRipple = (x: number, y: number, isTouch = false) => {
      const newRipple: Ripple = {
        x,
        y,
        id: Date.now() + Math.random(),
        isTouch,
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, isTouch ? 600 : 1000);
    };

    // ── Mouse handlers (desktop only) ──────────────────────────────────────
    const moveCursor = (e: MouseEvent) => {
      if (isTouchDevice.current) return;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (isTouchDevice.current) return;
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);
      addRipple(e.clientX, e.clientY, false);
    };

    // ── Touch handler (mobile only) ─────────────────────────────────────────
    const handleTouchStart = (e: TouchEvent) => {
      isTouchDevice.current = true;
      // One ripple per touch point
      Array.from(e.changedTouches).forEach((touch) => {
        addRipple(touch.clientX, touch.clientY, true);
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <>
      {/* Custom cursor — only rendered / visible on non-touch devices */}
      {!isTouchDevice.current && (
        <>
          <div
            className={`${styles.cursor} ${isClicking ? styles.clicking : ""}`}
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />
          <div
            className={styles.cursorDot}
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />
        </>
      )}

      {/* Ripples — mouse click on desktop, touch on mobile */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={ripple.isTouch ? styles.tapRipple : styles.ripple}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </>
  );
}
