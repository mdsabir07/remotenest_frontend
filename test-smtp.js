import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log('SMTP Host:', process.env.SMTP_HOST);
console.log('SMTP User:', process.env.SMTP_USER);
console.log('SMTP Port:', process.env.SMTP_PORT);


async function testSMTP() {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            // Force IPv4, avoids ::1 connection refused error
            family: 4,
        });


        await transporter.verify();
        console.log("✅ SMTP connection successful");

        const info = await transporter.sendMail({
            from: `"Test" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,  // send test email to yourself
            subject: "SMTP Test Email",
            text: "This is a test email from nodemailer SMTP setup",
        });

        console.log("✅ Test email sent:", info.messageId);
    } catch (error) {
        console.error("❌ SMTP test failed:", error);
    }
}

testSMTP();