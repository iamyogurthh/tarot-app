'use client'

import Banner from '@/components/Banner'
import React, { useState, useEffect, Suspense } from 'react'
import ReuseableTable from '@/components/ReuseableTable'
import Image from 'next/image'
import EditQuestionModal from '@/components/EditQuestionModal'
import AddNewCategoryModal from '@/components/AddNewCategoryModal'
import AddNewQuestionModal from '@/components/AddNewQuestionModal'
import EditCategoryModal from '@/components/EditCategoryModal' // ✅ new

const Page = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [questions, setQuestions] = useState([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false) // ✅ edit category
  const [editingQuestion, setEditingQuestion] = useState({
    id: '',
    question_no: '',
    question_text: '',
  })
  const [editingCategoryId, setEditingCategoryId] = useState(null)

  //Fetch all categories once
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('http://localhost:3000/api/categories')
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()
        setCategories(data)
        if (data.length > 0) setSelectedCategoryId(data[0].id)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategories()
  }, [])

  //Fetch questions when category changes
  useEffect(() => {
    async function fetchQuestions() {
      if (!selectedCategoryId) return
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/questions/${selectedCategoryId}`
        )
        if (!res.ok) throw new Error('Failed to fetch questions')
        const data = await res.json()
        setQuestions(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchQuestions()
  }, [selectedCategoryId])

  //Prevent background scroll when any modal is open
  useEffect(() => {
    document.body.style.overflow =
      isEditModalOpen ||
      isAddModalOpen ||
      isAddQuestionModalOpen ||
      isEditCategoryOpen
        ? 'hidden'
        : 'auto'
  }, [
    isEditModalOpen,
    isAddModalOpen,
    isAddQuestionModalOpen,
    isEditCategoryOpen,
  ])

  //Delete question
  const handleDeleteQuestion = async (id) => {
    if (!confirm('Are you sure you want to delete this question?')) return
    try {
      const res = await fetch(`http://localhost:3000/api/questions/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete question')
      alert('Question deleted successfully')
      setQuestions((prev) => prev.filter((q) => q.id !== id))
    } catch (err) {
      console.error(err)
      alert('Error deleting question')
    }
  }

  //Delete category
  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete category')
      alert('Category deleted successfully')
      setCategories((prev) => prev.filter((c) => c.id !== id))
      if (selectedCategoryId === id) setSelectedCategoryId(null)
    } catch (err) {
      console.error(err)
      alert('Error deleting category')
    }
  }

  //Columns for questions table
  const columns = [
    {
      label: 'Question No',
      render: (item) => (
        <div className="font-semibold py-2">{item.question_no}</div>
      ),
    },
    {
      label: 'Question Text',
      render: (item) => (
        <div className="whitespace-pre-line py-2">{item.question_text}</div>
      ),
    },
    {
      label: 'Actions',
      render: (item) => (
        <div className="flex gap-6 py-2">
          <button
            onClick={() => {
              setEditingQuestion({
                id: item.id,
                question_no: item.question_no,
                question_text: item.question_text,
              })
              setIsEditModalOpen(true)
            }}
            className="flex items-center underline font-semibold"
          >
            <Image
              src="/system_images/edit.png"
              width={20}
              height={20}
              alt="edit"
              className="mr-2"
            />
            Edit
          </button>

          <button
            onClick={() => handleDeleteQuestion(item.id)}
            className="flex items-center underline font-semibold text-red-600"
          >
            <Image
              src="/system_images/trash.png"
              width={18}
              height={18}
              alt="delete"
              className="mr-2"
            />
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="p-4">
        {/* Modals */}
        {isEditModalOpen && (
          <EditQuestionModal
            setIsEditModalOpen={setIsEditModalOpen}
            editingQuestion={editingQuestion}
            categoryId={selectedCategoryId}
            onSuccess={() => {
              fetch(
                `http://localhost:3000/api/admin/questions/${selectedCategoryId}`
              )
                .then((res) => res.json())
                .then((data) => setQuestions(data))
            }}
          />
        )}

        {isAddModalOpen && (
          <AddNewCategoryModal
            setIsAddModalOpen={setIsAddModalOpen}
            onSuccess={() => {
              fetch('http://localhost:3000/api/categories')
                .then((res) => res.json())
                .then((data) => setCategories(data))
            }}
          />
        )}

        {isAddQuestionModalOpen && (
          <AddNewQuestionModal
            categoryId={selectedCategoryId}
            setIsAddQuestionModalOpen={setIsAddQuestionModalOpen}
            existingQuestions={questions}
            onSuccess={() => {
              fetch(
                `http://localhost:3000/api/admin/questions/${selectedCategoryId}`
              )
                .then((res) => res.json())
                .then((data) => setQuestions(data))
            }}
          />
        )}

        {/* ✅ Edit Category Modal */}
        {isEditCategoryOpen && editingCategoryId && (
          <EditCategoryModal
            setIsEditCategoryOpen={setIsEditCategoryOpen}
            categoryId={editingCategoryId}
            onSuccess={() => {
              fetch('http://localhost:3000/api/categories')
                .then((res) => res.json())
                .then((data) => setCategories(data))
            }}
          />
        )}

        {/* Dashboard Banners */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Banner
            label="Total Categories"
            img="/system_images/categories.png"
            value={categories.length}
          />
          <Banner
            label="Total Questions"
            img="/system_images/question_circle-puple.png"
            value={questions.length}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="primary_btn"
          >
            Add New Category
          </button>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex flex-col justify-center items-center gap-2"
            >
              <button
                onClick={() => setSelectedCategoryId(c.id)}
                className={`border-2 border-[#9798F5] px-6 py-2 rounded-2xl shadow-md ${
                  selectedCategoryId === c.id ? 'active_btn' : 'bg-white'
                }`}
              >
                {c.name}
              </button>
              <div className="flex gap-4 ">
                {/* Edit category button */}
                <Image
                  src="/system_images/edit.png"
                  width={20}
                  height={20}
                  alt="edit category"
                  className="cursor-pointer"
                  onClick={() => {
                    setEditingCategoryId(c.id)
                    setIsEditCategoryOpen(true)
                  }}
                />
                {/* Delete category */}
                <Image
                  src="/system_images/trash.png"
                  width={20}
                  height={20}
                  alt="delete category"
                  className="cursor-pointer"
                  onClick={() => handleDeleteCategory(c.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {selectedCategoryId && (
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddQuestionModalOpen(true)}
              className="primary_btn bg-green-600 hover:bg-green-700 mb-4"
            >
              + Add New Question
            </button>
          </div>
        )}

        {/* Questions Table */}
        <ReuseableTable columns={columns} data={questions} rowKey="id" />
      </div>
    </Suspense>
  )
}

export default Page
