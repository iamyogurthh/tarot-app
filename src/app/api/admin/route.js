import { getReadings } from "@/model/reading";

export async function GET(req,res){
    const readings = await getReadings();
    return Response.json(readings)
}