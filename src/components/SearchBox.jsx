'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const SearchBox = ({
  placeholder = 'Search...',
  onSearch,
  width = '328px',
  delay = 300,
}) => {
  const [query, setQuery] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query)
    }, delay)

    return () => clearTimeout(handler)
  }, [query, delay])

  useEffect(() => {
    if (onSearch) onSearch(debouncedValue)
  }, [debouncedValue])

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex items-center shadow-2xl rounded-[16px] relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="py-[8px] pl-[16px] border-2 border-[#9798F5] rounded-[16px] bg-white focus:outline-none"
          style={{ width }}
        />

        <Image
          src="/system_images/search.png"
          alt="search"
          width={24}
          height={24}
          className="absolute right-[16px] cursor-pointer"
        />
      </form>
    </div>
  )
}

export default SearchBox
