import prismadb from "@/lib/prismadb";


export async function GET({params}:{
    params:{
        userId:string;
    }
}){

    const user = await prismadb.user.findUnique({
        where:{
            id:params.userId
        }
    })

}