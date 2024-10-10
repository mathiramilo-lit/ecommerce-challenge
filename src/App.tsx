import { useEffect, useState } from "react";

import { ProductsList } from "@/components/products";
import {
  Breadcrumbs,
  Button,
  Drawer,
  DrawerButton,
  Layout,
  Navbar,
  SearchBar,
  SortDropdown,
} from "@/components/ui";
import { SORT_OPTIONS } from "@/constants";
import { useFavorites } from "@/context";
import {
  useCategoriesQuery,
  useDebounce,
  useProductsQuery,
  useURLSearchParams,
} from "@/hooks";
import { isOrder, isSortBy } from "@/types";
import type { Category, Order, SortBy as SortByType } from "@/types";

export interface SortState {
  sortBy?: SortByType;
  order?: Order;
}

function App() {
  const { searchParams, setSearchParams } = useURLSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [category, setCategory] = useState<Category>({
    name: "",
    slug: "",
    url: "",
  });

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
    category: category.name,
    query: debouncedQuery,
    sort,
  });

  useEffect(() => {
    setShowFavorites(false);
    setCategory({
      name: "",
      slug: "",
      url: "",
    });
  }, [debouncedQuery]);

  const { data: categories } = useCategoriesQuery();

  return (
    <>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen}>
        {categories?.map((category) => (
          <DrawerButton
            key={category.slug}
            label={category.name}
            onClick={() => {
              setQuery("");
              setCategory(category);
              setDrawerOpen(false);
            }}
          />
        ))}
      </Drawer>

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
          <section className="flex flex-col gap-12">
            {category.name && (
              <Breadcrumbs
                onClick={() =>
                  setCategory({
                    name: "",
                    slug: "",
                    url: "",
                  })
                }
                category={category.name}
              />
            )}
            <ProductsList
              products={showFavorites ? favorites : products}
              loading={isLoading}
              error={error}
            />
          </section>
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
