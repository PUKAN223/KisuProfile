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
  onSpotifyChange: (isPlaying: boolean, data: SpotifyData | null) => void
}

interface SpotifyData {
  is_playing: boolean
  progress_ms: number
  duration_ms: number
  name: string
  artists?: string
  album?: string
  cover?: string
  url?: string
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function MusicManager({ isMuted, isPlaying, onToggleMute, onTogglePlay, videoRef, onSpotifyChange }: MusicManagerProps) {
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(100)
  const [showVolume, setShowVolume] = useState(false)
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null)
  
  // Fetch Spotify data
  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/now-playing")
        if (res.ok) {
          const data = await res.json()
          if (onSpotifyChange) {
            setSpotifyData(data)
            onSpotifyChange(data?.is_playing ?? false, data)
          }
        }
      } catch (error) {
        console.error("Spotify fetch error", error)
        if (onSpotifyChange) onSpotifyChange(false, null)
      }
    }

    // Initial fetch
    fetchSpotify()

    // Poll every 5 seconds for quicker updates
    const interval = setInterval(fetchSpotify, 5000)
    return () => clearInterval(interval)
  }, [onSpotifyChange])


  // Removed timeout auto-close logic in favor of hover

  useEffect(() => {
    // If Spotify is playing, we might calculate progress differently or not show video progress
    if (spotifyData?.is_playing) return

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
      {spotifyData?.is_playing ? (
        // Spotify playing UI - Modern Clean Version
        <div className="flex flex-col w-full px-2">
          {/* Top Row: Cover, Info, Visualizer */}
           <div className="flex items-center gap-4 w-full mb-3">
            {spotifyData.cover && (
              <div className="relative group shrink-0">
                <img 
                  src={spotifyData.cover} 
                  alt="Album Art" 
                  className="w-14 h-14 rounded-lg object-cover shadow-[0_8px_16px_-4px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 pointer-events-none" />
                
                {/* Playing Icon Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-lg backdrop-blur-[2px]">
                   <div className="flex items-end gap-[3px] h-4">
                     {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-white rounded-full animate-music-bar" 
                          style={{ 
                            animationDelay: `${i * 0.15}s`,
                          }} 
                        />
                     ))}
                   </div>
                 </div>
              </div>
            )}
            
            <div className="flex flex-col flex-1 min-w-0 justify-center gap-0.5">
              <div className="flex items-center gap-2">
                <a 
                  href={spotifyData.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`${styles.trackTitle} hover:text-green-400 transition-colors truncate text-base font-bold text-white tracking-tight`}
                >
                  {spotifyData.name}
                </a>
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              </div>
              <span className={`${styles.trackStatus} truncate text-sm text-white/60 font-medium`}>
                {spotifyData.artists || "Spotify"}
              </span>
            </div>

            {/* Spotify Icon / Visualizer */}
             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1DB954]/10 text-[#1DB954]">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                 <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.6 1.44.6.36.841 1.14.481 1.74-.36.6-1.14.84-1.74.48z"/>
               </svg>
             </div>
          </div>
          
          {/* Progress Bar & Timers */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden relative">
               <div className="absolute inset-0 bg-white/5" />
               <div 
                 className="bg-white h-full rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                 style={{ width: `${(spotifyData.progress_ms / spotifyData.duration_ms) * 100}%` }}
               >
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
               </div>
            </div>
            
             <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-white/30 px-0.5">
               <span>{formatTime(spotifyData.progress_ms)}</span>
               <span>-{formatTime(spotifyData.duration_ms - spotifyData.progress_ms)}</span>
             </div>
          </div>
        </div>
      ) : (
        // Default Video UI
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
      )}

      {!spotifyData?.is_playing && (
        <div className={styles.progressWrapper}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Only show video controls if Spotify is NOT playing */}
      {!spotifyData?.is_playing && (
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
      )}
    </div>
  )
}
