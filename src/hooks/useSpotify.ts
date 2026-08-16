"use client";

import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";

export type SpotifyTrack = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progressMs: number;
  durationMs: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSpotify(): {
  track: SpotifyTrack | null;
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  progress: number;
  togglePlay: () => void;
  play: (uri?: string) => Promise<void>;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  queue: (uri: string) => Promise<void>;
} {
  // Poll currently playing every 2 seconds
  const { data, mutate } = useSWR<SpotifyTrack>("/api/spotify/now-playing", fetcher, {
    refreshInterval: 2000,
  });

  // Local state to smooth out progress bar between polls
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    if (data?.isPlaying && data.progressMs) {
      setLocalProgress(data.progressMs);
      const interval = setInterval(() => {
        setLocalProgress((prev) => Math.min(prev + 1000, data.durationMs || prev + 1000));
      }, 1000);
      return () => clearInterval(interval);
    } else if (data && !data.isPlaying) {
      setLocalProgress(data.progressMs || 0);
    }
  }, [data]);

  const controlPlayback = useCallback(async (action: string, uri?: string) => {
    try {
      await fetch("/api/spotify/player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, uri }),
      });
      // Optimistically mutate local state depending on action could be done here, 
      // but polling will catch up in ~2s
      setTimeout(() => mutate(), 500);
    } catch (e) {
      console.error(`Failed to ${action}`, e);
    }
  }, [mutate]);

  const play = useCallback((uri?: string) => controlPlayback("play", uri), [controlPlayback]);
  const pause = useCallback(() => controlPlayback("pause"), [controlPlayback]);
  const next = useCallback(() => controlPlayback("next"), [controlPlayback]);
  const prev = useCallback(() => controlPlayback("prev"), [controlPlayback]);
  const queue = useCallback((uri: string) => controlPlayback("queue", uri), [controlPlayback]);
  const togglePlay = useCallback(() => {
    if (data?.isPlaying) pause();
    else play();
  }, [data?.isPlaying, play, pause]);

  return {
    track: data?.title ? data : null,
    isPlaying: data?.isPlaying || false,
    progressMs: localProgress,
    durationMs: data?.durationMs || 0,
    progress: data?.durationMs ? localProgress / data.durationMs : 0,
    togglePlay,
    play,
    pause,
    next,
    prev,
    queue,
  };
}
