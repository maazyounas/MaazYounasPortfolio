import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Visitor from "@/models/Visitor";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  try {
    const visitors = await Visitor.find().sort({ visitDate: -1 });
    return NextResponse.json(visitors, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = await request.json();
    const visitor = new Visitor(body);
    await visitor.save();
    return NextResponse.json(visitor, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
