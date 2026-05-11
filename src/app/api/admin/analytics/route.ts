import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Visitor from "@/models/Visitor";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  try {
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
