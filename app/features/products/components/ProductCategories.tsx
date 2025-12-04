'use client';

import clsx from 'clsx';
import { PRODUCT_CATEGORIES } from '../lib/constants';
import { useCategory } from '../hooks/useCategory';

export function ProductCategories() {
  const { category: activeCategory, setCategory } = useCategory();

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
        <li
          key={category.key}
          onClick={() => setCategory(category.key)}
          className={clsx(
            'cursor-pointer p-2 transition-colors shrink-0',
            activeCategory === category.key
              ? 'font-semibold text-slate-900'
              : 'text-slate-500 hover:text-slate-700',
          )}
        >
          {category.label}
        </li>
      ))}
    </ol>
  );
}
