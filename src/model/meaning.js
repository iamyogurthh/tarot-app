import pool from "@/database/db";

export async function getAllMeanings(){
    const [meanings] = await pool.query(`
    SELECT * FROM meanings`);
    return meanings;
}

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

export async function createMeaning(card_id,question_id,category_id,question_answer){
    const isOk = await pool.query(`
    insert into meanings (card_id,question_id,category_id,question_answer) values (?,?,?,?)
    `,[card_id,question_id,category_id,question_answer]);
    if(isOk){
        return true;
    }
    return false;

}


export async function editMeaning(id, card_id, question_id, category_id, question_answer) {
    const [result] = await pool.query(
        `UPDATE meanings 
         SET card_id = ?, question_id = ?, category_id = ?, question_answer = ? 
         WHERE id = ?`,
        [card_id, question_id, category_id, question_answer, id]
    );

    return result.affectedRows > 0;
}


export async function deleteMeaning(id) {
    const [result] = await pool.query(
        `DELETE FROM meanings WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0;
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