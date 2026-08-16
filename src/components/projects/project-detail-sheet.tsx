"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ArrowUpRight, X } from "lucide-react";
import { DS, b } from "@/lib/ds";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  link: string;
}

const STATUS_COLOR: Record<string, string> = {
  Active:   DS.teal,
  Building: DS.purple,
  Archived: DS.text3,
};

export function ProjectDetailSheet({
  project,
  onOpenChange,
}: {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  if (!project) return null;

  const statusColor = STATUS_COLOR[project.status] ?? DS.text3;

  return (
    <Sheet open={!!project} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="p-0 flex flex-col overflow-y-auto"
        style={{
          height: "min(600px, 90svh)",
          background: DS.bg,
          borderTop: b,
          outline: "none",
        }}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{project.title}</SheetTitle>
        </SheetHeader>

        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: 36, height: 4, background: DS.surf2, borderRadius: 2 }} />
        </div>

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px", borderBottom: b,
          background: "rgba(12,12,12,0.95)",
          backdropFilter: "blur(8px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ fontFamily: DS.font, fontSize: 14, fontWeight: 600, color: DS.text, margin: 0 }}>
              {project.title}
            </h2>
            <span style={{ fontFamily: DS.font, fontSize: 8, color: statusColor, letterSpacing: "0.1em" }}>
              ● {project.status.toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: DS.surf2, border: "none", cursor: "pointer",
              color: DS.text2, display: "flex", alignItems: "center", justifyContent: "center",
            }}
            aria-label="Close"
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", flex: 1 }}>
          {/* Description */}
          <p style={{ fontFamily: DS.font, fontSize: 11, color: DS.text2, lineHeight: 1.8, marginBottom: 24 }}>
            {project.description}
          </p>

          {/* Stack */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.12em", marginBottom: 10 }}>
              STACK
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.technologies.map((t) => (
                <span
                  key={t}
                  style={{ fontFamily: DS.font, fontSize: 10, color: DS.text2, border: b, padding: "6px 12px" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* About placeholder */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.12em", marginBottom: 10 }}>
              ABOUT
            </p>
            <p style={{ fontFamily: DS.font, fontSize: 11, color: DS.text3, lineHeight: 1.8 }}>
              Architecture notes, design decisions, and project story will live here.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "0 20px 28px" }}>
          <a
            href={project.link}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px", fontFamily: DS.font, fontSize: 11,
              color: DS.text2, textDecoration: "none",
              border: b, letterSpacing: "0.06em",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = DS.text; e.currentTarget.style.borderColor = DS.border2; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = DS.text2; e.currentTarget.style.borderColor = DS.border; }}
          >
            View Project
            <ArrowUpRight size={13} />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
