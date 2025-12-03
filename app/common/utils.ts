export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)}`;
};

export function parsePositiveInt(
  value: string | null,
  defaultValue: number,
): number {
  if (value == null || value === '') return defaultValue;

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : defaultValue;
}
