import pool from "@/database/db";
import { getQuestionById } from "./question";
import { getCardById } from "./card";
import { getMeaningById } from "./meaning";
import { getUserById } from "./user";
import { getCategoryByCategoryId } from "./category";

export async function createReading(userId, userName, categoryId) {
    const [result] = await pool.query(`
    insert into readings (user_id,user_name,category_id) values (?,?,?)
    `, [userId, userName, categoryId]
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

export async function getReadings() {
    const [readings] = await pool.query(`
        select r.user_name,u.real_name,u.major,u.dob,min(r.read_at) as first_read from readings as r 
        inner join 
        users as u
        on u.id = r.user_id
        group by r.user_name
        `
    );
    return readings;
}

export async function getReadingOverviews(userName) {
    const [overviews] = await pool.query(`
    select * from readings where user_name=? order by read_at desc
    `, [userName]);

    return overviews
}

export async function getReadingUserByReadingId(id) {
    const [overviews] = await pool.query(`
    select r.user_id,r.category_id,r.read_at from readings r
    inner join reading_results res
    on r.id = res.reading_id
    where res.reading_id=?
    `, [id]);

    return overviews[0];
}


export async function getReadingDetails(readingId) {
    const result = [];
    const loopResult = [];
    const readingUser = await getReadingUserByReadingId(readingId);
    const user = await getUserById(readingUser.user_id);
    const category = await getCategoryByCategoryId(readingUser.category_id);
    result.push({
        user_name : user.name,
        real_name : user.real_name,
        zodiac : user.zodiac,
        numerology : user.numerology,
        dob : user.dob,
        category,
        read_at : readingUser.read_at
    });

    const [details] = await pool.query(`
    select * from reading_results where reading_id=?
    `, [readingId]);

    for (let i = 0; i < details.length; i++) {
        const question = await getQuestionById(details[i].question_id);
        const card = await getCardById(details[i].card_id);
        const meaning = await getMeaningById(details[i].meaning_id);
        result.push({
            card_id: card.id,
            name: card.name,
            zodiac: card.zodiac,
            numerology: card.numerology,
            image: card.image,
            category,
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
