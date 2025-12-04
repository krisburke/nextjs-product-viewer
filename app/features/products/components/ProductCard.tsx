'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Product } from '../lib/types';
import { formatPrice } from '@/app/common/utils';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  const handleCardClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event?.preventDefault();
    onClick?.(product);
  };

  const handleCardEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      onClick?.(product);
    }
  };

  return (
    <article
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500"
      onClick={handleCardClick}
      onKeyDown={handleCardEnter}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.title}`}
    >
      <figure className="aspect-square w-full overflow-hidden bg-gray-200">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-500">
            No image available
          </div>
        )}
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
            {formatPrice(product.price)}
          </span>
        </p>
      </div>
    </article>
  );
});
