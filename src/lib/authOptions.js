import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// **imports needed for DB connection and password checking**
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // **authorize function**
      async authorize(credentials) {
        // **Connect to the database**
        await connectToDB();

        // **Find the user by email in MongoDB**
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // **Compare hashed password stored in DB with the one provided**
        const isPasswordCorrect = await compare(credentials.password, user.password);
        if (!isPasswordCorrect) return null;

        // **Return user info (without password)**
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },
};