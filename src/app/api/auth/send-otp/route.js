import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import nodemailer from "nodemailer";

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

export async function POST(req) {
    const { email } = await req.json();

    if (!email) {
        return new Response(JSON.stringify({ message: "Email is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    await connectToDB();
    const user = await User.findOne({ email });

    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Optional: Rate limit if OTP still valid
    if (user.otpExpires && user.otpExpires > Date.now()) {
        return new Response(JSON.stringify({ message: "OTP already sent. Please wait." }), {
            status: 429,
            headers: { "Content-Type": "application/json" },
        });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 1000 * 60 * 10; // 10 minutes

    // Save OTP and expiration (plain or hashed)
    user.otp = otp; // OR hash it
    user.otpExpires = otpExpires;
    await user.save();

    // Email setup
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Remotenest" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Your OTP Code",
            html: `
        <p>Hello ${user.name},</p>
        <p>Your OTP code is <strong>${otp}</strong>. It expires in 10 minutes.</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        if (process.env.NODE_ENV !== "production") {
            console.log(`OTP sent to ${email}: ${otp}`);
        }

        return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error sending OTP email:", error);

        return new Response(JSON.stringify({ message: "Failed to send OTP" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}