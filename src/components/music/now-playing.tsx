"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipBack, SkipForward, Play, Pause, ChevronUp, Music2 } from "lucide-react";
import { useSpotify } from "@/hooks/useSpotify";
import { MusicSheet } from "./music-sheet";
import { DS, b } from "@/lib/ds";

const formatTime = (ms: number) => {
  if (!isFinite(ms)) return "0:00";
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export function NowPlaying() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const player = useSpotify();
  const { track, isPlaying, progress, progressMs, durationMs } = player;

  // Render dummy if no track playing
  if (!track) {
    return (
      <div style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Music2 size={9} style={{ color: DS.text3 }} />
          <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.12em" }}>
            NOT PLAYING
          </span>
        </div>
        <div style={{ border: b, background: "rgba(20,20,20,0.7)", padding: "16px", borderRadius: 8 }}>
          <p style={{ fontFamily: DS.font, fontSize: 10, color: DS.text3, margin: 0 }}>
            Spotify is currently offline.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: "0 24px" }}
      >
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Music2 size={9} style={{ color: DS.text3 }} />
          <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.12em" }}>
            NOW PLAYING
          </span>
        </div>

        {/* Player card */}
        <motion.div
          whileHover={{ borderColor: DS.border2 }}
          style={{
            border: b,
            background: "rgba(20,20,20,0.7)",
            backdropFilter: "blur(12px)",
            overflow: "hidden",
            borderRadius: 8,
          }}
        >
          {/* Main row */}
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => setSheetOpen(true)}
          >
            {/* Art */}
            <div style={{ width: 64, height: 64, flexShrink: 0, position: "relative", overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={track.title}
                  src={track.albumImageUrl}
                  alt={track.album}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </AnimatePresence>
              {/* Playing pulse overlay */}
              {isPlaying && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-start", padding: 4 }}>
                  <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 10, 6, 12, 4] }}
                        transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 2, background: DS.text, borderRadius: 1, opacity: 0.8 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0, padding: "0 12px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <p style={{ fontFamily: DS.font, fontSize: 11, fontWeight: 500, color: DS.text, margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {track.title}
                  </p>
                  <p style={{ fontFamily: DS.font, fontSize: 9, color: DS.text2, margin: "0 0 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {track.artist}
                  </p>
                  <span style={{ fontFamily: DS.font, fontSize: 7, color: DS.text3, border: b, padding: "1px 6px", letterSpacing: "0.06em" }}>
                    Spotify
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Expand */}
            <ChevronUp size={13} style={{ color: DS.text3, flexShrink: 0, marginRight: 12 }} />
          </div>

          {/* Progress bar */}
          <div style={{ height: 2, background: "rgba(255,255,255,0.07)", position: "relative" }}>
            <motion.div
              style={{ height: "100%", background: DS.text2, transformOrigin: "left" }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          </div>

          {/* Controls row */}
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ fontFamily: DS.font, fontSize: 8, color: DS.text3 }}>{formatTime(progressMs)}</span>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button onClick={player.prev} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: DS.text3 }} aria-label="Previous">
                <SkipBack size={13} fill="currentColor" />
              </button>
              <button
                onClick={player.togglePlay}
                style={{ width: 32, height: 32, borderRadius: "50%", background: DS.text, color: DS.bg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.1s" }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" style={{ marginLeft: 1 }} />}
              </button>
              <button onClick={player.next} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: DS.text3 }} aria-label="Next">
                <SkipForward size={13} fill="currentColor" />
              </button>
            </div>

            <span style={{ fontFamily: DS.font, fontSize: 8, color: DS.text3 }}>{formatTime(durationMs)}</span>
          </div>
        </motion.div>
      </motion.div>

      <MusicSheet open={sheetOpen} onOpenChange={setSheetOpen} player={player} />
    </>
  );
}
