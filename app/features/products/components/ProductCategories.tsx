'use client';

import clsx from 'clsx';
import { PRODUCT_CATEGORIES, ProductCategory } from '../lib/constants';

interface ProductCategoriesProps {
  category: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export function ProductCategories({
  category: activeCategory,
  onCategoryChange,
}: ProductCategoriesProps) {
  return (
    <ol
      className="
      flex gap-4 sm:gap-6
      overflow-x-auto sm:overflow-visible
      whitespace-nowrap
      justify-start sm:justify-center
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
  );
}
