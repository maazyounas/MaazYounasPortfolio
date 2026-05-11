import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import About from "@/models/About";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  try {
    const data = await About.findOne();
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
    let about = await About.findOne();
    if (about) {
      Object.assign(about, body);
      await about.save();
    } else {
      about = new About(body);
      await about.save();
    }
    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
