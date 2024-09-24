import { useEffect, useState } from 'react';

import {
  Drawer,
  Navbar,
  ProductsList,
  Button,
  SearchBar,
  SortBy,
  Layout,
} from './components';
import { SORT_OPTIONS } from './constants';
import { useProducts, useDebounce } from './hooks';
import { useFavorites } from './context';
import { Order, SortBy as SortByType, isOrder, isSortBy } from './types';

export type SortState = {
  sortBy: SortByType | undefined;
  order: Order | undefined;
};

function App() {
  const params = new URLSearchParams(window.location.search);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [debouncedQuery, query, setQuery] = useDebounce(
    params.get('search') || '',
    300,
  );

  const [sort, setSort] = useState<SortState>({
    sortBy:
      params.get('sortBy') && isSortBy(params.get('sortBy'))
        ? (params.get('sortBy') as SortByType)
        : undefined,
    order:
      params.get('order') && isOrder(params.get('order'))
        ? (params.get('order') as Order)
        : undefined,
  });

  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();

  const {
    products,
    loading,
    error,
    handleLoadMore,
    loadMoreLoading,
    allProductsFetched,
  } = useProducts({
    query: debouncedQuery,
    sort,
  });

  useEffect(() => {
    setShowFavorites(false);
  }, [debouncedQuery]);

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (query) newParams.set('search', query);
    if (sort.sortBy) newParams.set('sortBy', sort.sortBy);
    if (sort.order) newParams.set('order', sort.order);

    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
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
              <SortBy
                options={SORT_OPTIONS}
                sort={sort}
                setSort={(sortBy, order) =>
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
            loading={loading}
            error={error}
          />
          <div className="flex w-full items-center justify-center">
            {!allProductsFetched && !showFavorites && (
              <Button onClick={handleLoadMore} loading={loadMoreLoading}>
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
