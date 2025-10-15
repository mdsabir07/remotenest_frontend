// test-mongo.js (CommonJS version)
const mongoose = require("mongoose");

const uri = "mongodb+srv://remotenest:sazidi66@cluster0.xilbtqj.mongodb.net/remotenest?retryWrites=true&w=majority&appName=Cluster0";

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