import type { SortState } from "@/App";
import type { Product } from "@/types";
import { api } from "./axios";

export interface ProductsRequest {
  category?: string;
  query?: string;
  limit: number;
  skip?: number;
  sort?: SortState;
}

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export const getProducts = async ({
  category,
  query,
  limit,
  skip,
  sort,
}: ProductsRequest) => {
  let path = "/";

  if (category && query) {
    path = `/category/${category}`;
  } else if (category) {
    path = `/category/${category}`;
  } else if (query) {
    path = "/search";
  }

  const params = {
    q: query,
    limit,
    skip,
    ...sort,
  };
  const res = await api.get<ProductsResponse>(path, { params });
  return res.data;
};
