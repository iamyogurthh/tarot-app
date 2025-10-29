import { getUsersList } from "@/model/reading";

export async function GET(req,res){
    const readings = await getUsersList();
    return Response.json(readings)
}