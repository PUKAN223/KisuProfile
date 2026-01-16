"use client"

import { forwardRef, useState } from "react"
import styles from "./background-video.module.css"

interface BackgroundVideoProps {
  blurAmount?: number
}

export const BackgroundVideo = forwardRef<HTMLVideoElement, BackgroundVideoProps>(
  ({ blurAmount = 8 }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
      <video
        ref={ref}
        className={styles.video}
        style={{ 
          filter: `blur(${blurAmount}px)`,
          opacity: isLoaded ? 1 : 0 
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={() => setIsLoaded(true)}
        onWaiting={() => setIsLoaded(false)}
        onPlaying={() => setIsLoaded(true)}
      >
        <source src="/mv.mp4" type="video/mp4" />
      </video>
    )
  }
)

BackgroundVideo.displayName = "BackgroundVideo"
