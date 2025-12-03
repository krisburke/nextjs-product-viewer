'use client';
import Image from 'next/image';

import ProductFilters from './features/products/components/ProductFilters';
import { useProducts } from './features/products/hooks/useProducts';
import { useQueryParam } from './common/hooks/useQueryParam';

export default function ProductPage() {
  const [category, setCategory] = useQueryParam('category');
  const { products, isLoading, error } = useProducts();

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

        <section
          aria-label="Products"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <figure className="aspect-square w-full overflow-hidden bg-gray-200">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
                <figcaption className="sr-only">{product.title}</figcaption>
              </figure>
              <div className="p-4">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  {product.title}
                </h2>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
