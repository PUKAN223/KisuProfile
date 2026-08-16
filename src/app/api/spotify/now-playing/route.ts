import { NextResponse } from "next/server";
import { spotifyFetch } from "@/lib/spotify";

export async function GET() {
  try {
    const response = await spotifyFetch("/me/player/currently-playing");
    
    // If Spotify responds with 204, no track is currently playing
    if (!response || response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    if (song.item === null) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    const progressMs = song.progress_ms;
    const durationMs = song.item.duration_ms;

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      progressMs,
      durationMs,
    });
  } catch (error) {
    console.error("Error fetching currently playing:", error);
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
