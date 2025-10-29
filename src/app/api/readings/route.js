import { getCategoryIDByCategoryName } from "@/model/category";
import { getReadingById, insertCards } from "@/model/reading";

export async function POST(req, res) {
    const data = await req.json();
    let result = [];

    const reading = await getReadingById(data.user_reading_id);

    if(!reading){
        return Response.json({message : "Reading with this id doesn't exist"},{status : 400});
    }

    for (let i = 0; i < data[data.topic].length; i++) {
        result.push({
            card_id: data[data.topic][i].card_id,
            question_id: data[data.topic][i].question_id,
            meaning_id: data[data.topic][i].meaning_id
        })
    }

    for (let i = 0; i < result.length; i++) {
        const insertResult = await insertCards(
            data.user_reading_id,
            result[i].card_id,
            result[i].question_id,
            result[i].meaning_id)
    }
    return Response.json({message : "Successfully added"});
}

