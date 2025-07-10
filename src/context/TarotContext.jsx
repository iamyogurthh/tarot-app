'use client'

const { createContext, useContext, useState } = require('react')

const TarotContext = createContext()

export const TarotProvider = ({ children }) => {
  const [userSelectedTarotData, setUserSelectedTarotData] = useState([])

  return (
    <TarotContext.Provider
      value={{ userSelectedTarotData, setUserSelectedTarotData }}
    >
      {children}
    </TarotContext.Provider>
  )
}

export const useTarot = () => useContext(TarotContext)
