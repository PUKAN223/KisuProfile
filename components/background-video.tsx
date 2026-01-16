"use client"

import { forwardRef } from "react"
import styles from "./background-video.module.css"

interface BackgroundVideoProps {
  blurAmount?: number
}

export const BackgroundVideo = forwardRef<HTMLVideoElement, BackgroundVideoProps>(
  ({ blurAmount = 8 }, ref) => {
    return (
      <video
        ref={ref}
        className={styles.video}
        style={{ filter: `blur(${blurAmount}px)` }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/mv.mp4" type="video/mp4" />
      </video>
    )
  }
)

BackgroundVideo.displayName = "BackgroundVideo"
