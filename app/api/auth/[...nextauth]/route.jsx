 import NextAuth from "next-auth/next";
 import prisma from '../../../libs/prismadb'
 import {PrismaAdapter} from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "jsmith"},
                password: { label: "Password", type: "password"},
                username: { label: "Username", type: "text", placeholder: "John Smith"},
            },
            async authorize(credentials) {

                //check if there is an email and a password entered//
                if(!credentials.email || !credentials.password){
                    throw new Error('Please enter an email and password');
                }

                //check if the user exists//
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                
                //check if the user is found
                if (!user || !user?.hashedPassword){
                    throw new Error('No user found');
                }

                //check if the passwords match//
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                //check if passwords match//
                if (!passwordMatch){
                    throw new Error('Incorrect password')
                }

                return user;
            },
        }),
    ],
    secret: process.env.SECRET,
    session:{
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST};
