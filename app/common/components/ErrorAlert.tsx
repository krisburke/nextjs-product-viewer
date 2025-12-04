'use client';
import { AlertTriangle } from 'lucide-react';

interface ErrorAlertProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorAlert({ title, description, onRetry }: ErrorAlertProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <div className="mb-4 flex justify-center">
          <AlertTriangle className="h-12 w-12 text-red-700" />
        </div>
        {title ? (
          <h2 className="mb-2 text-lg font-semibold text-red-700">{title}</h2>
        ) : null}
        {description ? (
          <p className="mb-6 text-sm text-red-700">{description}</p>
        ) : null}
        {onRetry ? (
          <button
            onClick={onRetry}
            className="rounded-lg bg-red-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        ) : null}
      </div>
    </div>
  );
}
