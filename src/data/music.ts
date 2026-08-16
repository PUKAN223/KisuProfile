export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  durationSec: number;
  artUrl: string;
  spotifyUrl?: string;
};

// A playlist that reflects who Kisu is —
// science student who codes at night, loves synthwave, lofi, city pop, and electronic
export const playlist: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Synthpop",
    duration: "3:20",
    durationSec: 200,
    artUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format",
  },
  {
    id: "2",
    title: "Plastic Love",
    artist: "Mariya Takeuchi",
    album: "Variety",
    genre: "City Pop",
    duration: "6:01",
    durationSec: 361,
    artUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format",
  },
  {
    id: "3",
    title: "After Dark",
    artist: "Mr.Kitty",
    album: "After Dark",
    genre: "Synthwave",
    duration: "4:15",
    durationSec: 255,
    artUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format",
  },
  {
    id: "4",
    title: "Resonance",
    artist: "HOME",
    album: "Odyssey",
    genre: "Synthwave",
    duration: "4:11",
    durationSec: 251,
    artUrl: "https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=400&auto=format",
  },
  {
    id: "5",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    genre: "Electronic",
    duration: "4:02",
    durationSec: 242,
    artUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format",
  },
  {
    id: "6",
    title: "Redbone",
    artist: "Childish Gambino",
    album: "Awaken, My Love!",
    genre: "R&B / Soul",
    duration: "5:26",
    durationSec: 326,
    artUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format",
  },
  {
    id: "7",
    title: "Retrograde",
    artist: "James Blake",
    album: "Overgrown",
    genre: "Indie Electronic",
    duration: "4:11",
    durationSec: 251,
    artUrl: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=400&auto=format",
  },
  {
    id: "8",
    title: "lofi 2 a.m.",
    artist: "various",
    album: "Coding Nights",
    genre: "Lofi Hip Hop",
    duration: "∞",
    durationSec: 3600,
    artUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format",
  },
];

export const nowPlaying = playlist[0];
