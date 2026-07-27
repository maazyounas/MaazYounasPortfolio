// One-time script to reset the admin user with current .env credentials
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function resetAdmin() {
  if (!MONGO_URI) {
    console.error("MONGO_URI not found in .env");
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  // Delete existing admin user(s)
  const result = await mongoose.connection.collection("adminusers").deleteMany({});
  console.log(`Deleted ${result.deletedCount} admin user(s)`);
  
  console.log("Done! The next time you login, a new admin user will be created from your .env credentials:");
  console.log(`  Username: ${process.env.ADMIN_USERNAME}`);
  console.log(`  Email: ${process.env.ADMIN_EMAIL}`);
  console.log(`  Password: ${process.env.ADMIN_PASSWORD}`);

  await mongoose.disconnect();
  process.exit(0);
}

resetAdmin().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
