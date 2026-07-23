import nodemailer from "nodemailer";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error("Missing required env vars:", missing.join(", "));
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const { name, email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const smtpPort = Number(process.env.SMTP_PORT) || 587;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // notif email for failures
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${escapeHtml(name) || "Anonymous"}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name) || "Anonymous"}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "I received your message",
        html: `
          <p>Hi ${escapeHtml(name) || "there"},</p>
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
}
