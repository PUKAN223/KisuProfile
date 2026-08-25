"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DS } from "@/lib/ds";
import { ProjectCard } from "./project-card";
import { ProjectDetailSheet } from "./project-detail-sheet";
import { Loader2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  link: string;
}

export function ProjectSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("https://api.github.com/users/PUKAN223/repos?sort=updated&per_page=6");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const mappedProjects: Project[] = data.map((repo: any) => ({
          id: repo.id.toString(),
          title: repo.name,
          description: repo.description || "No description provided.",
          technologies: repo.language ? [repo.language] : ["TypeScript"], // Fallback if null
          status: "Active",
          link: repo.html_url,
        }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error("Error fetching github repos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ padding: "0 24px" }}
      >
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.12em" }}>
            PROJECTS
          </span>
          <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3 }}>
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
            <Loader2 size={24} className="animate-spin" style={{ color: DS.text3 }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setActive(project)}
              />
            ))}
          </div>
        )}
      </motion.section>

      <ProjectDetailSheet
        project={active}
        onOpenChange={(open) => { if (!open) setActive(null); }}
      />
    </>
  );
}
