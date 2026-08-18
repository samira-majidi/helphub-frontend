// src/shared/ui/EmptyState.tsx
import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionButton?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There is currently no data to display.",
  actionButton,
}) => {
  return (
    <div className="text-center text-gray-500 mt-10 p-6 bg-white rounded-2xl shadow-sm max-w-2xl mx-auto border border-gray-100">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-lg font-bold text-gray-700">{title}</p>
      <p className="text-sm mt-2 text-gray-400">{description}</p>
      {actionButton && (
        <div className="mt-5">
          {actionButton}
        </div>
      )}
    </div>
  );
};
