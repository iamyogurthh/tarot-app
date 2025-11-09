import { deleteQuestion, editQuestion, getQuestionById } from '@/model/question'
import { getDataFromForm } from '@/utils/utils.server'

export async function GET(req, { params }) {
  const { id } = await params
  const question = await getQuestionById(id)
  if (question) {
    return Response.json(question)
  }
  return Response.json({ message: 'Question not found' }, { status: 400 })
}

export async function PUT(req, { params }) {
  const { id } = await params
  const formData = await req.formData()
  let { category_id, question_no, question_text } = getDataFromForm(
    formData,
    'category_id',
    'question_no',
    'question_text'
  )
  const isOk = await editQuestion(id, category_id, question_no, question_text)

  if (isOk) {
    return Response.json({ message: 'Successfully updated' })
  }
  return Response.json({ message: 'Cannot update question' }, { status: 400 })
}

export async function DELETE(req, { params }) {
  const { id } = await params
  const isOk = await deleteQuestion(id)

  if (isOk) {
    return Response.json({ message: 'Successfully deleted' })
  }
  return Response.json({ message: 'Cannot delete question' }, { status: 400 })
}
