'use client';

import { DEFAULT_PAGE_SIZE } from '@/app/lib/constants';
import { parsePositiveInt } from '../utils';
import { useQueryParams } from './useQueryParams';

export function usePagination() {
  const { getParam, setParams } = useQueryParams();

  const currentPage = parsePositiveInt(getParam('page'), 1);
  const pageSize = parsePositiveInt(getParam('limit'), DEFAULT_PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    setParams({ page: newPage.toString() });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setParams({
      page: '1',
      limit: newPageSize.toString(),
    });
  };

  const resetToFirstPage = () => {
    setParams({ page: '1' });
  };

  return {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    resetToFirstPage,
  };
}
