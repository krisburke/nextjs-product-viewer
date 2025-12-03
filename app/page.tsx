'use client';

import { ProductFilters } from './features/products/components/ProductFilters';
import { useProducts } from './features/products/hooks/useProducts';
import { useQueryParams } from './common/hooks/useQueryParams';
import { ProductGrid } from './features/products/components/ProductGrid';
import { usePagination } from './common/hooks/usePagination';
import { Pagination } from './common/components/Pagination';

export default function ProductPage() {
  const { getParam, setParams } = useQueryParams();
  const category = getParam('category');
  const setCategory = (value: string) => setParams({ category: value });

  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination();

  const { products, isLoading, error, total } = useProducts({
    page: currentPage,
    pageSize,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-red-600">Error: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Retry
          </button>
          d
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-7xl">
        <header className="flex flex-col items-center justify-center mb-8 text-center">
          <span>Products</span>
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600">
            Have a good setup for your minimalist home.
          </p>
        </header>

        <ProductFilters
          activeFilter={category}
          handleSelectFilter={setCategory}
        />

        <ProductGrid products={products} />

        <Pagination
          currentPage={currentPage}
          totalItems={total}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </main>
    </div>
  );
}
