import { deleteCategory, editCategory, getCategoryById } from "@/model/category";
import { getDataFromForm } from "@/utils/utils";

export async function GET(req,{params}){
    const {id} = await params;
    const category = await getCategoryById(id);
    if(category){
        return Response.json(category);
    }
    return Response.json({message : "Category not found"},{status : 400});
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const formData = await req.formData();
    let { name } = getDataFromForm(formData, 'name');
    const isOk = await editCategory(id, name);

    if (isOk) {
        return Response.json({ message: "Successfully updated" });
    }
    return Response.json({ message: "Cannot update category" }, { status: 400 });
}

export async function DELETE(req, { params }) {
    const { id } = params;
    const isOk = await deleteCategory(id);

    if (isOk) {
        return Response.json({ message: "Successfully deleted" });
    }
    return Response.json({ message: "Cannot delete category" }, { status: 400 });
}
