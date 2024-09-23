import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXTAUTH_URL_GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.NEXTAUTH_URL_GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_URL
});

export { handler as GET, handler as POST }