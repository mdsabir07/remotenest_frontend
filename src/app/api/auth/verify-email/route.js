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

        console.log("Verify email token received:", token);
        const user = await User.findOne({ emailVerificationToken: token });
        console.log("User found:", user);

        if (!user) {
            return new Response(
                JSON.stringify({ message: "Invalid token" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (user.emailVerificationExpires < Date.now()) {
            return new Response(
                JSON.stringify({ message: "Token expired" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

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