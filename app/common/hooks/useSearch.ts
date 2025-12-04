'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useQueryParams } from './useQueryParams';
import { INITIAL_CATEGORY } from '@/app/features/products/lib/constants';

const DEBOUNCE_DELAY = 250;

export function useSearch() {
  const { getParam, setParams } = useQueryParams();
  const searchTermParam = getParam('q') || '';

  const [searchInputValue, setSearchInputValue] = useState(searchTermParam);

  const clearSearch = () => setSearchInputValue('');

  const handleSearchTermChange = useCallback(
    (term: string) => {
      setParams({ q: term, page: '1', category: INITIAL_CATEGORY });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const debouncedFn = useMemo(
    () =>
      debounce((value: string) => {
        handleSearchTermChange(value);
      }, DEBOUNCE_DELAY),
    [handleSearchTermChange],
  );

  useEffect(() => {
    debouncedFn(searchInputValue);

    return () => {
      debouncedFn.cancel();
    };
  }, [searchInputValue, debouncedFn]);

  // Sync input value when URL param changes externally
  useEffect(() => {
    setSearchInputValue(searchTermParam);
  }, [searchTermParam]);

  return {
    searchInputValue,
    searchTerm: searchTermParam,
    setSearchInputValue,
    clearSearch,
  };
}
