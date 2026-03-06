"use client"

import { forwardRef, useState, useEffect } from "react"
import Image from "next/image"
import styles from "./background-video.module.css"

interface BackgroundVideoProps {
  blurAmount?: number
  onVideoLoaded?: () => void
  isReady?: boolean
  spotifyCover?: string | null
  initialized?: boolean
}

export const BackgroundVideo = forwardRef<HTMLAudioElement, BackgroundVideoProps>(
  ({ blurAmount = 8, onVideoLoaded, isReady = false, spotifyCover = null, initialized = true }, ref) => {
    // Keep internal logic as fallback, but prefer isReady prop
    const [isLoaded, setIsLoaded] = useState(false)

    const handleLoaded = () => {
      setIsLoaded(true)
      if (onVideoLoaded) onVideoLoaded()
    }

    // Determine opacity. If not initialized, everything hidden.
    // If spotify cover is present, hide the background image.
    // Otherwise show background image if ready/loaded.
    const hasCover = !!spotifyCover;
    const opacity = initialized
      ? (hasCover ? 0 : (isReady || isLoaded ? 1 : 0))
      : 0;

    return (
      <>
        {/* Audio Element for Lo-Fi Sound */}
        <audio
          ref={ref}
          autoPlay
          loop
          src="/lofi.mp3"
          onCanPlay={handleLoaded} // Consider loaded when audio can play? Or image?
        />

        {/* Background Image (replacing MV) */}
        <div
          className={styles.video}
          style={{
            filter: `blur(${blurAmount}px)`,
            opacity: opacity,
            transition: 'opacity 1s ease-in-out, filter 0.5s ease-out'
          }}
        >
          <Image
            src="/background.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
            onLoad={handleLoaded} // Trigger loaded when image is ready
          />
        </div>

        {/* Spotify Cover Overlay */}
        <div
          className={styles.video} // Reuse same positioning class
          style={{
            zIndex: 0, // Same level
            backgroundImage: hasCover ? `url(${spotifyCover})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: hasCover ? 1 : 0,
            filter: `blur(${Math.max(8, blurAmount)}px) brightness(0.6)`,
            transform: 'translate(-50%, -50%) scale(1.1)', // Match positioning
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
