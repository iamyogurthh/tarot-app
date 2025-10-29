import { createUser, getUserByUserName } from "@/model/user";
import { getDataFromForm } from "@/utils/utils";

export async function POST(req, res) {
    const formData = await req.formData()
    console.log(formData)
    let { user_name, real_name, major } = getDataFromForm(
        formData,
        'user_name',
        'real_name',
        'major' 
    )
    const user = await getUserByUserName(user_name);
    if(user){
        return Response.json({message : "User already exist"},{status : 400});
    }
    const ok = await createUser(user_name,real_name,major);
    if (!ok) {
        return Response.json({ message: 'User cannot be created' })
    }
    return Response.json({message : "Created successfully"});

}