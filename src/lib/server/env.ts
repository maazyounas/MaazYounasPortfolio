import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(3000),

  MONGO_URI: z.string().min(1),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters"),

  NEXTAUTH_SECRET: z
    .string()
    .min(32, "NEXTAUTH_SECRET must be at least 32 characters"),

  NEXTAUTH_URL: z.string().url(),

  ADMIN_EMAIL: z.string().email(),

  ADMIN_USERNAME: z.string().min(3),

  ADMIN_PASSWORD: z
    .string()
    .min(12, "ADMIN_PASSWORD must be at least 12 characters"),

  EMAIL_USER: z.string().email(),

  EMAIL_PASS: z.string().min(1),

  CLOUDINARY_CLOUD_NAME: z.string().min(1),

  CLOUDINARY_API_KEY: z.string().min(1),

  CLOUDINARY_API_SECRET: z.string().min(1),

  NEXT_PUBLIC_API_BASE_URL: z.string().default("/api"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errorMsg = "❌ Invalid environment variables: " + JSON.stringify(parsed.error.flatten().fieldErrors);
  console.error(errorMsg);
  
  // Throwing instead of exiting allows Next.js to show an error page 
  // instead of killing the dev server process.
  if (process.env.NODE_ENV === "production") {
    throw new Error(errorMsg);
  }
}

export const env = parsed.data;