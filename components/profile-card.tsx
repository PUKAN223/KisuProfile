"use client";

import { type RefObject, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { User, Calendar, GraduationCap, Code2, Sparkles, Heart, Music2, Music, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { SocialIcons } from "./social-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import styles from "./profile-card.module.css";

interface SpotifyData {
  is_playing: boolean;
  progress_ms: number;
  duration_ms: number;
  name: string;
  artists?: string;
  album?: string;
  cover?: string;
  url?: string;
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

interface ProfileCardProps {
  isMuted: boolean;
  isPlaying: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  videoRef: RefObject<HTMLMediaElement | null>;
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
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const fullText = "Coding is my life.";
  const userId = "889470463510712320";

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const fetchSpotify = async () => {
      let nextDelay = 15000;

      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const currentlyPlaying = Boolean(data?.is_playing);
          nextDelay = currentlyPlaying ? 5000 : 15000;

          if (!cancelled) {
            setSpotifyData(data);
          }
        } else if (!cancelled) {
          setSpotifyData(null);
        }
      } catch (error) {
        console.error("Spotify fetch error", error);
        if (!cancelled) {
          setSpotifyData(null);
        }
      } finally {
        if (!cancelled) {
          const delay = document.hidden ? 60000 : nextDelay;
          timer = setTimeout(fetchSpotify, delay);
        }
      }
    };

    fetchSpotify();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

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
      <Tooltip>
        <TooltipTrigger asChild>
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
            {spotifyData?.is_playing && (
              <div className="absolute bottom-0 right-0 bg-[#1DB954] text-black w-7 h-7 flex items-center justify-center rounded-full border-2 border-[#121212] z-20 shadow-[0_0_15px_rgba(29,185,84,0.6)] animate-in zoom-in duration-300">
                <Music size={13} className="animate-pulse" />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={10}
          className="bg-[#121212]/95 backdrop-blur-xl border border-white/10 text-white p-0 rounded-xl shadow-2xl overflow-hidden z-[60]"
        >
          {spotifyData?.is_playing ? (
            <div className="flex items-center gap-3 p-3 min-w-[220px] max-w-[260px]">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 shadow-lg border border-white/5">
                {spotifyData.cover && (
                  <Image src={spotifyData.cover} alt={spotifyData.name} fill className="object-cover" />
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1 py-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold truncate text-white leading-tight block">{spotifyData.name}</span>
                  <Music size={10} className="text-[#1DB954] shrink-0 animate-pulse" />
                </div>
                <span className="text-[10px] text-white/50 truncate font-medium block mt-0.5">{spotifyData.artists}</span>

                <div className="w-full bg-white/10 h-1 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full bg-[#1DB954] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(spotifyData.progress_ms / spotifyData.duration_ms) * 100}%` }}
                  />
                </div>                <div className="flex justify-between items-center mt-1 text-[9px] font-medium text-white/30 font-mono">
                  <span>{formatTime(spotifyData.progress_ms)}</span>
                  <span>{formatTime(spotifyData.duration_ms)}</span>
                </div>              </div>
            </div>
          ) : (
            <div className="p-3 text-xs font-medium text-white/50">Not playing anything...</div>
          )}
        </TooltipContent>
      </Tooltip>

      <div className={styles.nameSection}>
        <h1 className={styles.name}>Kisu X3</h1>
        <p className={styles.subtitle + " font-mono min-h-6"}>
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
              className={`${styles.revealContent} ${showContent ? styles.visible : ""
                }`}
            >
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 border border-white/10 rounded-xl">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Overview</TabsTrigger>
                  <TabsTrigger value="about" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">About Me</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className={styles.infoSection}>
                    <div className={styles.infoItem} title="That's me!">
                      <span className={styles.infoLabel}>
                        <User size={14} className="inline mr-2 text-blue-300" />
                        Name
                      </span>
                      <span className={styles.infoValue}>Pukan</span>
                    </div>
                    <div className={styles.infoItem} title="Current Age">
                      <span className={styles.infoLabel}>
                        <Calendar size={14} className="inline mr-2 text-purple-300" />
                        Age
                      </span>
                      <span className={styles.infoValue}>15</span>
                    </div>

                    <div className={styles.infoItem} title="Radio Control">
                      <span className={styles.infoLabel}>
                        <Music2 size={14} className="inline mr-2 text-green-300" />
                        Lofi Radio
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={onTogglePlay}
                          className="hover:text-white text-white/70 transition-colors"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        <button
                          onClick={onToggleMute}
                          className="hover:text-white text-white/70 transition-colors"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <SocialIcons />
                </TabsContent>

                <TabsContent value="about" className="mt-0 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl space-y-5 text-left h-[280px] overflow-y-auto scrollbar-hide">
                    <div className="space-y-2 group">
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:text-blue-300 transition-colors">
                        <Sparkles size={12} /> Bio
                      </h3>
                      <p className="text-sm text-white/80 leading-relaxed font-light border-l-2 border-blue-500/30 pl-3">
                        I am passionate about technology and programming. In my free time, I enjoy listening to music and playing games. I enjoy learning new technologies, building useful projects, and improving my problem-solving skills as a developer.
                      </p>
                    </div>

                    <div className="space-y-2 group">
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 group-hover:text-purple-300 transition-colors">
                        <Code2 size={12} /> Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map((tech, i) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 border border-blue-500/20 px-2 py-0.5 text-[10px] font-medium transition-all hover:scale-105"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 group-hover:text-pink-300 transition-colors">
                        <Heart size={12} /> Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {["Music", "Gaming", "Design", "Anime"].map((interest, i) => (
                          <Badge
                            key={interest}
                            variant="outline"
                            className="border-white/10 text-white/60 hover:text-white/80 hover:bg-white/5 px-2 py-0.5 text-[10px] font-medium transition-all hover:scale-105 hover:border-pink-500/30"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
      </div>
    </div>
  );
}
