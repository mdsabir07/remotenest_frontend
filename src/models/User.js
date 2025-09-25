import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  avatar: { type: String, default: "" },

  // Email verification fields
  isVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,

  // Password reset fields
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // OTP verification fields
  otp: String,
  otpExpires: { type: Date, index: true },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
