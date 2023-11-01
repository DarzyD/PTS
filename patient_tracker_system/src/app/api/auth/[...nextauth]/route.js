import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export const authOptions = {
    providers :[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label : "Username", type: "text"},
                password: {label : "Password", type: "password"},
            },
            async authorize(credentials, _req) {
                const res = await fetch("http://localhost:3001/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                })
                const resCode = res.status;
                const user = await res.json();
                console.log(resCode);
                console.log(user);
                if (user && resCode == 200) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn:"/Login" 
    }
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};