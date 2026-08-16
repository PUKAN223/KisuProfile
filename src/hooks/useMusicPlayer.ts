"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { playlist, type Track } from "@/data/music";

export function useMusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying]           = useState(false);
  const [progressSec, setProgressSec]   = useState(0);
  const [shuffle, setShuffle]           = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = playlist[currentIndex];

  // Auto-progress when playing
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setProgressSec((prev) => {
        if (prev >= track.durationSec - 1) {
          // Auto advance
          setCurrentIndex((i) => (i + 1) % playlist.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, currentIndex, track.durationSec]);

  const play = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgressSec(0);
    setPlaying(true);
  }, []);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  const next = useCallback(() => {
    if (shuffle) {
      const next = Math.floor(Math.random() * playlist.length);
      setCurrentIndex(next);
    } else {
      setCurrentIndex((i) => (i + 1) % playlist.length);
    }
    setProgressSec(0);
  }, [shuffle]);

  const prev = useCallback(() => {
    if (progressSec > 3) {
      setProgressSec(0);
    } else {
      setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
      setProgressSec(0);
    }
  }, [progressSec]);

  const seek = useCallback((sec: number) => setProgressSec(sec), []);

  const progress = track.durationSec > 0 ? progressSec / track.durationSec : 0;

  const formatTime = (sec: number) => {
    if (!isFinite(sec) || sec >= 3600) return "∞";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    playlist,
    track,
    currentIndex,
    playing,
    progressSec,
    progress,
    shuffle,
    togglePlay,
    toggleShuffle: () => setShuffle((s) => !s),
    play,
    next,
    prev,
    seek,
    elapsed: formatTime(progressSec),
    duration: formatTime(track.durationSec),
  };
}
