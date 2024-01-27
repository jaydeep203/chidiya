import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req:Request
){

try{

    const body = await req.json();
    const {message, userId} = body;

    if(!message || !userId){
        return new NextResponse("Message not found!", {status:400});
    }

    const post = await prismadb.post.create({
        data:{
            body:message,
            userId:userId
        }
    });

    if(!post){
        return new NextResponse("Post not created!", {status:400});
    }

    return NextResponse.json(post);

} catch(error){
    console.log(error);
    return new NextResponse("MESSAGE_POST", {status:400});
}

}
export async function DELETE(
    req:Request
){

try{

    const body = await req.json();
    const { postId, userId} = body;

    if(!postId || !userId){
        return new NextResponse("Message not found!", {status:400});
    }

    const post = await prismadb.post.delete({
        where:{
            id:postId
        }
    });

    if(!post){
        return new NextResponse("Post not created!", {status:400});
    }

    return NextResponse.json(post);

} catch(error){
    console.log(error);
    return new NextResponse("MESSAGE_POST", {status:400});
}

}