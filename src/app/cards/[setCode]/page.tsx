import { loadCardData } from "@/resources/helpers";
import { notFound } from "next/navigation";
import {
  PaginationSearchParamsSchema,
  SetCodeRouteSchema,
} from "@/schemas/route.schema";
import { CardPagination } from "@/components/cards/CardPagination";
import { CardGrid } from "@/components/cards/CardGrid";

const ITEMS_PER_PAGE = 16;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SetPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ setCode: string }>;
  searchParams: SearchParams;
}) {
  const params = await paramsPromise;

  const parsedSetCode = SetCodeRouteSchema.safeParse(params.setCode);

  if (!parsedSetCode.success) notFound();

  const setCode = parsedSetCode.data;

  const cardDataResult = loadCardData();

  if (!cardDataResult.ok) notFound();

  const cards = cardDataResult.data;

  const searchParams = await searchParamsPromise;
  const { p: pageNumber } = PaginationSearchParamsSchema.parse(searchParams);
  const pageCount = Math.ceil(cards.length / ITEMS_PER_PAGE);

  const cardPage = cards.slice(
    (pageNumber - 1) * ITEMS_PER_PAGE,
    pageNumber * ITEMS_PER_PAGE,
  );

  return (
    <main>
      <CardPagination
        baseUrl={`/cards/${setCode}`}
        pageNumber={pageNumber}
        pageCount={pageCount}
      />

      <CardGrid cards={cardPage} />

      <CardPagination
        baseUrl={`/cards/${setCode}`}
        pageNumber={pageNumber}
        pageCount={pageCount}
      />
    </main>
  );
}
