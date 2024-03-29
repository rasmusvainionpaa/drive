import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string | unknown;
      /* name: string;
      email: string; */
    } & DefaultSession["user"];
  }

}
/* 
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
  }
} */
