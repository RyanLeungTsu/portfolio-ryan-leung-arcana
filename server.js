import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// credentials in.env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  // server checck 
  if (!email || !message) {
    return res.status(400).json({ error: "Email and message required" });
  }
  // regex format vlaidations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }


  try {
    // content sanitization, preventing html injection and no scripts allowed to be executed for safety
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${name || "Anonymous"}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${name || "Anonymous"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "I received your message",
      html: `
        <p>Hi ${name || "there"},</p>
        <p>Thanks for reaching out! I'll get back to you soon.</p>
        <p>Best,<br>Ryan</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(3001, () => {
  console.log("API server running on http://localhost:3001");
});