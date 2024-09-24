import { Order, SortOption } from '../types';

export const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Price - from high to low',
    sortBy: 'price',
    order: Order.desc,
  },
  {
    label: 'Price - from low to high',
    sortBy: 'price',
    order: Order.asc,
  },
  {
    label: 'Alphabetical - A-Z',
    sortBy: 'title',
    order: Order.asc,
  },
  {
    label: 'Alphabetical - Z-A',
    sortBy: 'title',
    order: Order.desc,
  },
];
