'use client';

import Image from 'next/image';
import { Modal } from '@/app/common/components/Modal';
import { Product } from '../lib/types';
import { formatPrice } from '@/app/common/utils';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product?.title}>
      {product ? (
        <article className="flex flex-col gap-6 md:flex-row md:items-start">
          <figure className="w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 md:w-64">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={256}
              height={256}
              className="aspect-square h-full w-full object-cover"
              priority
            />
          </figure>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <p className="text-base text-gray-700">{product.description}</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
          </div>
        </article>
      ) : null}
    </Modal>
  );
}

export default ProductModal;
