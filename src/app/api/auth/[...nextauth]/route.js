// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };