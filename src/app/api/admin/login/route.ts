import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import { loginAdmin } from "@/services/auth";
import { adminLoginSchema, validateZodBody } from "@/lib/server/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectDB();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database connection failed";
    return NextResponse.json(
      { error: "Database unavailable", detail: message },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const validatedBody = validateZodBody(body, adminLoginSchema);

    // Call the auth service (thin route - just validation + service call + response)
    const result = await loginAdmin({
      username: validatedBody.username,
      email: validatedBody.email,
      password: validatedBody.password,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
