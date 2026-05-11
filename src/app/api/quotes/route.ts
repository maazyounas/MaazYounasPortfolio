import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import Quote from "@/models/Quote";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const quotes = await Quote.find().lean();
    return NextResponse.json(quotes || [], { status: 200 });
  } catch (error) {
    console.error("Quotes API Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    await Quote.deleteMany({});
    const insertedQuotes = await Quote.insertMany(body);
    return NextResponse.json(insertedQuotes, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
