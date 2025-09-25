import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req) {
    const { email, otp } = await req.json();

    if (!email || !otp) {
        return new Response(JSON.stringify({ message: "Email and OTP are required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    await connectToDB();
    const user = await User.findOne({ email });

    if (!user) {
        console.warn("OTP verification failed: User not found");
        return new Response(JSON.stringify({ message: "Invalid or expired OTP" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const now = Date.now();

    if (!user.otp || !user.otpExpires) {
        console.warn("OTP verification failed: OTP or expiration missing");
        return new Response(JSON.stringify({ message: "Invalid or expired OTP" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // If using hashed OTPs, hash the incoming otp here
    // const crypto = require("crypto");
    // const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (user.otp !== otp || user.otpExpires < now) {
        console.warn("OTP verification failed: OTP mismatch or expired");
        return new Response(JSON.stringify({ message: "Invalid or expired OTP" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // OTP is valid
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true; // Just set it

    await user.save();

    return new Response(JSON.stringify({ message: "OTP verified successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}