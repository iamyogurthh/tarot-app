import { deleteCard, editCard, getCardById } from '@/model/card'
import {
  deleteImage,
  getDataFromForm,
  handleImageEdit,
} from '@/utils/utils.server'

export async function GET(req, { params }) {
  const { id } = await params
  const card = await getCardById(id)
  if (card) {
    return Response.json(card)
  }
  return Response.json({ message: 'Card not found' }, { status: 400 })
}

export async function PUT(req, { params }) {
  const { id } = await params
  const formData = await req.formData()
  let { name, zodiac, numerology, image } = getDataFromForm(
    formData,
    'name',
    'zodiac',
    'numerology',
    'image'
  )

  const existingCard = await getCardById(id)
  if (!existingCard) {
    return NextResponse.json({ message: 'Card not found' }, { status: 404 })
  }

  const finalImage = await handleImageEdit(image, existingCard)

  const isOk = await editCard(id, name, zodiac, numerology, finalImage)

  if (isOk) {
    return Response.json({ message: 'Successfully updated' })
  }
  return Response.json({ message: 'Cannot update card' }, { status: 400 })
}

export async function DELETE(req, { params }) {
  const { id } = await params

  const existingCard = await getCardById(id)
  if (!existingCard) {
    return NextResponse.json({ message: 'Card not found' }, { status: 404 })
  }

  await deleteImage(existingCard.image)
  const isOk = await deleteCard(id)

  if (isOk) {
    return Response.json({ message: 'Successfully deleted' })
  }
  return Response.json({ message: 'Cannot delete card' }, { status: 400 })
}
