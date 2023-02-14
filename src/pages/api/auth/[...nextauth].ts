import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as { email: string, password: string };

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("No user found");
        } else {
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
      }
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);