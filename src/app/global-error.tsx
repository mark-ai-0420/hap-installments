"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root exception:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Application Error</h2>
          <p className="text-sm text-slate-600 mb-6">
            A critical error occurred while loading HAP Installments.
          </p>
          <button
            onClick={() => reset()}
            className="w-full min-h-[44px] px-6 py-2.5 bg-[#1F6F94] hover:bg-[#175775] text-white font-bold rounded-lg transition-colors"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
