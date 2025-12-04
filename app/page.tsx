'use client';

import { ProductCategories } from './features/products/components/ProductCategories';
import { SearchInput } from './common/components/SearchInput';
import { useProducts } from './features/products/hooks/useProducts';
import { useSearch } from './common/hooks/useSearch';
import { ProductGrid } from './features/products/components/ProductGrid';
import { usePagination } from './common/hooks/usePagination';
import { PaginationControls } from './common/components/PaginationControls';
import { ProductLoadingSkeleton } from './features/products/components/ProductLoadingSkeleton';
import { ProductErrorDisplay } from './features/products/components/ProductErrorDisplay';
import { ProductHeader } from './features/products/components/ProductHeader';
import { useCategory } from './features/products/hooks/useCategory';
import { ScrollToTop } from './common/components/ScrollToTop';

export default function ProductPage() {
  const { category, setCategory } = useCategory();
  const { searchInputValue, searchTerm, setSearchInputValue, clearSearch } =
    useSearch();
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination();

  const { data, isPending, isError, error, refetch } = useProducts({
    page: currentPage,
    pageSize,
    searchTerm,
    category,
  });

  return (
    <div className="min-h-screen p-4 pb-24 sm:p-8 sm:pb-8">
      <main className="mx-auto max-w-7xl">
        <ProductHeader
          title="Our Products"
          eyebrow="Products"
          description="Have a good setup for your minimalist home."
        />
        <ProductCategories category={category} onCategoryChange={setCategory} />
        <SearchInput
          value={searchInputValue}
          onChange={setSearchInputValue}
          onClear={clearSearch}
        />

        {isPending && <ProductLoadingSkeleton />}

        {isError && !isPending && (
          <ProductErrorDisplay error={error} onRetry={refetch} />
        )}

        {data && !isError && (
          <>
            <ProductGrid products={data.products} />
            <PaginationControls
              currentPage={currentPage}
              totalItems={data.total}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </main>
      {(pageSize === 50 || pageSize === 100) && <ScrollToTop />}
    </div>
  );
}
