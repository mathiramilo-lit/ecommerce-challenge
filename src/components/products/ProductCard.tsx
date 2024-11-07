import { useMemo } from "react";

import { useFavorites } from "@/context";
import type { Product } from "@/types";
import { Card } from "../ui";

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
    <Card.Root>
      <Card.Content>
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="h-64 rounded-md"
        />
        <Card.Title>{product.title}</Card.Title>
        <Card.Description>{product.description}</Card.Description>
      </Card.Content>

      <Card.Footer>
        <Card.Price>€{product.price}</Card.Price>
        <Card.AddToFavoritesButton
          isFavorite={isFavorite}
          onClick={() =>
            isFavorite ? removeFavorite(product.id) : addFavorite(product)
          }
        />
      </Card.Footer>
    </Card.Root>
  );
};
