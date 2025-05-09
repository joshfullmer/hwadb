import { getCard } from "@/resources/helpers";
import {
  CardNumberRouteSchema,
  SetCodeRouteSchema,
} from "@/schemas/route.schema";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CardPage({
  params: paramsPromise,
}: {
  params: Promise<{ cardNumber: string; setCode: string }>;
}) {
  const params = await paramsPromise;

  const parsedCardNumber = CardNumberRouteSchema.safeParse(params.cardNumber);
  const parsedSetCode = SetCodeRouteSchema.safeParse(params.setCode);

  if (!parsedCardNumber.success || !parsedSetCode.success) notFound();

  const cardNumber = parsedCardNumber.data;
  const setCode = parsedSetCode.data;

  const cardResult = getCard({
    cardNumber,
    setCode,
  });

  if (!cardResult.ok) notFound();

  const card = cardResult.data;

  if (card.type === "seeker") console.log("seeker");

  return (
    <div>
      <pre>{JSON.stringify(card, null, 2)}</pre>
      <Image
        src={`/cards/${setCode}/${cardNumber}.webp`}
        alt=""
        width="100"
        height="100"
      />
    </div>
  );
}
