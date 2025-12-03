'use client';

import { useEffect, useState } from 'react';
import { Product, ProductsResponse } from '../lib/types';
import { PRODUCTS_URL } from '../lib/constants';

export interface UseProductResults {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

export function useProducts(): UseProductResults {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(PRODUCTS_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data: ProductsResponse = await response.json();
        setProducts(data.products);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}
