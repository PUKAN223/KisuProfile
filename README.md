# KisuProfile

> A personal interactive profile built around a calm **Deep Ocean** aesthetic, combining developer identity, projects, education, technology, and music into one immersive digital space.

## ✦ About

**KisuProfile** is an interactive personal website created as a digital representation of **Pukan**.

Instead of being a traditional portfolio, the website is designed as a small personal digital space inspired by a **deep ocean at night** — dark, calm, minimal, and atmospheric.

The interface combines personal information with interactive elements such as animated backgrounds, project browsing, technology showcases, and an integrated Spotify player.

> **A personal digital space floating above a dark ocean.**

---

## ✦ Features

### Profile

* Personal introduction
* Profile image
* Developer role
* Location
* Personal interests
* Social links
* GitHub
* Discord
* Instagram
* Email

### Education

Showcases academic background and achievements, including:

* Science & Mathematics education
* SCIUS program
* POSN Computer Olympiad experience
* Research and competitive programming background

### Tech Stack

Interactive technology showcase featuring:

* Categorized technologies
* Technology icons
* Animated infinite marquee
* Motion-based interactions
* Responsive layout

### GitHub Projects

Projects are fetched dynamically from the GitHub API.

The project section:

* Fetches repositories from `PUKAN223`
* Displays recently updated repositories
* Shows repository name
* Shows description
* Detects primary programming language
* Links directly to GitHub
* Opens project details through an interactive sheet

### Spotify Integration

KisuProfile includes an interactive Spotify player.

Features include:

* Currently playing track
* Album artwork
* Playback progress
* Play / Pause
* Previous track
* Next track
* Queue tracks
* Search Spotify tracks
* Bottom-sheet music interface
* Automatic currently-playing updates

Spotify state is synchronized through the application's API routes.

---

## ✦ Design

The visual direction is based on:

**Deep Ocean · Glass · Wave · Emotion**

The interface uses:

* Dark blue backgrounds
* Glassmorphism surfaces
* Soft borders
* Atmospheric lighting
* Animated waves
* Ambient particles
* Subtle motion
* Minimal typography
* Responsive layouts

The goal is to create an interface that feels more like a **personal digital environment** than a conventional portfolio.

---

## ✦ Tech Stack

| Technology          | Purpose                   |
| ------------------- | ------------------------- |
| **Next.js 16**      | React framework           |
| **React 19**        | UI                        |
| **TypeScript**      | Type safety               |
| **Framer Motion**   | Animations & interactions |
| **Tailwind CSS 4**  | Styling                   |
| **shadcn/ui**       | UI primitives             |
| **Lucide React**    | Icons                     |
| **Iconify**         | Technology icons          |
| **SWR**             | Client-side data fetching |
| **Spotify Web API** | Music integration         |
| **GitHub API**      | Project data              |
| **Biome**           | Formatting & linting      |

---

## ✦ Architecture

```text
KisuProfile
│
├── Profile
│   ├── Profile Hero
│   ├── Status
│   ├── Education
│   └── Tech Stack
│
├── Projects
│   ├── GitHub API
│   ├── Project Cards
│   └── Project Detail Sheet
│
├── Music
│   ├── Now Playing
│   ├── Spotify Player
│   ├── Track Search
│   └── Playback Controls
│
├── Ocean Environment
│   ├── Ocean Background
│   ├── Wave Layers
│   ├── Ambient Particles
│   └── Interactive Effects
│
└── UI
    ├── Glass Panels
    ├── Sheets
    ├── Navigation
    └── Motion Components
```

---

## ✦ Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── spotify/
│   │       ├── now-playing/
│   │       ├── player/
│   │       └── search/
│   │
│   ├── design/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── decorations/
│   ├── interaction/
│   ├── layout/
│   ├── music/
│   ├── ocean/
│   ├── profile/
│   ├── projects/
│   └── ui/
│
├── data/
│   ├── education.ts
│   ├── music.ts
│   ├── profile.ts
│   └── techstack.ts
│
└── hooks/
    └── useSpotify.ts
```

---

## ✦ Getting Started

### Requirements

* Node.js
* npm / pnpm / yarn / Bun
* Spotify Developer application if Spotify integration is enabled

### Installation

Clone the repository:

```bash
git clone https://github.com/PUKAN223/KisuProfile.git
cd KisuProfile
```

Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## ✦ Environment Variables

Spotify integration requires Spotify API credentials.

Create:

```text
.env.local
```

and configure the required Spotify credentials used by the application.

> Do not commit your Spotify client secret or access tokens to Git.

---

## ✦ Scripts

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Production Server

```bash
npm run start
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

---

## ✦ Responsive Design

KisuProfile is designed with a **mobile-first** approach.

Supported layouts include:

```text
Mobile
360px+
375px
390px
430px

Tablet
768px+

Desktop
1024px+
```

The interface adapts its navigation, sheets, spacing, and content layout depending on screen size.

---

## ✦ Motion & Accessibility

Animations are an important part of the visual identity, but the project also considers users who prefer reduced motion.

The interface supports:

```css
prefers-reduced-motion: reduce
```

When reduced motion is enabled, unnecessary animations and transitions are reduced or disabled while keeping the interface functional.

---

## ✦ Data Sources

KisuProfile currently uses external services for dynamic content:

### GitHub

Repository information is retrieved from the GitHub API for the project showcase.

### Spotify

Spotify is used for:

* Currently playing information
* Track search
* Playback control
* Queue management

Personal profile, education, technology, and fallback music data are maintained locally in the project.

---

## ✦ Philosophy

KisuProfile isn't intended to be just a page that says:

> "Here are my skills and projects."

It's designed to communicate personality through the interface itself.

The ocean represents a quiet place for exploration, while the music and motion create a more personal atmosphere.

Every interaction is intentionally subtle — the goal is to make the website feel **alive without becoming distracting**.

---

## ✦ Author

**Pukan**

Developer & Builder

* GitHub: https://github.com/PUKAN223
* Discord: `kisux3`
* Instagram: `@kisu._.pxkxn`
* Email: `pukan221bill@gmail.com`

---

## License

This project is for personal and portfolio purposes.
