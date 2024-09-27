import { motion } from "framer-motion";

import type { Product } from "@/types";
import { Empty, Error, Loader } from "../ui";
import { ProductCard } from "./product-card";

interface ProductsListProps {
  products?: Product[];
  loading?: boolean;
  error?: Error | null;
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
        <p className="text-center font-text">
          We are fetching some awesome products
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-96 w-full flex-col items-center justify-center gap-8 px-12">
        <Error message={error.message} />
      </div>
    );

  if (!products?.length)
    return (
      <div className="flex min-h-96 w-full flex-col items-center justify-center gap-8 px-12">
        <Empty
          title="We can not find any products!"
          description="There are not products that match your filters. Please try again removing some."
        />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid gap-12 px-12 md:grid-cols-3 -z-10"
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </motion.div>
  );
};
