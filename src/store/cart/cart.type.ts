import { CategoryItem } from '../categories/category.type';

export type CartItem = CategoryItem & {
  quantity: number;
};
