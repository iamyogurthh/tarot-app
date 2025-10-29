import pool from "@/database/db";
import { getQuestionsByCategoryId } from "./question";
import { getCategoryIDByCategoryName } from "./category";
import { getMeaningByQuestionIdAndCardId } from "./meaning";

export async function getAllCards() {
    const [rows] = await pool.query(`
    SELECT * FROM cards`);
    return rows;
}

export async function getCardById(id){
    const [card] = await pool.query(`
    SELECT * FROM cards where id=?`,[id]);
    return card[0];
}

export async function getCardsByZodiacNumerologyTopic(zodiac, numerology, topic) {
    let result = []
    let loopResult = [];
    const categoryId = await getCategoryIDByCategoryName(topic);
    const questions = await getQuestionsByCategoryId(categoryId);
    const [cards] = await pool.query(`
    SELECT * FROM cards
    ORDER BY RAND()
    LIMIT 10;
    `, [zodiac, numerology]);

    for (let i = 0; i < cards.length; i++) {
        let loopResult = [];
        let card = cards[i];

        for (let j = 0; j < questions.length; j++) {
            let question = questions[j];//id,question_text
            let meaning = await getMeaningByQuestionIdAndCardId(question.id, card.id);//id,question_answer
            loopResult.push({
                question_id: question.id,
                question_text: question.question_text,
                meaning_id: meaning.id,
                question_answer: meaning.question_answer
            });

        }
        result = [
            ...result,
            {
                card_id: card.id,
                name: card.name,
                zodiac: card.zodiac,
                numerology: card.numerology,
                image: card.image,
                category: topic,
                [topic]: loopResult
            }]

    }
    return result;
}