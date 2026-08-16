"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Play, Pause, SkipBack, SkipForward, Shuffle,
  Search, X, Volume2, Music2,
} from "lucide-react";
import { DS, b } from "@/lib/ds";
import type { useSpotify } from "@/hooks/useSpotify";

type Player = ReturnType<typeof useSpotify>;

interface MusicSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player: Player;
}

const formatTime = (ms: number) => {
  if (!isFinite(ms)) return "0:00";
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export function MusicSheet({ open, onOpenChange, player }: MusicSheetProps) {
  const {
    track, isPlaying, progress, progressMs, durationMs,
    togglePlay, next, prev, queue, play
  } = player;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.tracks) {
          setResults(data.tracks);
        }
      } catch (e) {
        console.error("Search failed", e);
      } finally {
        setSearching(false);
      }
    }, 500); // Debounce
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="p-0 flex flex-col"
        style={{
          height: "min(760px, 94svh)",
          background: DS.bg,
          borderTop: b,
          outline: "none",
        }}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Music Player — {track?.title || "Spotify"}</SheetTitle>
        </SheetHeader>

        {/* ── Drag handle + close ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px 0", flexShrink: 0 }}>
          <Music2 size={12} style={{ color: DS.text3 }} />
          <div style={{ width: 32, height: 4, background: DS.surf2, borderRadius: 2 }} />
          <button
            onClick={() => onOpenChange(false)}
            style={{ width: 28, height: 28, borderRadius: "50%", background: DS.surf2, border: "none", cursor: "pointer", color: DS.text2, display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Close"
          >
            <X size={13} />
          </button>
        </div>

        {/* ── Search ── */}
        <div style={{ padding: "14px 20px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, border: b, padding: "8px 12px", background: DS.surf }}>
            <Search size={12} style={{ color: DS.text3, flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search Spotify for tracks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                fontFamily: DS.font, fontSize: 11, color: DS.text,
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: DS.text3, display: "flex", alignItems: "center" }}>
                <X size={10} />
              </button>
            )}
          </div>
        </div>

        {/* ── Scrollable Area ── */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {/* ── Now Playing Block ── */}
          {query === "" && track && (
            <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
              {/* Album art */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                  style={{ width: "100%", aspectRatio: "1", overflow: "hidden", marginBottom: 20, position: "relative" }}
                >
                  <img src={track.albumImageUrl} alt={track.album} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {/* Animated bars when playing */}
                  {isPlaying && (
                    <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", gap: 3, alignItems: "flex-end" }}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [6, 18, 10, 22, 6] }}
                          transition={{ duration: 0.7 + i * 0.1, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                          style={{ width: 3, background: DS.text, borderRadius: 1, opacity: 0.9 }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Track info */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={track.title} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p style={{ fontFamily: DS.font, fontSize: 16, fontWeight: 600, color: DS.text, margin: "0 0 4px", letterSpacing: "-0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {track.title}
                      </p>
                      <p style={{ fontFamily: DS.font, fontSize: 11, color: DS.text2, margin: "0 0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {track.artist}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span style={{ fontFamily: DS.font, fontSize: 8, color: DS.text3, border: b, padding: "3px 8px", letterSpacing: "0.06em", flexShrink: 0, marginLeft: 12 }}>
                  Spotify
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: "100%", height: 6, background: DS.surf2, marginBottom: 8, position: "relative", borderRadius: 1 }}>
                <motion.div
                  style={{ height: "100%", background: DS.text, borderRadius: 1, transformOrigin: "left" }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3 }}>{formatTime(progressMs)}</span>
                <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3 }}>{formatTime(durationMs)}</span>
              </div>

              {/* Controls */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <button
                  style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: DS.text3 }}
                  aria-label="Shuffle"
                >
                  <Shuffle size={16} />
                </button>
                <button onClick={prev} style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: DS.text2 }} aria-label="Previous">
                  <SkipBack size={22} fill="currentColor" />
                </button>
                <button
                  onClick={togglePlay}
                  style={{ width: 64, height: 64, borderRadius: "50%", background: DS.text, color: DS.bg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.12s" }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.93)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" style={{ marginLeft: 2 }} />}
                </button>
                <button onClick={next} style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: DS.text2 }} aria-label="Next">
                  <SkipForward size={22} fill="currentColor" />
                </button>
                <button style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: DS.text3 }} aria-label="Volume">
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── Search Results ── */}
          {query !== "" && (
            <div style={{ padding: "8px 20px", flex: 1 }}>
              {searching ? (
                <p style={{ fontFamily: DS.font, fontSize: 11, color: DS.text3, padding: "24px 0", textAlign: "center" }}>
                  Searching Spotify...
                </p>
              ) : results.length === 0 ? (
                <p style={{ fontFamily: DS.font, fontSize: 11, color: DS.text3, padding: "24px 0", textAlign: "center" }}>
                  No tracks found on Spotify
                </p>
              ) : (
                results.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    onClick={() => play(t.uri)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 0", borderBottom: b,
                      cursor: "pointer", opacity: 0.85,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0.85")}
                  >
                    <div style={{ width: 44, height: 44, flexShrink: 0, overflow: "hidden", position: "relative" }}>
                      <img src={t.albumImageUrl} alt={t.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: DS.font, fontSize: 11, fontWeight: 400, color: DS.text, margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.title}
                      </p>
                      <p style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.artist}
                      </p>
                    </div>
                    <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, flexShrink: 0 }}>
                      {formatTime(t.durationMs)}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
