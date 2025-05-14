import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/api";

interface ExtendedUser extends User {
  accessToken: string | undefined;
  token?: string;
  role?: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        try {
          const res = await api.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data?.access_token) {
            return {
              id: res.data.user.id,
              name: res.data.user.email,
              role: res.data.user.role,
              token: res.data.access_token,
              accessToken: res.data.access_token,
            };
          }
        } catch (err) {
          console.error("Error during authorization:", err);
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as ExtendedUser).token;
        token.role = (user as ExtendedUser).role;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
