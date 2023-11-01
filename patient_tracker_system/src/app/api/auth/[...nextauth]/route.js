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
                first: {label : "Username", type: "text"},
                last: {label : "Username", type: "text"},
                ssn: {label : "Username", type: "text"},
                dob: {label : "Username", type: "text"},
                address: {label : "Username", type: "text"},
                city: {label : "Username", type: "text"},
                state: {label : "Username", type: "text"},
                zip: {label : "Username", type: "text"},
                phone: {label : "Username", type: "text"},
                email: {label : "Username", type: "text"},
                gender:{label : "Username", type: "text"},
                register: {type: "checkbox"}
            },
            async authorize(credentials, _req) {
                if (credentials?.register) {
                    const res = await fetch("http://localhost:3001/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                            first: credentials?.first,
                            last: credentials?.last,
                            ssn: credentials?.ssn,
                            dob: credentials?.dob,
                            address: credentials?.address,
                            city: credentials?.city,
                            zip: credentials?.zip,
                            phone: credentials?.phone,
                            email: credentials?.email,
                            gender: credentials?.gender
                        })
                    })
                    const resCode = res.status;
                    const user = await res.json();
                    if (user && resCode == 200) {
                        return user;
                    } else {
                        return null;
                    }
                } else {
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
                    if (user && resCode == 200) {
                        return user;
                    } else {
                        return null;
                    }
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
    }
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};