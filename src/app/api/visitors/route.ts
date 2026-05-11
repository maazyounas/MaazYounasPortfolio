import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Visitor from "@/models/Visitor";

import { IVisitor } from "@/models/Visitor";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  try {
    const visitors = await Visitor.find().sort({ visitDate: -1 });
    const mappedVisitors = visitors.map((v: IVisitor) => ({
      id: String(v._id),
      email: (v as unknown as { email?: string }).email || "",
      date: v.visitDate || (v as unknown as { createdAt?: Date }).createdAt,
      page: v.url || "/",
      ipAddress: v.ip,
      userAgent: v.userAgent,
      securitySettings: (v as unknown as { securitySettings?: Map<string, unknown> }).securitySettings || new Map(),
      country: (v as unknown as { country?: string }).country || "Unknown",
    }));
    return NextResponse.json(mappedVisitors, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = await request.json();
    const ip =
      body?.ipAddress ||
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const visitor = new Visitor({
      ip,
      userAgent: body?.userAgent || request.headers.get("user-agent"),
      url: body?.page || "/",
      email: body?.email,
    });

    await visitor.save();

    return NextResponse.json(
      {
        id: visitor._id,
        ...body,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
