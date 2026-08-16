const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const code = process.argv[2];

if (!code) {
  console.error("Please provide the authorization code as an argument.");
  console.error("Usage: node --env-file=.env.local get-token.mjs YOUR_CODE_HERE");
  process.exit(1);
}

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

const response = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${basic}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: "http://localhost:3000",
  }),
});

const data = await response.json();

if (data.refresh_token) {
  console.log("\n✅ SUCCESS! Here is your refresh token:\n");
  console.log(data.refresh_token);
  console.log("\nCopy the token above and paste it into SPOTIFY_REFRESH_TOKEN in your .env.local file.");
} else {
  console.error("\n❌ FAILED to get refresh token. Response from Spotify:");
  console.error(data);
}
