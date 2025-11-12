'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteBtn = ({ endpoint, id, onSuccess, confirmText }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      confirmText || 'Are you sure you want to delete this?'
    )
    if (!isConfirmed) return

    try {
      setLoading(true)
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      const data = await res.json()
      console.log(id)

      if (res.ok) {
        alert(data.message || 'Successfully deleted!')
        if (onSuccess) onSuccess(id)
      } else {
        alert(data.message || 'Failed to delete.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`cursor-pointer transition-transform duration-200 ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
      }`}
    >
      <Image
        src="/system_images/trash.png"
        alt="delete"
        width={24}
        height={27}
      />
    </button>
  )
}

export default DeleteBtn
