"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { BackgroundVideo } from "@/components/background-video";
import { ProfileCard } from "@/components/profile-card";
import { MusicManager } from "@/components/music-manager";
import { ViewCounter } from "@/components/view-counter";
import { CursorEffects } from "@/components/cursor-effects";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import styles from "../page.module.css";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVolumeDialog, setShowVolumeDialog] = useState(false);
  const [blurAmount, setBlurAmount] = useState(50); // Start with higher blur
  const [spotifyPlaying, setSpotifyPlaying] = useState(false);
  const [spotifyCover, setSpotifyCover] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    // Check if video is already ready (e.g. from cache)
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Bangkok',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(formatter.format(now));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight; // defined scroll range
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      setScrollProgress(progress);

      // Blur moves from 20px down to 0px
      const maxBlur = 20;
      const newBlur = Math.max(0, maxBlur - progress * maxBlur);
      setBlurAmount(newBlur);
    };

    // Initial call
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAllowVolume = () => {
    setShowVolumeDialog(false);
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const handleDenyVolume = () => {
    setShowVolumeDialog(false);
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  const handleSpotifyChange = useCallback((isPlaying: boolean, data: any) => {
    console.log("Spotify State:", isPlaying, data);
    setSpotifyPlaying(isPlaying);
    if (isPlaying && data?.cover) {
      setSpotifyCover(data.cover);
      // Auto mute local video if spotify is playing
      if (videoRef.current && !videoRef.current.muted) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    } else {
      setSpotifyCover(null);
    }
  }, []);

  return (
    <main className={styles.main}>
      <CursorEffects />
      <BackgroundVideo
        ref={videoRef}
        blurAmount={blurAmount}
        onVideoLoaded={() => setIsVideoLoaded(true)}
        isReady={isVideoLoaded}
        spotifyCover={spotifyPlaying ? spotifyCover : null}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <ProfileCard
          isMuted={isMuted}
          isPlaying={isPlaying}
          onToggleMute={toggleMute}
          onTogglePlay={togglePlay}
          videoRef={videoRef}
          isVideoLoaded={isVideoLoaded}
        />
      </div>
      {!showVolumeDialog && (
        <>
          <div className="fixed top-4 left-4 z-40 flex flex-col gap-1 animate-in slide-in-from-left-10 fade-in duration-700 pointer-events-none">
            <span className="text-white/60 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
              Bangkok
            </span>
            <span className="text-white font-mono text-base sm:text-lg font-bold tabular-nums">
              {time}
            </span>
          </div>

          <div className="fixed top-20 left-4 z-40 flex flex-col gap-1 animate-in slide-in-from-left-10 fade-in duration-700">
            <span className="text-white/60 text-[10px] sm:text-xs font-mono uppercase tracking-widest pointer-events-none">
              Session
            </span>
            <div className="flex items-center gap-3">
              <span className="text-white font-mono text-base sm:text-lg font-bold tabular-nums pointer-events-none min-w-[60px]">
                {(() => {
                  const h = Math.floor(timer / 3600);
                  const m = Math.floor((timer % 3600) / 60);
                  const s = timer % 60;
                  if (h > 0) {
                    return `${h.toString().padStart(2, "0")}:${m
                      .toString()
                      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
                  }
                  return `${m.toString().padStart(2, "0")}:${s
                    .toString()
                    .padStart(2, "0")}`;
                })()}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  aria-label={isTimerRunning ? "Pause" : "Start"}
                >
                  {isTimerRunning ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimer(0);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  aria-label="Reset"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="fixed bottom-42 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 text-white/60 text-sm flex items-center gap-2 animate-bounce transition-opacity duration-300 pointer-events-none"
            style={{ opacity: scrollProgress > 0.9 ? 0 : 1 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span>Scroll to adjust blur</span>
          </div>

          <div className="fixed top-4 right-4 sm:top-auto sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-2 animate-in slide-in-from-right-10 fade-in duration-700 pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
                blur intensity
              </span>
              <span className="text-white font-mono text-base sm:text-lg font-bold w-12 text-right">
                {Math.round((blurAmount / 20) * 100)}%
              </span>
            </div>
            <div className="w-32 sm:w-64 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-transparent via-white/80 to-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-none relative"
                style={{ width: `${Math.max((blurAmount / 20) * 100, 0)}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
              </div>
            </div>
          </div>

          <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-8 sm:left-8 z-40 sm:w-72 animate-in slide-in-from-left-10 fade-in duration-700">
            <div className="bg-black/20 backdrop-blur-md rounded-xl border border-white/10 px-4 py-4 shadow-lg w-full">
              <MusicManager
                isMuted={isMuted}
                isPlaying={isPlaying}
                onToggleMute={toggleMute}
                onTogglePlay={togglePlay}
                videoRef={videoRef}
                onSpotifyChange={handleSpotifyChange}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
