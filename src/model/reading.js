import pool from "@/database/db";
import { getQuestionById } from "./question";
import { getCardById } from "./card";
import { getMeaningById } from "./meaning";
import { getUserById } from "./user";
import { getCategoryByCategoryId } from "./category";

export async function createReading(user_id, real_name, dob, zodiac, numerology, category_id) {
    const [result] = await pool.query(`
    insert into readings (user_id,real_name,dob,zodiac,numerology,category_id) values (?,?,?,?,?,?)
    `, [user_id, real_name, dob, zodiac, numerology, category_id]
    );
    return result.insertId;
}


export async function insertCards(readingId, cardId, questionId, meaningId) {
    const [result] = await pool.query(`
    insert into reading_results (reading_id,card_id,question_id,meaning_id)
    values (?,?,?,?)
    `, [readingId, cardId, questionId, meaningId]);

    return true;
}

export async function getUsersList() {
    const [users] = await pool.query(`
        select * from users
        `
    );
    return users;
}

export async function getReadingUsersByUserId(userId) {
    const [overviews] = await pool.query(`
    select * from readings where user_id=? order by read_at desc
    `, [userId]);

    return overviews
}

// export async function getReadingUserByReadingId(id) {
//     const [overviews] = await pool.query(`
//     select r.user_id,r.category_id,r.read_at from readings r
//     inner join reading_results res
//     on r.id = res.reading_id
//     where res.reading_id=?
//     `, [id]);

//     return overviews[0];
// }

export async function getReadingById(id) {
    const [users] = await pool.query(`
    select * from readings where id=?
    `, [id]);

    return users[0];
}


export async function getReadingDetails(readingId) {
    const result = [];
    const reading = await getReadingById(readingId);
    const user = await getUserById(reading.user_id);
    const readingResults = await getReadingResultsByReadingId(readingId);
    const category = await getCategoryByCategoryId(reading.category_id);
    result.push({
        user_name: user.name,
        real_name: reading.real_name,
        zodiac: reading.zodiac,
        numerology: reading.numerology,
        dob: reading.dob,
        topic : category,
        read_at: reading.read_at
    });

    for (let i = 0; i < readingResults.length; i++) {
        const question = await getQuestionById(readingResults[i].question_id);
        const card = await getCardById(readingResults[i].card_id);
        const meaning = await getMeaningById(readingResults[i].meaning_id);
        result.push({
            card_id: card.id,
            name: card.name,
            zodiac: card.zodiac,
            numerology: card.numerology,
            image: card.image,
            topic : category,
            [category]: {
                question_id: question.id,
                question_text: question.question_text,
                meaning_id: meaning.id,
                question_answer: meaning.question_answer
            }
        });
    }
    return result;
}


export async function getReadingResultsByReadingId(id){
    const [details] = await pool.query(`
    select * from reading_results where reading_id=?
    `, [id]);
    return details;
}