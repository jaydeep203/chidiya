import prismadb from "@/lib/prismadb"




const getPosts = async(userId?:string) => {

    try{

        let posts;

        if(userId){
            posts = await prismadb.post.findMany({
                where:{
                    userId:userId
                },
                include:{
                    user:true,
                    comments:true
                },
                orderBy:{
                    createdAt:"desc"
                }
            });
        } else{
            posts = await prismadb.post.findMany({
                include:{
                    user:true,
                    comments:true
                },
                orderBy:{
                    createdAt:"desc"
                }
            });
        }

        
    
        if(!posts){
            return [];
        }

        return posts;

    }catch(error){
        console.log(error);
        return [];
    }

}

export default getPosts;