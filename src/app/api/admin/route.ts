import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Visitor from "@/models/Visitor";
import AdminUser from "@/models/AdminUser";
import jwt from "jsonwebtoken";
import { env } from "@/lib/server/env";

export const dynamic = "force-dynamic";

const JWT_SECRET = env.JWT_SECRET;

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

export async function GET(request: NextRequest) {
  await connectDB();
  const action = request.nextUrl.searchParams.get("action");

  try {
    switch (action) {
      case "visitors": {
        const visitors = await Visitor.find().sort({ visitDate: -1 });
        return NextResponse.json(visitors, { status: 200 });
      }
      case "analytics": {
        const visitorCount = await Visitor.countDocuments();
        return NextResponse.json(
          {
            totalViews: visitorCount,
            uniqueVisitors: visitorCount,
            projectViews: {},
            pageViews: {},
            bounceRate: 0,
            avgSessionDuration: 0,
            topReferrers: [],
            lastUpdated: new Date().toISOString(),
          },
          { status: 200 },
        );
      }
      case "security-settings": {
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
      }
      default:
        return NextResponse.json({ error: "Action not found" }, { status: 404 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  const action = request.nextUrl.searchParams.get("action");

  try {
    const body = await request.json();

    switch (action) {
      case "login": {
        const { email, password } = body;
        const user = await AdminUser.findOne({ email });
        if (!user) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        if (user.password !== password) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
        return NextResponse.json(
          { token, user: { id: user._id, email: user.email } },
          { status: 200 },
        );
      }
      case "visitors": {
        const visitor = new Visitor(body);
        await visitor.save();
        return NextResponse.json(visitor, { status: 200 });
      }
      case "security-settings": {
        const admin = await AdminUser.findOne();
        if (admin) {
          const existing = normalizeSettings(admin.securitySettings);
          const nextSettings = { ...existing, ...body };
          admin.securitySettings = nextSettings;
          if (body?.adminUsername) {
            admin.username = body.adminUsername;
          }
          if (body?.email) {
            admin.email = body.email;
          }
          await admin.save();
        } else {
          const newAdmin = new AdminUser({
            email: env.EMAIL_USER,
            password: env.ADMIN_PASSWORD,
            securitySettings: body,
          });
          await newAdmin.save();
        }
        return NextResponse.json(body, { status: 200 });
      }
      default:
        return NextResponse.json({ error: "Action not found" }, { status: 404 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
