import { deleteUserById, getUserById } from "@/model/user";

export async function GET(req,{params}){
    const {id} = await params;
    const user = await getUserById(id);
    if(user){
        return Response.json(user);
    }
    return Response.json({message : "User not found"},{status : 400});
}


export async function DELETE(req, { params }) {
  const { id } = params
  const isOk = await deleteUserById(id)

  if (isOk) {
    return Response.json({ message: 'Successfully deleted' })
  }
  return Response.json({ message: 'Cannot delete user' }, { status: 400 })
}
