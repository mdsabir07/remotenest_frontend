// app/api/auth/verify-email/route.js

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get("token");

        if (!token) {
            return new Response(
                JSON.stringify({ message: "Missing token" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        await connectToDB();

        // Find user by token and check expiration
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ message: "Invalid or expired token" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Mark user as verified and clear token fields
        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        return new Response(
            JSON.stringify({ message: "Email verified successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Verify Email Error:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}