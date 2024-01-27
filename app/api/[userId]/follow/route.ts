import prismadb from "@/lib/prismadb";
import { without } from "lodash";
import { NextResponse } from "next/server";


export async function PUT(req: Request,
     {params}:{
    params:{
        userId:string;
    }
}){

    const body = await req.json();
    const { currentId } = body;

    if(!currentId || !params.userId){
        return new NextResponse("current & userId not found!", {status: 400});
    }

    const user = await prismadb.user.findUnique({
        where:{
            id:params.userId
        }
    });

    if(!user){
        console.log(user);
        return new NextResponse("User not found!", {status: 400});
    }

    const followingIds = [...(user.followingIds) || [], currentId ];


    const res = await prismadb.user.update({
        where:{
            id:params.userId
        },
        data:{
            followingIds:followingIds
        }
    });


    if(!res){
        console.log(res);
        return new NextResponse("User not found!", {status: 400});
    }

    return NextResponse.json(res);

}
export async function DELETE(req: Request,
     {params}:{
    params:{
        userId:string;
    }
}){

    const body = await req.json();
    const { currentId } = body;

    if(!currentId || !params.userId){
        return new NextResponse("current & userId not found!", {status: 400});
    }

    const user = await prismadb.user.findUnique({
        where:{
            id:params.userId
        }
    });

    if(!user){
        console.log(user);
        return new NextResponse("User not found!", {status: 400});
    }

    const followingIds = without(user.followingIds, currentId);


    const res = await prismadb.user.update({
        where:{
            id:params.userId
        },
        data:{
            followingIds:followingIds
        }
    });


    if(!res){
        console.log(res);
        return new NextResponse("User not found!", {status: 400});
    }

    return NextResponse.json(res);

}