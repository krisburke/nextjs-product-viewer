'use client';

import clsx from 'clsx';
import { PRODUCT_FILTERS } from '../lib/constants';

export interface ProductFiltersProps {
  activeFilter?: string | null;
  handleSelectFilter: (filter: string) => void;
}

export default function ProductFilters({
  activeFilter,
  handleSelectFilter,
}: ProductFiltersProps) {
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
      {PRODUCT_FILTERS.map((filter) => (
        <li
          key={filter.key}
          onClick={() => handleSelectFilter(filter.key)}
          className={clsx(
            'cursor-pointer p-2 transition-colors shrink-0',
            activeFilter === filter.key
              ? 'font-semibold text-slate-900'
              : 'text-slate-500 hover:text-slate-700',
          )}
        >
          {filter.label}
        </li>
      ))}
    </ol>
  );
}
