export const PRODUCT_CATEGORIES = [
  { key: 'all', label: 'All Products' },
  { key: 'living', label: 'Living Room' },
  { key: 'office', label: 'Office' },
  { key: 'decor', label: 'Decor' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'bath', label: 'Bath' },
] as const;

export const INITIAL_CATEGORY = 'all';

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]['key'];

// Maps each UI filter to a reasonable DummyJSON API category.
export const CATEGORY_API_MAP: Record<
  Exclude<ProductCategory, 'all'>,
  string
> = {
  living: 'furniture',
  office: 'laptops',
  decor: 'home-decoration',
  kitchen: 'kitchen-accessories',
  bath: 'fragrances',
};
