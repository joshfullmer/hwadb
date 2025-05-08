import cardData from "@/resources/cards.json";
import { CardDataSchema } from "@/schemas/card.schema";

export async function GET() {
  const parsedCardData = CardDataSchema.safeParse(cardData);

  if (!parsedCardData.success) {
    console.error(parsedCardData.error);

    return new Response("Failed parsing", {
      status: 500,
    });
  }

  return Response.json(parsedCardData.data);
}
