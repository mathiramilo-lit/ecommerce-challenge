import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "@/api";
import type { SortState } from "@/App";

const ROWS = 10;
const LIMIT = ROWS * 3;

export const useProductsQuery = ({
  category,
  query,
  sort,
}: {
  category?: string;
  query?: string;
  sort?: SortState;
}) => {
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["products", { category, query, sort }],
    queryFn: ({ pageParam }) =>
      getProducts({
        category,
        query,
        limit: LIMIT,
        skip: pageParam,
        sort: { ...sort },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.skip + LIMIT < lastPage.total
        ? lastPage.skip + LIMIT
        : undefined,
  });

  return {
    ...infiniteQuery,
    products: infiniteQuery.data?.pages.map((page) => page.products).flat(),
  };
};
