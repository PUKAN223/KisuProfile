"use client"

import { useState, useRef, useEffect } from "react"
import { BackgroundVideo } from "@/components/background-video"
import { ProfileCard } from "@/components/profile-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import styles from "./page.module.css"

export default function Home() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showVolumeDialog, setShowVolumeDialog] = useState(true)
  const [blurAmount, setBlurAmount] = useState(50) // Start with higher blur
  const [scrollProgress, setScrollProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = window.innerHeight // defined scroll range
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)
      
      setScrollProgress(progress)
      
      // Blur moves from 20px down to 0px
      const maxBlur = 20
      const newBlur = Math.max(0, maxBlur - (progress * maxBlur))
      setBlurAmount(newBlur)
    }

    // Initial call
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAllowVolume = () => {
    setShowVolumeDialog(false)
    setIsMuted(false)
    if (videoRef.current) {
      videoRef.current.muted = false
    }
  }

  const handleDenyVolume = () => {
    setShowVolumeDialog(false)
    setIsMuted(true)
    if (videoRef.current) {
      videoRef.current.muted = true
    }
  }

  return (
    <main className={styles.main}>
      <BackgroundVideo ref={videoRef} blurAmount={blurAmount} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <ProfileCard
          isMuted={isMuted}
          isPlaying={isPlaying}
          onToggleMute={toggleMute}
          onTogglePlay={togglePlay}
          videoRef={videoRef}
        />
      </div>

      {!showVolumeDialog && (
        <>
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 text-white/60 text-sm flex items-center gap-2 animate-bounce transition-opacity duration-300 pointer-events-none" 
               style={{ opacity: scrollProgress > 0.9 ? 0 : 1 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span>Scroll to adjust blur</span>
          </div>
          
          <div className="fixed top-4 right-4 sm:top-auto sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-2 animate-in slide-in-from-right-10 fade-in duration-700 pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-[10px] sm:text-xs font-mono uppercase tracking-widest">blur intensity</span>
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
        </>
      )}

      <AlertDialog open={showVolumeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Allow Audio?</AlertDialogTitle>
            <AlertDialogDescription>
              This website uses background music. Would you like to enable audio?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDenyVolume}>No, keep muted</AlertDialogCancel>
            <AlertDialogAction onClick={handleAllowVolume}>Yes, allow audio</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
