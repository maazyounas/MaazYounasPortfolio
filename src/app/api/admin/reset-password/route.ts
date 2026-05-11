import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import AdminUser from "@/models/AdminUser";
import {
  adminResetPasswordSchema,
  parseAdminResetPasswordPayload,
  validateZodBody,
} from "@/lib/server/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const { email, resetCode, newPassword } = validateZodBody(body, adminResetPasswordSchema);

    const admin = await AdminUser.findOne({ email });
    if (!admin || !admin.resetCode || !admin.resetCodeExpiry) {
      return NextResponse.json({ error: "Invalid reset code" }, { status: 401 });
    }

    if (admin.resetCode !== resetCode) {
      return NextResponse.json({ error: "Invalid reset code" }, { status: 401 });
    }

    if (admin.resetCodeExpiry.getTime() < Date.now()) {
      return NextResponse.json({ error: "Reset code expired" }, { status: 401 });
    }

    admin.password = newPassword;
    admin.resetCode = null;
    admin.resetCodeExpiry = null;
    await admin.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
