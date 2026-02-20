import React from 'react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Graphic */}
      <svg
        width="100"
        height="60"
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect x="0" y="45" width="22" height="10" fill="#3D454A" />
        <rect x="14" y="32" width="22" height="10" fill="#66B3D6" />
        <rect x="28" y="19" width="22" height="10" fill="#66B3D6" />
        <rect x="42" y="6" width="22" height="10" fill="#3D454A" />
      </svg>

      {/* Text Group */}
      <div className="flex flex-col justify-center">
        <span className="text-[#3D454A] font-bold text-3xl tracking-wide leading-none">
          HAP
        </span>
        <div className="h-0.5 w-full bg-[#66B3D6] my-1 rounded-full"></div>
        <span className="text-[#4F5961] font-medium text-lg tracking-wide leading-none">
          Installments
        </span>
      </div>
    </div>
  );
}
