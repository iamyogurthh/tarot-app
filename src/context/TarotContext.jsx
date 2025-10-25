'use client'

const { createContext, useContext, useState } = require('react')

const TarotContext = createContext()

export const TarotProvider = ({ children }) => {
  const [userSelectedTarotData, setUserSelectedTarotData] = useState([])
  const [tarotsForSelection, setTarotsForSelection] = useState([])

  return (
    <TarotContext.Provider
      value={{
        userSelectedTarotData,
        setUserSelectedTarotData,
        tarotsForSelection,
        setTarotsForSelection,
      }}
    >
      {children}
    </TarotContext.Provider>
  )
}

export const useTarot = () => useContext(TarotContext)
