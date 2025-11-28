import { getUsersList } from "@/model/reading";
import { getUsersBySearchQuery } from "@/model/user";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");
  
    let users;
  
    if (keyword) {
      users = await getUsersBySearchQuery(keyword);
    } else {
      users = await getUsersList();
    }
  
    return Response.json(users);
  }
  