import { CustomError, Product } from "../types";
import { Error } from "./error";
import { Loader } from "./loader";
import { ProductCard } from "./product-card";

interface ProductsListProps {
  products: Product[];
  loading?: boolean;
  error?: CustomError;
}

export const ProductsList = ({
  products,
  loading,
  error,
}: ProductsListProps) => {
  if (loading)
    return (
      <div className="flex min-h-96 w-full flex-col items-center justify-center gap-8 px-12">
        <Loader className="h-12 w-12 border-t-4 border-t-orange-600" />
        <p className="font-text text-center">
          We are fetching some awesome products
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-96 w-full flex-col items-center justify-center gap-8 px-12">
        <Error title={error.title} description={error.description} />
      </div>
    );

  return (
    <div className="grid gap-12 px-12 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
