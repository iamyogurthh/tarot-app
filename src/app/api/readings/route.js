import { getCategoryIDByCategoryName } from "@/model/category";
import { createReading, insertCards } from "@/model/reading";
import { getUserByUserNameAndRealName } from "@/model/user";

export async function POST(req, res) {
    const data = await req.json();
    let result = [];
    const user = await getUserByUserNameAndRealName(data.user_name,data.full_name);
    if(!user){
        return Response.json({message : "User with this username doesn't exist"})
    }

    const category_id = await getCategoryIDByCategoryName(data.category);
    for (let i = 0; i < data[data.category].length; i++) {
        result.push({
            card_id: data[data.category][i].card_id,
            question_id: data[data.category][i].question_id,
            meaning_id: data[data.category][i].meaning_id
        })
    }

    const reading_id = await createReading(user.id,user.name, category_id);
    for (let i = 0; i < result.length; i++) {
        const insertResult = await insertCards(
            reading_id,
            result[i].card_id,
            result[i].question_id,
            result[i].meaning_id)
    }
    return Response.json({message : "Request Successful"});
}

