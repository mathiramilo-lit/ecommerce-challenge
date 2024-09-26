export const SortBy = {
  title: 'title',
  price: 'price',
} as const;
export type SortBy = (typeof SortBy)[keyof typeof SortBy];

export const Order = {
  asc: 'asc',
  desc: 'desc',
} as const;
export type Order = (typeof Order)[keyof typeof Order];

export type SortOption = {
  label: string;
  sortBy: SortBy;
  order: Order;
};

export const isSortBy = (value: unknown): value is SortBy => {
  return value === SortBy.title || value === SortBy.price;
};
export const isOrder = (value: unknown): value is Order => {
  return value === Order.asc || value === Order.desc;
};
