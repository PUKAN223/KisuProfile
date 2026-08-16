import { AppShell } from "@/components/layout/app-shell";
import { ProfileHero } from "@/components/profile/profile-hero";
import { EducationSection } from "@/components/profile/education-section";
import { TechStack } from "@/components/profile/tech-stack";
import { NowPlaying } from "@/components/music/now-playing";
import { ProjectSection } from "@/components/projects/project-section";
import { HeadphoneSticker } from "@/components/decorations/headphone-sticker";

function Divider() {
  return (
    <div style={{ padding: "0 24px" }}>
      <div style={{ height: 1, background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

export default function Home() {
  return (
    <AppShell>
      <div id="home" style={{ position: "relative" }}>
        <ProfileHero />
        <div style={{ padding: "0 0 28px 0" }}>
          <NowPlaying />
        </div>
        <HeadphoneSticker />
      </div>

      <Divider />

      <div id="education" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <EducationSection />
      </div>

      <Divider />

      <div id="tech" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <TechStack />
      </div>

      <Divider />

      <div id="projects" style={{ paddingTop: 36, paddingBottom: 36, overflowX: "hidden" }}>
        <ProjectSection />
      </div>
    </AppShell>
  );
}
