'use client';

import { useQuery } from '@tanstack/react-query';
import { ProductsResponse } from '../lib/types';
import { API_URL, DEFAULT_PAGE_SIZE } from '@/app/lib/constants';

export interface UseProductsParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}

const SELECT_FIELDS = 'id,title,description,price,images';

export function useProducts({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  searchTerm,
}: UseProductsParams = {}) {
  return useQuery({
    queryKey: ['products', page, pageSize, searchTerm],
    queryFn: async ({ signal }) => {
      const limit = pageSize;
      const skip = (page - 1) * limit;

      const url = searchTerm
        ? `${API_URL}/products/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${skip}&select=${SELECT_FIELDS}`
        : `${API_URL}/products?limit=${limit}&skip=${skip}&select=${SELECT_FIELDS}`;

      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      return response.json() as Promise<ProductsResponse>;
    },
    // Don't pause queries when network is offline - let them fail and show error
    networkMode: 'always',
  });
}
