import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;

  try {
    await Project.findByIdAndUpdate(id, { $inc: { views: 1 } });
    return NextResponse.json({ message: "View added" }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
