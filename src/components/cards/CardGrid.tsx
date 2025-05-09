import { Card } from "@/schemas/card.schema";
import Image from "next/image";
import Link from "next/link";

export function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="justify-center flex w-full mx-auto">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={`${card.setCode}-${card.cardNumber}`}
            href={`/cards/${card.setCode}/${card.cardNumber}`}
            className="relative"
          >
            <div className="z-0 absolute text-transparent text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {card.name}
            </div>

            <Image
              src={`/cards/${card.setCode}/${card.cardNumber}.webp`}
              alt=""
              width="200"
              height="200"
              className="z-10"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
