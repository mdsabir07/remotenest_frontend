import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hash } from "bcryptjs";
import crypto from "crypto"; // New import for token generation
import nodemailer from "nodemailer"; // New import for email sending

export async function POST(req) {
  const { name, email, password, avatar } = await req.json();
  await connectToDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  // Generate verification token (random hex string)
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours from now

  // Create user with verification token & expiry
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatar || "",
    role: "user",
    isVerified: false, // new field in User model to track verification
    emailVerificationToken,
    emailVerificationExpires,
  });

  // Send verification email
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
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
      html: `<p>Hello ${newUser.name},</p>
             <p>Thank you for registering. Please verify your email by clicking the link below:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>
             <p>This link expires in 24 hours.</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Optionally handle failure, e.g., delete user or mark for retry
  }
  
  // don't return password or verification token/expiry in response
  const obj = newUser.toObject();
  delete obj.password;
  delete obj.emailVerificationToken; // Don't send token back
  delete obj.emailVerificationExpires;

  return new Response(JSON.stringify({ user: obj }), { status: 201 });
}
