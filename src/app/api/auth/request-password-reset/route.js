import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import crypto from "crypto";
import { sendResetPasswordEmail } from "@/lib/email"; // ✅ reusing shared function

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
        }

        await connectToDB();

        const user = await User.findOne({ email });

        if (!user) {
            // For security, don't reveal whether the user exists
            return new Response(
                JSON.stringify({ message: "If that email exists, a reset link has been sent." }),
                { status: 200 }
            );
        }

        // ✅ Generate reset token
        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        // ✅ Send email via lib/email.js
        await sendResetPasswordEmail(user.email, resetPasswordToken, user.name);

        return new Response(
            JSON.stringify({ message: "If that email exists, a reset link has been sent." }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending reset password email:", error);
        return new Response(JSON.stringify({ message: `Error sending reset email: ${error.message}`}), { status: 500 });
    }
}
