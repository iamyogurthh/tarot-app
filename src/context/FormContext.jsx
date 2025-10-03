'use client'
const { createContext, useState, useContext } = require('react')

const FormContext = createContext()

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    topic: '',
    user_name: '',
    full_name: '',
    dob: '',
    major: '',
  })

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const clearForm = () => {
    setFormData({
      topic: '',
      user_name: '',
      full_name: '',
      dob: '',
      major: '',
    })
  }

  return (
    <FormContext.Provider value={{ formData, updateField, clearForm }}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => useContext(FormContext)
