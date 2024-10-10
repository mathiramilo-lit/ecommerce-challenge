import type { Category } from "@/types";
import { api } from "./axios";

export const getCategories = async () => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};
