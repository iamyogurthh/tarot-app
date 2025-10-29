import { getReadingDetails } from "@/model/reading";

export async function GET(req,{params}) {
    const { readingId } = await params;
    const details = await getReadingDetails(readingId);
    return Response.json(details);

}