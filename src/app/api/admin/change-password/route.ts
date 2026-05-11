import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import AdminUser from "@/models/AdminUser";
import { env } from "@/lib/server/env";
import {
  adminChangePasswordSchema,
  parseAdminChangePasswordPayload,
  validateZodBody,
} from "@/lib/server/validation";

export const dynamic = "force-dynamic";

const getDefaults = () => ({
  username: env.ADMIN_USERNAME,
  email: env.ADMIN_EMAIL,
  password: env.ADMIN_PASSWORD,
});

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const { currentPassword, newPassword, email } = validateZodBody(body, adminChangePasswordSchema);

    let admin = email
      ? await AdminUser.findOne({ email })
      : await AdminUser.findOne();

    if (!admin) {
      const defaults = getDefaults();
      admin = await AdminUser.create({
        username: defaults.username,
        email: defaults.email,
        password: defaults.password,
        securitySettings: {
          adminUsername: defaults.username,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          lockoutDuration: 15,
        },
      });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid current password" }, { status: 401 });
    }

    admin.password = newPassword;
    await admin.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
