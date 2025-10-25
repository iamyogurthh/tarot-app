import { getCardsByZodiacNumerologyTopic } from '@/model/card'
import { createUser } from '@/model/user'
import { getDataFromForm, getNumerology } from '@/utils/utils'
import { getZodiacSign } from '@/utils/utils'

export async function POST(req) {
  const formData = await req.formData()
  console.log(formData)
  let { topic, user_name, full_name, dob, major } = getDataFromForm(
    formData,
    'topic',
    'user_name',
    'full_name',
    'dob',
    'major'
  )

  let zodiac = getZodiacSign(dob)
  let numerology = getNumerology(dob)

  const ok = await createUser(
    user_name,
    full_name,
    dob,
    major,
    zodiac,
    numerology
  )
  if (!ok) {
    return Response.json({ message: 'User cannot be created' })
  }
  const cards = await getCardsByZodiacNumerologyTopic(zodiac, numerology, topic)
  return Response.json(cards)
}
