import { deleteMeaning, editMeaning, getMeaningById } from '@/model/meaning'
import { getDataFromForm } from '@/utils/utils.server'

export async function GET(req, { params }) {
  const { id } = await params
  const meaning = await getMeaningById(id)
  if (meaning) {
    return Response.json(meaning)
  }
  return Response.json({ message: 'Meaning not found' }, { status: 400 })
}

export async function PUT(req, { params }) {
  const { id } = await params
  const formData = await req.formData()
  let { card_id, question_id, category_id, question_answer } = getDataFromForm(
    formData,
    'card_id',
    'question_id',
    'category_id',
    'question_answer'
  )
  const isOk = await editMeaning(
    id,
    card_id,
    question_id,
    category_id,
    question_answer
  )

  if (isOk) {
    return Response.json({ message: 'Successfully updated' })
  }
  return Response.json({ message: 'Cannot update meaning' }, { status: 400 })
}

export async function DELETE(req, { params }) {
  const { id } = await params
  const isOk = await deleteMeaning(id)

  if (isOk) {
    return Response.json({ message: 'Successfully deleted' })
  }
  return Response.json({ message: 'Cannot delete meaning' }, { status: 400 })
}
