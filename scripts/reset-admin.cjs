// One-time script to reset the admin user with current .env credentials
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Parse .env manually
const envPath = path.join(__dirname, "..", ".env");
const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex > 0) {
      const key = trimmed.substring(0, eqIndex).trim();
      const value = trimmed.substring(eqIndex + 1).trim();
      envVars[key] = value;
    }
  }
});

const MONGO_URI = envVars.MONGO_URI;

async function resetAdmin() {
  if (!MONGO_URI) {
    console.error("MONGO_URI not found in .env");
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const result = await mongoose.connection.collection("adminusers").deleteMany({});
  console.log(`Deleted ${result.deletedCount} admin user(s)`);
  
  console.log("\nDone! The next time you login, a new admin user will be created from your .env credentials:");
  console.log(`  Username: ${envVars.ADMIN_USERNAME}`);
  console.log(`  Email:    ${envVars.ADMIN_EMAIL}`);
  console.log(`  Password: ${envVars.ADMIN_PASSWORD}`);

  await mongoose.disconnect();
  process.exit(0);
}

resetAdmin().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
