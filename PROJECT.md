# Personal Ocean Website — UI Mockup Specification

## 1. Project Overview

สร้างเว็บไซต์แนะนำตัวส่วนตัวแบบ **Interactive Personal Website**
โดยมีแนวคิดเป็นพื้นที่ดิจิทัลส่วนตัวที่มีบรรยากาศเหมือน **ทะเลในเวลากลางคืน**

เว็บไซต์ต้องให้ความรู้สึก:

- Premium
- Minimal
- Emotional
- Calm
- Modern
- Interactive
- Deep Ocean
- Dark Blue Glassmorphism

ในระยะนี้ **ทำเฉพาะ UI Mockup และ Interaction Prototype**

ยังไม่ต้องเชื่อมต่อ:

- Spotify API จริง
- Notification API จริง
- Backend
- Database
- Authentication

ให้ใช้ Mock Data แทนทั้งหมด

---

# 2. Design Concept

## Theme

> **Deep Ocean · Glass · Wave · Emotion**

แนวคิดหลักคือ:

> "A personal digital space floating above a dark ocean."

พื้นหลังเป็นทะเลสีเข้มที่มีคลื่นเคลื่อนไหวอย่างช้า ๆ

เมื่อผู้ใช้โต้ตอบกับเว็บไซต์ พื้นหลังจะตอบสนองด้วย ripple หรือ wave animation เล็กน้อย

---

# 3. Design Language

## Color Palette

```text
Background Primary
#020817

Background Secondary
#031225

Background Blue
#061A35

Glass
rgba(8, 25, 48, 0.42)

Glass Strong
rgba(8, 25, 48, 0.65)

Border
rgba(150, 210, 255, 0.10)

Border Active
rgba(85, 184, 255, 0.30)

Primary Text
#F5F9FF

Secondary Text
#8EA5C0

Muted Text
#647A95

Accent
#55B8FF

Success
#5DE2A5
```

ไม่ควรใช้สี accent มากเกินไป

Accent ใช้เฉพาะ:

- Active state
- Links
- Buttons
- Status
- Important information
- Small glow

---

# 4. Typography

รองรับทั้งภาษาไทยและภาษาอังกฤษ

## Recommended Fonts

English:

```text
Geist
Inter
```

Thai:

```text
Noto Sans Thai
```

Typography ต้องดู modern และไม่หนาเกินไป

ตัวอย่าง:

```text
Hero Title
48–64px desktop
36–44px mobile

Body
16px

Small
13–14px

Navigation
13–14px
```

ไม่ใช้ typography ที่ใหญ่เกินไปจนเหมือน landing page ทั่วไป

---

# 5. Mobile First

Mobile เป็น design หลัก

รองรับอย่างน้อย:

```text
360px
375px
390px
430px
768px
1024px+
```

ห้ามออกแบบ Desktop ก่อนแล้วค่อยย่อมาที่ Mobile

Mobile layout ต้อง:

- Single column
- Touch friendly
- Bottom navigation
- Bottom sheet
- Large interaction area
- Safe area support
- Minimal clutter

Touch target ควรมีขนาดประมาณ:

```text
minimum 44 × 44px
```

---

# 6. Main Layout

## Mobile

```text
Ocean Background
│
├── Header
│
├── Profile Hero
│
├── Now Playing
│
├── Ping Me
│
├── Projects
│
└── Bottom Navigation
```

## Desktop

สามารถเปลี่ยนเป็น:

```text
Ocean Background
│
├── Header / Sidebar
│
├── Hero
│
├── Now Playing
│
├── Projects
│
└── Activity
```

แต่ต้องรักษา visual language เดิม

---

# 7. Ocean Background

สร้าง component:

```text
OceanBackground
```

หน้าที่:

- Dark blue background
- Animated waves
- Subtle particles
- Soft light
- Atmospheric depth

ภาพรวม:

```text
        ~~~~~~~~~~~~~~~
    ~~~~~             ~~~~~
~~~~~                     ~~~~
                              ~~~
────────────────────────────────

        DARK OCEAN
```

คลื่นต้อง:

- Slow
- Smooth
- Organic
- Low contrast
- Continuous
- Non-distracting

ห้ามทำเป็นคลื่น cartoon

---

# 8. Wave Layers

ใช้หลาย layer:

```text
Wave 1
Wave 2
Wave 3
Wave 4
Particles
Ambient Glow
```

แต่ละ layer ต้องมี:

```text
different speed
different amplitude
different opacity
different direction
```

ตัวอย่าง:

```text
Wave 1 → 120s
Wave 2 → 90s
Wave 3 → 140s
Wave 4 → 180s
```

ค่าจริงสามารถปรับตาม performance

---

# 9. Interaction Ripple

สร้าง:

```text
OceanRipple
```

เมื่อเกิด interaction:

- Button click
- Navigation
- Ping
- Project open
- Music open

ให้เกิด ripple เบา ๆ

ตัวอย่าง:

```text
              ╲ │ ╱
           ──── ● ────
              ╱ │ ╲

       ~~~~~~~~~~~~~~~~~
     ~~~~~~~~~~~~~~~~~~~~~
```

ไม่ควรใช้ effect ที่รุนแรง

---

# 10. Reduced Motion

ต้องรองรับ:

```css
@media (prefers-reduced-motion: reduce)
```

เมื่อเปิด reduced motion:

- Disable wave animation
- Disable ripple
- Reduce transitions
- Keep UI usable

---

# 11. Glass System

สร้าง component:

```text
GlassPanel
```

ตัวอย่าง style:

```css
background: rgba(8, 25, 48, 0.42);
backdrop-filter: blur(24px) saturate(130%);
border: 1px solid rgba(150, 210, 255, 0.10);
```

เพิ่ม shadow แบบเบา ๆ

```css
box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px rgba(255, 255, 255, 0.04);
```

อย่าใช้ glass กับทุก element

ใช้กับ:

- Navigation
- Player
- Project cards
- Ping panel
- Sheets
- Important interactive surfaces

---

# 12. Header

Mobile:

```text
┌─────────────────────────────┐
│ KISU                 TH / EN│
└─────────────────────────────┘
```

แนะนำให้ header:

- Fixed / sticky
- Transparent
- Subtle blur
- ไม่สูงเกินไป

---

# 13. Profile Hero

โครงสร้าง:

```text
● ONLINE

[ Profile Image ]

Hi, I'm Kisu.

Developer & Builder

I build software, experiment with ideas,
and create things that interest me.

[ Explore My Work ]
```

Hero ต้องเน้น:

- Personal identity
- Profile image
- Short introduction
- Status
- Main CTA

ไม่ควรใส่ paragraph ยาว

---

# 14. Status Indicator

สร้าง:

```text
StatusIndicator
```

ตัวอย่าง:

```text
● ONLINE
```

หรือ:

```text
● Currently building
```

ใช้ accent สีฟ้าหรือเขียวอ่อน

Animation เป็นเพียง subtle pulse

---

# 15. Language Toggle

สร้าง:

```text
LanguageToggle
```

UI:

```text
TH / EN
```

หรือ:

```text
TH   EN
```

ต้องรองรับ:

```text
Thai
English
```

เปลี่ยนภาษาโดยไม่ reload หน้า

Mockup สามารถใช้ state:

```ts
language: "th" | "en";
```

---

# 16. Bottom Navigation

Mobile ใช้ fixed bottom navigation

```text
┌─────────────────────────────┐
│                             │
│                             │
├─────────────────────────────┤
│  ◉       ◇       ♪       ◯ │
│ Home  Projects  Music    Me │
└─────────────────────────────┘
```

Sections:

```text
Home
Projects
Music
About
```

ใช้ Lucide icons

ห้ามใช้ emoji เป็น icon หลักของ UI

---

# 17. Desktop Navigation

Desktop สามารถเปลี่ยนเป็น:

```text
Home
Projects
Music
About
```

อยู่ด้าน:

```text
Sidebar
```

หรือ:

```text
Top Navigation
```

เลือกตาม layout ที่ดูดีที่สุด

---

# 18. Now Playing

สร้าง:

```text
NowPlaying
```

Mockup:

```text
┌─────────────────────────────┐
│ 🎵 NOW PLAYING              │
│                             │
│ ┌──────┐                    │
│ │      │  Blinding Lights   │
│ │ ART  │  The Weeknd        │
│ │      │                    │
│ └──────┘                    │
│                             │
│ ━━━━━━━━━●━━━━━━━━          │
│                             │
│          ◀   ▶   ▶          │
└─────────────────────────────┘
```

ข้อมูล Mock:

```ts
const nowPlaying = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    progress: 0.42,
    playing: true,
};
```

ไม่ต้องเชื่อม Spotify จริง

---

# 19. Music Sheet

เมื่อกด Now Playing:

เปิด Bottom Sheet บน Mobile

```text
┌─────────────────────────────┐
│                             │
│           ─────             │
│                             │
│      ┌─────────────┐        │
│      │             │        │
│      │  ALBUM ART  │        │
│      │             │        │
│      └─────────────┘        │
│                             │
│      Blinding Lights        │
│      The Weeknd             │
│                             │
│   ━━━━━━━━━●━━━━━━          │
│                             │
│        ◀   ▶   ▶            │
│                             │
│       Open Spotify          │
└─────────────────────────────┘
```

ใช้:

```text
Sheet
```

จาก shadcn/ui

---

# 20. Projects

สร้าง:

```text
ProjectSection
ProjectCard
ProjectGrid
```

ตัวอย่าง:

```text
┌─────────────────────────────┐
│ Fastory                     │
│                             │
│ AI Business Assistant       │
│                             │
│ Next.js · Elysia · MCP      │
│                             │
│ View Project →              │
└─────────────────────────────┘
```

Project card ต้องมี:

- Title
- Short description
- Technologies
- Status
- Link

---

# 21. Mock Projects

ใช้ข้อมูลตัวอย่าง:

```ts
const projects = [
    {
        title: "Fastory",
        description: "AI Business Assistant",
        technologies: ["Next.js", "Elysia", "PostgreSQL", "MCP"],
        status: "Active",
    },
    {
        title: "Student Dashboard",
        description: "Premium Student PWA",
        technologies: ["Next.js", "TypeScript", "PWA"],
        status: "Building",
    },
];
```

สามารถเพิ่ม project อื่นภายหลัง

---

# 22. Project Detail Sheet

เมื่อแตะ Project Card:

```text
Project Card
     ↓

ProjectDetailSheet
```

Mobile:

```text
┌─────────────────────────────┐
│          ─────              │
│                             │
│ Fastory                     │
│                             │
│ AI Business Assistant       │
│                             │
│ Description                 │
│                             │
│ Technologies               │
│                             │
│ [ View Project ]            │
└─────────────────────────────┘
```

---

# 23. Ping Me

สร้าง:

```text
PingButton
PingSheet
NotificationStatus
```

Main UI:

```text
┌─────────────────────────────┐
│ 🔔 WANT TO SAY HI?          │
│                             │
│ Someone is here 👋          │
│                             │
│         [ PING ME ]         │
└─────────────────────────────┘
```

ใน Mockup:

กดแล้ว:

```text
Idle
 ↓
Confirm
 ↓
Sending
 ↓
Success
```

ตัวอย่าง Success:

```text
✓ Ping sent

I'll know someone stopped by.
```

ยังไม่ต้องส่ง notification จริง

---

# 24. Ping Interaction

เมื่อ Ping สำเร็จ:

1. Button เปลี่ยน state
2. แสดง success message
3. Ocean ripple
4. Subtle animation
5. Reset state หลังจากเวลาสั้น ๆ

Mock state:

```ts
type PingState =
    | "idle"
    | "confirm"
    | "sending"
    | "success";
```

---

# 25. About Section

สร้าง About page แบบเรียบง่าย

```text
About Me

I'm a developer who enjoys building
software, experimenting with technology,
and turning ideas into real projects.

Currently interested in:

• Web Development
• AI
• Developer Tools
• Creative Technology
```

ไม่ต้องทำ resume แบบ traditional

---

# 26. Social Links

ใช้:

```text
GitHub
Discord
Instagram
LinkedIn
Email
```

ใช้ Lucide icons หรือ brand icons ที่เหมาะสม

ไม่ควรมี social icon เยอะเกินไป

---

# 27. Component Library

ใช้ **shadcn/ui** เป็น base component library

ติดตั้งเฉพาะ:

```text
Button
Card
Sheet
Dialog
Avatar
Badge
Tabs
Tooltip
Separator
ScrollArea
```

เพิ่มเติมภายหลังเมื่อจำเป็น

---

# 28. Icons

ใช้:

```text
Lucide React
```

ตัวอย่าง:

```text
House
Folder
Music2
User
Bell
Github
ExternalLink
Play
Pause
Volume2
Globe
ArrowUpRight
```

ห้ามผสม icon library หลายชุดโดยไม่มีเหตุผล

---

# 29. Animation Library

ใช้:

```text
Motion
```

สำหรับ:

- Page transitions
- Card transitions
- Sheet transitions
- Button interaction
- Fade
- Scale
- Small ripple effects

ไม่ใช้ Motion ทำ ocean rendering ทั้งหมด

Ocean background สามารถเปลี่ยนเป็น Canvas/WebGL ในขั้นต่อไป

---

# 30. Recommended Project Structure

```text
src/
│
├── app/
│
├── components/
│   │
│   ├── layout/
│   │   ├── app-shell.tsx
│   │   ├── header.tsx
│   │   ├── bottom-navigation.tsx
│   │   └── desktop-sidebar.tsx
│   │
│   ├── ocean/
│   │   ├── ocean-background.tsx
│   │   ├── wave-layer.tsx
│   │   ├── ocean-ripple.tsx
│   │   └── ambient-particles.tsx
│   │
│   ├── profile/
│   │   ├── profile-hero.tsx
│   │   ├── status-indicator.tsx
│   │   └── social-links.tsx
│   │
│   ├── music/
│   │   ├── now-playing.tsx
│   │   ├── mini-player.tsx
│   │   ├── music-sheet.tsx
│   │   └── playback-controls.tsx
│   │
│   ├── projects/
│   │   ├── project-section.tsx
│   │   ├── project-card.tsx
│   │   └── project-detail-sheet.tsx
│   │
│   ├── interaction/
│   │   ├── ping-button.tsx
│   │   ├── ping-sheet.tsx
│   │   └── notification-status.tsx
│   │
│   ├── settings/
│   │   └── language-toggle.tsx
│   │
│   └── ui/
│       ├── glass-panel.tsx
│       └── glass-button.tsx
│
├── data/
│   ├── projects.ts
│   ├── profile.ts
│   └── music.ts
│
├── lib/
│   └── utils.ts
│
└── styles/
```

---

# 31. Mock Data First

อย่าเรียก API จริง

ใช้:

```text
data/profile.ts
data/projects.ts
data/music.ts
```

ตัวอย่าง:

```ts
export const profile = {
    name: "Kisu",
    role: "Developer & Builder",
    status: "online",
};
```

---

# 32. UI States

ต้องทำ mockup ให้ interaction ทำงานจริงอย่างน้อย:

```text
Language Toggle
Navigation
Project Open
Project Sheet
Music Player
Music Sheet
Ping Button
Ping Success
```

ไม่ใช่แค่ static screenshot

---

# 33. Responsive Behavior

## Mobile

```text
Single column
Bottom navigation
Bottom sheets
Compact cards
```

## Tablet

```text
Two-column sections
Larger cards
Expanded content
```

## Desktop

```text
Sidebar / top navigation
Multi-column layout
Larger project grid
Persistent Now Playing
```

---

# 34. Performance

แม้จะเป็น Mockup ให้เตรียม architecture สำหรับ animation ที่ดี

ต้องหลีกเลี่ยง:

- Heavy blur หลายชั้น
- DOM animation จำนวนมาก
- Infinite expensive React re-render
- Large background images
- Excessive box-shadow
- Constant JavaScript animation loops

Ocean background ควรถูกแยกออกจาก UI layer

---

# 35. Accessibility

ต้องรองรับ:

- Keyboard navigation
- Focus state
- Semantic HTML
- ARIA labels
- Screen readers
- Reduced motion
- Touch targets
- Contrast

Button ทุกตัวต้องสามารถใช้งานด้วย keyboard ได้

---

# 36. UX Rules

### Rule 1

อย่าให้ animation แย่งความสนใจจาก content

### Rule 2

Glassmorphism ใช้อย่างมี hierarchy

### Rule 3

Ocean background ต้องเป็น atmosphere ไม่ใช่ content

### Rule 4

Mobile ต้องใช้งานด้วยนิ้วได้ง่าย

### Rule 5

Interaction ควรมี feedback

### Rule 6

ไม่ใช้ emoji เป็น visual identity หลัก

### Rule 7

อย่าทำทุกอย่างเป็น Card

### Rule 8

Keep it personal

เว็บไซต์นี้ควรดูเหมือนสร้างโดย "คนคนหนึ่ง" ไม่ใช่ template portfolio

---

# 37. Mockup Milestones

## Phase 1 — Foundation

- [ ] Next.js setup
- [ ] Tailwind
- [ ] shadcn/ui
- [ ] Lucide
- [ ] Motion
- [ ] Fonts
- [ ] Color system

## Phase 2 — Ocean

- [ ] Dark blue background
- [ ] Glass system
- [ ] Wave placeholder
- [ ] Ambient lighting
- [ ] Ripple prototype

## Phase 3 — Mobile UI

- [ ] Header
- [ ] Hero
- [ ] Status
- [ ] Now Playing
- [ ] Ping
- [ ] Projects
- [ ] Bottom navigation

## Phase 4 — Interactions

- [ ] Language toggle
- [ ] Project sheet
- [ ] Music sheet
- [ ] Ping state
- [ ] Ripple interaction
- [ ] Page transitions

## Phase 5 — Responsive

- [ ] 360px
- [ ] 390px
- [ ] 430px
- [ ] Tablet
- [ ] Desktop

## Phase 6 — Polish

- [ ] Typography
- [ ] Spacing
- [ ] Glass intensity
- [ ] Animation timing
- [ ] Accessibility
- [ ] Reduced motion
- [ ] Performance

---

# 38. Final UI Goal

The final mockup should feel like:

> **A personal digital space floating above a dark ocean.**

When nothing happens:

```text
Calm
Dark
Quiet
Atmospheric
```

When the visitor interacts:

```text
Ripple
Movement
Feedback
Life
```

When music is playing:

```text
The atmosphere subtly responds.
```

When someone sends a ping:

```text
The ocean briefly reacts.
```

The website should ultimately feel less like a portfolio and more like a
**living personal interface**.

---

# 39. Primary Technology Stack

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Lucide React
Motion
Geist
Noto Sans Thai
```

Backend, Spotify integration, notification service, authentication, database,
and real ocean WebGL implementation are **out of scope for the first UI Mockup
iteration**.
