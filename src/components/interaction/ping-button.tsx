"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { DS, b } from "@/lib/ds";

type State = "idle" | "confirm" | "sending" | "done";

export function PingButton() {
  const [state, setState] = useState<State>("idle");

  const handleClick = () => {
    if (state === "idle") setState("confirm");
    else if (state === "confirm") {
      setState("sending");
      setTimeout(() => {
        setState("done");
        setTimeout(() => setState("idle"), 4000);
      }, 1400);
    }
  };

  const isDone    = state === "done";
  const isSending = state === "sending";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "40px 24px 48px" }}
    >
      {/* Large quiet heading */}
      <h2 style={{
        fontFamily: DS.font,
        fontSize: "clamp(18px, 5vw, 26px)",
        fontWeight: 600,
        color: isDone ? DS.teal : DS.text,
        letterSpacing: "-0.02em",
        lineHeight: 1.3,
        margin: "0 0 10px",
        transition: "color 0.3s",
      }}>
        {isDone ? "Ping received." : "Say hello."}
      </h2>

      <p style={{ fontFamily: DS.font, fontSize: 11, color: DS.text2, lineHeight: 1.9, margin: "0 0 28px", maxWidth: 260 }}>
        {isDone
          ? "I'll know you were here. I'll reach out."
          : "Send a ping — I'll know someone stopped by."}
      </p>

      {/* Button */}
      <button
        onClick={handleClick}
        disabled={isSending || isDone}
        style={{
          padding: "12px 24px",
          fontFamily: DS.font, fontSize: 11,
          letterSpacing: "0.06em",
          border: `1px solid ${isDone ? "rgba(38,198,168,0.35)" : state === "confirm" ? DS.border2 : DS.border}`,
          background: isDone ? "rgba(38,198,168,0.07)" : "transparent",
          color: isDone ? DS.teal : DS.text2,
          cursor: isSending || isDone ? "default" : "pointer",
          transition: "all 0.2s",
          display: "inline-flex", alignItems: "center", gap: 8,
          minWidth: 140,
        }}
        onMouseEnter={(e) => { if (!isSending && !isDone) (e.currentTarget.style.color = DS.text); }}
        onMouseLeave={(e) => { if (!isSending && !isDone) (e.currentTarget.style.color = DS.text2); }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Send a ping →
            </motion.span>
          )}
          {state === "confirm" && (
            <motion.span key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: DS.text }}>
              Confirm →
            </motion.span>
          )}
          {state === "sending" && (
            <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Loader2 size={11} className="animate-spin" />
              Sending
            </motion.span>
          )}
          {state === "done" && (
            <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Check size={11} />
              Sent
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Confirm hint */}
      <AnimatePresence>
        {state === "confirm" && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, marginTop: 10 }}
          >
            Tap again to confirm
          </motion.p>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
