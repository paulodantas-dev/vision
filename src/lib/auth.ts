import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log("signIn", params);

      return true;
    },
    async jwt(params) {
      console.log("jwt", params);

      return params.token;
    },
    async session(params) {
      console.log("session", params);

      return params.session;
    },
    async redirect(params) {
      console.log("redirect", params);

      return params.url;
    },
  },
});
