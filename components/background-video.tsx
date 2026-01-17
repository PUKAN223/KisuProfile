"use client"

import { forwardRef, useState } from "react"
import styles from "./background-video.module.css"

interface BackgroundVideoProps {
  blurAmount?: number
  onVideoLoaded?: () => void
  isReady?: boolean
}

export const BackgroundVideo = forwardRef<HTMLVideoElement, BackgroundVideoProps>(
  ({ blurAmount = 8, onVideoLoaded, isReady = false }, ref) => {
    // Keep internal logic as fallback, but prefer isReady prop
    const [isLoaded, setIsLoaded] = useState(false)

    const handleLoaded = () => {
      setIsLoaded(true)
      if (onVideoLoaded) onVideoLoaded()
    }

    return (
      <video
        ref={ref}
        className={styles.video}
        style={{ 
          filter: `blur(${blurAmount}px)`,
          opacity: isReady || isLoaded ? 1 : 0 
        }}
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleLoaded}
        onCanPlay={handleLoaded}
        onCanPlayThrough={handleLoaded}
        onPlaying={handleLoaded}
      >
        <source src="/mv.mp4" type="video/mp4" />
      </video>
    )
  }
)

BackgroundVideo.displayName = "BackgroundVideo"
