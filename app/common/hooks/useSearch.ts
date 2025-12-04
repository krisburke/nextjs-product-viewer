'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useQueryParams } from './useQueryParams';

const DEBOUNCE_DELAY = 250;

export function useSearch() {
  const { getParam, setParams } = useQueryParams();
  const querySearchTerm = getParam('q') || '';

  const [searchInputValue, setSearchInputValue] = useState('');

  const clearSearch = () => setSearchInputValue('');

  const handleSearchTermChange = useCallback((term: string) => {
    setParams({ q: term, page: '1' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedFn = useMemo(
    () =>
      debounce((value: string) => {
        handleSearchTermChange(value);
      }, DEBOUNCE_DELAY),
    [handleSearchTermChange],
  );

  useEffect(() => {
    debouncedFn(searchInputValue);
  }, [searchInputValue, debouncedFn]);

  return {
    searchInputValue,
    searchTerm: querySearchTerm,
    setSearchInputValue,
    clearSearch,
  };
}
