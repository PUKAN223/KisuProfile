"use client"

import { useState, useEffect, type RefObject } from "react"
import Image from "next/image"
import { SocialIcons } from "./social-icons"
import { MusicManager } from "./music-manager"
import styles from "./profile-card.module.css"

interface ProfileCardProps {
  isMuted: boolean
  isPlaying: boolean
  onToggleMute: () => void
  onTogglePlay: () => void
  videoRef: RefObject<HTMLVideoElement | null>
}

export function ProfileCard({ isMuted, isPlaying, onToggleMute, onTogglePlay, videoRef }: ProfileCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(loadTimer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const showTimer = setTimeout(() => {
        setShowContent(true)
      }, 50)
      return () => clearTimeout(showTimer)
    }
  }, [isLoading])

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarGlow} />
        <div className={styles.avatarBorder} />
        <Image src="/profile.jpg" alt="Profile" width={100} height={100} className={styles.avatar} priority />
      </div>

      <div className={styles.nameSection}>
        <h1 className={styles.name}>Kisu X3</h1>
        <p className={styles.subtitle}>Coding is my life.</p>
      </div>

      <div className={styles.contentArea}>
        {isLoading ? (
          <div className={styles.loader}>
            <div className={styles.loaderBar} />
          </div>
        ) : (
          <div className={`${styles.revealContent} ${showContent ? styles.visible : ""}`}>
            <SocialIcons />
            <MusicManager
              isMuted={isMuted}
              isPlaying={isPlaying}
              onToggleMute={onToggleMute}
              onTogglePlay={onTogglePlay}
              videoRef={videoRef}
            />
          </div>
        )}
      </div>
    </div>
  )
}
