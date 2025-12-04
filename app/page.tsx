'use client';

import { ProductFilters } from './features/products/components/ProductFilters';
import { SearchInput } from './common/components/SearchInput';
import { useProducts } from './features/products/hooks/useProducts';
import { useQueryParams } from './common/hooks/useQueryParams';
import { useSearch } from './common/hooks/useSearch';
import { ProductGrid } from './features/products/components/ProductGrid';
import { usePagination } from './common/hooks/usePagination';
import { Pagination } from './common/components/Pagination';
import { ProductLoadingSkeleton } from './features/products/components/ProductLoadingSkeleton';
import { ProductErrorDisplay } from './features/products/components/ProductErrorDisplay';
import { ProductErrorBoundary } from './features/products/components/ProductErrorBoundary';
import ProductHeader from './features/products/components/ProductHeader';

export default function ProductPage() {
  const { getParam, setParams } = useQueryParams();
  const category = getParam('category');
  const setCategory = (value: string) => setParams({ category: value });

  const { searchTerm } = useSearch();
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination();

  const { data, isFetching, isError, error, refetch } = useProducts({
    page: currentPage,
    pageSize,
    searchTerm,
  });

  return (
    <ProductErrorBoundary>
      <div className="min-h-screen p-8">
        <main className="mx-auto max-w-7xl">
          <ProductHeader
            title="Our Products"
            eyebrow="Products"
            description="Have a good setup for your minimalist home."
          />
          <ProductFilters
            activeFilter={category}
            handleSelectFilter={setCategory}
          />
          <SearchInput />

          {isFetching && <ProductLoadingSkeleton />}

          {isError && !isFetching && (
            <ProductErrorDisplay error={error} onRetry={refetch} />
          )}

          {data && !isError && (
            <>
              <ProductGrid products={data.products} />
              <Pagination
                currentPage={currentPage}
                totalItems={data.total}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </main>
      </div>
    </ProductErrorBoundary>
  );
}
