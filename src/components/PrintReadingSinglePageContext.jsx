'use client'
import React from 'react'
import { formatDateTime } from '@/utils/utils.client'

export default function PrintReadingSinglePageContext({
  userData,
  cardList,
  selectedQuestionsIndex = [],
}) {
  const topic = userData.topic

  return (
    <div className="print-page">
      <h1 className="title">Tarot Reading Result</h1>

      {/* User Info */}
      <div className="info">
        <div>
          <b>Name:</b> {userData.real_name}
        </div>
        <div>
          <b>Zodiac:</b> {userData.zodiac}
        </div>
        <div>
          <b>Major:</b> {userData.major}
        </div>
        <div>
          <b>Category:</b> {userData.topic}
        </div>
        <div className="full">
          <b>Read at:</b> {formatDateTime(userData.read_at)}
        </div>
      </div>

      <hr />

      {/* Answers */}
      <div className="answers">
        {cardList.map((card, cardIndex) => {
          const questions = card?.[topic] || []

          // Pick question by selected index (fallback to 0)
          const qa = questions[selectedQuestionsIndex[cardIndex] ?? 0] || {}

          return (
            <div className="answer-row" key={cardIndex}>
              <img
                src={`/tarot_images/${card.image}`}
                alt={card.name}
                style={{ width: '55px', height: 'auto' }}
              />
              <div className="text">
                <div className="card-title">
                  {cardIndex + 1}. {card.name}
                </div>
                {qa.question_text && (
                  <div className="question font-bold">{qa.question_text}</div>
                )}
                <div className="answer">{qa.question_answer || ''}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
