// src/shared/ui/ErrorState.tsx
import React from "react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "An error occurred",
  description = "Please check your internet connection and try again.",
  onRetry,
}) => {
  return (
    <div className="text-center text-red-500 mt-10 p-6 bg-red-50 rounded-2xl shadow-sm max-w-2xl mx-auto border border-red-100">
      <div className="text-4xl mb-3">🛠️</div>
      <p className="text-lg font-bold">{title}</p>
      <p className="text-sm mt-2 text-red-400">{description}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};
