"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EducationTimelineProps {
    visible: boolean;
}

const educationData = [
    {
        year: "M.1 - M.3",
        title: "Science-Mathematics Student",
        school: "Princess Chulabhorn Science High School Nakhon Si Thammarat",
        description: "Studying in an intensive science and mathematics program with a focus on analytical thinking, research skills, and advanced STEM education.",
        skills: ["Mathematics", "Science Research"]
    },
    {
        year: "Present",
        title: "Science Program Student",
        school: "Science Classrooms in University Affiliated School (SCIUS) - Thaksin University",
        description: "Studied in the SCIUS program focusing on science, mathematics, and research-based learning with university collaboration.",
        skills: ["Mathematics", "Science Research"]
    },
];

export function EducationTimeline({ visible }: EducationTimelineProps) {
    const [showItems, setShowItems] = useState(false);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setShowItems(true), 300);
            return () => clearTimeout(timer);
        } else {
            setShowItems(false);
        }
    }, [visible]);

    return (
        <div
            className={`fixed inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-700 ease-in-out ${visible ? "opacity-100 pointer-events-auto" : "opacity-0"
                }`}
        >
            <div className="max-w-4xl w-full px-6 py-12 md:py-20 h-full overflow-y-auto scrollbar-hide flex flex-col items-center justify-center">
                <div className="text-center mb-12 transform transition-all duration-700 delay-100"
                    style={{
                        opacity: showItems ? 1 : 0,
                        transform: showItems ? 'translateY(0)' : 'translateY(-20px)'
                    }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                        <GraduationCap className="text-blue-400" size={32} />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-200 via-white to-blue-200">
                            Education
                        </span>
                    </h2>
                    <div className="h-1 w-24 bg-linear-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full" />
                </div>

                <div className="relative w-full max-w-2xl ml-4 md:ml-0">
                    {/* Vertical Line */}
                    <div
                        className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-blue-500/50 to-transparent transform md:-translate-x-1/2 transition-all duration-1000"
                        style={{ height: showItems ? '100%' : '0%' }}
                    />

                    <div className="space-y-12">
                        {educationData.map((item, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 transform transition-all duration-700 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                                style={{
                                    opacity: showItems ? 1 : 0,
                                    transform: showItems ? 'translateY(0)' : 'translateY(20px)',
                                    transitionDelay: `${300 + (index * 200)}ms`
                                }}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute -left-1.25 md:left-1/2 top-0 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10 md:-translate-x-1/2 mt-1.5" />

                                {/* Content Side */}
                                <div className={`md:w-1/2 flex flex-col gap-2 pl-6 md:pl-0 text-left ${index % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                                    <div className={`flex flex-col gap-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                                        <span className={`text-blue-300 text-sm font-mono flex items-center gap-2 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                                            <Calendar size={14} className={index % 2 === 0 ? "md:order-first" : "md:order-last"} />
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        <p className="text-white/60 text-sm font-medium">{item.school}</p>

                                        <p className="text-white/50 text-sm mt-2 leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className={`flex flex-wrap gap-2 mt-3 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                                            {item.skills.map(skill => (
                                                <Badge key={skill} variant="secondary" className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 border border-blue-500/20 text-[10px]">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Empty Side for layout balance */}
                                <div className="md:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
