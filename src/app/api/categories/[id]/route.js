import { deleteCategory, editCategory, getCategoryById } from '@/model/category'
import { getDataFromForm, handleImageEdit } from '@/utils/utils.server'

export async function GET(req, { params }) {
  const { id } = await params
  const category = await getCategoryById(id)
  if (category) {
    return Response.json(category)
  }
  return Response.json({ message: 'Category not found' }, { status: 400 })
}

export async function PUT(req, { params }) {
  const { id } = await params
  const formData = await req.formData()
  let { name, image } = getDataFromForm(formData, 'name', 'image')

  const existingCategory = await getCategoryById(id);
  if (!existingCategory) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 })
  }

  const finalImage = await handleImageEdit(image, existingCategory);

  const isOk = await editCategory(id, name, finalImage)

  if (isOk) {
    return Response.json({ message: 'Successfully updated' })
  }
  return Response.json({ message: 'Cannot update category' }, { status: 400 })
}

export async function DELETE(req, { params }) {
  const { id } = params
  const isOk = await deleteCategory(id)

  if (isOk) {
    return Response.json({ message: 'Successfully deleted' })
  }
  return Response.json({ message: 'Cannot delete category' }, { status: 400 })
}
