"use client";

import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
    {
        title: "Project One",
        description: "A comprehensive dashboard for managing cloud resources with real-time analytics.",
        tags: ["React", "Next.js", "TypeScript"],
        links: { demo: "#", repo: "#" }
    },
    {
        title: "Project Two",
        description: "An immersive 3D experience showcasing creative coding and interactive design.",
        tags: ["Three.js", "WebGL", "GSAP"],
        links: { demo: "#", repo: "#" }
    },
    {
        title: "Project Three",
        description: "A high-performance API service built for scalability and reliability.",
        tags: ["Node.js", "Express", "PostgreSQL"],
        links: { demo: "#", repo: "#" }
    }
];

interface PortfolioProps {
    visible: boolean;
}

export function Portfolio({ visible }: PortfolioProps) {
    return (
        <div
            className={cn(
                "w-full max-w-6xl mx-auto px-4 py-12 transition-all duration-1000 ease-in-out transform fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
                visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none translate-y-10"
            )}
        >
            <h2 className="text-4xl font-bold text-white mb-8 text-center tracking-[0.2em] drop-shadow-xl animate-in fade-in zoom-in duration-1000">
                PORTFOLIO
            </h2>

            <div className="flex flex-col items-center justify-center min-h-100 text-center space-y-6">

                <h3 className="text-2xl font-bold text-white mb-2 mt-4 tracking-wider">COMING SOON</h3>
                <div className="h-1 w-20 bg-linear-to-r from-transparent via-white/50 to-transparent mx-auto mb-4 rounded-full"></div>
                <p className="text-white/60 leading-relaxed">
                    Tung Tung Sahuar
                </p>
            </div>
        </div>
    );
}
