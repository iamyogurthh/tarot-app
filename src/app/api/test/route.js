import { getCategoryIDByCategoryName } from "@/model/category";
import { getMeaningByCardIdAndQuestionId, getMeaningByQuestionId, getMeaningByQuestionIdAndCardId, getMeaningsByCardId, getMeaningsByCardIdAndCategoryId } from "@/model/meaning";
import { getQuestionsByCategoryId } from "@/model/question";
import { createUser, getFirstUserByUserName } from "@/model/user";

export async function GET(req,res){
    // const questions = await getMeaningByCardIdAndQuestionId(1,1);
    // return Response.json(questions);
    // const meanings = await getMeaningsByCardIdAndCategoryId(1,1);
    // return Response.json(meanings);
    // const category = await getCategoryIDByCategoryName('love');
    // const question = await getQuestionById(12);
    // const question = await getMeaningByQuestionIdAndCardId(1,2);
    const user = await createUser('mgmg','mgmg','2022-2-2','cs','tarus','3');
    if(user){
        return Response.json(user);
    } 
    return Response.json({message : "error"});
}