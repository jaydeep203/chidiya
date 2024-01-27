import prismadb from "@/lib/prismadb";


const getAllUsers = async() => {

    try{

        const users = await prismadb.user.findMany();

        if(!users){
            console.log("users not found!");
            return [];
        }

        return users;

    }catch(error){
        console.log(error);
        return [];
    }

}

export default getAllUsers;