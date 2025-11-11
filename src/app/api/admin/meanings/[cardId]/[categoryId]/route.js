import { getMeaningsByCardIdAndCategoryId } from "@/model/meaning";
import { getQuestionById } from "@/model/question";

export async function GET(req, { params }) {
    const { cardId, categoryId } = await params;
    let result = [];
    const meanings = await getMeaningsByCardIdAndCategoryId(cardId, categoryId);
    for (let i = 0; i < meanings.length; i++) {
        const question = await getQuestionById(meanings[i].question_id);
        result.push({
            question_id : meanings[i].question_id,
            question_no : question.question_no,
            question_text : question.question_text,
            meaning_id : meanings[i].id,
            question_answer : meanings[i].question_answer
        })
    }
    return Response.json(result);
}