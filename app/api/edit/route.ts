import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function PATCH(
    request:Request
){
    const body = await request.json();
    const { name, username, bio, profileImage, coverImage, id } = body;

    if(!name || !username || !id){
        throw new Error("Missing Fields.");
    }

    console.log(profileImage);


    const updateUser = await prismadb.user.update({
        where:{
            id
        },
        data:{
            name,
            username,
            bio,
            profileImage,
            coverImage
        }
    });

    return NextResponse.json(updateUser);

}