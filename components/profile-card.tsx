"use client";

import { type RefObject, useEffect, useState } from "react";
import Image from "next/image";
import { SocialIcons } from "./social-icons";
import { MusicManager } from "./music-manager";
import styles from "./profile-card.module.css";

interface ProfileCardProps {
  isMuted: boolean;
  isPlaying: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  isVideoLoaded?: boolean;
}

export function ProfileCard(
  { isMuted, isPlaying, onToggleMute, onTogglePlay, videoRef, isVideoLoaded = false }:
    ProfileCardProps,
) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [typedText, setTypedText] = useState("");
  const fullText = "Coding is my life.";
  const userId = "889470463510712320";

  useEffect(() => {
    // Fetch Discord Avatar via Lanyard API
    const fetchDiscordAvatar = async () => {
      try {
        const response = await fetch(
          `https://api.lanyard.rest/v1/users/${userId}`,
        );
        const data = await response.json();
        if (data.success && data.data.discord_user.avatar) {
          const { id, avatar } = data.data.discord_user;
          // Construct avatar URL (supports animated gifs if available, but using png for safety/consistency)
          const isGif = avatar.startsWith("a_");
          const extension = isGif ? "gif" : "png";
          setAvatarUrl(
            `https://cdn.discordapp.com/avatars/${id}/${avatar}.${extension}`,
          );
        }
      } catch (error) {
        console.log("Failed to fetch Discord avatar:", error);
      }
    };

    fetchDiscordAvatar().then(() => {
      setIsAvatarLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isAvatarLoaded && isVideoLoaded) {
      const loadTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(loadTimer);
    }
  }, [isAvatarLoaded, isVideoLoaded]);

  useEffect(() => {
    if (!isLoading) {
      const showTimer = setTimeout(() => {
        setShowContent(true);
      }, 50);
      return () => clearTimeout(showTimer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (showContent && isPlaying) {
      if (typedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [showContent, isPlaying, typedText]);

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarGlow} />
        <div className={styles.avatarBorder} />
        <Image
          src={avatarUrl || "/profile.jpg"}
          alt="Profile"
          width={100}
          height={100}
          className={styles.avatar}
          priority
        />
      </div>

      <div className={styles.nameSection}>
        <h1 className={styles.name}>Kisu X3</h1>
        <p className={styles.subtitle + " font-mono min-h-[24px]"}>
          {typedText}
          {!isLoading && typedText.length < fullText.length && (
            <span className="animate-pulse inline-block ml-1 w-2 h-4 bg-white/50 align-middle"></span>
          )}
        </p>
      </div>

      <div className={styles.contentArea}>
        {isLoading
          ? (
            <div className={styles.loader}>
              <div className={styles.loaderBar} />
            </div>
          )
          : (
            <div
              className={`${styles.revealContent} ${
                showContent ? styles.visible : ""
              }`}
            >
              <SocialIcons />
            </div>
          )}
      </div>
    </div>
  );
}
