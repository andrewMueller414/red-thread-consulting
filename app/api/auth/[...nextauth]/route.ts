import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error(
        "Cannot continue without the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables set.",
    );
    process.exit(1);
}

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
};

const authHandler = NextAuth(authOptions);

export default authHandler;

export {
    authHandler as POST,
    authHandler as GET,
    authHandler as PUT,
    authHandler as DELETE,
    authHandler as OPTIONS,
};
