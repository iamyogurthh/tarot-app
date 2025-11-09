import { createCategory, getAllCategories } from "@/model/category";
import { getDataFromForm } from "@/utils/utils";

export async function GET(req, res) {
    const categories = await getAllCategories();
    return Response.json(categories);
}


export async function POST(req, res) {
    const formData = await req.formData();
    let {name} = getDataFromForm(formData,'name');
    const isOk = await createCategory(name);
    if(isOk){
        return Response.json({message : "Successfully created"})
    }
    return Response.json({message : "Cannot create category"},{status : 400})
}
