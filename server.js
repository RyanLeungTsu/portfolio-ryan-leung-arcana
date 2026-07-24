import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// helpers
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeField(str = "") {
  return String(str).replace(/[\r\n]+/g, " ").trim();
}

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

const MAX_LENGTHS = { name: 100, email: 254, message: 5000 };

// contact api
app.post("/api/contact", async (req, res) => {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error("Missing required env vars:", missing.join(", "));
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const origin = req.headers.origin;
  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests, please try again later." });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { name, email, message, website } = req.body;
  // honeypot
  if (website) {
    return res.status(200).json({ success: true }); 
  }

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (
    (name && name.length > MAX_LENGTHS.name) ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return res.status(400).json({ error: "Input too long" });
  }

  const cleanName = sanitizeField(name);
  const cleanEmail = sanitizeField(email);
  const smtpPort = Number(process.env.SMTP_PORT) || 587;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `Portfolio Contact: ${escapeHtml(cleanName) || "Anonymous"}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(cleanName) || "Anonymous"}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: cleanEmail,
        subject: "I received your message",
        html: `
          <p>Hi ${escapeHtml(cleanName) || "there"},</p>
          <p>Thanks for reaching out! I'll get back to you soon.</p>
          <p>Best,<br>Ryan</p>
        `,
      });
    } catch (autoReplyErr) {
      console.error("Auto-reply email failed:", autoReplyErr);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

// api for now playing
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

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

async function getSpotifyAccessToken() {
  if (cachedToken && Date.now() < cachedExpiry) return cachedToken;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to refresh Spotify token");

  cachedToken = data.access_token;
  cachedExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

app.get("/api/now-playing", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");

  try {
    const token = await getSpotifyAccessToken();
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
});

// server start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));