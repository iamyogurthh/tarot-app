import { createCard, getAllCards } from "@/model/card";
import { getDataFromForm, handleImage } from "@/utils/utils";

export async function GET(req, res) {
    const cards = await getAllCards();
    return Response.json(cards);
}


export async function POST(req, res) {
    const formData = await req.formData();
    let {name,zodiac,numerology,image} = getDataFromForm(formData,'name','zodiac','numerology','image');
    const finalImage = await handleImage(image);
    const isOk = await createCard(name,zodiac,numerology,finalImage);
    if(isOk){
        return Response.json({message : "Successfully created"})
    }
    return Response.json({message : "Cannot create card"},{status : 400})

}
