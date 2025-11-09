import { getQuestionsByCategoryId } from "@/model/question";

export async function GET(req, { params }) {
    const { categoryId } = await params;
    const questions = await getQuestionsByCategoryId(categoryId);
    if (questions) {
        return Response.json(questions);
    }
    return Response.json({ message: "Questions not found" }, { status: 400 });
}