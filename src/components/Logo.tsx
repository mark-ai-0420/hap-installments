import React from 'react';

export function Logo({
  className = "",
  variant = "default"
}: {
  className?: string;
  variant?: "default" | "inverted";
}) {
  const isInverted = variant === "inverted";

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
        aria-hidden="true"
        focusable="false"
      >
        <rect x="0" y="45" width="22" height="10" fill={isInverted ? "#F8FAFC" : "#3D454A"} rx="1" />
        <rect x="14" y="32" width="22" height="10" fill={isInverted ? "#38BDF8" : "#1F6F94"} rx="1" />
        <rect x="28" y="19" width="22" height="10" fill={isInverted ? "#38BDF8" : "#1F6F94"} rx="1" />
        <rect x="42" y="6" width="22" height="10" fill={isInverted ? "#F8FAFC" : "#3D454A"} rx="1" />
      </svg>

      {/* Text Group */}
      <div className="flex flex-col justify-center select-none">
        <span className={`${isInverted ? "text-white" : "text-[#3D454A]"} font-bold text-3xl tracking-wide leading-none`}>
          HAP
        </span>
        <div className={`h-0.5 w-full ${isInverted ? "bg-[#38BDF8]" : "bg-[#1F6F94]"} my-1 rounded-full`}></div>
        <span className={`${isInverted ? "text-slate-300" : "text-[#4F5961]"} font-medium text-lg tracking-wide leading-none`}>
          Installments
        </span>
      </div>
    </div>
  );
}
