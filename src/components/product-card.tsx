import Heart from '../assets/heart.svg';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToFavorites = () => {
    alert(`Product ${product.id} added to favorites!`);
  };

  return (
    <article className="flex flex-col items-center justify-center gap-2">
      <img src={product.images[0]} alt={product.title} className="h-64" />
      <h2 className="text-center text-lg font-medium text-techie-gray-900">
        {product.title}
      </h2>
      <p className="text-center text-sm text-techie-gray-600 line-clamp-4">
        {product.description}
      </p>

      <footer className="w-full flex items-center justify-between px-2 mt-4">
        <span>€{product.price}</span>
        <button onClick={handleAddToFavorites}>
          <span className="sr-only">Add to Favorites</span>
          <Heart />
        </button>
      </footer>
    </article>
  );
};
