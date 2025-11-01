import { getCardsByZodiacNumerologyTopic } from '@/model/card'
import { getCategoryIDByCategoryName } from '@/model/category';
import { createReading } from '@/model/reading';
import { getDataFromForm, getNumerology } from '@/utils/utils'
import { getZodiacSign } from '@/utils/utils'
export async function POST(req) {
    const formData = await req.formData();
        console.log(formData)
        let { topic, user_id, real_name,dob,major } = getDataFromForm(
            formData,
            'topic',
            'user_id',
            'real_name',
            'dob',
            'major'
        )
  
  let zodiac = getZodiacSign(dob)
  let numerology = getNumerology(dob)
  let category_id = await getCategoryIDByCategoryName(topic);

  const readingId = await createReading(
    user_id,
    real_name,
    dob,
    major,
    zodiac,
    numerology,
    category_id
  )
  if (!readingId) {
    return Response.json({ message: 'User cannot be created and cannot be read' })
  }
  const cards = await getCardsByZodiacNumerologyTopic(zodiac, numerology, topic,readingId)
  return Response.json({user_reading_id : readingId , cards});
}
