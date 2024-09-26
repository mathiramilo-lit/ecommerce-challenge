import { useEffect, useState } from "react";

import { getProducts } from "@/api";
import type { SortState } from "@/app";
import type { CustomError, Product } from "@/types";

const ROWS = 10;
const LIMIT = ROWS * 3;

export const useProducts = ({
  query,
  sort,
}: {
  query?: string;
  sort?: SortState;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CustomError>();
  const [pagination, setPagination] = useState({
    skip: 0,
    total: 0,
  });
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const allProductsFetched = pagination.skip >= pagination.total;

  const handleLoadMore = async () => {
    setLoadMoreLoading(true);

    try {
      const data = await getProducts({
        query,
        limit: LIMIT,
        skip: pagination.skip,
        ...sort,
      });
      setProducts((prev) => [...prev, ...data.products]);
      setPagination((prev) => ({
        ...prev,
        skip: data.skip + LIMIT,
        total: data.total,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      setLoading(true);

      try {
        const data = await getProducts({
          query,
          limit: LIMIT,
          ...sort,
        });
        setProducts(data.products);
        setPagination((prev) => ({
          ...prev,
          skip: data.skip + LIMIT,
          total: data.total,
        }));
      } catch (error) {
        console.log(error);
        setError({
          title: "Something went wrong",
          description:
            "We are sorry! We could not fetch the products from the server. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    void fetchProducts();
  }, [query, sort]);

  return {
    products,
    loading,
    error,
    handleLoadMore,
    loadMoreLoading,
    allProductsFetched,
  };
};
