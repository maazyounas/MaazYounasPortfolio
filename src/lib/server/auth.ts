import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/lib/server/env";
import connectDB from "@/lib/server/db";
import AdminUser from "@/models/AdminUser";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 15 * 60,
  },
  pages: {
    signIn: "/admin",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        await connectDB();
        
        // Security: Explicitly cast to string to prevent NoSQL injection if an object is passed
        const username = String(credentials.username || "");

        let user = await AdminUser.findOne({
          $or: [
            { username: username },
            { email: username },
          ],
        });

        if (!user) {
          user = await AdminUser.create({
            username: env.ADMIN_USERNAME,
            email: env.ADMIN_EMAIL,
            password: env.ADMIN_PASSWORD,
            securitySettings: {
              adminUsername: env.ADMIN_USERNAME,
              sessionTimeout: 30,
              maxLoginAttempts: 5,
              lockoutDuration: 15,
            },
          });
        }

        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) {
          throw new Error("Invalid username or password");
        }

        user.lastLogin = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as { role?: string };
        sessionUser.role = token.role as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};
