'use client'

import React from 'react'

const FullScreenLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-purple-500 border-b-purple-500 border-gray-200 rounded-full animate-spin"></div>

      {/* Optional text */}
      <p className="mt-4 text-white text-lg font-medium">{text}</p>
    </div>
  )
}

export default FullScreenLoader
