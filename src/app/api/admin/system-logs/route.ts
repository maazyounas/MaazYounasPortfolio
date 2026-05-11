import { NextResponse } from "next/server";

type SystemLog = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  ipAddress: string;
  userAgent?: string;
  status: "success" | "failure" | "warning";
};

let inMemoryLogs: SystemLog[] = [];

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(inMemoryLogs, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SystemLog;
    inMemoryLogs = [body, ...inMemoryLogs].slice(0, 200);
    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
