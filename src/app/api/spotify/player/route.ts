import { NextResponse } from "next/server";
import { spotifyFetch } from "@/lib/spotify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, uri } = body;

    let endpoint = "";
    let method = "POST";
    let reqBody: any = undefined;

    switch (action) {
      case "play":
        endpoint = "/me/player/play";
        method = "PUT";
        if (uri) {
          reqBody = { uris: [uri] };
        }
        break;
      case "pause":
        endpoint = "/me/player/pause";
        method = "PUT";
        break;
      case "next":
        endpoint = "/me/player/next";
        break;
      case "prev":
        endpoint = "/me/player/previous";
        break;
      case "queue":
        if (!uri) return NextResponse.json({ error: "Missing URI for queue" }, { status: 400 });
        endpoint = `/me/player/queue?uri=${encodeURIComponent(uri)}`;
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const response = await spotifyFetch(endpoint, method, reqBody);

    if (!response || !response.ok) {
      // Spotify might return 403 if no active device is found
      return NextResponse.json({ error: "Failed to control playback. Ensure a Spotify device is active." }, { status: response?.status || 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error controlling playback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
