//We are using this component
'use client'
import React from 'react'
import Image from 'next/image'
import { formatDateTime } from '@/utils/utils.client'

export default function PrintReadingSinglePage({ userData, cardList }) {
  const topic = userData.topic
  console.log(userData)
  console.log(cardList)

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
        {cardList.map((card, index) => {
          const qa = card?.[topic]

          return (
            <div className="answer-row" key={index}>
              {/* Card image */}
              <img
                src={`/tarot_images/${card.image}`}
                alt={card.name}
                style={{ width: '55px', height: 'auto' }}
              />

              <div className="text">
                {/* Card title */}
                <div className="card-title">
                  {index + 1}. {card.name}
                </div>

                {/*Question */}
                {qa?.question_text && (
                  <div className="question font-bold">{qa.question_text}</div>
                )}

                {/* Answer */}
                <div className="answer">{qa?.question_answer || ''}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
