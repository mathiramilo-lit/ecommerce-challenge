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
import { useDebounce, useInfiniteProducts } from "@/hooks";
import { isOrder, isSortBy } from "@/types";
import type { Order, SortBy as SortByType } from "@/types";

export interface SortState {
  sortBy?: SortByType;
  order?: Order;
}

function App() {
  const params = new URLSearchParams(window.location.search);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [debouncedQuery, query, setQuery] = useDebounce(
    params.get("search") ?? "",
    300,
  );

  const [sort, setSort] = useState<SortState>({
    sortBy:
      params.get("sortBy") && isSortBy(params.get("sortBy"))
        ? (params.get("sortBy") as SortByType)
        : undefined,
    order:
      params.get("order") && isOrder(params.get("order"))
        ? (params.get("order") as Order)
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
  } = useInfiniteProducts({
    query: debouncedQuery,
    sort,
  });

  useEffect(() => {
    setShowFavorites(false);
  }, [debouncedQuery]);

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (query) {
      newParams.set("search", query);
    }
    if (sort.sortBy) {
      newParams.set("sortBy", sort.sortBy);
    }
    if (sort.order) {
      newParams.set("order", sort.order);
    }

    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [query, sort]);

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
                onChangeQuery={(e) => setQuery(e.target.value)}
                value={query}
              />
              <SortDropdown
                options={SORT_OPTIONS}
                actualSort={sort}
                setSort={({ sortBy, order }) =>
                  setSort({
                    sortBy,
                    order,
                  })
                }
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
