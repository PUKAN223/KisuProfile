"use client";

import { motion } from "framer-motion";
import { GitBranch, MessageCircle, Camera, Link2, Mail, MapPin } from "lucide-react";
import { DS, b } from "@/lib/ds";
import { profile } from "@/data/profile";

const SOCIALS = [
  { icon: GitBranch,     label: "GitHub",    href: profile.socials.github    },
  { icon: MessageCircle, label: "Discord",   href: profile.socials.discord   },
  { icon: Camera,        label: "Instagram", href: profile.socials.instagram },
  { icon: Mail,          label: "Email",     href: profile.socials.email     },
];

export function ProfileHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      style={{ padding: "56px 24px 48px" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
        {/* Tilted profile photo */}
        <motion.div
          initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
          animate={{ opacity: 1, rotate: -2.5, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", stiffness: 140, damping: 18 }}
          whileHover={{ rotate: 0, y: -4, transition: { duration: 0.2 } }}
          style={{
            width: 100, height: 100,
            border: `1px solid ${DS.border2}`,
            overflow: "hidden",
            cursor: "default",
            transformOrigin: "bottom left",
            flexShrink: 0,
          }}
        >
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            style={{ 
              width: "100%", height: "100%", objectFit: "cover", 
              display: "block", pointerEvents: "none",
              filter: "grayscale(0.85) contrast(1.1) brightness(0.9)"
            }}
          />
        </motion.div>

        <div>
          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.14em", margin: "0 0 10px" }}
          >
            {profile.role.toUpperCase()}
          </motion.p>

          {/* Big display name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            style={{
              fontFamily: DS.font,
              fontSize: "clamp(28px, 8vw, 44px)",
              fontWeight: 700,
              color: DS.text,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Hi,<br />I'm Pukan.
          </motion.h1>
        </div>
      </div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.18 }}
        style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 28 }}
      >
        <MapPin size={10} style={{ color: DS.text3 }} />
        <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.06em" }}>
          {profile.location}
        </span>
      </motion.div>

      {/* Description — with line breaks */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        style={{
          fontFamily: DS.font, fontSize: 12, color: DS.text2,
          lineHeight: 2.1, margin: "0 0 32px", maxWidth: 280,
          whiteSpace: "pre-line",
        }}
      >
        {profile.description}
      </motion.p>

      {/* Interest tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.27 }}
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 44 }}
      >
        {profile.interests.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: DS.font, fontSize: 8,
              color: DS.text3, border: b,
              padding: "5px 12px", letterSpacing: "0.06em",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.32 }}
        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
      >
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 14px",
                fontFamily: DS.font, fontSize: 9,
                color: DS.text3, textDecoration: "none",
                border: b, letterSpacing: "0.08em",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = DS.text; e.currentTarget.style.borderColor = DS.border2; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = DS.text3; e.currentTarget.style.borderColor = DS.border; }}
            >
              <Icon size={11} />
              {s.label}
            </a>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
