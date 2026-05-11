import mongoose from "mongoose";
import { env } from "@/lib/server/env";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached = globalForMongoose.mongoose ?? (globalForMongoose.mongoose = { conn: null, promise: null });

export async function connectDB() {
  const MONGO_URI = env.MONGO_URI;

  if (!MONGO_URI) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn("Warning: MONGO_URI is missing during build. Database features will be disabled for prerendering.");
      return null;
    }
    throw new Error("Please define the MONGO_URI environment variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
