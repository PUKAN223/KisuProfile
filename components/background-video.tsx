"use client"

import { forwardRef, useState } from "react"
import styles from "./background-video.module.css"

interface BackgroundVideoProps {
  blurAmount?: number
  onVideoLoaded?: () => void
  isReady?: boolean
  spotifyCover?: string | null
  initialized?: boolean
}

export const BackgroundVideo = forwardRef<HTMLVideoElement, BackgroundVideoProps>(
  ({ blurAmount = 8, onVideoLoaded, isReady = false, spotifyCover = null, initialized = true }, ref) => {
    // Keep internal logic as fallback, but prefer isReady prop
    const [isLoaded, setIsLoaded] = useState(false)

    const handleLoaded = () => {
      setIsLoaded(true)
      if (onVideoLoaded) onVideoLoaded()
    }

    // Determine opacity for video: hidden if cover exists
    // Ensure spotifyCover is treated as boolean for this check
    // If not initialized, everything is hidden (opacity 0)
    const hasCover = !!spotifyCover;
    const videoOpacity = initialized 
      ? (hasCover ? 0 : (isReady || isLoaded ? 1 : 0))
      : 0;

    return (
      <>
        <video
          ref={ref}
          className={styles.video}
          style={{ 
            filter: `blur(${blurAmount}px)`,
            opacity: videoOpacity,
            transition: 'opacity 1s ease-in-out, filter 0.5s ease-out'
          }}
          autoPlay={false} 
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

        <div 
          className={styles.video} // Reuse same positioning class
          style={{
            zIndex: 0, // Same level
            backgroundImage: hasCover ? `url(${spotifyCover})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: hasCover ? 1 : 0,
            filter: `blur(${Math.max(8, blurAmount)}px) brightness(0.6)`,
            transform: 'translate(-50%, -50%) scale(1.1)', // Match video positioning + scale
            transition: 'opacity 1s ease-in-out',
            width: '100vw',
            height: '100vh',
          }}
        />
      </>
    )
  }
)

BackgroundVideo.displayName = "BackgroundVideo"
