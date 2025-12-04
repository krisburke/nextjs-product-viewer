export interface ApiError {
  message: string;
  statusCode?: number;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}

export function getUserFriendlyMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  const message = getErrorMessage(error);

  if (message.includes('fetch') || message.includes('network')) {
    return 'Unable to connect. Check your internet connection and try again.';
  }

  if (message.includes('timeout') || message.includes('aborted')) {
    return 'Request timed out. Please check your connection and try again.';
  }

  return fallback;
}
