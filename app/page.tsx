"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BackgroundVideo } from "@/components/background-video";
import { ProfileCard } from "@/components/profile-card";
import { Portfolio } from "@/components/portfolio";
import { StatsFmShowcase } from "@/components/stats-fm-showcase";
import { EducationTimeline } from "@/components/education-timeline";
import { ViewCounter } from "@/components/view-counter";
import { CursorEffects } from "@/components/cursor-effects";
import { IntroScreen } from "@/components/intro-screen";

type Section = "hero" | "timeline" | "portfolio" | "music";
const SECTIONS: Section[] = ["hero", "timeline", "portfolio", "music"];

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [siteVisible, setSiteVisible] = useState(false);
  const [introAvatarUrl, setIntroAvatarUrl] = useState("");

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLAudioElement>(null);

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({
    hero: null,
    timeline: null,
    portfolio: null,
    music: null,
  });
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);

  // Wheel debounce
  const wheelAccumRef = useRef(0);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch tracking
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);

  // Scrolling visibility timer
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Discord avatar prefetch ───────────────────────────────────────────────
  useEffect(() => {
    const userId = "889470463510712320";
    fetch(`https://api.lanyard.rest/v1/users/${userId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data.discord_user.avatar) {
          const { id, avatar } = data.data.discord_user;
          const ext = avatar.startsWith("a_") ? "gif" : "png";
          setIntroAvatarUrl(
            `https://cdn.discordapp.com/avatars/${id}/${avatar}.${ext}`,
          );
        }
      })
      .catch(() => {});
  }, []);

  // ── Audio init ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  useEffect(() => {
    const audio = videoRef.current;
    if (!audio) return;

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "touchstart",
    ];

    const handleFirstInteraction = () => {
      audio.muted = false;
      setIsMuted(false);
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
      events.forEach((e) =>
        window.removeEventListener(e, handleFirstInteraction)
      );
    };

    audio.muted = false;
    setIsMuted(false);
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        audio.muted = true;
        setIsMuted(true);
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
        events.forEach((e) =>
          window.addEventListener(e, handleFirstInteraction, { once: true })
        );
      });

    return () => {
      events.forEach((e) =>
        window.removeEventListener(e, handleFirstInteraction)
      );
    };
  }, []);

  // ── Show nav, then hide after idle ───────────────────────────────────────
  const triggerScrolling = useCallback(() => {
    setIsScrolling(true);
    if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
    scrollIdleTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1200);
  }, []);

  // ── Core: go to section by index ─────────────────────────────────────────
  const goToIndex = useCallback(
    (nextIndex: number, instant = false) => {
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, nextIndex));
      if (clamped === currentIndexRef.current && !instant) return;
      if (isAnimatingRef.current && !instant) return;

      const section = SECTIONS[clamped];
      const el = sectionRefs.current[section];
      if (!el || !scrollRef.current) return;

      currentIndexRef.current = clamped;
      setActiveSectionIndex(clamped);
      setActiveSection(section);

      if (instant) {
        scrollRef.current.scrollTop = el.offsetTop;
        return;
      }

      isAnimatingRef.current = true;
      triggerScrolling();

      // Smoothly animate scrollTop ourselves using requestAnimationFrame
      // for consistent cross-browser feel (avoids native smooth-scroll quirks)
      const container = scrollRef.current;
      const from = container.scrollTop;
      const to = el.offsetTop;
      const distance = to - from;
      const duration = 620; // ms — feel free to tune
      const startTime = performance.now();

      // Ease: cubic-bezier approx of (0.76, 0, 0.24, 1) — fast start, smooth settle
      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        container.scrollTop = from + distance * ease(progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          container.scrollTop = to;
          // Small buffer before accepting the next navigation
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 80);
        }
      };

      requestAnimationFrame(step);
    },
    [],
  );

  // ── Wheel handler — accumulate delta, fire once per gesture ──────────────
  useEffect(() => {
    if (!siteVisible) return;

    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Ignore tiny trackpad noise
      const delta = e.deltaY;
      wheelAccumRef.current += delta;

      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);

      // Fire after 60 ms of no further wheel events
      wheelTimerRef.current = setTimeout(() => {
        const accum = wheelAccumRef.current;
        wheelAccumRef.current = 0;

        if (Math.abs(accum) < 20) return; // dead zone

        triggerScrolling();
        const dir = accum > 0 ? 1 : -1;
        goToIndex(currentIndexRef.current + dir);
      }, 60);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [siteVisible, goToIndex]);

  // ── Touch handler — swipe up/down ─────────────────────────────────────────
  useEffect(() => {
    if (!siteVisible) return;

    const container = scrollRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartYRef.current - e.changedTouches[0].clientY;
      const dx = touchStartXRef.current - e.changedTouches[0].clientX;

      // Only act on predominantly vertical swipes
      if (Math.abs(dy) < Math.abs(dx)) return;
      // Minimum swipe threshold
      if (Math.abs(dy) < 40) return;

      triggerScrolling();
      const dir = dy > 0 ? 1 : -1;
      goToIndex(currentIndexRef.current + dir);
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [siteVisible, goToIndex]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    if (!siteVisible) return;

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        triggerScrolling();
        goToIndex(currentIndexRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        triggerScrolling();
        goToIndex(currentIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [siteVisible, goToIndex]);

  // ── IntersectionObserver — passive sync (low threshold = responsive) ──────
  useEffect(() => {
    if (!siteVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isAnimatingRef.current) return;
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        }
        if (best) {
          const id = (best.target as HTMLElement).dataset.section as Section;
          if (id) {
            const idx = SECTIONS.indexOf(id);
            if (idx !== -1 && idx !== currentIndexRef.current) {
              currentIndexRef.current = idx;
              setActiveSectionIndex(idx);
              setActiveSection(id);
            }
          }
        }
      },
      {
        root: scrollRef.current,
        // Fire as soon as any part crosses — we only update when not animating
        threshold: [0.3, 0.5, 0.7],
      },
    );

    SECTIONS.forEach((s) => {
      const el = sectionRefs.current[s];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [siteVisible]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Intro */}
      {!introComplete && (
        <IntroScreen
          onComplete={() => {
            setIntroComplete(true);
            setSiteVisible(true);
            // Snap scroll container to top without animation on reveal
            if (scrollRef.current) scrollRef.current.scrollTop = 0;
          }}
          onExiting={() => setSiteVisible(true)}
          avatarUrl={introAvatarUrl}
        />
      )}

      <CursorEffects />
      <ViewCounter />

      {/* Background */}
      <BackgroundVideo
        ref={videoRef}
        blurAmount={activeSection !== "hero" ? 20 : 0}
        onVideoLoaded={() => setIsVideoLoaded(true)}
        isReady={isVideoLoaded}
        spotifyCover={null}
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-linear-to-br from-black/70 via-[#141428]/80 to-black/70 backdrop-blur-md z-10"
        style={{
          opacity: siteVisible ? 1 : 0,
          transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* ── Scroll container — overflow hidden; we drive scrollTop manually ── */}
      <div
        ref={scrollRef}
        className="fixed inset-0 z-20 overflow-hidden scrollbar-hide"
        // Disable all native scroll so only our rAF loop moves it
        style={{ touchAction: "none" }}
      >
        {/* Hero */}
        <section
          ref={(el) => {
            sectionRefs.current.hero = el;
          }}
          data-section="hero"
          className="relative w-full flex items-center justify-center"
          style={{ height: "100dvh", minHeight: "100dvh" }}
        >
          <div
            style={{
              transform: siteVisible
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.96)",
              opacity: siteVisible ? (activeSection === "hero" ? 1 : 0) : 0,
              filter: siteVisible && activeSection === "hero"
                ? "blur(0px)"
                : "blur(6px)",
              transition: siteVisible
                ? "transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.45s cubic-bezier(0.4,0,0.2,1), filter 0.45s ease"
                : "none",
              pointerEvents: siteVisible && activeSection === "hero"
                ? "auto"
                : "none",
            }}
          >
            <ProfileCard
              isMuted={isMuted}
              isPlaying={isPlaying}
              onToggleMute={toggleMute}
              onTogglePlay={togglePlay}
              videoRef={videoRef}
              isVideoLoaded={isVideoLoaded}
            />
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none"
            style={{
              opacity: siteVisible && activeSection === "hero" ? 1 : 0,
              transform: siteVisible && activeSection === "hero"
                ? "translateY(0)"
                : "translateY(8px)",
              transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
            }}
          >
            <div className="flex flex-col items-center gap-1.5 text-white/25">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase">
                scroll
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section
          ref={(el) => {
            sectionRefs.current.timeline = el;
          }}
          data-section="timeline"
          className="relative w-full"
          style={{ height: "100dvh", minHeight: "100dvh" }}
        >
          <EducationTimeline
            visible={siteVisible && activeSection === "timeline"}
          />
        </section>

        {/* Portfolio */}
        <section
          ref={(el) => {
            sectionRefs.current.portfolio = el;
          }}
          data-section="portfolio"
          className="relative w-full"
          style={{ height: "100dvh", minHeight: "100dvh" }}
        >
          <Portfolio visible={siteVisible && activeSection === "portfolio"} />
        </section>

        {/* Music Stats */}
        <section
          ref={(el) => {
            sectionRefs.current.music = el;
          }}
          data-section="music"
          className="relative w-full"
          style={{ height: "100dvh", minHeight: "100dvh" }}
        >
          <StatsFmShowcase />
        </section>
      </div>

      {/* ── Section dot navigator — visible only while scrolling ── */}
      {siteVisible && (
        <nav
          className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-[10px]"
          aria-label="Section navigation"
          style={{
            opacity: isScrolling ? 1 : 0,
            transform: isScrolling ? "translateX(0)" : "translateX(6px)",
            transition: isScrolling
              ? "opacity 0.2s ease, transform 0.2s ease"
              : "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            pointerEvents: isScrolling ? "auto" : "none",
          }}
        >
          {SECTIONS.map((section, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <button
                type="button"
                key={section}
                onClick={() => {
                  triggerScrolling();
                  goToIndex(idx);
                }}
                aria-label={`Go to section ${idx + 1}`}
                className="relative flex items-center justify-center p-1.5"
              >
                <span
                  className="block rounded-full"
                  style={{
                    width: isActive ? 8 : 5,
                    height: isActive ? 8 : 5,
                    background: isActive
                      ? "rgba(255,255,255,0.90)"
                      : "rgba(255,255,255,0.22)",
                    boxShadow: isActive
                      ? "0 0 0 2px rgba(255,255,255,0.15), 0 0 10px rgba(255,255,255,0.4)"
                      : "none",
                    transition:
                      "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, box-shadow 0.3s ease",
                  }}
                />
              </button>
            );
          })}
        </nav>
      )}
    </main>
  );
}
