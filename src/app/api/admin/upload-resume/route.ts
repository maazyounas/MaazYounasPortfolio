import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/server/db";
import AdminUser from "@/models/AdminUser";
import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/server/env";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    // Upload with resource_type: "raw" to keep PDF/DOC files binary intact
    const uploadResponse = await cloudinary.uploader.upload(base64Data, {
      folder: "resumes",
      resource_type: "raw",
    });

    let resumeUrl = uploadResponse.secure_url;

    // Save to the admin user
    const admin = await AdminUser.findOne();
    if (admin) {
      admin.resumeUrl = resumeUrl;
      await admin.save();
    } else {
      // If admin doesn't exist, create one
      await AdminUser.create({
        username: env.ADMIN_USERNAME,
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASSWORD,
        resumeUrl,
        securitySettings: {
          adminUsername: env.ADMIN_USERNAME,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          lockoutDuration: 15,
        },
      });
    }

    // Inject fl_attachment to force download on the client side
    if (resumeUrl && resumeUrl.includes("cloudinary.com") && !resumeUrl.includes("fl_attachment")) {
      resumeUrl = resumeUrl.replace("/upload/", "/upload/fl_attachment/");
    }

    return NextResponse.json({ resumeUrl }, { status: 200 });
  } catch (error) {
    console.error("Resume upload error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
