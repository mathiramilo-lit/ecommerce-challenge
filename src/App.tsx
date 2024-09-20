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
import { useProducts } from './hooks';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    products,
    loading,
    error,
    handleLoadMore,
    loadMoreLoading,
    allProductsFetched,
  } = useProducts();

  return (
    <>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
      <Layout>
        <Navbar
          setDrawerOpen={setDrawerOpen}
          title="Find what you need"
          rightElement={
            <>
              <SearchBar className="hidden md:flex" />
              <SortBy />
            </>
          }
          extraRowElement={<SearchBar className="md:hidden" />}
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
