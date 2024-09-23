import { useState } from 'react';

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
import { SortOption } from './types';

export type SortState = Omit<SortOption, 'label'>;

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const [sort, setSort] = useState<SortState>();

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
              />
              <SortBy
                options={SORT_OPTIONS}
                setSort={(sortBy, order) =>
                  setSort({
                    sortBy,
                    order,
                  })
                }
              />
            </>
          }
          extraRowElement={
            <SearchBar
              className="md:hidden"
              onChangeQuery={(e) => setQuery(e.target.value)}
            />
          }
        />
        <main className="flex flex-col gap-16">
          <ProductsList products={products} loading={loading} error={error} />
          <div className="flex w-full items-center justify-center">
            {!allProductsFetched && (
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
