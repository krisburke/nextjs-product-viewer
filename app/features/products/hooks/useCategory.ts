import { useQueryParams } from '@/app/common/hooks/useQueryParams';
import {
  INITIAL_CATEGORY,
  PRODUCT_CATEGORIES,
  ProductCategory,
} from '../lib/constants';

const isValidCategory = (value: string | null): value is ProductCategory => {
  if (!value) return false;
  return PRODUCT_CATEGORIES.some((cat) => cat.key === value);
};

export function useCategory() {
  const { getParam, setParams } = useQueryParams();
  const categoryParam = getParam('category');

  const category: ProductCategory = isValidCategory(categoryParam)
    ? categoryParam
    : INITIAL_CATEGORY;

  const setCategory = (newCategory: ProductCategory) => {
    setParams({ category: newCategory, q: '', page: '1' });
  };

  return { category, setCategory };
}
