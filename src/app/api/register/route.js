import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hash } from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, password, avatar } = await req.json();
    await connectToDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    // Generate verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    // Create user
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

    // Send verification email
    try {
      console.log("📤 Preparing to send verification email to:", newUser.email);

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${emailVerificationToken}`;

      const mailOptions = {
        from: `"Remotenest" <${process.env.SMTP_USER}>`,
        to: newUser.email,
        subject: "Please verify your email address",
        html: `
          <p>Hello ${newUser.name},</p>
          <p>Thank you for registering. Please verify your email by clicking the link below:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>This link expires in 24 hours.</p>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Verification email sent:", info.messageId);

    } catch (emailError) {
      console.error("❌ Failed to send verification email:", emailError.message || emailError);
      // Optionally handle retry logic or alert admin
    }

    // Return sanitized user data
    const obj = newUser.toObject();
    delete obj.password;
    delete obj.emailVerificationToken;
    delete obj.emailVerificationExpires;

    return new Response(JSON.stringify({ user: obj }), { status: 201 });

  } catch (err) {
    console.error("❌ Registration error:", err.message || err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}