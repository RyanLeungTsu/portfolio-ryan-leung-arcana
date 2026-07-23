import { useState, useEffect, useRef } from "react";
 
const CLIENT_ID     = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
const POLL_MS       = 5000;
 
// playlists array from spotify (these are playlists that can be fetched)
const ALLOWED_PLAYLISTS = [
  "2lhD8kwqlrMe3lRDHLvqMu", "7oW9wqlVeLGYrkc5Yqh9ph", "0tx4TqYXsPkhN06mbgztHm", "3IBjNNhBtDfj2IIx6ZE4om", "3yi18tHd8fATRu1BRyOvwE", "3z6wctkq8VHs87ssrvhtyY", "14pcJUOmoeX0XYsIF4i4Ob", "12tBaT2YmUbVjYN9OSTRC6", "3gwPwowuJjnpu0XKSK2nLI", "5NwIObv6LeZSIWfuwhbKCw", "10RHNcnAfaETaDU9FRjSfj", "6W4QUfODkRetfZ6Kexx59F", "6MTJc9zrQHDtkaSdRZmCnG", "5UzopvgRTvhmkoKE6EixA9", "2aRkX0kmLUY5ZmzST2oT7i", "1dgx8kJyjxCqtBMwxBZvCk", "3TC6WJI5IstlqXDJwGGVAn", "1HhvHRtE3SsgRNQqZBJXFs", "5Hfzo2MQUISaxrMCGSYjwH", "6gWWkMVsuCFlMPvRMeVGGg", "4HU4aAhPTU4sIMlx94JnLU", "06v73KwGUhpyZsy1r2FXk5", "1RSANi5KJiDSoDh5LfCD7e"
];

// token
async function getAccessToken() {
  const cached = sessionStorage.getItem("sp_token");
  const expiry = sessionStorage.getItem("sp_expiry");
  if (cached && Date.now() < Number(expiry)) return cached;
 
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type":  "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });
 
  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to refresh token");
  sessionStorage.setItem("sp_token",  data.access_token);
  sessionStorage.setItem("sp_expiry", String(Date.now() + data.expires_in * 1000));
  return data.access_token;
}
 

// fetches currently palying 
async function fetchNowPlaying() {
  try {
    const token = await getAccessToken();
    const res   = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${token}` },
    });
 
    if (res.status === 204) return null;
    if (!res.ok) return null;
 
    const data = await res.json();
    console.log("context URI:", data.context?.uri);
    if (!data?.item || !data.is_playing) return null;
 
    const item      = data.item;
    const isPodcast = item.type === "episode";
    // check for if song is in playlist array
    const contextUri  = data.context?.uri ?? "";
    const contextId   = contextUri.split(":")[2] ?? "";
    const inAllowedList = ALLOWED_PLAYLISTS.includes(contextId);
 
    if (!inAllowedList) return null;
 
    // for explicit songs
    // if (!isPodcast && item.explicit) return null;
 
    return {
      trackName:  item.name,
      artistName: isPodcast
        ? item.show?.name ?? ""
        : item.artists?.map((a) => a.name).join(", ") ?? "",
      albumArt: isPodcast
        ? item.images?.[0]?.url ?? null
        : item.album?.images?.[0]?.url ?? null,
      isPlaying: data.is_playing,
    };
  } catch {
    return null;
  }
}

// Hook 
export function useSpotify() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const intervalRef = useRef(null);
 
  useEffect(() => {
    const poll = async () => {
      const data = await fetchNowPlaying();
      setNowPlaying(data);
    };
 
    poll();
    intervalRef.current = setInterval(poll, POLL_MS);
    return () => clearInterval(intervalRef.current);
  }, []);
 
  return {
    isPlaying:  nowPlaying?.isPlaying ?? false,
    nowPlaying,
  };
}