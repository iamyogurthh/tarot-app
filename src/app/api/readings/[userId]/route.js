import { getCategoryByCategoryId } from '@/model/category'
import { getReadingUsersByUserId } from '@/model/reading'
import { getUserById } from '@/model/user'

export async function GET(req, { params }) {
  const { userId } = await params
  const overviews = await getReadingUsersByUserId(userId)
  console.log(overviews)
  const result = []
  for (let i = 0; i < overviews.length; i++) {
    const user = await getUserById(overviews[i].user_id)
    let category = await getCategoryByCategoryId(overviews[i].category_id)
    result.push({
      reading_id: overviews[i].id,
      full_name: overviews[i].real_name,
      reading_user_dob: overviews[i].dob,
      topic: category,
      read_at: overviews[i].read_at,
    })
  }
  return Response.json(result)
}
