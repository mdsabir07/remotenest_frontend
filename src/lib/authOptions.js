// src/lib/authOptions.js

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const user = await User.findOne({ email: credentials.email });

        // 🆕 Reject if user doesn't exist
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await compare(credentials.password, user.password);

        // 🆕 Reject if password is wrong
        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // 🆕 Block login if email not verified
        if (!user.isVerified) {
          throw new Error("Email not verified. Please check your inbox.");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
          isVerified: true,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if (user.role) token.role = user.role;
        if (user.isVerified !== undefined) token.isVerified = user.isVerified;  // ✅ Keeps verification status
      }

      if (token?.id && !token?.role) {
        try {
          await connectToDB();
          const dbUser = await User.findById(token.id).select("role isVerified").lean();
          if (dbUser?.role) token.role = dbUser.role;
          if (dbUser?.isVerified !== undefined) token.isVerified = dbUser.isVerified;
        } catch (err) {
          console.error("JWT callback error:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.role) session.user.role = token.role;
      if (token?.isVerified !== undefined) session.user.isVerified = token.isVerified;
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectToDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name || profile?.name || profile?.login,
              email: user.email,
              avatar: user.image || profile?.picture || profile?.avatar_url,
              role: "user",
              isVerified: true, // ✅ Trust social login users
            });
          }
        } catch (err) {
          console.error("Error during social login user creation:", err);
          return false;
        }
      }

      return true;
    },
  },
};