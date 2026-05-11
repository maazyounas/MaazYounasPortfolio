import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import GlobalSettings from "@/models/GlobalSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const data = await GlobalSettings.findOne().lean();
    return NextResponse.json(data || null, { status: 200 });
  } catch (error) {
    console.error("Settings API Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    let settings = await GlobalSettings.findOne();
    if (settings) {
      Object.assign(settings, body);
      await settings.save();
    } else {
      settings = new GlobalSettings(body);
      await settings.save();
    }
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
