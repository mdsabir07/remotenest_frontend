import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" }, // default is user
  avatar: { type: String, default: "" }, // store avatar URL
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);