import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export const authOptions = {
    providers :[
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? ""
        })
    ]
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};