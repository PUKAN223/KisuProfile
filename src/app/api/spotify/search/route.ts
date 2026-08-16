import { NextResponse } from "next/server";
import { spotifyFetch } from "@/lib/spotify";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    const response = await spotifyFetch(`/search?q=${encodeURIComponent(q)}&type=track&limit=10`);
    
    if (!response || !response.ok) {
      return NextResponse.json({ error: "Failed to fetch from Spotify" }, { status: 500 });
    }

    const data = await response.json();
    const tracks = data.tracks.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      albumImageUrl: track.album.images[0]?.url,
      durationMs: track.duration_ms,
      uri: track.uri,
    }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error searching tracks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
