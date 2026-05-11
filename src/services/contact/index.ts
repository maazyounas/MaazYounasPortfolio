import nodemailer from "nodemailer";
import { env } from "@/lib/server/env";
import { parseContactMessage } from "@/lib/server/validation";
import { ContactSubmission, ContactResponse } from "./types";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

/**
 * Submit a contact form and send email
 */
export async function submitContact(payload: ContactSubmission): Promise<ContactResponse> {
  // Parse and sanitize the contact message
  const sanitized = parseContactMessage({
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
  });

  // Send email notification
  const emailHtml = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${sanitized.name}</p>
    <p><strong>Email:</strong> ${sanitized.email}</p>
    <p><strong>Subject:</strong> ${sanitized.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitized.message}</p>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${env.EMAIL_USER}>`,
    to: env.EMAIL_USER,
    subject: `New Contact: ${sanitized.subject}`,
    html: emailHtml,
    replyTo: sanitized.email,
  });

  return {
    id: `msg-${Date.now()}`,
    name: sanitized.name,
    email: sanitized.email,
    subject: sanitized.subject || "Portfolio inquiry",
    message: sanitized.message,
    createdAt: new Date(),
  };
}
