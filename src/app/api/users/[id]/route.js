import { getUserById } from "@/model/user";

export async function GET(req,{params}){
    const {id} = await params;
    const user = await getUserById(id);
    if(user){
        return Response.json(user);
    }
    return Response.json({message : "User not found"},{status : 400});
}