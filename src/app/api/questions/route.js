import { createQuestion, getAllQuestions } from '@/model/question'
import { getDataFromForm } from '@/utils/utils.server'

export async function GET(req, res) {
  const questions = await getAllQuestions()
  return Response.json(questions)
}

export async function POST(req, res) {
  const formData = await req.formData()
  let { category_id, question_no, question_text } = getDataFromForm(
    formData,
    'category_id',
    'question_no',
    'question_text'
  )
  const isOk = await createQuestion(category_id, question_no, question_text)
  if (isOk) {
    return Response.json({ message: 'Successfully created' })
  }
  return Response.json({ message: 'Cannot create question' }, { status: 400 })
}
