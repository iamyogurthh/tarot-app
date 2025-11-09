import { getCategoryByCategoryId, getCategoryIDByCategoryName } from "@/model/category";
import { getReadingById, insertCards } from "@/model/reading";
import { getUserById } from "@/model/user";

export async function POST(req, res) {
    const data = await req.json();
    let result = [];

    const reading = await getReadingById(data.user_reading_id);
    const user = await getUserById(reading.user_id);
    const category = await getCategoryByCategoryId(reading.category_id);
    
    const finalUser = {
        user_name : user.name,
        full_name : reading.real_name,
        dob : reading.dob,
        major : reading.major,
        read_at : reading.read_at,
        category,
        zodiac : reading.zodiac,
        numerology : reading.numerology 
    }

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

    

    return Response.json(finalUser);
}

