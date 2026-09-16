import React from "react";
import { ShieldCheck } from "lucide-react";

interface PaymentChannel {
  name: string;
  category: string;
  badge: React.ReactNode;
}

export function PaymentChannelsRibbon() {
  const channels: PaymentChannel[] = [
    {
      name: "GCash",
      category: "E-Wallet",
      badge: (
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 rounded-full bg-[#005CE6] text-white font-black text-xs shadow-xs"
            aria-hidden="true"
          >
            G
          </span>
          <span className="font-bold text-slate-800 tracking-tight">GCash</span>
        </span>
      ),
    },
    {
      name: "Maya",
      category: "E-Wallet",
      badge: (
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00D664] text-slate-950 font-black text-xs shadow-xs"
            aria-hidden="true"
          >
            M
          </span>
          <span className="font-bold text-slate-800 tracking-tight">Maya</span>
        </span>
      ),
    },
    {
      name: "BDO",
      category: "Online Banking",
      badge: (
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 rounded-md bg-[#002B7F] text-amber-300 font-black text-[10px] tracking-wider shadow-xs"
            aria-hidden="true"
          >
            BDO
          </span>
          <span className="font-bold text-slate-800 tracking-tight">BDO</span>
        </span>
      ),
    },
    {
      name: "BPI",
      category: "Online Banking",
      badge: (
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 rounded-md bg-[#B11116] text-white font-black text-[10px] tracking-wider shadow-xs"
            aria-hidden="true"
          >
            BPI
          </span>
          <span className="font-bold text-slate-800 tracking-tight">BPI</span>
        </span>
      ),
    },
    {
      name: "UnionBank",
      category: "Online Banking",
      badge: (
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 rounded-md bg-[#F37021] text-slate-950 font-black text-xs shadow-xs"
            aria-hidden="true"
          >
            UB
          </span>
          <span className="font-bold text-slate-800 tracking-tight">UnionBank</span>
        </span>
      ),
    },
    {
      name: "7-Eleven / InstaPay",
      category: "OTC & Instant Transfer",
      badge: (
        <span className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 rounded-md bg-[#008060] text-white font-black text-[10px] shadow-xs"
            aria-hidden="true"
          >
            7E
          </span>
          <span className="font-bold text-slate-800 tracking-tight">7-Eleven / InstaPay</span>
        </span>
      ),
    },
  ];

  return (
    <section
      aria-label="Accepted Repayment Channels"
      className="border-y border-slate-200/60 bg-white py-6"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Descriptive text */}
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1F6F94] mb-1.5">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Accepted Repayment Channels</span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Convenient, secure monthly repayment via top Philippine banks, e-wallets, and over-the-counter partners.
            </p>
          </div>

          {/* Recognizable badge chips */}
          <div
            role="list"
            aria-label="Payment channels list"
            className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5 sm:gap-3"
          >
            {channels.map((channel) => (
              <div
                role="listitem"
                key={channel.name}
                className="inline-flex items-center px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/80 transition-colors motion-reduce:transition-none text-xs sm:text-sm shadow-2xs"
                title={`${channel.name} (${channel.category})`}
              >
                {channel.badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
