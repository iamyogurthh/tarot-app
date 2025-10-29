import { getCategoryByCategoryId } from "@/model/category";
import { getReadingUsersByUserId } from "@/model/reading";
import { getUserById } from "@/model/user";

export async function GET(req, { params }) {
    const { userId } = await params;
    const overviews = await getReadingUsersByUserId(userId);
    const result = [];
    for (let i = 0; i < overviews.length; i++) {
        const user = await getUserById(overviews[i].user_id);
        let category = await getCategoryByCategoryId(overviews[i].category_id);
        result.push({
            reading_id : overviews[i].id,
            user_name : user.name,
            full_name : overviews[i].real_name,
            topic : category,
            read_at : overviews[i].read_at
        })
    }
    return Response.json(result)

}