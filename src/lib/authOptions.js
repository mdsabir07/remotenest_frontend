import NextAuth from "next-auth";
import { connectToDB } from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";
import { User } from "@/models/User";
import nodemailer from "nodemailer";

// Helper to send OTP email
async function sendOTPEmail(user, otp) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
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

    const info = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV !== "production") {
      console.log("✅ OTP email sent:", info.messageId);
    }
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text", placeholder: "6-digit OTP (if required)" },
      },
      async authorize(credentials) {
        await connectToDB();

        // Fetch user by email
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.isVerified) {
          throw new Error("Email not verified");
        }

        // Verify password
        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        const now = Date.now();

        // Check if user has a valid OTP active
        if (user.otp && user.otpExpires && user.otpExpires > now) {
          if (!credentials.otp) {
            // OTP required but not provided
            throw new Error("OTP required");
          }

          if (credentials.otp !== user.otp) {
            // OTP does not match
            throw new Error("Invalid OTP");
          }

          // OTP matched, clear OTP fields
          await User.updateOne(
            { _id: user._id },
            { $unset: { otp: 1, otpExpires: 1 } }
          );

          // Successful login
          console.log("✅ OTP matched. Returning user:", user.email);
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            avatar: user.avatar || null,
          };
        } else if (user.otp || user.otpExpires) {
          // OTP expired or invalid, clear OTP fields for fresh OTP next time
          await User.updateOne(
            { _id: user._id },
            { $unset: { otp: 1, otpExpires: 1 } }
          );
        }

        // No valid OTP — generate and send new OTP email
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = now + 10 * 60 * 1000; // expires in 10 minutes
        await user.save();

        await sendOTPEmail(user, otp);

        throw new Error("OTP required");
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Sync social users with DB
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "google" || account.provider === "github") {
          await connectToDB();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              role: "user",
              isVerified: true,
              password: "", // no password for social login
            });
            await newUser.save();
          }
        }
        return true;
      } catch (error) {
        console.error("OAuth sign-in error:", error);
        return false; // Prevent login if there's an error
      }
    },

    async redirect({ url, baseUrl }) {
      console.log("Redirect URL:", url);
      // Prevent redirecting social users to verify-email page
      return baseUrl + "/dashboard"; // or your preferred page
    },


    async jwt({ token, user }) {
      if (user) {
        // Connect to DB to fetch fresh user info (for social login especially)
        await connectToDB();
        // Fetch latest user info by email
        const dbUser = await User.findOne({ email: user.email }).lean();

        token.id = dbUser?._id?.toString() || token.id;
        token.role = dbUser?.role || user.role || token.role;
        token.email = dbUser?.email || user.email || token.email;
        token.name = dbUser?.name || user.name || token.name;
        token.isVerified = dbUser ? Boolean(dbUser.isVerified) : Boolean(user.isVerified) || Boolean(token.isVerified);
        token.avatar = dbUser?.avatar || user.avatar || null;
        console.log('Token after sign-in (updated with DB):', token);
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        email: token.email,
        name: token.name,
        isVerified: token.isVerified,
        avatar: token.avatar, // ✅ do NOT run getSafeAvatar here
      };
      return session;
    },

  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);