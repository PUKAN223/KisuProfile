"use client";

import { useState, useRef, useEffect } from "react";
import { BackgroundVideo } from "@/components/background-video";
import { ProfileCard } from "@/components/profile-card";
import { Portfolio } from "@/components/portfolio";
import { EducationTimeline } from "@/components/education-timeline";
import { ViewCounter } from "@/components/view-counter";
import { CursorEffects } from "@/components/cursor-effects"

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Section visibility states
  const [activeSection, setActiveSection] = useState<'hero' | 'timeline' | 'portfolio'>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check if video is already ready (e.g. from cache)
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Calculate scroll progress for hero fade out (0 -> 1 as we approach 50vh)
      const heroProgress = Math.min(scrollY / (0.5 * vh), 1);
      setScrollProgress(heroProgress);

      // Determine active section based on scroll position
      if (scrollY < 0.4 * vh) {
        setActiveSection('hero');
      } else if (scrollY >= 0.4 * vh && scrollY < 1.6 * vh) {
        setActiveSection('timeline');
      } else {
        setActiveSection('portfolio');
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Remove dependency to prevent re-attaching listener

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

  return (
    <main className="relative w-screen h-[300vh] block scrollbar-hide">
      <CursorEffects />
      <ViewCounter />
      <BackgroundVideo
        ref={videoRef}
        blurAmount={activeSection !== 'hero' ? 20 : 0}
        onVideoLoaded={() => setIsVideoLoaded(true)}
        isReady={isVideoLoaded}
        spotifyCover={null}
      />

      <div className="fixed inset-0 bg-linear-to-br from-black/70 via-[#141428]/80 to-black/70 backdrop-blur-md z-10" />

      {/* Hero Section */}
      <div
        className="fixed inset-0 z-20 grid place-items-center p-4"
        style={{
          opacity: activeSection === 'hero' ? 1 : 0,
          pointerEvents: activeSection === 'hero' ? 'auto' : 'none'
        }}
      >
        <div
          className="transition-all duration-700 ease-in-out"
          style={{
            transform: `translateY(-${scrollProgress * 50}px) scale(${1 - scrollProgress * 0.1})`
          }}
        >
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

      {/* Education Timeline Section */}
      <EducationTimeline visible={activeSection === 'timeline'} />

      {/* Portfolio Section */}
      <Portfolio visible={activeSection === 'portfolio'} />

      {/* Scroll Indicator (Only visible on Hero) */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce cursor-pointer z-50 pointer-events-none transition-opacity duration-300 ${activeSection === 'hero' ? "opacity-100" : "opacity-0"
          }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>

    </main>
  );
}
