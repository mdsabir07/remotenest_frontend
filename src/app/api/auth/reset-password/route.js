import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req) {
    try {
        const { token, password } = await req.json(); // ✅ match frontend key

        if (!token || !password) {
            return new Response(
                JSON.stringify({ message: "Token and new password are required" }),
                { status: 400 }
            );
        }

        await connectToDB();

        // ✅ Find user by valid token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ message: "Invalid or expired token" }),
                { status: 400 }
            );
        }

        // ✅ Hash new password and update
        const hashedPassword = await hash(password, 10);
        user.password = hashedPassword;

        // ✅ Clear token and expiry
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return new Response(
            JSON.stringify({ message: "Password has been reset successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Reset password error:", error);
        return new Response(
            JSON.stringify({ message: "Server error resetting password" }),
            { status: 500 }
        );
    }
}
