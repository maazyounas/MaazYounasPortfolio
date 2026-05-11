import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    await Project.deleteMany({});
    const inserted = await Project.insertMany(body);
    return NextResponse.json(inserted, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
