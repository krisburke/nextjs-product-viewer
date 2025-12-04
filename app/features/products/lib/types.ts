import { ProductCategory } from './constants';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
