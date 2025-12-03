'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export function useQueryParam(key: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParam = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return [searchParams.get(key), setQueryParam] as const;
}
