import { API_URL } from '@/app/lib/constants';

export const PRODUCT_FILTERS = [
  { key: 'all', label: 'All Products' },
  { key: 'living-room', label: 'Living Room' },
  { key: 'office', label: 'Office' },
  { key: 'decor', label: 'Decor' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'bath', label: 'Bath' },
] as const;

export type ProductFilter = (typeof PRODUCT_FILTERS)[number]['key'];

// Maps each UI filter to one or more DummyJSON API category values.
export const CATEGORY_MAP: Record<ProductFilter, string[]> = {
  all: [
    'furniture',
    'home-decoration',
    'laptops',
    'kitchen-accessories',
    'beauty',
    'skin-care',
  ],
  'living-room': ['furniture', 'home-decoration'],
  office: ['laptops'],
  decor: ['home-decoration'],
  kitchen: ['kitchen-accessories'],
  bath: ['beauty', 'skin-care'],
};

export const PRODUCTS_URL = `${API_URL}/products`;
