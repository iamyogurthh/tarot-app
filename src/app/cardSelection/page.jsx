'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from '@/context/FormContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useTarot } from '@/context/TarotContext'
import MainMenuBtn from '@/components/MainMenuBtn'
import { useRouter } from 'next/navigation'

const cardCount = 10
const maxSelection = 6

const CardSelection = () => {
  const [cardsToShow, setCardsToShow] = useState([]) // Cards displayed on screen (10 cards)
  const [selectedCardIds, setSelectedCardIds] = useState([]) // Cards user actively selects (starts empty)
  const { clearForm, formData } = useForm()
  const { setUserSelectedTarotData, tarotsForSelection } = useTarot()
  const router = useRouter()

  const { cards } = tarotsForSelection

  console.log(formData)
  console.log(tarotsForSelection.user_reading_id)

  useEffect(() => {
    if (cards && cards.length > 0) {
      setCardsToShow(cards.slice(0, cardCount)) // only show 10
    }
  }, [cards])

  const handleCardClick = (index) => {
    const isSelected = selectedCardIds.includes(index)

    if (isSelected) {
      // Unselect card
      setSelectedCardIds(selectedCardIds.filter((i) => i !== index))
    } else if (selectedCardIds.length < maxSelection) {
      // Select card (max 6)
      setSelectedCardIds([...selectedCardIds, index])
    }
  }
  const handleClick = async () => {
    try {
      // Map each selected card to the question corresponding to its position
      const dataArray = selectedCardIds
        .map((cardId, index) => {
          const card = cards.find((c) => c.card_id === cardId)
          const questionForPosition = card?.[formData.topic]?.[index] // pick question by position

          if (!questionForPosition) return null

          return {
            card_id: card.card_id,
            question_id: questionForPosition.question_id,
            meaning_id: questionForPosition.meaning_id,
          }
        })
        .filter(Boolean) // remove any nulls

      const payload = {
        user_reading_id: tarotsForSelection.user_reading_id,
        topic: formData.topic,
        [formData.topic]: dataArray, // dynamic topic key
      }

      console.log('Sending payload:', payload)

      const response = await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      console.log('Server response:', result)

      if (response.ok) {
        // Store selected cards in context
        const selectedTarotCards = selectedCardIds.map((id) =>
          cards.find((c) => c.card_id === id)
        )
        setUserSelectedTarotData(selectedTarotCards)
        router.push('/readings')
      } else {
        alert(result.message || 'Failed to save reading.')
      }
    } catch (err) {
      console.error(err)
      alert('Error saving reading.')
    }
  }
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Back Button */}
      <MainMenuBtn />

      {/* Grid Container */}
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: 'calc(180px * 5 + 80px * 4)',
          height: 'calc(270px * 2 + 40px)',
          transform: 'translate(-50%, -50%)',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 180px)',
          gridTemplateRows: 'repeat(2, 270px)',
          columnGap: '80px',
          rowGap: '40px',
        }}
      >
        {cardsToShow.map((card, i) => {
          const isSelected = selectedCardIds.includes(card.card_id)

          return (
            <motion.div
              key={card.card_id}
              initial={{
                opacity: 0,
                x: 0,
                y: 300,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.15 },
              }}
              onClick={() => handleCardClick(card.card_id)}
              className={`rounded-[18px] cursor-pointer border-5 w-[154px] h-[245px] ${
                isSelected ? 'border-[#e7ed3a] shadow-xl' : 'border-transparent'
              }`}
            >
              <Image
                src="/system_images/tarot_card_back.png"
                alt={`Card ${card.card_id + 1}`}
                width={154}
                height={250}
                className="rounded-xl"
              />
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedCardIds.length === maxSelection && (
          <motion.div
            key="see-reading-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <button
              className="relative px-6 py-2 text-sm sm:text-base md:text-lg rounded-full font-semibold text-dark_p shadow-lg border-2 border-white hover:scale-105 transition-transform duration-200"
              style={{
                backgroundColor: '#F7DD9F',
              }}
              onClick={handleClick}
            >
              <span className="relative z-10">🔮 See My Reading</span>
              <span className="absolute inset-0 rounded-full bg-[#f6cf74] blur-xl opacity-40 animate-pulse"></span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CardSelection
