import prismadb from "@/lib/prismadb";


const getComments = async(postId:string) => {

    try{

        const comments = await prismadb.comment.findMany({
            where:{
                postId
            },
            include:{
                user:true
            }
        });
    
        if(!comments){
            return [];
        }

        return comments;

    }catch(error){
        console.log(error);
        return [];
    }

}

export default getComments;