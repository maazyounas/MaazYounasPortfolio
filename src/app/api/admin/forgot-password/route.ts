import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import AdminUser from "@/models/AdminUser";
import nodemailer from "nodemailer";
import { env } from "@/lib/server/env";
import {
  adminForgotPasswordSchema,
  parseAdminForgotPasswordPayload,
  validateZodBody,
} from "@/lib/server/validation";

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

const generateResetCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const { email } = validateZodBody(body, adminForgotPasswordSchema);

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const resetCode = generateResetCode();
    admin.resetCode = resetCode;
    admin.resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await admin.save();

    try {
      await transporter.sendMail({
        from: `"Portfolio Admin" <${env.EMAIL_USER}>`,
        to: email,
        subject: "Admin password reset code",
        html: `
          <h2>Password Reset Code</h2>
          <p>Use the code below to reset your admin password. This code expires in 15 minutes.</p>
          <p style="font-size: 20px; font-weight: bold; letter-spacing: 2px;">${resetCode}</p>
        `,
      });
    } catch (mailError) {
      console.error("Password reset email error:", mailError);
      const errorMessage =
        mailError instanceof Error ? mailError.message : "Failed to send email via SMTP";
      return NextResponse.json(
        { error: `Email transport failed: ${errorMessage}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
