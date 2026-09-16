"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function FloatingMessengerButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Messenger floating inquiry shortcut"
      className={`fixed bottom-6 right-6 z-40 flex items-center bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:transform-none ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="https://www.facebook.com/hap.installments"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inquire on Facebook Messenger (opens in a new tab)"
        className="flex items-center gap-2.5 pl-5 pr-3 py-3 text-sm sm:text-base font-semibold min-h-[48px] rounded-l-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F6F94] transition-colors motion-reduce:transition-none"
      >
        {/* Official Messenger Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-current shrink-0"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.913 1.45 5.518 3.727 7.152V22l3.411-1.874c.907.252 1.87.387 2.862.387 5.523 0 10-4.145 10-9.253C22 6.145 17.523 2 12 2zm1.066 12.443l-2.731-2.912-5.328 2.912 5.86-6.223 2.796 2.913 5.263-2.913-5.86 6.223z" />
        </svg>
        <span>Inquire on Messenger</span>
      </a>

      <div className="h-5 w-px bg-white/30" aria-hidden="true" />

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={() => setIsDismissed(true)}
        aria-label="Dismiss Messenger shortcut"
        className="pr-4 pl-3 py-3 rounded-r-full text-white/80 hover:text-white hover:bg-white/10 min-h-[48px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F6F94] transition-colors motion-reduce:transition-none"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
