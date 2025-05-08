import { CardDataSchema } from "@/schemas/card.schema";
import cardData from "./cards.json" with { type: "json" };
import { err, ok } from "@/types/result";

export const loadCardData = () => {
  const parsedCardData = CardDataSchema.safeParse(cardData);

  if (!parsedCardData.success) return err(parsedCardData.error);

  return ok(parsedCardData.data.cards);
};

export const getCard = ({
  cardNumber,
  setCode,
}: {
  cardNumber: string;
  setCode: string;
}) => {
  const cardDataResult = loadCardData();

  if (!cardDataResult.ok) return err(cardDataResult.error);

  const card = cardDataResult.data.find(
    (card) => card.cardNumber === cardNumber && card.setCode === setCode,
  );

  if (card == null) return err(new Error("Card not found"));

  return ok(card);
};
