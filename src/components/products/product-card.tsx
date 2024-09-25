import { useMemo } from 'react';

import { HeartFill, HeartOutline } from '@/assets';
import { useFavorites } from '@/context';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = useMemo(
    () => favorites.some((p) => p.id === product.id),
    [favorites, product.id],
  );

  return (
    <article className="flex flex-col items-center justify-between gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="h-64 rounded-md"
        />
        <h2 className="text-center font-title text-xl font-normal text-techie-gray-900">
          {product.title}
        </h2>
        <p className="line-clamp-3 text-center font-text text-sm font-light text-techie-gray-600">
          {product.description}
        </p>
      </div>

      <footer className="flex w-full items-center justify-between px-3">
        <span className="font-text text-sm">€{product.price}</span>
        <button
          onClick={() =>
            isFavorite ? removeFavorite(product.id) : addFavorite(product)
          }
        >
          <span className="sr-only">
            {isFavorite ? 'Remove' : 'Add'} to Favorites
          </span>
          {isFavorite ? <HeartFill /> : <HeartOutline />}
        </button>
      </footer>
    </article>
  );
};
