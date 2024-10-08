import { useEffect, useState } from "react";

import { ProductsList } from "@/components/products";
import {
  Button,
  Drawer,
  Layout,
  Navbar,
  SearchBar,
  SortDropdown,
} from "@/components/ui";
import { SORT_OPTIONS } from "@/constants";
import { useFavorites } from "@/context";
import { useDebounce, useProductsQuery, useURLSearchParams } from "@/hooks";
import { isOrder, isSortBy } from "@/types";
import type { Order, SortBy as SortByType } from "@/types";

export interface SortState {
  sortBy?: SortByType;
  order?: Order;
}

function App() {
  const { searchParams, setSearchParams } = useURLSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [debouncedQuery, query, setQuery] = useDebounce(
    searchParams.search ?? "",
    300,
  );

  const [sort, setSort] = useState<SortState>({
    sortBy:
      searchParams.sortBy && isSortBy(searchParams.sortBy)
        ? searchParams.sortBy
        : undefined,
    order:
      searchParams.order && isOrder(searchParams.order)
        ? searchParams.order
        : undefined,
  });

  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();

  const {
    products,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useProductsQuery({
    query: debouncedQuery,
    sort,
  });

  useEffect(() => {
    setShowFavorites(false);
  }, [debouncedQuery]);

  return (
    <>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
      <Layout>
        <Navbar
          setDrawerOpen={setDrawerOpen}
          title="Find what you need"
          rightElement={
            <>
              <SearchBar
                className="hidden md:flex"
                onChangeQuery={(e) => {
                  setQuery(e.target.value);
                  setSearchParams({ search: e.target.value });
                }}
                value={query}
              />
              <SortDropdown
                options={SORT_OPTIONS}
                actualSort={sort}
                setSort={({ sortBy, order }) => {
                  setSort({
                    sortBy,
                    order,
                  });
                  setSearchParams({ sortBy, order });
                }}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
              />
            </>
          }
          extraRowElement={
            <SearchBar
              className="md:hidden"
              onChangeQuery={(e) => setQuery(e.target.value)}
              value={query}
            />
          }
        />
        <main className="flex flex-col gap-16">
          <ProductsList
            products={showFavorites ? favorites : products}
            loading={isLoading}
            error={error}
          />
          <div className="flex w-full items-center justify-center">
            {hasNextPage && !showFavorites && (
              <Button
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                Load more
              </Button>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
}

export default App;
