"use client"

import { useState, useEffect, type RefObject } from "react"
import { Slider } from "@/components/ui/slider"
import styles from "./music-manager.module.css"
import React from "react"

interface MusicManagerProps {
  isMuted: boolean
  isPlaying: boolean
  onToggleMute: () => void
  onTogglePlay: () => void
  videoRef: RefObject<HTMLVideoElement | null>
}

export function MusicManager({ isMuted, isPlaying, onToggleMute, onTogglePlay, videoRef }: MusicManagerProps) {
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(100)
  const [showVolume, setShowVolume] = useState(false)
  
  // Removed timeout auto-close logic in favor of hover

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    // Initialize volume
    setVolume(video.volume * 100)

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("volumechange", () => setVolume(video.volume * 100))
    return () => {
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("volumechange", () => setVolume(video.volume * 100))
    }
  }, [videoRef])

  const adjustVolume = (delta: number) => {
    let newVolume = volume + delta
    if (newVolume > 100) newVolume = 100
    if (newVolume < 0) newVolume = 0

    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
      if (newVolume > 0 && videoRef.current.muted) {
        videoRef.current.muted = false
      }
    }
  }

  const handleMuteToggle = () => {
    onToggleMute()
  }

  return (
    <div className={styles.container}>
      <div className={styles.trackRow}>
        <div className={styles.trackInfo}>
          <span className={styles.trackTitle}>青のすみか</span>
          <span className={styles.trackStatus}>{isPlaying ? "Playing" : "Paused"}</span>
        </div>
        <div className={`${styles.playingIndicator} ${!isPlaying ? styles.paused : ""}`}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      </div>

      <div className={styles.progressWrapper}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.controls}>
        <div 
          className="flex items-center" 
          onMouseEnter={() => setShowVolume(true)} 
          onMouseLeave={() => setShowVolume(false)}
        >
          <div 
            className={`flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden ${
              showVolume ? "w-[120px] opacity-100 translate-x-0 mr-2" : "w-0 opacity-0 -translate-x-4 mr-0"
            }`}
          >
            <button 
              onClick={() => adjustVolume(-5)} 
              className={styles.volBtn}
              aria-label="Decrease Volume"
            >
             <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>
            </button>
            
            <span className={styles.volValue}>{Math.round(volume)}%</span>

            <button 
              onClick={() => adjustVolume(5)} 
              className={styles.volBtn}
              aria-label="Increase Volume"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
          </div>
          <button onClick={handleMuteToggle} className={styles.controlBtn} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
        <button
          onClick={onTogglePlay}
          className={`${styles.controlBtn} ${styles.playBtn} ml-4`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
