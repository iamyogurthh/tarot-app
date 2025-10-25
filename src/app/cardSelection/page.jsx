'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from '@/context/FormContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useTarot } from '@/context/TarotContext'
import MainMenuBtn from '@/components/MainMenuBtn'

const cardCount = 10
const maxSelection = 6

const CardSelection = () => {
  const [cardsToShow, setCardsToShow] = useState([]) // Cards displayed on screen (10 random)
  const [selectedCards, setSelectedCards] = useState([]) // Cards user actively selects (starts empty)
  const { clearForm } = useForm()
  const { setUserSelectedTarotData, tarotsForSelection } = useTarot()

  console.log(selectedCards)
  console.log('Return form server: ' + JSON.stringify(tarotsForSelection))

  useEffect(() => {
    // Pick 10 unique random card indexes from tarotData on mount
    const indices = [...Array(tarotsForSelection.length).keys()]
    const randomTen = indices
      .sort(() => 0.5 - Math.random())
      .slice(0, cardCount)
    setCardsToShow(randomTen)
    setSelectedCards([]) // nothing selected initially
  }, [])

  const handleCardClick = (index) => {
    const isSelected = selectedCards.includes(index)

    if (isSelected) {
      // Unselect card
      setSelectedCards(selectedCards.filter((i) => i !== index))
    } else if (selectedCards.length < maxSelection) {
      // Select card (max 6)
      setSelectedCards([...selectedCards, index])
    }
  }

  const handleClick = () => {
    const selectedTarotCards = selectedCards.map(
      (index) => tarotsForSelection[index]
    )
    setUserSelectedTarotData(selectedTarotCards)
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
        {cardsToShow.map((cardIndex, i) => {
          const isSelected = selectedCards.includes(cardIndex)

          return (
            <motion.div
              key={cardIndex}
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
              onClick={() => handleCardClick(cardIndex)}
              className={`rounded-[18px] cursor-pointer border-5 w-[154px] h-[245px] ${
                isSelected ? 'border-[#e7ed3a] shadow-xl' : 'border-transparent'
              }`}
            >
              <Image
                src="/system_images/tarot_card_back.png"
                alt={`Card ${cardIndex + 1}`}
                width={154}
                height={250}
                className="rounded-xl"
              />
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedCards.length === maxSelection && (
          <motion.div
            key="see-reading-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <Link
              href="/readings"
              className="relative px-6 py-2 text-sm sm:text-base md:text-lg rounded-full font-semibold text-dark_p shadow-lg border-2 border-white hover:scale-105 transition-transform duration-200"
              style={{
                backgroundColor: '#F7DD9F',
              }}
              onClick={handleClick}
            >
              <span className="relative z-10">🔮 See My Reading</span>
              <span className="absolute inset-0 rounded-full bg-[#f6cf74] blur-xl opacity-40 animate-pulse"></span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CardSelection
