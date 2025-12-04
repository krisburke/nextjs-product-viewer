import { getUserFriendlyMessage } from '@/app/lib/errors';
import { ErrorAlert } from '@/app/common/components/ErrorAlert';

interface ProductErrorDisplayProps {
  error: unknown;
  onRetry: () => void;
}

export function ProductErrorDisplay({
  error,
  onRetry,
}: ProductErrorDisplayProps) {
  const userMessage = getUserFriendlyMessage(
    error,
    'Unable to load products. Please try again.',
  );

  return (
    <ErrorAlert
      title="Oops! Something went wrong"
      description={userMessage}
      onRetry={onRetry}
    />
  );
}
