import axios from "axios";
import { useState, useEffect } from "react";

import { Drawer, Layout, Navbar, Main } from "./components";
import { Product, CustomError } from "./types";

const LIMIT = 30;

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [error, setError] = useState<CustomError>();

  const allProductsFetched = pagination.skip >= pagination.total;

  const handleLoadMore = async () => {
    setLoadMoreLoading(true);

    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${pagination.skip}`,
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
          `https://dummyjson.com/products?limit=${LIMIT}`,
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
          title: "Something went wrong",
          description:
            "We are sorry! We could not fetch the products from the server. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
      <Layout>
        <Navbar setDrawerOpen={setDrawerOpen} />
        <Main
          products={products}
          loading={loading}
          error={error}
          allProductsFetched={allProductsFetched}
          handleLoadMore={handleLoadMore}
          loadMoreLoading={loadMoreLoading}
        />
      </Layout>
    </>
  );
}

export default App;
