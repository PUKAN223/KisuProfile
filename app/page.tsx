"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { BackgroundVideo } from "@/components/background-video";
import { ProfileCard } from "@/components/profile-card";
import { MusicManager } from "@/components/music-manager";
import { ViewCounter } from "@/components/view-counter";
import { CursorEffects } from "@/components/cursor-effects"
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
import styles from "./page.module.css";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVolumeDialog, setShowVolumeDialog] = useState(true);
  const [blurAmount, setBlurAmount] = useState(50); // Start with higher blur
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [spotifyPlaying, setSpotifyPlaying] = useState(false);
  const [spotifyCover, setSpotifyCover] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if video is already ready (e.g. from cache)
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Use blur effect based on scroll
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

  const handleSpotifyChange = useCallback((isPlaying: boolean, data: any) => {
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

  return (
    <main className={styles.main}>
      <CursorEffects />
      <ViewCounter />
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
          <div
            className={`fixed left-1/2 -translate-x-1/2 sm:bottom-4 z-40 text-white/60 text-sm flex items-center gap-2 animate-bounce transition-opacity duration-300 pointer-events-none ${
              spotifyPlaying ? "bottom-40" : "bottom-56"
            }`}
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

          <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-8 sm:left-8 z-40 sm:w-80 animate-in slide-in-from-left-10 fade-in duration-700">
            <div className={`transition-all duration-500 ease-out backdrop-blur-xl rounded-2xl border px-5 py-4 shadow-2xl w-full ${
              spotifyPlaying 
              ? "bg-black/40 border-white/10 hover:bg-black/50" 
              : "bg-black/20 border-white/5 hover:bg-black/30"
            }`}>
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

      <AlertDialog open={showVolumeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Allow Audio?</AlertDialogTitle>
            <AlertDialogDescription>
              This website uses background music. Would you like to enable
              audio?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDenyVolume}>
              No, keep muted
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAllowVolume}>
              Yes, allow audio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
