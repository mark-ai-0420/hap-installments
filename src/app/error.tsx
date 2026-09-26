"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception to local telemetry or monitoring sink
    console.error("Route exception captured by ErrorBoundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center px-4 sm:px-6 py-16 text-center text-slate-800">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-7 h-7" aria-hidden="true" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#3D454A] tracking-tight mb-3">
          Something went wrong
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
          We encountered an unexpected issue while rendering this section. Your inputs have not been lost.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => reset()}
            className="w-full min-h-[48px] bg-[#1F6F94] hover:bg-[#175775] text-white font-bold rounded-xl shadow-xs inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Try Again</span>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full min-h-[48px] border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-xl"
          >
            <Link href="/" className="inline-flex items-center justify-center gap-2">
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Back to Homepage</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full min-h-[44px] text-slate-500 hover:text-slate-800 text-xs font-semibold"
          >
            <a
              href="https://www.facebook.com/hap.installments"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Contact Support on Messenger</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
