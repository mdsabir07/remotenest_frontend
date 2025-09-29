import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req) {
    const { email, otp } = await req.json();

    if (!email || !otp) {
        return new Response(
            JSON.stringify({ message: "Email and OTP are required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
        return new Response(
            JSON.stringify({ message: "Invalid or expired OTP" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
        return new Response(
            JSON.stringify({ message: "Invalid or expired OTP" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    if (user.otp !== otp) {
        return new Response(
            JSON.stringify({ message: "Invalid OTP" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    // OTP is valid — clear it so it can’t be reused
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return new Response(
        JSON.stringify({ message: "OTP verified successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}