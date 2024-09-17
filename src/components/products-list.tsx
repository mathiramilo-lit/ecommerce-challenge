import { Product } from '../types';
import { Error } from './error';
import { Loader } from './loader';
import { ProductCard } from './product-card';

interface ProductsListProps {
  products: Product[];
  loading?: boolean;
  error?: {
    title: string;
    description?: string;
  };
}

export const ProductsList = ({
  products,
  loading,
  error,
}: ProductsListProps) => {
  if (loading)
    return (
      <div className="w-full px-12 min-h-96 flex flex-col items-center justify-center gap-8">
        <Loader className="h-12 w-12 border-t-4 border-t-orange-600" />
        <p>We are fetching some awesome products</p>
      </div>
    );

  if (error)
    return (
      <div className="w-full px-12 min-h-96 flex flex-col items-center justify-center gap-8">
        <Error title={error.title} description={error.description} />
      </div>
    );

  return (
    <div className="grid md:grid-cols-3 gap-12 px-12">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
