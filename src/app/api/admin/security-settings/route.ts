import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import AdminUser from "@/models/AdminUser";
import { env } from "@/lib/server/env";
import {
  parseSecuritySettingsPayload,
  securitySettingsSchema,
  validateZodBody,
} from "@/lib/server/validation";

export const dynamic = "force-dynamic";

const normalizeSettings = (value: unknown): Record<string, unknown> => {
  if (!value) return {};
  if (value instanceof Map) {
    return Object.fromEntries(value);
  }
  if (typeof value === "object") {
    return value as Record<string, unknown>;
  }
  return {};
};

export async function GET() {
  await connectDB();

  try {
    const admin = await AdminUser.findOne();
    if (!admin) {
      return NextResponse.json({}, { status: 200 });
    }
    const securitySettings = normalizeSettings(admin.securitySettings);
    return NextResponse.json(
      {
        ...securitySettings,
        email: admin.email,
        adminUsername: admin.username || securitySettings.adminUsername || "admin",
        resumeUrl: admin.resumeUrl || securitySettings.resumeUrl || "",
        lastLogin: admin.lastLogin?.toISOString() || securitySettings.lastLogin,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const parsedBody = validateZodBody(body, securitySettingsSchema);
    const admin = await AdminUser.findOne();
    if (admin) {
      const existing = normalizeSettings(admin.securitySettings);
      const nextSettings = new Map(Object.entries({ ...existing, ...parsedBody }));
      admin.securitySettings = nextSettings;
      const parsedSettings = parsedBody as Record<string, unknown>;
      if (typeof parsedSettings?.adminUsername === "string") {
        admin.username = parsedSettings.adminUsername;
      }
      if (typeof parsedSettings?.email === "string") {
        admin.email = parsedSettings.email;
      }
      await admin.save();
    } else {
      const defaults = {
        username: env.ADMIN_USERNAME,
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASSWORD,
      };
      const parsedSettings = parsedBody as Record<string, unknown>;
      const newAdmin = new AdminUser({
        username: defaults.username,
        email: defaults.email,
        password: defaults.password,
        securitySettings: new Map(Object.entries({
          adminUsername: defaults.username,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          lockoutDuration: 15,
          ...parsedBody,
        })),
      });
      if (typeof parsedSettings?.adminUsername === "string") {
        newAdmin.username = parsedSettings.adminUsername;
      }
      if (typeof parsedSettings?.email === "string") {
        newAdmin.email = parsedSettings.email;
      }
      await newAdmin.save();
    }
    return NextResponse.json(parsedBody, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
