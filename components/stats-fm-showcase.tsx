import { ExternalLink, Headphones, Music2, Radio, Sparkles } from "lucide-react";

export function StatsFmShowcase() {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(29,185,84,0.22),transparent_32%),radial-gradient(circle_at_75%_70%,rgba(138,180,248,0.18),transparent_34%)]" />
      <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 bg-white/[0.025] blur-3xl" />

      <div className="relative grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.9fr_1.25fr]">
        <div className="space-y-5 rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1DB954]/25 bg-[#1DB954]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#9dffbf]">
            <Radio size={13} className="animate-pulse" />
            Live music profile
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              My listening stats, wrapped in a clean glass panel.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/62 sm:text-base">
              Explore my stats.fm profile for favorite tracks, artists, listening
              history, and the music taste behind the profile vibe.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tracks", value: "Live", icon: Music2 },
              { label: "Artists", value: "Top", icon: Sparkles },
              { label: "Taste", value: "Kisu", icon: Headphones },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center shadow-lg shadow-black/15"
                >
                  <Icon className="mx-auto mb-2 text-[#1DB954]" size={17} />
                  <div className="text-sm font-bold text-white">{item.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="https://stats.fm/kisux3"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[#1DB954]/35 bg-[#1DB954]/12 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#b9ffd0] transition-all hover:-translate-y-0.5 hover:border-[#1DB954]/70 hover:bg-[#1DB954]/20 hover:text-white hover:shadow-[0_0_28px_rgba(29,185,84,0.25)]"
          >
            Open stats.fm
            <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/45 backdrop-blur-2xl">
          <div className="absolute inset-0 rounded-[2rem] bg-linear-to-br from-[#1DB954]/20 via-transparent to-blue-400/10 blur-xl" />
          <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#070707]">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#1DB954]/80" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/35">
                stats.fm/kisux3
              </span>
            </div>
            <iframe
              title="Kisu X3 stats.fm profile"
              src="https://stats.fm/kisux3"
              className="h-[62vh] min-h-[430px] w-full border-0 bg-black"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
