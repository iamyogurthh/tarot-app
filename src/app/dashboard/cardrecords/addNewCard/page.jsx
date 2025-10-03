import BackBt from '@/components/BackBt'
import NewTarotCardAddingForm from '@/components/NewTarotCardAddingForm'
import React from 'react'

const page = () => {
  return (
    <div className="p-2">
      <div className="flex items-center justify-end">
        <BackBt />
      </div>
      <div>
        <NewTarotCardAddingForm />
      </div>
    </div>
  )
}

export default page
