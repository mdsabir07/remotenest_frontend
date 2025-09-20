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
      // On initial sign in, set id and role from user object (authorize) or fetch from DB if needed
      if (user) {
        token.id = user.id;
        // try to include role if present on user
        if (user.role) token.role = user.role;
      }
      // If token has an id but not role, try to fetch role from DB
      if (token?.id && !token?.role) {
        try {
          await connectToDB();
          const u = await User.findById(token.id).select("role").lean();
          if (u?.role) token.role = u.role;
        } catch (e) {
          // ignore
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.role) session.user.role = token.role;
      return session;
    },
  },
};