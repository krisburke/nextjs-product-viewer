'use client';

import { useEffect, useState } from 'react';
import { Product, ProductsResponse } from '../lib/types';
import { API_URL, DEFAULT_PAGE_SIZE } from '@/app/lib/constants';

export interface UseProductsParams {
  page?: number;
  pageSize?: number;
}

export interface UseProductResults {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  total: number;
}

export function useProducts({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: UseProductsParams): UseProductResults {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const limit = pageSize;
        const skip = (page - 1) * limit;

        const url = `${API_URL}/products?limit=${limit}&skip=${skip}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data: ProductsResponse = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [page, pageSize]);

  return { products, isLoading, error, total };
}
