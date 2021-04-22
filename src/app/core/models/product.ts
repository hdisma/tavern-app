import { Category } from "./category";

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  category: Category;
}
