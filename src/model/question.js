import pool from "@/database/db";

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
