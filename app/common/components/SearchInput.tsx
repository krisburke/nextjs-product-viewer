'use client';

import { X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchInput({ value, onChange, onClear }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== undefined) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="mb-8 w-full">
      <div className="relative mx-auto max-w-2xl">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-20 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
