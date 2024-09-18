import { ProductsList } from "./products-list";
import { Button } from "./button";
import { CustomError, Product } from "../types";

interface MainProps {
  products: Product[];
  loading?: boolean;
  error?: CustomError;
  allProductsFetched?: boolean;
  handleLoadMore: () => void;
  loadMoreLoading?: boolean;
}

export const Main = ({
  products,
  loading,
  error,
  allProductsFetched,
  handleLoadMore,
  loadMoreLoading,
}: MainProps) => {
  return (
    <main className="flex flex-col gap-16">
      <ProductsList products={products} loading={loading} error={error} />
      <footer className="flex w-full items-center justify-center">
        {!allProductsFetched && (
          <Button onClick={handleLoadMore} loading={loadMoreLoading}>
            Load more
          </Button>
        )}
      </footer>
    </main>
  );
};
