"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Clock,
  Code2,
  ExternalLink,
  Eye,
  Folders,
  GitFork,
  Github,
  RefreshCw,
  Star,
} from "lucide-react";

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  homepage: string | null;
  open_issues_count: number;
  visibility: string;
}

interface PortfolioProps {
  visible: boolean;
}

// GitHub language colors (subset of linguist)
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Lua: "#000080",
  Nix: "#7e7eff",
};

function getLanguageColor(lang: string | null): string {
  if (!lang) return "#8b949e";
  return LANGUAGE_COLORS[lang] ?? "#8b949e";
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ── Skeleton card ──────────────────────────────────────────────────────────────
function RepoSkeleton({ index }: { index: number }) {
  return (
    <div
      className="rounded-2xl border border-white/6 bg-white/3 backdrop-blur-sm p-4 animate-pulse"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="h-4 w-28 bg-white/10 rounded-full" />
        <div className="h-5 w-5 bg-white/10 rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-white/8 rounded-full" />
        <div className="h-3 w-2/3 bg-white/8 rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 w-10 bg-white/8 rounded-full" />
        <div className="h-3 w-8 bg-white/8 rounded-full" />
        <div className="h-3 w-12 bg-white/8 rounded-full" />
      </div>
    </div>
  );
}

// ── Repo card ──────────────────────────────────────────────────────────────────
function RepoCard({
  repo,
  index,
  revealed,
}: {
  repo: GithubRepo;
  index: number;
  revealed: boolean;
}) {
  const delay = 160 + index * 110;
  const langColor = getLanguageColor(repo.language);

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block touch-manipulation"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? "translateY(0px) scale(1)"
          : "translateY(24px) scale(0.97)",
        filter: revealed ? "blur(0px)" : "blur(6px)",
        transition:
          `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter 0.5s ease ${delay}ms`,
      }}
    >
      <div
        className="relative rounded-2xl border border-white/8 bg-white/4 backdrop-blur-md p-4 md:p-5 h-full flex flex-col overflow-hidden"
        style={{
          transition:
            "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = `${langColor}30`;
          el.style.boxShadow =
            `0 8px 32px ${langColor}15, 0 0 0 1px ${langColor}12`;
          el.style.transform = "translateY(-3px)";
          el.style.background = "rgba(255,255,255,0.06)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = "";
          el.style.boxShadow = "";
          el.style.transform = "";
          el.style.background = "";
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"
          style={{
            background:
              `linear-gradient(90deg, transparent, ${langColor}, transparent)`,
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              `radial-gradient(ellipse at 50% 0%, ${langColor}08 0%, transparent 65%)`,
          }}
        />

        {/* Rank badge */}
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border border-white/10 bg-white/5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          #{index + 1}
        </div>

        {/* Header */}
        <div className="flex items-start gap-2 mb-2.5 pr-8 relative z-10">
          <Code2
            size={13}
            className="mt-0.5 shrink-0 text-white/40 group-hover:text-white/60 transition-colors"
          />
          <span className="text-xs md:text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-tight break-all">
            {repo.name}
          </span>
        </div>

        {/* Description */}
        <p className="text-[11px] md:text-xs text-white/40 leading-relaxed mb-3 flex-1 relative z-10 line-clamp-2">
          {repo.description ?? "No description provided."}
        </p>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2.5 relative z-10">
            {repo.topics.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-white/8 text-white/35 leading-none"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer stats */}
        <div className="flex items-center gap-2.5 text-[10px] md:text-[11px] text-white/35 relative z-10 flex-wrap">
          {/* Language dot */}
          {repo.language && (
            <span className="flex items-center gap-1 shrink-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: langColor,
                  boxShadow: `0 0 5px ${langColor}80`,
                }}
              />
              <span className="font-mono truncate max-w-[60px]">
                {repo.language}
              </span>
            </span>
          )}

          {/* Stars */}
          <span className="flex items-center gap-1 group-hover:text-yellow-300/70 transition-colors shrink-0">
            <Star size={9} />
            {formatCount(repo.stargazers_count)}
          </span>

          {/* Forks */}
          <span className="flex items-center gap-1 group-hover:text-blue-300/70 transition-colors shrink-0">
            <GitFork size={9} />
            {formatCount(repo.forks_count)}
          </span>

          {/* Watchers — hidden on very small screens to save space */}
          {repo.watchers_count > 0 && (
            <span className="hidden sm:flex items-center gap-1 shrink-0">
              <Eye size={9} />
              {formatCount(repo.watchers_count)}
            </span>
          )}

          {/* Updated */}
          <span className="ml-auto flex items-center gap-1 opacity-60 shrink-0">
            <Clock size={8} />
            {timeAgo(repo.updated_at)}
          </span>
        </div>

        {/* Homepage link chip */}
        {repo.homepage && (
          <div className="mt-2.5 relative z-10">
            <span
              className="inline-flex items-center gap-1 text-[9px] font-mono text-white/30 hover:text-white/60 transition-colors px-2 py-1 rounded-full border border-white/8 hover:border-white/15 max-w-full overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                window.open(repo.homepage!, "_blank", "noopener noreferrer");
              }}
            >
              <ExternalLink size={8} className="shrink-0" />
              <span className="truncate">
                {repo.homepage.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function Portfolio({ visible }: PortfolioProps) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const prevVisible = useRef(false);
  const hasFetched = useRef(false);

  const fetchRepos = async (force = false) => {
    if (!force) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const res = await fetch("/api/github-repos", { cache: "no-store" });
      if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
      const data: GithubRepo[] = await res.json();
      setRepos(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load repositories");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchRepos();
    }
  }, []);

  // Trigger stagger reveal when section becomes visible
  useEffect(() => {
    if (visible && !prevVisible.current) {
      setRevealed(false);
      const t = setTimeout(() => setRevealed(true), 80);
      prevVisible.current = true;
      return () => clearTimeout(t);
    }
    if (!visible) {
      prevVisible.current = false;
      setRevealed(false);
    }
  }, [visible]);

  // Summary stats from repos
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center pointer-events-none ${
        visible
          ? ""
          : "[&_a]:pointer-events-none [&_button]:pointer-events-none"
      }`}
    >
      <div className="w-full max-w-5xl px-3 sm:px-4 md:px-6 h-full flex flex-col items-center justify-start md:justify-center scrollbar-hide overflow-y-auto pt-14 pb-6 sm:pt-16 sm:pb-8 md:pt-10 md:pb-10">
        {/* ── Header ── */}
        <div
          className="text-center mb-5 md:mb-8 w-full"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0px)" : "translateY(-24px)",
            filter: revealed ? "blur(0px)" : "blur(8px)",
            transition:
              "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease",
          }}
        >
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <Github
              size={22}
              className="text-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] md:w-7 md:h-7"
            />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              GitHub{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-white/80 via-blue-200 to-white/80">
                Repositories
              </span>
            </h2>
          </div>
          <div className="h-[2px] w-20 bg-linear-to-r from-transparent via-white/30 to-transparent mx-auto rounded-full" />

          {/* Stats row */}
          {!loading && repos.length > 0 && (
            <div
              className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mt-3"
              style={{
                opacity: revealed ? 1 : 0,
                transition: "opacity 0.5s ease 300ms",
              }}
            >
              <span className="flex items-center gap-1 text-[11px] text-white/40 font-mono">
                <Star size={10} className="text-yellow-400/60" />
                <span className="text-white/60 font-semibold">
                  {formatCount(totalStars)}
                </span>{" "}
                stars
              </span>
              <span className="w-px h-3 bg-white/15" />
              <span className="flex items-center gap-1 text-[11px] text-white/40 font-mono">
                <GitFork size={10} className="text-blue-400/60" />
                <span className="text-white/60 font-semibold">
                  {formatCount(totalForks)}
                </span>{" "}
                forks
              </span>
              <span className="w-px h-3 bg-white/15" />
              <span className="flex items-center gap-1 text-[11px] text-white/40 font-mono">
                <Code2 size={10} className="text-purple-400/60" />
                <span className="text-white/60 font-semibold">
                  {languages.length}
                </span>{" "}
                langs
              </span>
              <span className="w-px h-3 bg-white/15" />
              <button
                type="button"
                onClick={() => fetchRepos(true)}
                disabled={refreshing}
                className={`${
                  visible ? "pointer-events-auto" : "pointer-events-none"
                } flex items-center gap-1 text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors disabled:opacity-40`}
                title="Refresh repos"
              >
                <RefreshCw
                  size={9}
                  className={refreshing ? "animate-spin" : ""}
                />
                refresh
              </button>
            </div>
          )}
        </div>

        {/* ── Content ── */}

        {/* Loading skeletons */}
        {loading && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <RepoSkeleton key={i} index={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            className={`flex flex-col items-center gap-4 py-12 ${
              visible ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{
              opacity: revealed ? 1 : 0,
              transition: "opacity 0.5s ease 200ms",
            }}
          >
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertCircle size={22} className="text-red-400/70" />
            </div>
            <p className="text-white/50 text-sm">{error}</p>
            <button
              type="button"
              onClick={() => fetchRepos()}
              className="text-xs font-mono text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-white/20"
            >
              <RefreshCw size={11} />
              Try again
            </button>
          </div>
        )}

        {/* Repo grid */}
        {!loading && !error && repos.length > 0 && (
          <div
            className={`w-full ${
              visible ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Top row: repos 0-1 (bigger) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              {repos.slice(0, 2).map((repo, i) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  index={i}
                  revealed={revealed}
                />
              ))}
            </div>

            {/* Bottom row: repos 2-4 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {repos.slice(2, 5).map((repo, i) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  index={i + 2}
                  revealed={revealed}
                />
              ))}
            </div>

            {/* View all link */}
            <div
              className="mt-5 md:mt-6 flex justify-center"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 0.5s ease 680ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) 680ms",
              }}
            >
              <a
                href="https://github.com/PUKAN223"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/4 hover:bg-white/8 hover:border-white/20 text-white/50 hover:text-white/80 text-xs font-mono transition-all duration-200 group"
              >
                <Github
                  size={13}
                  className="group-hover:scale-110 transition-transform"
                />
                View all repositories
                <ExternalLink
                  size={10}
                  className="opacity-50 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && repos.length === 0 && (
          <div
            className="flex flex-col items-center gap-3 py-12"
            style={{
              opacity: revealed ? 1 : 0,
              transition: "opacity 0.5s ease 200ms",
            }}
          >
            <Folders size={32} className="text-white/20" />
            <p className="text-white/40 text-sm">
              No public repositories found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
