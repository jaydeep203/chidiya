import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req:Request
){

try{

    const body = await req.json();
    const {message, userId, postId} = body;


    if(!message || !userId || !postId){
        return new NextResponse("not enough data found!", {status:400});
    }

    const post = await prismadb.post.findUnique({
        where:{
            id:postId
        }
    });

    if(!post){
        return new NextResponse("Post not found!", {status:400});
    }

    const comment = await prismadb.comment.create({
        data:{
            body:message,
            userId,
            postId
        }
    });

    if(!comment){
        return new NextResponse("Unable to create reply!", {status:400});
    }

    return NextResponse.json(comment);

} catch(error){
    console.log(error);
    return new NextResponse("REPLY_POST", {status:400});
}

}