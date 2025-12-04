'use client';

import { useSearchParams, useRouter } from 'next/navigation';

type AllowedParams = 'category' | 'page' | 'limit' | 'q';

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParams = (
    updates: Partial<Record<AllowedParams, string | null>>,
  ) => {
    const params = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    router.push(`?${params.toString()}`);
  };

  const getParam = (key: AllowedParams) => searchParams.get(key);

  return { getParam, setParams };
}
