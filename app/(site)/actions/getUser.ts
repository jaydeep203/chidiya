import prismadb from "@/lib/prismadb";


const getUser = async(userId:string) => {
    try{
        if(!userId || typeof userId !== "string"){
            console.log("userId not found!");
            return null;
        }
    
        const user = prismadb.user.findUnique({
            where:{
                id:userId
            }
        });
    
        if(!user){
            console.log("user not found!");
            return null;
        }
    
        return user;
    } catch(error){
        console.log(error);
        return null;
    }
}

export default getUser;