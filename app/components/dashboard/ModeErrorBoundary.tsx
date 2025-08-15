"use client";

import ErrorBoundary from "../ErrorBoundary";

interface ModeErrorBoundaryProps {
  children: React.ReactNode;
  modeName: string;
}

export default function ModeErrorBoundary({
  children,
  modeName,
}: ModeErrorBoundaryProps) {
  return (
    <ErrorBoundary
      name={`${modeName}-mode`}
      isolate={true}
      fallback={
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-500/30">
          <div className="text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">
              {modeName} Mode Unavailable
            </h3>
            <p className="text-gray-400">
              This cooking mode is temporarily out of order. Please try another
              mode or refresh the page.
            </p>
          </div>
        </div>
      }
      onError={(error, errorInfo) => {
        // Log to your error tracking service
        console.error(`${modeName} mode error:`, error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
