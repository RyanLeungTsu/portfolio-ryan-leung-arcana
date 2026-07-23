import { useState, useEffect, useRef } from "react";
import { useAnim } from "./useAnim";

const POLL_MS = 5000;

// playlists array from spotify (these are playlists that can be fetched)
const ALLOWED_PLAYLISTS = [
  "2lhD8kwqlrMe3lRDHLvqMu",
  "7oW9wqlVeLGYrkc5Yqh9ph",
  "0tx4TqYXsPkhN06mbgztHm",
  "3IBjNNhBtDfj2IIx6ZE4om",
  "3yi18tHd8fATRu1BRyOvwE",
  "3z6wctkq8VHs87ssrvhtyY",
  "14pcJUOmoeX0XYsIF4i4Ob",
  "12tBaT2YmUbVjYN9OSTRC6",
  "3gwPwowuJjnpu0XKSK2nLI",
  "5NwIObv6LeZSIWfuwhbKCw",
  "10RHNcnAfaETaDU9FRjSfj",
  "6W4QUfODkRetfZ6Kexx59F",
  "6MTJc9zrQHDtkaSdRZmCnG",
  "5UzopvgRTvhmkoKE6EixA9",
  "2aRkX0kmLUY5ZmzST2oT7i",
  "1dgx8kJyjxCqtBMwxBZvCk",
  "3TC6WJI5IstlqXDJwGGVAn",
  "1HhvHRtE3SsgRNQqZBJXFs",
  "5Hfzo2MQUISaxrMCGSYjwH",
  "6gWWkMVsuCFlMPvRMeVGGg",
  "4HU4aAhPTU4sIMlx94JnLU",
  "06v73KwGUhpyZsy1r2FXk5",
  "1RSANi5KJiDSoDh5LfCD7e",
];

// fetches currently palying
async function fetchNowPlaying() {
  try {
    const res = await fetch("/api/now-playing");
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function useSpotify() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const intervalRef = useRef(null);
  const { isPageVisible } = useAnim();

  useEffect(() => {
    if (!isPageVisible) {
      clearInterval(intervalRef.current);
      return;
    }

    const poll = async () => setNowPlaying(await fetchNowPlaying());

    poll();
    intervalRef.current = setInterval(poll, POLL_MS);
    return () => clearInterval(intervalRef.current);
  }, [isPageVisible]);

  return {
    isPlaying: nowPlaying?.isPlaying ?? false,
    nowPlaying,
  };
}
