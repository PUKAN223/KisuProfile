"use client";

import { useState, useRef, useEffect } from "react";
import { BackgroundVideo } from "@/components/background-video";
import { ProfileCard } from "@/components/profile-card";
import { CursorEffects } from "@/components/cursor-effects";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVolumeDialog, setShowVolumeDialog] = useState(false);
  const [blurAmount, setBlurAmount] = useState(50); // Start with higher blur
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Use HTMLAudioElement since BackgroundVideo forwards ref to audio
  const videoRef = useRef<HTMLAudioElement>(null);

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
    // Check if audio is already ready (e.g. from cache)
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }

    // Fallback: If audio doesn't load within 3 seconds (e.g. autoplay blocked), force load
    const fallbackTimer = setTimeout(() => {
      setIsVideoLoaded((prev) => {
        if (!prev) {
          console.log("Audio load fallback triggered");
          return true;
        }
        return prev;
      });
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Bangkok',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        setTime(formatter.format(now));
      } catch (e) {
        // Fallback if timezone invalid
        setTime(now.toLocaleTimeString('en-US', { hour12: false }));
      }
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

  // Format timer display
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background font-pixel text-foreground selection:bg-primary/20">
      <CursorEffects />
      <BackgroundVideo
        ref={videoRef}
        blurAmount={blurAmount}
        onVideoLoaded={() => setIsVideoLoaded(true)}
        isReady={isVideoLoaded}
        spotifyCover={null}
      />

      {/* Overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-black/40" />

      {/* Centered Content Container - Using Grid for robust centering */}
      <div className="fixed inset-0 z-20 grid place-items-center p-4">
        <div className="w-full max-w-[360px] mx-auto flex justify-center">
          <ProfileCard
            isMuted={isMuted}
            isPlaying={isPlaying}
            onToggleMute={toggleMute}
            onTogglePlay={togglePlay}
            videoRef={videoRef}
            isVideoLoaded={isVideoLoaded}
          />
        </div>
      </div>

      {!showVolumeDialog && (
        <>
          <div className="pointer-events-none fixed top-4 left-4 z-40 flex animate-in slide-in-from-left-10 fade-in duration-700 flex-col gap-1">
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/60 sm:text-xs">
              Bangkok
            </span>
            <span className="font-mono text-base font-bold tabular-nums text-white sm:text-lg">
              {time}
            </span>
          </div>

          <div className="fixed top-20 left-4 z-40 flex animate-in slide-in-from-left-10 fade-in duration-700 flex-col gap-1">
            <span className="pointer-events-none font-mono text-[10px] tracking-widest uppercase text-white/60 sm:text-xs">
              Session
            </span>
            <div className="flex items-center gap-3">
              <span className="min-w-16 pointer-events-none font-mono text-base font-bold tabular-nums text-white sm:text-lg">
                {formatTime(timer)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={isTimerRunning ? "Pause" : "Start"}
                >
                  {isTimerRunning ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimer(0);
                  }}
                  className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
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
            className="pointer-events-none bottom-56 fixed left-1/2 z-40 flex -translate-x-1/2 animate-bounce items-center gap-2 text-sm text-white/60 transition-opacity duration-300 sm:bottom-4"
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

          <div className="pointer-events-none fixed top-4 right-4 z-40 flex animate-in slide-in-from-right-10 fade-in duration-700 flex-col items-end gap-2 sm:top-auto sm:bottom-8 sm:right-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/60 sm:text-xs">
                blur intensity
              </span>
              <span className="w-12 text-right font-mono text-base font-bold text-white sm:text-lg">
                {Math.round((blurAmount / 20) * 100)}%
              </span>
            </div>
            <div className="h-1 w-32 overflow-hidden rounded-full border border-white/5 bg-white/10 backdrop-blur-md sm:h-1.5 sm:w-64">
              <div
                className="relative h-full bg-linear-to-r from-transparent via-white/80 to-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-none"
                style={{ width: `${Math.max((blurAmount / 20) * 100, 0)}%` }}
              >
                <div className="absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] sm:h-2 sm:w-2" />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
