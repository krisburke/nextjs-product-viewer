'use client';

import clsx from 'clsx';
import { PRODUCT_CATEGORIES, ProductCategory } from '../lib/constants';
import { Search } from 'lucide-react';

interface ProductCategoriesProps {
  category: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  toggleShowSearch: () => void;
}

export function ProductCategories({
  category: activeCategory,
  onCategoryChange,
  toggleShowSearch,
}: ProductCategoriesProps) {
  return (
    <div className="flex justify-start sm:justify-center">
      <ol
        className="
          flex gap-4 sm:gap-6
          overflow-x-auto sm:overflow-visible
          whitespace-nowrap
          my-6 px-2 sm:px-0
        "
      >
        {PRODUCT_CATEGORIES.map((category) => (
          <li key={category.key}>
            <button
              onClick={() => onCategoryChange(category.key)}
              className={clsx(
                'cursor-pointer p-2 transition-colors shrink-0 rounded',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                activeCategory === category.key
                  ? 'font-semibold text-slate-900'
                  : 'text-slate-500 hover:text-slate-700',
              )}
              aria-pressed={activeCategory === category.key}
              aria-label={`Filter by ${category.label}`}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ol>
      <button className="ml-8" onClick={() => toggleShowSearch()}>
        <Search />
      </button>
    </div>
  );
}
