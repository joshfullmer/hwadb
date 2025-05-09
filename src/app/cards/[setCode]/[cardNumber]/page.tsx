import { Ability } from "@/components/cards/Ability";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils/format.util";
import { getCard, getPreviousAndNextCards, getSet } from "@/resources/helpers";
import {
  CardNumberRouteSchema,
  SetCodeRouteSchema,
} from "@/schemas/route.schema";
import { Brush } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  const setResult = getSet({
    setCode,
  });

  const cardResult = getCard({
    cardNumber,
    setCode,
  });

  const prevNextCardResult = getPreviousAndNextCards({
    cardNumber,
    setCode,
  });

  if (!cardResult.ok || !setResult.ok || !prevNextCardResult.ok) notFound();

  const card = cardResult.data;
  const set = setResult.data;
  const { prev, next } = prevNextCardResult.data;

  if (card.type === "seeker") console.log("seeker");

  const getCardName = () => {
    if (card.type === "obstacle" || card.type === "moment") return card.name;

    if (card.unique) return `• ${card.name}`;

    return card.name;
  };

  const prevHref = prev?.cardNumber
    ? `/cards/${setCode}/${prev.cardNumber}`
    : undefined;
  const nextHref = next?.cardNumber
    ? `/cards/${setCode}/${next.cardNumber}`
    : undefined;

  return (
    <main className="flex justify-center mx-auto max-w-9/10 w-full gap-8">
      <Image
        src={`/cards/${setCode}/${cardNumber}.webp`}
        alt=""
        width="400"
        height="100"
      />

      <div className="flex flex-col gap-4 max-w-1/3 w-full">
        <div className="flex justify-between">
          <div>
            {prevHref != null && (
              <Button asChild variant="outline">
                <Link href={prevHref}>{prev?.name}</Link>
              </Button>
            )}
          </div>

          <div>
            {nextHref != null && (
              <Button asChild variant="outline">
                <Link href={nextHref}>{next?.name}</Link>
              </Button>
            )}
          </div>
        </div>

        <section className="border-x border-x-slate-500 border-y-4 border-y-slate-300 rounded-2xl">
          <div className="flex flex-col items-center py-4">
            <div className="text-2xl font-semibold">{getCardName()}</div>

            {(card.type === "seeker" || card.type === "agent") && (
              <div className="text-sm italic font-thin">{card.title}</div>
            )}
          </div>

          <hr className="text-slate-500" />

          <div className="grid grid-cols-4 items-center gap-4 p-4">
            <div className="text-center text-3xl font-bold">
              {(card.type === "agent" ||
                card.type === "obstacle" ||
                card.type === "source" ||
                card.type === "moment") && <div>{card.cost}</div>}
            </div>

            <div className="col-span-2 text-center text-2xl font-semibold">
              {capitalize(card.type)}
            </div>

            <div className="flex w-full justify-center">
              {(card.type === "seeker" ||
                card.type === "agent" ||
                card.type === "source") &&
                card.collectionIcons &&
                card.collectionIcons.length > 0 && (
                  <div className="flex gap-4">
                    {card.collectionIcons.map((icon, i) => (
                      <Image
                        key={i}
                        src={`/icons/${icon}.webp`}
                        alt=""
                        height="24"
                        width="24"
                      />
                    ))}
                  </div>
                )}
            </div>
          </div>

          <hr className="text-slate-500" />

          <div className="grid grid-cols-4 items-center gap-4 p-4">
            <div className="text-center text-3xl font-bold">
              {(card.type === "agent" || card.type === "obstacle") && (
                <div>{card.barrier}</div>
              )}
            </div>

            <div className="col-span-2 text-center text-lg font-semibold">
              {card.traits.join(" • ")}
            </div>

            <div className="text-center text-3xl font-bold">
              {(card.type === "agent" ||
                card.type === "obstacle" ||
                card.type === "source") && <div>{card.presence}</div>}
            </div>
          </div>

          {card.type === "seeker" && (
            <>
              <hr className="text-slate-500" />

              <div className="grid grid-cols-2 items-center gap-4 p-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold">{card.maxCards}</span>
                  <div>
                    <Image
                      src="/icons/draw.webp"
                      alt=""
                      height="24"
                      width="24"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold">{card.maxShards}</span>
                  <div>
                    <Image
                      src="/icons/shard.webp"
                      alt=""
                      height="24"
                      width="24"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <hr className="text-slate-500" />

          <div className="flex flex-col gap-4 p-4">
            {card.ability.map((ability, i) => (
              <Ability key={i} ability={ability} />
            ))}
          </div>

          {(card.type === "agent" ||
            card.type === "obstacle" ||
            card.type === "source") &&
            card.cipher != null && (
              <>
                <hr className="text-slate-500" />

                <div className="p-4">
                  <div className="border border-purple-400 bg-purple-200 text-slate-900 text-center p-2 rounded-xl">
                    {/* TODO: Add dark */}
                    <Ability ability={card.cipher} />
                  </div>
                </div>
              </>
            )}

          <hr className="text-slate-500" />

          <div className="grid grid-cols-3 items-center gap-4 p-4">
            <div className="flex justify-center gap-2">
              {card.artist !== "NONE" && (
                <>
                  <Brush height="15" width="15" />

                  <span className="text-xs">{card.artist}</span>
                </>
              )}
            </div>

            <div className="flex justify-center gap-1">
              {Array.from({
                length: card.type === "agent" ? 1 : card.affiliation,
              }).map((_, i) => (
                <Image
                  key={i}
                  src={`/icons/${card.faction}.webp`}
                  alt=""
                  height="24"
                  width="24"
                />
              ))}
            </div>

            <div className="text-center text-xs">{`${setCode} • ${card.cardNumber}/${set.cardCount}`}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
