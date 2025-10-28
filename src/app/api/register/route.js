import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email"; // ✅ import central function
import { sendNotification } from "@/lib/sendNotification";

export async function POST(req) {
  try {
    const { name, email, password, avatar } = await req.json();
    await connectToDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 10);

    // Generate verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    // ✅ Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: avatar || "",
      role: "user",
      isVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    });
    console.log("✅ New user created:", newUser.email);

    // send admin notification about new user registration
    try {
      await sendNotification({
        toRole: "admin",
        senderId: newUser._id,
        title: "New user registered",
        message: `${newUser.name} (${newUser.email}) joined RemoteNest.`,
        type: "general",
      });
    } catch (notifyError) {
      console.error("❌ Failed to send admin notification:", notifyError);
    }

    // ✅ Send verification email
    try {
      await sendVerificationEmail(newUser.email, emailVerificationToken);
      console.log("✅ Verification email sent to:", newUser.email);
    } catch (emailError) {
      console.error("❌ Failed to send verification email:", emailError);

      // Optional: Delete user if email fails
      // await User.findByIdAndDelete(newUser._id);
      // return new Response(JSON.stringify({ message: "Failed to send verification email. Please try again later." }), { status: 500 });
    }

    // Remove sensitive fields before sending response
    const userObj = newUser.toObject();
    delete userObj.password;
    delete userObj.emailVerificationToken;
    delete userObj.emailVerificationExpires;

    return new Response(JSON.stringify({ user: userObj }), { status: 201 });
  } catch (err) {
    console.error("❌ Registration error:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}