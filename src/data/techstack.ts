export const techStack = [
  {
    category: "Language",
    color: "#26c6a8",
    items: [
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "Python",     icon: "simple-icons:python" },
      { name: "C++",        icon: "simple-icons:cplusplus" },
      { name: "C",          icon: "simple-icons:c" },
      { name: "JavaScript", icon: "simple-icons:javascript" },
      { name: "Bash",       icon: "simple-icons:gnubash" },
    ],
  },
  {
    category: "Frontend",
    color: "#9575cd",
    items: [
      { name: "Next.js",       icon: "simple-icons:nextdotjs" },
      { name: "React",         icon: "simple-icons:react" },
      { name: "Tailwind CSS",  icon: "simple-icons:tailwindcss" },
      { name: "Framer Motion", icon: "simple-icons:framer" },
    ],
  },
  {
    category: "Backend",
    color: "#f06292",
    items: [
      { name: "Bun",     icon: "simple-icons:bun" },
      { name: "Elysia",  icon: "skill-icons:elysia-dark" },
      { name: "Node.js", icon: "simple-icons:nodedotjs" },
    ],
  },
  {
    category: "Database",
    color: "#ffb74d",
    items: [
      { name: "PostgreSQL", icon: "simple-icons:postgresql" },
      { name: "Prisma",     icon: "simple-icons:prisma" },
      { name: "Redis",      icon: "simple-icons:redis" },
      { name: "Supabase",   icon: "simple-icons:supabase" },
    ],
  },
  {
    category: "AI / ML",
    color: "#8892a4",
    items: [
      { name: "OpenAI API", icon: "simple-icons:openai" },
      { name: "MCP",        icon: "simple-icons:anthropic" },
      { name: "Anthropic",  icon: "simple-icons:anthropic" },
    ],
  },
  {
    category: "Tools",
    color: "#444444",
    items: [
      { name: "Git",            icon: "simple-icons:git" },
      { name: "Docker",         icon: "simple-icons:docker" },
      { name: "Vercel",         icon: "simple-icons:vercel" },
      { name: "GitHub Actions", icon: "simple-icons:githubactions" },
      { name: "Linux",          icon: "simple-icons:linux" },
    ],
  },
];

// Flat list for the marquee strip
export const allTech = techStack.flatMap((g) =>
  g.items.map((item) => ({ name: item.name, icon: item.icon, color: g.color }))
);
