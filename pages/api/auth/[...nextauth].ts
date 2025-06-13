import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook"; // Meta
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { linkOrCreateUser } from "../../../lib/auth-helpers";

// Extend the Session type to include 'id' on user
declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    GitHubProvider({ clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! }),
    FacebookProvider({ clientId: process.env.META_CLIENT_ID!, clientSecret: process.env.META_CLIENT_SECRET! })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
    return await linkOrCreateUser(user, account);
  },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
