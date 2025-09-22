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


    // // 🔽 OLD CODE (DEPRECATED OPTIONS)
    // /*
    // await mongoose.connect(MONGODB_URI, {
    //   dbName: "remotenest",               // ✅ Still valid — keep using
    //   useNewUrlParser: true,              // ❌ Deprecated — remove
    //   useUnifiedTopology: true,           // ❌ Deprecated — remove
    // });
    // */

    // // ✅ NEW CODE (UPDATED FOR MONGOOSE 6+)
    // await mongoose.connect(MONGODB_URI, {
    //   dbName: "remotenest",               // ✅ Still required to specify DB name
    //   autoIndex: true,                    // ✅ Useful in dev for automatic indexes
    //   maxPoolSize: 10,                    // ✅ Controls number of concurrent connections
    //   serverSelectionTimeoutMS: 5000,     // ✅ Time before throwing connection timeout error
    //   // You can add more options here as needed
    // });


    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}