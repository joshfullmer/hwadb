import { CardGrid } from "@/components/cards/CardGrid";
import { Input } from "@/components/ui/input";
import { getCardsWithFilter } from "@/resources/helpers";
import { SearchPageSearchParamsSchema } from "@/schemas/route.schema";
import { SearchParams } from "@/types/app";
import Form from "next/form";
import { redirect } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = SearchPageSearchParamsSchema.parse(await searchParams);

  const filteredCardsResult = getCardsWithFilter({ query: q });

  if (!filteredCardsResult.ok) throw new Error("Error loading cards");

  const cards = filteredCardsResult.data;

  if (cards.length === 1)
    redirect(`/cards/${cards[0].setCode}/${cards[0].cardNumber}`);

  return (
    <main className="max-w-9/10 w-full mx-auto flex flex-col gap-8">
      <div className="px-20 w-full">
        <Form action="/search">
          <Input placeholder="Search for a card" name="q" />
        </Form>
      </div>

      <CardGrid cards={filteredCardsResult.data} />
    </main>
  );
}
