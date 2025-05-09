import { CardDataSchema } from "@/schemas/card.schema";
import cardData from "./cards.json" with { type: "json" };
import { err, ok } from "@/types/result";
import { SetDataSchema } from "@/schemas/set.schema";
import setData from "./sets.json" with { type: "json" };

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

export const getPreviousAndNextCards = ({
  cardNumber,
  setCode,
}: {
  cardNumber: string;
  setCode: string;
}) => {
  const cardDataResult = loadCardData();

  if (!cardDataResult.ok) return err(cardDataResult.error);

  const cards = cardDataResult.data;

  const index = cards.findIndex(
    (card) => card.cardNumber === cardNumber && card.setCode === setCode,
  );

  if (index < 0) return err(new Error("Card not found"));

  const previousCard = index === 0 ? null : cards.at(index - 1);
  const nextCard = cards.at(index + 1);

  return ok({
    prev: previousCard ?? null,
    next: nextCard ?? null,
  });
};

export const loadSetData = () => {
  const parsedSetData = SetDataSchema.safeParse(setData);

  if (!parsedSetData.success) return err(parsedSetData.error);

  return ok(parsedSetData.data.sets);
};

export const getSet = ({ setCode }: { setCode: string }) => {
  const setDataResult = loadSetData();

  if (!setDataResult.ok) return err(setDataResult.error);

  const set = setDataResult.data.find((set) => set.setCode === setCode);

  if (set == null) return err(new Error("Set not found"));

  return ok(set);
};
