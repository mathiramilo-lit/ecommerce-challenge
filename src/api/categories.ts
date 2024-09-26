import { api } from "./axios";

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export const getCategories = async () => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};
