// test-mongo.js (CommonJS version)
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

(async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    process.exit(1);
  }
})();