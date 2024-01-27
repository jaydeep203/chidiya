import prismadb from "@/lib/prismadb";


const getFollowers = async(userId:string) => {

    try{

        if(!userId){
            console.log("userid not found!");
        }

        const user = await prismadb.user.findUnique({
            where:{
                id:userId
            }
        });

        if(!user){
            console.log("users not found!");
            return null;
        }

        const followers = await prismadb.user.count({
            where:{
                followingIds:{
                    has:user.id
                }
            }
        });

        return followers;

    }catch(error){
        console.log(error);
        return null;
    }

}

export default getFollowers;