import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(
    req: Request
){
    try{

        const body = await req.json();
        const { name, email, username, password } = body;

        if(!name || !email || !username || !password){
            return new NextResponse("Insufficient data!");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data:{
                name,
                email,
                username,
                hashedPassword
            }
        });

        if(!user){
            return new NextResponse("User not created!", {status:400});
        }

        return NextResponse.json(user);

    } catch(error){
        console.log(error);
        return new NextResponse("REGISTER_POST", {status:400});
    }
}