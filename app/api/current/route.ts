
import getCurrentUser from "@/app/(site)/actions/getCurrentUser";
import { NextResponse } from "next/server";


export async function GET(
    req:Request
){

try{

    const currentUser = await getCurrentUser();
    
    if(!currentUser){
        console.log("something went wrong!");
        return new NextResponse("Something went wrong!", {status:400});
    }

    return NextResponse.json(currentUser);

} catch(error){
    console.log(error);
    return new NextResponse("CURRENTUSER_GET", {status:400});
}

}