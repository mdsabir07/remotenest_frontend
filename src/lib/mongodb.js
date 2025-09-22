// lib/mongodb.js
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDB() {
  if (mongoose.connections[0].readyState) return;

  try {
    console.log("Connecting to MongoDB with URI:", MONGODB_URI);

    await mongoose.connect(MONGODB_URI, {
      dbName: "remotenest",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}