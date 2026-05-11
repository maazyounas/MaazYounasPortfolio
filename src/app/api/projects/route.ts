import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Project from "@/models/Project";

import { IProject } from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    const mappedProjects = projects.map((p: IProject) => ({
      ...p.toObject(),
      id: String(p._id),
    }));
    return NextResponse.json(mappedProjects, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
