import { memo } from 'react';

export interface ProductHeaderProps {
  title: string;
  eyebrow?: string;
  description: string;
}

export const ProductHeader = memo(function ProductHeader({
  title,
  eyebrow,
  description,
}: ProductHeaderProps) {
  return (
    <header className="mb-10 flex flex-col items-center justify-center text-center">
      {eyebrow ? (
        <p className="text-xs uppercase font-medium text-gray-500 tracking-[0.15em] m-4">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl mt-4 mb-2 font-bold text-gray-900">{title}</h1>
      <p className="m-2 text-gray-600">{description}</p>
    </header>
  );
});
