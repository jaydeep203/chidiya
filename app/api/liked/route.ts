import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import {without} from "lodash";


export async function PUT(
    req:Request
){

try{

    const body = await req.json();
    const { currentId, postId } = body;

    if(!currentId){
        return new NextResponse("Invalid id!", {status:400});
    }

    const post = await prismadb.post.update({
        where:{
            id:postId
        },
        data:{
            likedIds:{
                push: currentId
            }
        }
    });

    if(!post){
        return new NextResponse("Unable to like!", {status:400});
    }

    return NextResponse.json(post);

} catch(error){
    console.log(error);
    return new NextResponse("LIKE_PUT", {status:400});
}

}


export async function DELETE(
    req:Request
){

try{

    const body = await req.json();
    const { currentId, postId } = body;

    if(!currentId){
        return new NextResponse("Invalid id!", {status:400});
    }

    let post = await prismadb.post.findUnique({
        where:{
            id:postId
        }
    });

    const likedIds = without(post?.likedIds, currentId);

    post = await prismadb.post.update({
        where:{
            id:postId
        },
        data:{
            likedIds:likedIds
        }
    });

    if(!post){
        return new NextResponse("Unable to like!", {status:400});
    }

    return NextResponse.json(post);

} catch(error){
    console.log(error);
    return new NextResponse("LIKE_DELETE", {status:400});
}

}