import { createCard, getAllCards, getCardsBySearchQuery } from '@/model/card'
import { getDataFromForm, handleImage } from '@/utils/utils.server'


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  let cards;

  if (keyword) {
    cards = await getCardsBySearchQuery(keyword);
  } else {
    cards = await getAllCards();
  }

  return Response.json(cards);
}

export async function POST(req, res) {
  const formData = await req.formData()
  let { name, zodiac, numerology, image } = getDataFromForm(
    formData,
    'name',
    'zodiac',
    'numerology',
    'image'
  )
  const finalImage = await handleImage(image)
  const isOk = await createCard(name, zodiac, numerology, finalImage)
  if (isOk) {
    return Response.json({ message: 'Successfully created' })
  }
  return Response.json({ message: 'Cannot create card' }, { status: 400 })
}
