import prismadb from "@/lib/prismadb";


const getPost = async(postId:string) => {

    try{

        const post = await prismadb.post.findUnique({
            where:{
                id:postId
            },
            include:{
                comments:true,
                user:true
            }
        });
    
        if(!post){
            return null;
        }

        return post;

    }catch(error){
        console.log(error);
        return null;
    }

}

export default getPost;