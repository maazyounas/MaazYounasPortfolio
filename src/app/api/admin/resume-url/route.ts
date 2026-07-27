import { NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import AdminUser from "@/models/AdminUser";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  try {
    const admin = await AdminUser.findOne();
    let resumeUrl = admin?.resumeUrl || "";
    
    // Inject fl_attachment to force download on the client side
    if (resumeUrl && resumeUrl.includes("cloudinary.com") && !resumeUrl.includes("fl_attachment")) {
      resumeUrl = resumeUrl.replace("/upload/", "/upload/fl_attachment/");
    }
    
    return NextResponse.json({ resumeUrl }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  await connectDB();

  try {
    const admin = await AdminUser.findOne();
    if (admin) {
      admin.resumeUrl = "";
      await admin.save();
    }
    return NextResponse.json({ resumeUrl: "" }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
