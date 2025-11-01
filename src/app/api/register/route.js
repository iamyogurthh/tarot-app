import { createUser, getUserByUserName } from "@/model/user";
import { getDataFromForm } from "@/utils/utils";

export async function POST(req, res) {
    const formData = await req.formData()
    console.log(formData)
    let { user_name, real_name, dob } = getDataFromForm(
        formData,
        'user_name',
        'real_name',
        'dob' 
    )
    const user = await getUserByUserName(user_name);
    if(user){
        return Response.json({message : "User already exist"},{status : 400});
    }
    const ok = await createUser(user_name,real_name,dob);
    if (!ok) {
        return Response.json({ message: 'User cannot be created' })
    }
    return Response.json({message : "Registered successfully"});

}