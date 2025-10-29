import { getUserByUserName } from "@/model/user";
import { getDataFromForm } from "@/utils/utils";

export async function POST(req, res) {
    const formData = await req.formData();
    let {user_name} = getDataFromForm(formData,'user_name');
    const user = await getUserByUserName(user_name);
    if (!user) {
        return Response.json({ message: "User with this username doesn't exist" },{status : 401})
    }
    return Response.json({user_id : user.id})
}