import axios from 'axios';
import { useEffect, useState } from 'react';

import { Product } from '../types';
import { ProductsList } from './products-list';
import { Button } from './button';

const LIMIT = 30;

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();

  const allProductsFetched = pagination.skip >= pagination.total;

  const handleLoadMore = async () => {
    setLoadMoreLoading(true);

    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${pagination.skip}`
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
          `https://dummyjson.com/products?limit=${LIMIT}`
        );
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
  }, []);

  return (
    <main className="flex flex-col gap-16">
      <ProductsList products={products} loading={loading} error={error} />
      <footer className="w-full flex items-center justify-center">
        {!allProductsFetched && (
          <Button onClick={handleLoadMore} loading={loadMoreLoading}>
            Load more
          </Button>
        )}
      </footer>
    </main>
  );
};
