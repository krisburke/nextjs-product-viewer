'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParams = (updates: Record<string, string | null>) => {
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

  const getParam = (key: string) => searchParams.get(key);

  return { getParam, setParams };
}
