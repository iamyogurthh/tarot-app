import { createCategory, getAllCategories } from '@/model/category'
import { getDataFromForm, handleImage } from '@/utils/utils.server'

export async function GET(req, res) {
  const categories = await getAllCategories()
  return Response.json(categories)
}

export async function POST(req, res) {
  const formData = await req.formData()
  let { name, image } = getDataFromForm(formData, 'name', 'image')
  const finalImage = await handleImage(image);
  const isOk = await createCategory(name,finalImage);
  if (isOk) {
    return Response.json({ message: 'Successfully created' })
  }
  return Response.json({ message: 'Cannot create category' }, { status: 400 })
}
