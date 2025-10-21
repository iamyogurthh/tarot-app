import { getCategoryByCategoryId } from "@/model/category";
import { getReadingOverviews } from "@/model/reading";
import { getFirstUserByUserName } from "@/model/user";

export async function GET(req, { params }) {
    const { username } = await params;
    const overviews = await getReadingOverviews(username);
    const result = [];
    const user = await getFirstUserByUserName(username);
    result.push(user);
    for (let i = 0; i < overviews.length; i++) {
        let category = await getCategoryByCategoryId(overviews[i].category_id);
        result.push({
            reading_id : overviews[i].id,
            category,
            read_at : overviews[i].read_at
        })
    }
    return Response.json(result)

}