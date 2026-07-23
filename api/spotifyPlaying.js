// api/now-playing.js
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const ALLOWED_PLAYLISTS = [
  "2lhD8kwqlrMe3lRDHLvqMu", "7oW9wqlVeLGYrkc5Yqh9ph", "0tx4TqYXsPkhN06mbgztHm",
  "3IBjNNhBtDfj2IIx6ZE4om", "3yi18tHd8fATRu1BRyOvwE", "3z6wctkq8VHs87ssrvhtyY",
  "14pcJUOmoeX0XYsIF4i4Ob", "12tBaT2YmUbVjYN9OSTRC6", "3gwPwowuJjnpu0XKSK2nLI",
  "5NwIObv6LeZSIWfuwhbKCw", "10RHNcnAfaETaDU9FRjSfj", "6W4QUfODkRetfZ6Kexx59F",
  "6MTJc9zrQHDtkaSdRZmCnG", "5UzopvgRTvhmkoKE6EixA9", "2aRkX0kmLUY5ZmzST2oT7i",
  "1dgx8kJyjxCqtBMwxBZvCk", "3TC6WJI5IstlqXDJwGGVAn", "1HhvHRtE3SsgRNQqZBJXFs",
  "5Hfzo2MQUISaxrMCGSYjwH", "6gWWkMVsuCFlMPvRMeVGGg", "4HU4aAhPTU4sIMlx94JnLU",
  "06v73KwGUhpyZsy1r2FXk5", "1RSANi5KJiDSoDh5LfCD7e",
];

let cachedToken = null;
let cachedExpiry = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < cachedExpiry) return cachedToken;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to refresh token");

  cachedToken = data.access_token;
  cachedExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getAccessToken();
    const spotifyRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (spotifyRes.status === 204 || !spotifyRes.ok) {
      return res.status(200).json(null);
    }

    const data = await spotifyRes.json();
    if (!data?.item || !data.is_playing) {
      return res.status(200).json(null);
    }

    const item = data.item;
    const isPodcast = item.type === "episode";
    const contextUri = data.context?.uri ?? "";
    const contextId = contextUri.split(":")[2] ?? "";

    if (!ALLOWED_PLAYLISTS.includes(contextId)) {
      return res.status(200).json(null);
    }

    return res.status(200).json({
      trackName: item.name,
      artistName: isPodcast
        ? item.show?.name ?? ""
        : item.artists?.map((a) => a.name).join(", ") ?? "",
      albumArt: isPodcast
        ? item.images?.[0]?.url ?? null
        : item.album?.images?.[0]?.url ?? null,
      isPlaying: data.is_playing,
    });
  } catch (err) {
    console.error("Spotify now-playing error:", err);
    return res.status(200).json(null);
  }
}