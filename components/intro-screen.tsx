"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── phases ──────────────────────────────────────────────────────────────────
// enter   – background fades in, avatar + spinner appear
// typing  – spinner swapped for name typing in
// hold    – full name shown, cursor blinks
// exit    – whole group translates up toward card position while bg fades out
// done    – unmount
type Phase = "enter" | "typing" | "hold" | "exit" | "done";

interface IntroScreenProps {
  onComplete: () => void;
  onExiting?: () => void;
  avatarUrl?: string;
}

// ─── exact pixel-arc spinner from the reference snippet ──────────────────────
function PixelSpinner() {
  return (
    <div
      style={{
        width: 6,
        height: 6,
        margin: "0 auto",
        scale: "0.5",
        animation: "intro-spin-pixel 0.5s linear infinite",
      }}
    />
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export function IntroScreen(
  { onComplete, onExiting, avatarUrl }: IntroScreenProps,
) {
  const [phase, setPhase] = useState<Phase>("enter");
  const [typedCount, setTypedCount] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fullText = "Hi, I'm KisuX3";
  const typed = fullText.slice(0, typedCount);
  const fullyTyped = typedCount === fullText.length;

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  // ── phase clock ─────────────────────────────────────────────────────────────
  useEffect(() => {
    clear();
    if (phase === "enter") {
      timer.current = setTimeout(() => setPhase("typing"), 1300);
    }
    if (phase === "hold") {
      timer.current = setTimeout(() => setPhase("exit"), 1000);
    }
    if (phase === "exit") {
      onExiting?.();
      timer.current = setTimeout(() => setPhase("done"), 850);
    }
    if (phase === "done") onComplete();
    return clear;
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── typing ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "typing") return;
    if (fullyTyped) {
      timer.current = setTimeout(() => setPhase("hold"), 520);
      return clear;
    }
    const delay = typedCount === 0 ? 70 : 55 + Math.random() * 38;
    const t = setTimeout(() => setTypedCount((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [phase, typedCount]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── cursor blink ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  if (phase === "done") return null;

  const isExiting = phase === "exit";
  const showLoader = phase === "enter";
  const showText = phase === "typing" || phase === "hold" || phase === "exit";

  return (
    <>
      {/* ── keyframes ─────────────────────────────────────────────────────── */}
      <style>
        {`
        /* background overlay */
        @keyframes intro-bg-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes intro-bg-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        /* content group: rises in on enter */
        @keyframes intro-group-in {
          from { opacity: 0; transform: translateY(24px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }

        /* exit: group slides UP toward where the profile card will be */
        @keyframes intro-group-out {
          0%   { opacity: 1; transform: translateY(0)     scale(1);    filter: blur(0);   }
          60%  { opacity: 1; transform: translateY(-18vh) scale(0.82); filter: blur(0);   }
          100% { opacity: 0; transform: translateY(-26vh) scale(0.72); filter: blur(4px); }
        }

        /* spinner: exact pixel arc from reference */
        @keyframes intro-spin-pixel {
          0% {
            box-shadow:
              0px -16px #fff, 5px -16px #fff, 11px -11px #fff, 16px -5px #fff,
              16px 0px #fff, 16px 5px #fff, 11px 11px #fff, 5px 16px #fff,
              0px 16px transparent, -5px 16px transparent, -11px 11px transparent,
              -16px 5px transparent, -16px 0px transparent, -16px -5px transparent,
              -11px -11px transparent, -5px -16px transparent;
          }
          6.25% {
            box-shadow:
              0px -16px transparent, 5px -16px #fff, 11px -11px #fff, 16px -5px #fff,
              16px 0px #fff, 16px 5px #fff, 11px 11px #fff, 5px 16px #fff,
              0px 16px #fff, -5px 16px transparent, -11px 11px transparent,
              -16px 5px transparent, -16px 0px transparent, -16px -5px transparent,
              -11px -11px transparent, -5px -16px transparent;
          }
          12.5% {
            box-shadow:
              0px -16px transparent, 5px -16px transparent, 11px -11px #fff, 16px -5px #fff,
              16px 0px #fff, 16px 5px #fff, 11px 11px #fff, 5px 16px #fff,
              0px 16px #fff, -5px 16px #fff, -11px 11px transparent,
              -16px 5px transparent, -16px 0px transparent, -16px -5px transparent,
              -11px -11px transparent, -5px -16px transparent;
          }
          18.75% {
            box-shadow:
              0px -16px transparent, 5px -16px transparent, 11px -11px transparent, 16px -5px #fff,
              16px 0px #fff, 16px 5px #fff, 11px 11px #fff, 5px 16px #fff,
              0px 16px #fff, -5px 16px #fff, -11px 11px #fff,
              -16px 5px transparent, -16px 0px transparent, -16px -5px transparent,
              -11px -11px transparent, -5px -16px transparent;
          }
          25% {
            box-shadow:
              0px -16px transparent, 5px -16px transparent, 11px -11px transparent, 16px -5px transparent,
              16px 0px #fff, 16px 5px #fff, 11px 11px #fff, 5px 16px #fff,
              0px 16px #fff, -5px 16px #fff, -11px 11px #fff,
              -16px 5px #fff, -16px 0px transparent, -16px -5px transparent,
              -11px -11px transparent, -5px -16px transparent;
          }
          31.25% {
            box-shadow:
              0px -16px transparent, 5px -16px transparent, 11px -11px transparent, 16px -5px transparent,
              16px 0px transparent, 16px 5px #fff, 11px 11px #fff, 5px 16px #fff,
              0px 16px #fff, -5px 16px #fff, -11px 11px #fff,
              -16px 5px #fff, -16px 0px #fff, -16px -5px transparent,
              -11px -11px transparent, -5px -16px transparent;
          }
          37.5% {
            box-shadow:
              0px -16px transparent, 5px -16px transparent, 11px -11px transparent, 16px -5px transparent,
              16px 0px transparent, 16px 5px transparent, 11px 11px #fff, 5px 16px #fff,
              0px 16px #fff, -5px 16px #fff, -11px 11px #fff,
              -16px 5px #fff, -16px 0px #fff, -16px -5px #fff,
              -11px -11px transparent, -5px -16px transparent;
          }
          43.75% {
            box-shadow:
              0px -16px transparent, 5px -16px transparent, 11px -11px transparent, 16px -5px transparent,
              16px 0px transparent, 16px 5px transparent, 11px 11px transparent, 5px 16px #fff,
              0px 16px #fff, -5px 16px #fff, -11px 11px #fff,
              -16px 5px #fff, -16px 0px #fff, -16px -5px #fff,
              -11px -11px #fff, -5px -16px transparent;
          }
          50% {
            box-shadow:
              0px -16px transparent, 5px -16px transparent, 11px -11px transparent, 16px -5px transparent,
              16px 0px transparent, 16px 5px transparent, 11px 11px transparent, 5px 16px transparent,
              0px 16px #fff, -5px 16px #fff, -11px 11px #fff,
              -16px 5px #fff, -16px 0px #fff, -16px -5px #fff,
              -11px -11px #fff, -5px -16px #fff;
          }
          56.25% {
            box-shadow:
              0px -16px #fff, 5px -16px transparent, 11px -11px transparent, 16px -5px transparent,
              16px 0px transparent, 16px 5px transparent, 11px 11px transparent, 5px 16px transparent,
              0px 16px transparent, -5px 16px #fff, -11px 11px #fff,
              -16px 5px #fff, -16px 0px #fff, -16px -5px #fff,
              -11px -11px #fff, -5px -16px #fff;
          }
          62.5% {
            box-shadow:
              0px -16px #fff, 5px -16px #fff, 11px -11px transparent, 16px -5px transparent,
              16px 0px transparent, 16px 5px transparent, 11px 11px transparent, 5px 16px transparent,
              0px 16px transparent, -5px 16px transparent, -11px 11px #fff,
              -16px 5px #fff, -16px 0px #fff, -16px -5px #fff,
              -11px -11px #fff, -5px -16px #fff;
          }
          68.75% {
            box-shadow:
              0px -16px #fff, 5px -16px #fff, 11px -11px #fff, 16px -5px transparent,
              16px 0px transparent, 16px 5px transparent, 11px 11px transparent, 5px 16px transparent,
              0px 16px transparent, -5px 16px transparent, -11px 11px transparent,
              -16px 5px #fff, -16px 0px #fff, -16px -5px #fff,
              -11px -11px #fff, -5px -16px #fff;
          }
          75% {
            box-shadow:
              0px -16px #fff, 5px -16px #fff, 11px -11px #fff, 16px -5px #fff,
              16px 0px transparent, 16px 5px transparent, 11px 11px transparent, 5px 16px transparent,
              0px 16px transparent, -5px 16px transparent, -11px 11px transparent,
              -16px 5px transparent, -16px 0px #fff, -16px -5px #fff,
              -11px -11px #fff, -5px -16px #fff;
          }
          81.25% {
            box-shadow:
              0px -16px #fff, 5px -16px #fff, 11px -11px #fff, 16px -5px #fff,
              16px 0px #fff, 16px 5px transparent, 11px 11px transparent, 5px 16px transparent,
              0px 16px transparent, -5px 16px transparent, -11px 11px transparent,
              -16px 5px transparent, -16px 0px transparent, -16px -5px #fff,
              -11px -11px #fff, -5px -16px #fff;
          }
          87.5% {
            box-shadow:
              0px -16px #fff, 5px -16px #fff, 11px -11px #fff, 16px -5px #fff,
              16px 0px #fff, 16px 5px #fff, 11px 11px transparent, 5px 16px transparent,
              0px 16px transparent, -5px 16px transparent, -11px 11px transparent,
              -16px 5px transparent, -16px 0px transparent, -16px -5px transparent,
              -11px -11px #fff, -5px -16px #fff;
          }
          93.75% {
            box-shadow:
              0px -16px #fff, 5px -16px #fff, 11px -11px #fff, 16px -5px #fff,
              16px 0px #fff, 16px 5px #fff, 11px 11px #fff, 5px 16px transparent,
              0px 16px transparent, -5px 16px transparent, -11px 11px transparent,
              -16px 5px transparent, -16px 0px transparent, -16px -5px transparent,
              -11px -11px transparent, -5px -16px #fff;
          }
          100% {
            box-shadow:
              0px -16px #fff, 5px -16px #fff, 11px -11px #fff, 16px -5px #fff,
              16px 0px #fff, 16px 5px #fff, 11px 11px #fff, 5px 16px #fff,
              0px 16px transparent, -5px 16px transparent, -11px 11px transparent,
              -16px 5px transparent, -16px 0px transparent, -16px -5px transparent,
              -11px -11px transparent, -5px -16px transparent;
          }
        }

        /* avatar border ring */
        @keyframes intro-ring {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* subtitle slide up */
        @keyframes intro-sub-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}
      </style>

      {/* ── background overlay ─────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[200] overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 44%, #0e0e1e 0%, #060609 100%)",
          animation: isExiting
            ? "intro-bg-out 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards"
            : "intro-bg-in 0.35s ease forwards",
          pointerEvents: isExiting ? "none" : "auto",
        }}
      >
        {/* thin top accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
          style={{
            width: 220,
            background:
              "linear-gradient(90deg, transparent, rgba(138,180,248,0.4), transparent)",
            opacity: isExiting ? 0 : 1,
            transition: "opacity 0.25s ease",
          }}
        />

        {/* ── content group ─────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            animation: isExiting
              ? "intro-group-out 0.82s cubic-bezier(0.4, 0, 0.2, 1) forwards"
              : "intro-group-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
          }}
        >
          {/* ── avatar (same visual as profile card) ── */}
          <div className="relative mb-7" style={{ width: 108, height: 108 }}>
            {/* conic border – matches profile-card.module.css .avatarBorder */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(138,180,248,0.6), rgba(255,255,255,0.08), rgba(138,180,248,0.6))",
                animation: "intro-ring 4s linear infinite",
                padding: 4,
                borderRadius: "50%",
              }}
            />
            {/* outer glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: -10,
                boxShadow:
                  "0 0 32px rgba(138,180,248,0.18), 0 0 64px rgba(138,180,248,0.08)",
                borderRadius: "50%",
              }}
            />
            {/* actual image */}
            <Image
              src={avatarUrl || "/profile.jpg"}
              alt="KisuX3"
              width={100}
              height={100}
              priority
              className="absolute rounded-full object-cover z-10"
              style={{
                inset: 4,
                width: 100,
                height: 100,
                background: "#0a0a0a",
              }}
            />
          </div>

          {/* ── spinner (loading phase) ── */}
          {showLoader && (
            <div
              style={{
                opacity: 1,
                height: 80,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
              }}
            >
              <PixelSpinner />
              <span
                className="font-mono text-white/25 uppercase tracking-[0.28em]"
                style={{ fontSize: "0.6rem" }}
              >
                Loading
              </span>
            </div>
          )}

          {/* ── name + subtitle (typing / hold / exit phases) ── */}
          {showText && (
            <div
              className="flex flex-col items-center gap-2"
              style={{ minHeight: 80 }}
            >
              {/* name — matches profile-card .name */}
              <h1
                className="font-sans font-semibold text-white text-center leading-none"
                style={{
                  fontSize: "clamp(1.4rem, 5vw, 1.6rem)",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {typed}
                {/* blinking text cursor */}
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "0.9em",
                    background: "rgba(255,255,255,0.75)",
                    borderRadius: 1,
                    verticalAlign: "middle",
                    marginLeft: 3,
                    opacity: cursorOn ? 1 : 0,
                    transition: "opacity 0.04s step-end",
                  }}
                />
              </h1>

              {/* subtitle — matches profile-card .subtitle */}
              <p
                className="font-mono text-center"
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  opacity: fullyTyped ? 1 : 0,
                  transform: fullyTyped ? "translateY(0)" : "translateY(5px)",
                  transition:
                    "opacity 0.45s ease 0.1s, transform 0.45s ease 0.1s",
                }}
              >
                Coding is my life.
              </p>
            </div>
          )}
        </div>

        {/* watermark */}
        <p
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono tracking-[0.32em] uppercase select-none"
          style={{
            fontSize: "0.55rem",
            color: "rgba(255,255,255,0.1)",
            opacity: isExiting ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          kisuX3.dev
        </p>
      </div>
    </>
  );
}
