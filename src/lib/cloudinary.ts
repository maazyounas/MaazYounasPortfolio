import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/server/env";

let configured = false;

function ensureConfigured() {
  if (configured) return;

  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  configured = true;
}

export async function uploadToCloudinary(data: string, folder: string): Promise<string> {
  ensureConfigured();

  const result = await cloudinary.uploader.upload(data, {
    folder,
    resource_type: "image",
  });

  return result.secure_url;
}
