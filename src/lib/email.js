import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// ✅ Send email verification
export async function sendVerificationEmail(to, token) {
    const verificationUrl = `${process.env.AUTH_URL}/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: `"Remotenest" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Verify your email for Remotenest',
        html: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>If you did not register, please ignore this email.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}

// ✅ Send password reset email
export async function sendResetPasswordEmail(to, token, name = 'User') {
    name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const resetUrl = `${process.env.AUTH_URL}/auth/reset-password?token=${token}`;

    const mailOptions = {
        from: `"Remotenest" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Password Reset Request - Remotenest',
        html: `
      <p>Hello ${name},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>This link expires in 1 hour.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}

// ✅ Send OTP email
export async function sendOtpEmail(to, name, otp) {
    name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const mailOptions = {
        from: `"Remotenest" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Your OTP Code - Remotenest',
        html: `
      <p>Hello ${name},</p>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn’t request this, you can safely ignore it.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}