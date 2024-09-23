import { Product } from './product';

export const Order = {
  asc: 'asc',
  desc: 'desc',
} as const;
export type Order = (typeof Order)[keyof typeof Order];

export type SortOption = {
  label: string;
  sortBy: ProductField;
  order: Order;
};

export type ProductField = keyof Product;
