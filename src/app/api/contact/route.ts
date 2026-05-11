import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";
import { env } from "@/lib/server/env";
import { parseContactMessage, sanitizeObject } from "@/lib/server/validation";

export const dynamic = "force-dynamic";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function GET() {
  await connectDB();

  try {
    const data = await Contact.findOne();
    return NextResponse.json(data || null, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();

    const bodyKeys = Object.keys(body || {});
    const isContactMessage =
      bodyKeys.length >= 3 &&
      bodyKeys.includes("name") &&
      bodyKeys.includes("email") &&
      bodyKeys.includes("message");

    if (isContactMessage) {
      const { name, email, subject, message } = parseContactMessage(body);

      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${env.EMAIL_USER}>`,
          to: env.EMAIL_USER,
          subject: `New Contact Message from ${name}`,
          html: `
            <h2>New Contact Message</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Subject:</b> ${subject}</p>
            <p><b>Message:</b></p>
            <p>${message}</p>
          `,
        });

        return NextResponse.json(
          { success: true, message: "Message sent successfully!" },
          { status: 200 },
        );
      } catch (mailError) {
        console.error("Nodemailer Error:", mailError);
        const errorMessage = mailError instanceof Error ? mailError.message : "Failed to send email via SMTP";
        return NextResponse.json(
          { error: `Email transport failed: ${errorMessage}` },
          { status: 500 },
        );
      }
    }

    try {
      const sanitizedBody = sanitizeObject(body);
      let contact = await Contact.findOne();
      if (contact) {
        Object.assign(contact, sanitizedBody);
        await contact.save();
      } else {
        contact = new Contact(sanitizedBody);
        await contact.save();
      }

      return NextResponse.json(contact, { status: 200 });
    } catch (dbError) {
      console.error("Database Error:", dbError);
      const errorMessage = dbError instanceof Error ? dbError.message : "Failed to save contact settings";
      return NextResponse.json(
        { error: `Database operation failed: ${errorMessage}` },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Contact API Request Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
