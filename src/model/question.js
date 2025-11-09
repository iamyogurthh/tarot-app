import pool from "@/database/db";

export async function getAllQuestions(){
    const [questions] = await pool.query(`
    SELECT * FROM questions`);
    return questions;
}


export async function getQuestionsByCategoryId(id){
    const [questions] = await pool.query(
        `SELECT * FROM questions WHERE category_id=?
        order by question_no `,[id]
    )
    return questions;
}

export async function getQuestionById(id){
    const [question] = await pool.query(
        `SELECT * FROM questions 
        where id=?`,[id]
    )
    return question[0];
}

export async function createQuestion(category_id,question_no,question_text){
    const isOk = await pool.query(`
    insert into questions (category_id,question_no,question_text) values (?,?,?)
    `,[category_id,question_no,question_text]);
    if(isOk){
        return true;
    }
    return false;
}

export async function editQuestion(id, category_id, question_no, question_text) {
    const [result] = await pool.query(
        `UPDATE questions 
         SET category_id = ?, question_no = ?, question_text = ? 
         WHERE id = ?`,
        [category_id, question_no, question_text, id]
    );

    return result.affectedRows > 0;
}

export async function deleteQuestion(id) {
    const [result] = await pool.query(
        `DELETE FROM questions WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0;
}
