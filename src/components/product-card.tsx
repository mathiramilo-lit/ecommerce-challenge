import { Heart } from "../assets";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToFavorites = () => {
    alert(`Product ${product.id} added to favorites!`);
  };

  return (
    <article className="flex flex-col items-center justify-between gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={product.images[0]} alt={product.title} className="h-64" />
        <h2 className="font-title text-center text-xl font-normal text-techie-gray-900">
          {product.title}
        </h2>
        <p className="font-text line-clamp-3 text-center text-sm font-light text-techie-gray-600">
          {product.description}
        </p>
      </div>

      <footer className="flex w-full items-center justify-between px-3">
        <span className="font-text text-sm">€{product.price}</span>
        <button onClick={handleAddToFavorites}>
          <span className="sr-only">Add to Favorites</span>
          <Heart />
        </button>
      </footer>
    </article>
  );
};
