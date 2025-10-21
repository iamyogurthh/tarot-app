import pool from "@/database/db";

export async function getMeaningByCardIdAndQuestionId(cardId,questionId){
    const [meaning] = await pool.query(`
    SELECT * FROM meanings WHERE card_id=? AND question_id=?`
    ,[cardId,questionId]);
    return meaning;
}

export async function getMeaningById(id){
    const [meaning] = await pool.query(`
    SELECT * FROM meanings WHERE id=?`
    ,[id]);
    return meaning[0];
}

export async function getMeaningsByCardId(id){
    const [meanings] = await pool.query(`
    SELECT * FROM meanings WHERE card_id=?
    `,[id]);
    return meanings;
}

export async function getMeaningsByCardIdAndCategoryId(cardId,categoryId){
    const [meanings] = await pool.query(`
    SELECT * FROM meanings WHERE card_id=?
    AND category_id=?`,[cardId,categoryId]);
    return meanings;
}

export async function getMeaningByQuestionIdAndCardId(questionId,cardId){
    const [meaning] = await pool.query(`
    SELECT * FROM meanings WHERE question_id=?
    and card_id=?
    `,[questionId,cardId]);
    return meaning[0];
}