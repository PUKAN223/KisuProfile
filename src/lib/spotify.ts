const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  if (!client_id || !client_secret || !refresh_token) {
    return null;
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store", // Do not cache this request
  });

  if (!response.ok) {
    console.error("Failed to fetch access token from Spotify");
    return null;
  }

  return response.json();
};

export const spotifyFetch = async (endpoint: string, method: string = "GET", body?: any) => {
  const tokenResponse = await getAccessToken();
  if (!tokenResponse) return null;

  const { access_token } = tokenResponse;

  return fetch(`https://api.spotify.com/v1${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${access_token}`,
      ...(body && { "Content-Type": "application/json" }),
    },
    ...(body && { body: JSON.stringify(body) }),
    cache: "no-store",
  });
};
