import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export function CardPagination({
  baseUrl,
  pageNumber,
  pageCount,
}: {
  baseUrl: string;
  pageNumber: number;
  pageCount: number;
}) {
  const previousHref =
    pageNumber === 1 ? undefined : `${baseUrl}?p=${pageNumber - 1}`;

  const nextHref =
    pageNumber === pageCount ? undefined : `${baseUrl}?p=${pageNumber + 1}`;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={previousHref} />
        </PaginationItem>

        {Array.from({ length: pageCount }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`${baseUrl}?p=${i + 1}`}
              isActive={pageNumber === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={nextHref} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
