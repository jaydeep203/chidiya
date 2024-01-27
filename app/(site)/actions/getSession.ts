import {getServerSession} from "next-auth";
import NextAuth, {AuthOptions} from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";
import {compare} from "bcrypt";


export default async function getSession() {
    const authOptions: AuthOptions = {
        adapter: PrismaAdapter(prismadb),
        providers:[
            GithubProvider({
                clientId: process.env.GITHUB_ID as string,
                clientSecret: process.env.GITHUB_SECRET as string
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
            }),
            CredentialProvider({
                name: "credentials",
                credentials: {
                    email: { label: "email", type: "text"},
                    password: { label: "password", type: "password"}
                },
                async authorize(credentials){
                    if(!credentials?.email || !credentials?.password)
                        throw new Error("Enter all fields!");
    
                    const user = await prismadb.user.findUnique({
                        where:{
                            email: credentials.email
                        }
                    });
    
                    if(!user || !user?.hashedPassword)
                        throw new Error("Email does not Exists!");
    
                    const isCorrectPassword = await compare(
                        credentials.password,
                        user.hashedPassword
                    );
    
                    if(!isCorrectPassword)
                        throw new Error("Invalid Password.")
    
    
                    return user;
                }
            })
        ],
        debug: process.env.NODE_ENV === "development",
        session: {
            strategy: "jwt"
        },
        secret: process.env.NEXTAUTH_SECRET
    }
    return await getServerSession(authOptions);
}