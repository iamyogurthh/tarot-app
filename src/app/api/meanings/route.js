import { createMeaning, getAllMeanings } from "@/model/meaning";
import { getDataFromForm } from "@/utils/utils";

export async function GET(req, res) {
    const meanings = await getAllMeanings();
    return Response.json(meanings);
}


export async function POST(req, res) {
    const formData = await req.formData();
    let {card_id,question_id,category_id,question_answer} = getDataFromForm(formData,'card_id','question_id','category_id','question_answer');
    const isOk = await createMeaning(card_id,question_id,category_id,question_answer);
    if(isOk){
        return Response.json({message : "Successfully created"})
    }
    return Response.json({message : "Cannot create question"},{status : 400})
}
