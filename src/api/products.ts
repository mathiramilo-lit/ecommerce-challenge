import type { SortState } from "@/app";
import type { Product } from "@/types";
import { api } from "./axios";

export interface ProductsRequest {
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
  query,
  limit,
  skip,
  sort,
}: ProductsRequest) => {
  const path = query ? "/search" : "/";
  const params = {
    q: query,
    limit,
    skip,
    ...sort,
  };
  const res = await api.get<ProductsResponse>(path, { params });
  return res.data;
};
