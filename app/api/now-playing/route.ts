import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID || process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
let cachedAccessToken: string | null = null;
let accessTokenExpiresAt = 0;

const getAccessToken = async () => {
    if (cachedAccessToken && Date.now() < accessTokenExpiresAt) {
      return { access_token: cachedAccessToken };
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refresh_token!,
        }),
        cache: 'no-store',
    });

    const tokenData = await response.json();
    if (tokenData?.access_token) {
      cachedAccessToken = tokenData.access_token;
      // Refresh 60s early to avoid edge expiration.
      accessTokenExpiresAt = Date.now() + Math.max((tokenData.expires_in ?? 3600) - 60, 60) * 1000;
    }

    return tokenData;
};

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json({ error: 'Missing Spotify environment variables' }, { status: 500 });
  }

  const tokenData = await getAccessToken();

  if (!tokenData || !tokenData.access_token) {
    console.error("Failed to refresh token:", tokenData);
    return NextResponse.json({ error: 'Failed to refresh access token' }, { status: 401 });
  }

  const accessToken = tokenData.access_token;

  try {
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store'
    });

    // 204 = No content (nothing playing)
    if (res.status === 204) {
      return NextResponse.json(null);
    }

    if (!res.ok) {
      const text = await res.text();
      console.error(`Spotify API error ${res.status}: ${text}`);
      return NextResponse.json({ error: 'Spotify API error' }, { status: res.status });
    }

    const data = await res.json();
    const item = data.item;
    
    // If no item (e.g. valid response but empty), return null
    if (!item) return NextResponse.json(null);

    const isTrack = item.type === "track";

    const mappedData = {
      is_playing: data.is_playing,
      progress_ms: data.progress_ms,
      duration_ms: item.duration_ms,
      name: item.name,
      artists: isTrack ? item.artists.map((a: any) => a.name).join(", ") : undefined,
      album: isTrack ? item.album?.name : undefined,
      cover: isTrack ? item.album.images[0].url : undefined,
      url: item.external_urls?.spotify,
    };

    return NextResponse.json(mappedData);

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
