import axios from 'axios';
import { useState, useEffect } from 'react';

import { Product, CustomError } from '../types';

const ROWS = 10;
const LIMIT = ROWS * 3;

export interface UseProductsOptions {
  query?: string;
  sort?: string;
}

export const useProducts = ({ query, sort }: UseProductsOptions) => {
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
      const res = await axios.get(
        `https://dummyjson.com/products${query ? `/search?q=${query}&` : '?'}limit=${LIMIT}&skip=${pagination.skip}`,
      );
      setProducts((prev) => [...prev, ...res.data.products]);
      setPagination((prev) => ({
        ...prev,
        skip: res.data.skip + LIMIT,
        total: res.data.total,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `https://dummyjson.com/products${query ? `/search?q=${query}&` : '?'}limit=${LIMIT}`,
        );
        console.log(res);
        setProducts(res.data.products);
        setPagination((prev) => ({
          ...prev,
          skip: res.data.skip + LIMIT,
          total: res.data.total,
        }));
      } catch (error) {
        console.log(error);
        setError({
          title: 'Something went wrong',
          description:
            'We are sorry! We could not fetch the products from the server. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return {
    products,
    loading,
    error,
    handleLoadMore,
    loadMoreLoading,
    allProductsFetched,
  };
};
