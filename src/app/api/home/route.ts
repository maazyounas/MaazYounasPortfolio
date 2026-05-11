import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Home from "@/models/Home";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const data = await Home.findOne().lean();
    return NextResponse.json(data || null, { status: 200 });
  } catch (error) {
    console.error("Home API Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    let home = await Home.findOne();
    if (home) {
      Object.assign(home, body);
      await home.save();
    } else {
      home = new Home(body);
      await home.save();
    }
    return NextResponse.json(home, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
