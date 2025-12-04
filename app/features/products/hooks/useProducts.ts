'use client';

import { useQuery } from '@tanstack/react-query';
import { ProductsResponse } from '../lib/types';
import { API_URL, DEFAULT_PAGE_SIZE } from '@/app/lib/constants';
import { CATEGORY_API_MAP, ProductCategory } from '../lib/constants';

export interface UseProductsParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  category?: ProductCategory;
}

const SELECT_FIELDS = 'id,title,description,price,images,category';

export function useProducts({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  searchTerm,
  category,
}: UseProductsParams = {}) {
  return useQuery({
    queryKey: ['products', page, pageSize, searchTerm, category],
    queryFn: async ({ signal }) => {
      const limit = pageSize;
      const skip = (page - 1) * limit;
      const hasCategory = !!category && category !== 'all';

      const url = searchTerm
        ? `${API_URL}/products/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${skip}&select=${SELECT_FIELDS}`
        : hasCategory
          ? `${API_URL}/products/category/${CATEGORY_API_MAP[category]}?limit=${limit}&skip=${skip}&select=${SELECT_FIELDS}`
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
