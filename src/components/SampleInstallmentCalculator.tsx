"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeftRight,
  CalendarCheck2,
  CalendarDays,
  Calculator,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  HandCoins,
  Info,
  MessageSquare,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

const dueDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const MONTHLY_ADD_ON_RATE = 0.03;
const MIN_AMOUNT = 5000;
const MAX_AMOUNT = 100000;
const AMOUNT_STEP = 1000;

function addMonths(date: Date, months: number) {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);
  return nextDate;
}

function formatPesos(val: number): string {
  return val.toLocaleString("en-PH");
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback below
    }
  }

  if (typeof document !== "undefined") {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      textarea.setAttribute("readonly", "");
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch {
      return false;
    }
  }
  return false;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone = "blue",
}: {
  icon: typeof Calculator;
  label: string;
  value: string;
  tone?: "blue" | "orange";
}) {
  const isOrange = tone === "orange";

  return (
    <div
      className={`rounded-3xl border p-6 shadow-xs ${
        isOrange
          ? "border-amber-200 bg-amber-50/50"
          : "border-slate-200/90 bg-white"
      }`}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
          isOrange
            ? "bg-amber-100 text-amber-800"
            : "bg-blue-50 text-[#1F6F94]"
        }`}
      >
        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p
        className={`mt-2 text-3xl font-black tracking-tight tabular-nums sm:text-4xl ${
          isOrange ? "text-[#B45309]" : "text-[#1E2326]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export function SampleInstallmentCalculator() {
  const [amount, setAmount] = useState(17000);
  const [tenure, setTenure] = useState(6);
  const [upfrontOption, setUpfrontOption] = useState<"A" | "B">("A");
  const [showComparison, setShowComparison] = useState(false);

  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedInModal, setCopiedInModal] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const isBelowMin = amount < MIN_AMOUNT;
  const isAboveMax = amount > MAX_AMOUNT;
  const effectiveAmount = Math.max(MIN_AMOUNT, Math.min(MAX_AMOUNT, amount || MIN_AMOUNT));

  const schedule = useMemo(() => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() + 1);

    const addOnRate = MONTHLY_ADD_ON_RATE * tenure;
    const totalRepayment = Math.round(effectiveAmount * (1 + addOnRate));
    const monthlyPayment = Math.ceil(totalRepayment / tenure);
    const monthlyPrincipal = Math.round(effectiveAmount / tenure);
    const oneMonthInterest = Math.round(effectiveAmount * MONTHLY_ADD_ON_RATE);
    const upfrontDue = upfrontOption === "A" ? monthlyPayment : oneMonthInterest;

    return {
      totalRepayment,
      monthlyPayment,
      monthlyPrincipal,
      oneMonthInterest,
      upfrontDue,
      rows: Array.from({ length: tenure }, (_, index) => ({
        month: index + 1,
        dueDate: dueDateFormatter.format(addMonths(startDate, index)),
        principal: monthlyPrincipal,
        payment: monthlyPayment,
        isUpfront: upfrontOption === "A" && index === 0,
      })),
    };
  }, [effectiveAmount, tenure, upfrontOption]);

  const referenceCode = useMemo(() => {
    const planTag = upfrontOption === "A" ? "OPTA" : "OPTB";
    const amtTag = Math.round(effectiveAmount / 1000);
    return `HAP-${amtTag}K-${tenure}M-${planTag}`;
  }, [effectiveAmount, tenure, upfrontOption]);

  const inquirySummaryMessage = useMemo(() => {
    return [
      `📋 HAP INSTALLMENTS INQUIRY SUMMARY`,
      `Reference Code: ${referenceCode}`,
      `Amount Financed: ₱${formatPesos(effectiveAmount)}`,
      `Tenure: ${tenure} Months`,
      `Plan: Option ${upfrontOption} (${upfrontOption === "A" ? "1st Month Advance" : "1-Month Service Fee Upfront"})`,
      `Monthly Payment: ₱${formatPesos(schedule.monthlyPayment)}/mo`,
      `Upfront Due: ₱${formatPesos(schedule.upfrontDue)}`,
      `Total Repayment: ₱${formatPesos(schedule.totalRepayment)}`,
    ].join("\n");
  }, [referenceCode, effectiveAmount, tenure, upfrontOption, schedule]);

  const handleCopySummary = useCallback(async () => {
    await copyToClipboard(inquirySummaryMessage);
    setCopiedSummary(true);
    setToastMessage("Summary copied to clipboard!");

    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setCopiedSummary(false);
    }, 2500);

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, [inquirySummaryMessage]);

  const handleOpenInquiryModal = useCallback(async () => {
    await copyToClipboard(inquirySummaryMessage);
    setIsInquiryModalOpen(true);
  }, [inquirySummaryMessage]);

  const handleResetDefaults = useCallback(() => {
    setAmount(17000);
    setTenure(6);
    setUpfrontOption("A");
    setToastMessage("Calculator reset to default ₱17,000 / 6 Months / Option A.");

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  const canDecrease = amount > MIN_AMOUNT;
  const canIncrease = amount < MAX_AMOUNT;

  return (
    <section
      id="sample-computation"
      aria-labelledby="calculator-heading"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1F6F94]/30 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <h2
            id="calculator-heading"
            className="text-4xl font-black tracking-tight text-[#1E2326] md:text-5xl text-balance"
          >
            Preview a Simple Payment Plan
          </h2>
          <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600 text-balance">
            Adjust the sample amount and see how the monthly schedule changes
            before sending us a message.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-[#FAFAFA] p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3D454A] text-white">
                    <WalletCards className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <label
                    htmlFor="amount-financed"
                    className="text-sm font-bold text-slate-600"
                  >
                    Amount Financed (PHP)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    aria-label="Decrease amount"
                    disabled={!canDecrease}
                    onClick={() =>
                      setAmount((value) =>
                        Math.max(MIN_AMOUNT, value - AMOUNT_STEP),
                      )
                    }
                    className="h-11 w-11 shrink-0 rounded-full border-slate-200 bg-white p-0 text-[#1E2326] hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#1F6F94] motion-reduce:transition-none motion-reduce:transform-none"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <input
                    id="amount-financed"
                    type="number"
                    inputMode="numeric"
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
                    step={AMOUNT_STEP}
                    aria-label="Amount Financed in Philippine Pesos"
                    aria-describedby={isBelowMin ? "amount-min-helper" : undefined}
                    value={amount === 0 ? "" : amount}
                    onBlur={() => {
                      if (amount < MIN_AMOUNT) {
                        setAmount(MIN_AMOUNT);
                      } else if (amount > MAX_AMOUNT) {
                        setAmount(MAX_AMOUNT);
                      }
                    }}
                    onChange={(event) => {
                      const val = event.target.value;
                      if (val === "") {
                        setAmount(0);
                        return;
                      }
                      const nextAmount = Number(val);
                      if (!Number.isNaN(nextAmount)) {
                        setAmount(nextAmount);
                      }
                    }}
                    className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-2xl font-black tabular-nums text-[#1E2326] outline-none transition focus:border-[#1F6F94] focus:ring-4 focus:ring-[#1F6F94]/15 motion-reduce:transition-none"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    aria-label="Increase amount"
                    disabled={!canIncrease}
                    onClick={() =>
                      setAmount((value) =>
                        Math.min(MAX_AMOUNT, value + AMOUNT_STEP),
                      )
                    }
                    className="h-11 w-11 shrink-0 rounded-full border-slate-200 bg-white p-0 text-[#1E2326] hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#1F6F94] motion-reduce:transition-none motion-reduce:transform-none"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
                {isBelowMin && (
                  <p
                    id="amount-min-helper"
                    className="mt-2 text-xs font-bold text-amber-700 flex items-center gap-1 animate-in fade-in motion-reduce:animate-none"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Minimum financing amount is ₱5,000</span>
                  </p>
                )}
                {isAboveMax && (
                  <p className="mt-2 text-xs font-bold text-amber-700 flex items-center gap-1 animate-in fade-in motion-reduce:animate-none">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Maximum sample financing amount is ₱100,000</span>
                  </p>
                )}
              </div>

              {/* Quick Amount Presets & Reset Button */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-600 mr-1">Presets:</span>
                {[10000, 20000, 35000, 50000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`min-h-[44px] min-w-[56px] rounded-lg px-3.5 py-2.5 text-xs font-bold tabular-nums transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] ${
                      amount === preset
                        ? "bg-[#1F6F94] text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    ₱{(preset / 1000).toFixed(0)}k
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  title="Reset to default ₱17,000 / 6 months / Option A"
                  className="min-h-[44px] min-w-[56px] rounded-lg px-3.5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-dashed border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#FAFAFA] p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1F6F94] text-white">
                  <CalendarDays className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-600" id="tenure-label">Tenure</p>
                  <div
                    role="radiogroup"
                    aria-labelledby="tenure-label"
                    className="mt-3 grid grid-cols-2 gap-2"
                  >
                    {[3, 6].map((months) => (
                      <Button
                        key={months}
                        type="button"
                        role="radio"
                        aria-checked={tenure === months}
                        variant={tenure === months ? "default" : "outline"}
                        onClick={() => setTenure(months)}
                        className={`min-h-[44px] h-12 rounded-2xl text-base font-bold motion-reduce:transition-none motion-reduce:transform-none ${
                          tenure === months
                            ? "bg-[#3D454A] text-white hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-[#1F6F94]"
                            : "border-slate-200 bg-white text-[#1E2326] hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#1F6F94]"
                        }`}
                      >
                        {months} months
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#FAFAFA] p-5 shadow-sm md:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1F6F94] text-white">
                    <HandCoins className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-600" id="upfront-label">
                      Upfront Option
                    </p>
                    <p className="text-xs text-slate-600 font-normal">
                      {upfrontOption === "A"
                        ? "Option A: 1st installment paid upfront at release"
                        : "Option B: 1-month service fee paid upfront; all installments paid on due dates"}
                    </p>
                  </div>
                </div>
                <div
                  role="radiogroup"
                  aria-labelledby="upfront-label"
                  className="grid flex-1 grid-cols-2 gap-2"
                >
                  {(["A", "B"] as const).map((option) => (
                    <Button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={upfrontOption === option}
                      variant={upfrontOption === option ? "default" : "outline"}
                      onClick={() => setUpfrontOption(option)}
                      className={`min-h-[44px] h-12 rounded-2xl text-base font-bold motion-reduce:transition-none motion-reduce:transform-none ${
                        upfrontOption === option
                          ? "bg-[#1F6F94] text-white hover:bg-[#175775] focus-visible:ring-2 focus-visible:ring-[#1F6F94]"
                          : "border-slate-200 bg-white text-[#1E2326] hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#1F6F94]"
                      }`}
                    >
                      Option {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Option A vs Option B Expandable Comparison Helper */}
              <div className="mt-4 pt-4 border-t border-slate-200/80">
                <button
                  type="button"
                  id="toggle-comparison-helper"
                  aria-expanded={showComparison}
                  aria-controls="comparison-breakdown-panel"
                  onClick={() => setShowComparison((prev) => !prev)}
                  className="flex w-full min-h-[44px] items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-[#1F6F94] hover:bg-[#1F6F94]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] transition-colors motion-reduce:transition-none"
                >
                  <span className="flex items-center gap-2">
                    <ArrowLeftRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Compare Option A vs Option B</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <span>{showComparison ? "Hide breakdown" : "View side-by-side comparison"}</span>
                    {showComparison ? (
                      <ChevronUp className="h-4 w-4 text-slate-600 shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-600 shrink-0" aria-hidden="true" />
                    )}
                  </span>
                </button>

                {showComparison && (
                  <div
                    id="comparison-breakdown-panel"
                    role="region"
                    aria-label="Side-by-side comparison of Upfront Option A and Option B"
                    className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 animate-in fade-in duration-200 motion-reduce:animate-none"
                  >
                    {/* Option A Card */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={upfrontOption === "A"}
                      onClick={() => setUpfrontOption("A")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setUpfrontOption("A");
                        }
                      }}
                      className={`cursor-pointer rounded-2xl border p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] motion-reduce:transition-none ${
                        upfrontOption === "A"
                          ? "border-[#1F6F94] bg-[#F4F9FC] ring-2 ring-[#1F6F94]/25 shadow-xs"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                              upfrontOption === "A"
                                ? "bg-[#1F6F94] text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            A
                          </span>
                          <span className="text-sm font-black text-[#1E2326]">
                            Option A (Advance 1st Month)
                          </span>
                        </div>
                        {upfrontOption === "A" ? (
                          <span className="rounded-full bg-[#1F6F94] px-2 py-0.5 text-[11px] font-bold text-white">
                            Selected
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-600">
                            Click to select
                          </span>
                        )}
                      </div>

                      <div className="mt-3 space-y-2 text-xs">
                        <div className="flex items-baseline justify-between border-b border-slate-200/60 pb-1.5">
                          <span className="font-semibold text-slate-600">Upfront due:</span>
                          <span className="font-black text-[#B45309] tabular-nums text-sm">
                            1st month installment (₱{formatPesos(schedule.monthlyPayment)})
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between border-b border-slate-200/60 pb-1.5">
                          <span className="font-semibold text-slate-600">Remaining schedule:</span>
                          <span className="font-bold text-slate-800 tabular-nums">
                            {tenure - 1} months
                          </span>
                        </div>
                        <div className="pt-0.5">
                          <span className="font-bold text-slate-700">Best for: </span>
                          <span className="font-medium text-slate-600">Lower ongoing monthly payments.</span>
                        </div>
                      </div>
                    </div>

                    {/* Option B Card */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={upfrontOption === "B"}
                      onClick={() => setUpfrontOption("B")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setUpfrontOption("B");
                        }
                      }}
                      className={`cursor-pointer rounded-2xl border p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] motion-reduce:transition-none ${
                        upfrontOption === "B"
                          ? "border-[#1F6F94] bg-[#F4F9FC] ring-2 ring-[#1F6F94]/25 shadow-xs"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                              upfrontOption === "B"
                                ? "bg-[#1F6F94] text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            B
                          </span>
                          <span className="text-sm font-black text-[#1E2326]">
                            Option B (1-Month Service Fee)
                          </span>
                        </div>
                        {upfrontOption === "B" ? (
                          <span className="rounded-full bg-[#1F6F94] px-2 py-0.5 text-[11px] font-bold text-white">
                            Selected
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-600">
                            Click to select
                          </span>
                        )}
                      </div>

                      <div className="mt-3 space-y-2 text-xs">
                        <div className="flex items-baseline justify-between border-b border-slate-200/60 pb-1.5">
                          <span className="font-semibold text-slate-600">Upfront due:</span>
                          <span className="font-black text-[#B45309] tabular-nums text-sm">
                            3% one-time service fee (₱{formatPesos(schedule.oneMonthInterest)})
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between border-b border-slate-200/60 pb-1.5">
                          <span className="font-semibold text-slate-600">Remaining schedule:</span>
                          <span className="font-bold text-slate-800 tabular-nums">
                            full {tenure} months
                          </span>
                        </div>
                        <div className="pt-0.5">
                          <span className="font-bold text-slate-700">Best for: </span>
                          <span className="font-medium text-slate-600">Lowest upfront out-of-pocket cash on Day 1.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <SummaryCard
              icon={Calculator}
              label="Total Repayment"
              value={currency.format(schedule.totalRepayment)}
            />
            <SummaryCard
              icon={CalendarCheck2}
              label="Monthly Payment"
              value={currency.format(schedule.monthlyPayment)}
            />
            <SummaryCard
              icon={HandCoins}
              label={
                upfrontOption === "A"
                  ? "1st Month Due Upfront (Option A)"
                  : "One-Time Service Fee (Option B)"
              }
              value={currency.format(schedule.upfrontDue)}
              tone="orange"
            />
          </div>
        </div>

        {/* Desktop Tabular Schedule View */}
        <div className="mt-8 hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_70px_rgb(15,23,42,0.06)] md:block">
          <div
            tabIndex={0}
            role="region"
            aria-label="Monthly installment payment schedule"
            className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] focus-visible:ring-offset-2"
          >
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-[#3D454A] text-white">
                  {["Month", "Due Date", "Principal", "Monthly Payment"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-6 py-4 text-center text-base font-black"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Option B Upfront Service Fee Disclosure Row */}
                {upfrontOption === "B" && (
                  <tr className="bg-amber-50/50">
                    <td className="px-6 py-5 text-center text-lg font-black text-[#1E2326]">
                      Day 0
                      <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                        upfront fee
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center text-lg font-semibold text-slate-700">
                      Day of Release (Day 0)
                    </td>
                    <td className="px-6 py-5 text-center text-lg font-semibold tabular-nums text-slate-700">
                      — <span className="text-xs font-medium text-slate-600 block">(1-month service fee)</span>
                    </td>
                    <td className="px-6 py-5 text-center text-xl font-black tabular-nums text-[#B45309]">
                      {currency.format(schedule.oneMonthInterest)}
                    </td>
                  </tr>
                )}

                {schedule.rows.map((row) => (
                  <tr key={row.month} className="bg-white">
                    <td className="px-6 py-5 text-center text-lg font-black text-[#1E2326]">
                      Month {row.month}
                      {row.isUpfront && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                          upfront
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center text-lg font-semibold text-slate-700">
                      {row.dueDate}
                    </td>
                    <td className="px-6 py-5 text-center text-lg font-semibold tabular-nums text-slate-700">
                      {currency.format(row.principal)}
                    </td>
                    <td
                      className={`px-6 py-5 text-center text-xl font-black tabular-nums ${
                        row.isUpfront ? "text-[#B45309]" : "text-[#1F6F94]"
                      }`}
                    >
                      {currency.format(row.payment)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#FAFAFA]">
                  <th
                    scope="row"
                    className="px-6 py-5 text-center text-xl font-black text-[#1E2326]"
                  >
                    Total
                  </th>
                  <td className="px-6 py-5 text-center text-xs font-semibold text-slate-600">
                    {upfrontOption === "B" ? "Fixed Repayment Plan" : "All installments"}
                  </td>
                  <td className="px-6 py-5 text-center text-xl font-black tabular-nums text-[#1E2326]">
                    {currency.format(effectiveAmount)}
                  </td>
                  <td className="px-6 py-5 text-center text-xl font-black tabular-nums text-[#1F6F94]">
                    {currency.format(schedule.totalRepayment)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Responsive Card List Schedule View */}
        <div className="mt-8 space-y-3 md:hidden">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black text-[#1E2326]">
              Payment Schedule
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
              {tenure} Months
            </span>
          </div>

          <div className="space-y-3" role="feed" aria-label="Monthly installment payment schedule cards">
            {/* Mobile Option B Upfront Disclosure Card */}
            {upfrontOption === "B" && (
              <article
                aria-label="Day 0 1-Month Service Fee details"
                className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#1E2326]">
                      Day 0: 1-Month Service Fee
                    </span>
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      upfront fee
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-600">
                    Day of Release
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-slate-600">Coverage</p>
                    <p className="mt-0.5 font-bold tabular-nums text-slate-700 text-xs">
                      Advance Service Fee (3%)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-600">Upfront Fee</p>
                    <p className="mt-0.5 text-base font-black tabular-nums text-[#B45309]">
                      {currency.format(schedule.oneMonthInterest)}
                    </p>
                  </div>
                </div>
              </article>
            )}

            {schedule.rows.map((row) => (
              <article
                key={row.month}
                aria-label={`Month ${row.month} payment details`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#1E2326]">
                      Month {row.month}
                    </span>
                    {row.isUpfront && (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                        upfront
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-600">
                    {row.dueDate}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-slate-600">Principal</p>
                    <p className="mt-0.5 font-bold tabular-nums text-slate-700">
                      {currency.format(row.principal)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-600">Monthly Payment</p>
                    <p
                      className={`mt-0.5 text-base font-black tabular-nums ${
                        row.isUpfront ? "text-[#B45309]" : "text-[#1F6F94]"
                      }`}
                    >
                      {currency.format(row.payment)}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            {/* Mobile Total Summary Card */}
            <div className="rounded-2xl border border-[#1F6F94]/20 bg-[#F4F9FC] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Total Principal
                  </p>
                  <p className="mt-0.5 text-lg font-black tabular-nums text-[#1E2326]">
                    {currency.format(effectiveAmount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Total Repayment
                  </p>
                  <p className="mt-0.5 text-xl font-black tabular-nums text-[#1F6F94]">
                    {currency.format(schedule.totalRepayment)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1-Click Action Area: Send Computation to Messenger & Copy Summary */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-[#FAFAFA] p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1F6F94]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                1-Click Messenger Inquiry
              </span>
              <h3 className="mt-2 text-xl font-black text-[#1E2326] sm:text-2xl">
                Inquire with This Calculation
              </h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">
                Send this exact plan to our official Facebook Messenger team for immediate review, or copy the breakdown to your clipboard.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 tabular-nums">
                  Principal: ₱{formatPesos(effectiveAmount)}
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 tabular-nums">
                  {tenure} Mos
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1">
                  Option {upfrontOption}
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 tabular-nums">
                  Monthly: ₱{formatPesos(schedule.monthlyPayment)}
                </span>
                <span className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[#B45309] tabular-nums">
                  Upfront: ₱{formatPesos(schedule.upfrontDue)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Secondary Button: Copy Summary */}
              <Button
                type="button"
                variant="outline"
                onClick={handleCopySummary}
                className="min-h-[44px] h-12 rounded-2xl border-slate-300 bg-white px-5 text-sm sm:text-base font-bold text-[#1E2326] hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#1F6F94] motion-reduce:transition-none motion-reduce:transform-none"
              >
                {copiedSummary ? (
                  <>
                    <Check className="mr-2 h-5 w-5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-5 w-5 text-slate-600 shrink-0" aria-hidden="true" />
                    <span>Copy Summary</span>
                  </>
                )}
              </Button>

              {/* Primary Button: Inquire with This Calculation (Opens Confirmation Modal) */}
              <Button
                type="button"
                onClick={handleOpenInquiryModal}
                className="min-h-[44px] h-12 rounded-2xl bg-[#1F6F94] hover:bg-[#175775] text-white px-6 text-sm sm:text-base font-bold shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F6F94] motion-reduce:transition-none motion-reduce:transform-none"
              >
                <MessageSquare className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Inquire with This Calculation</span>
                <ExternalLink className="ml-1.5 h-4 w-4 opacity-80 shrink-0" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Toast / Notification feedback */}
          {toastMessage && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 animate-in fade-in motion-reduce:animate-none"
            >
              <Check className="h-5 w-5 text-emerald-700 shrink-0" aria-hidden="true" />
              <span>{toastMessage}</span>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-[#66B3D6]/30 bg-[#EBF5FA] p-5 text-[#1E2326] sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1F6F94] text-white">
            <Info className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-[#1E2326]">
            <strong>Plan terms:</strong> Fixed 3% monthly add-on rate calculated on the original amount financed. Payments are due monthly on scheduled dates. Grace period of 3 days applies before a flat ₱300 late fee. Zero hidden processing or origination charges.
          </p>
        </div>
      </div>

      {/* Inquiry Preview Confirmation Modal (Fixes the "Messenger Cliff") */}
      <Dialog open={isInquiryModalOpen} onOpenChange={setIsInquiryModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Confirm Your Inquiry Summary</DialogTitle>
            <DialogDescription>
              Review your calculation summary before proceeding to Facebook Messenger.
            </DialogDescription>
          </DialogHeader>

          {/* Summary Details Grid */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/75 p-4 space-y-2.5 text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Reference Code</span>
              <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-md bg-[#1F6F94]/10 text-[#1F6F94] border border-[#1F6F94]/20">
                {referenceCode}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold text-slate-600">Amount Financed</span>
              <span className="font-bold tabular-nums text-[#1E2326]">₱{formatPesos(effectiveAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold text-slate-600">Financing Term</span>
              <span className="font-bold tabular-nums text-[#1E2326]">{tenure} Months</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold text-slate-600">Plan Selected</span>
              <span className="font-bold text-[#1E2326]">
                Option {upfrontOption} ({upfrontOption === "A" ? "1st Month Advance" : "1-Month Service Fee Upfront"})
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold text-slate-600">Monthly Payment</span>
              <span className="font-black tabular-nums text-[#1F6F94]">₱{formatPesos(schedule.monthlyPayment)} / mo</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 pt-2 border-t border-slate-200/80">
              <span className="font-semibold text-slate-600">Upfront Due</span>
              <span className="font-black tabular-nums text-[#B45309]">₱{formatPesos(schedule.upfrontDue)}</span>
            </div>
          </div>

          {/* Formatted Clipboard Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold text-slate-600">Message Copied to Clipboard:</p>
              <button
                type="button"
                onClick={async () => {
                  await copyToClipboard(inquirySummaryMessage);
                  setCopiedInModal(true);
                  setTimeout(() => setCopiedInModal(false), 2000);
                }}
                className="text-xs font-bold text-[#1F6F94] hover:text-[#175775] inline-flex items-center gap-1 min-h-[32px] px-2 py-1 rounded-md hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] transition-colors"
              >
                {copiedInModal ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                    <span>Copied again!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy again</span>
                  </>
                )}
              </button>
            </div>
            <pre className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed select-all">
              {inquirySummaryMessage}
            </pre>
          </div>

          {/* Explanation Instructions */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-[#1E2326] space-y-1.5">
            <p className="font-bold text-[#1F6F94] flex items-center gap-1.5">
              <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
              Next Steps:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[#175775] pl-1 font-semibold">
              <li>We&apos;ve copied this summary to your clipboard.</li>
              <li>When Messenger opens, paste it into the chat to get immediate assessment.</li>
            </ol>
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsInquiryModalOpen(false)}
              className="min-h-[44px] h-11 rounded-xl border-slate-300 font-bold text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#1F6F94] motion-reduce:transition-none motion-reduce:transform-none"
            >
              Cancel
            </Button>
            <Button
              asChild
              className="min-h-[44px] h-11 rounded-xl bg-[#1F6F94] hover:bg-[#175775] text-white font-bold px-6 shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F6F94] motion-reduce:transition-none motion-reduce:transform-none"
            >
              <a
                href="https://www.facebook.com/hap.installments"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsInquiryModalOpen(false)}
                className="inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Open Facebook Messenger</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80 shrink-0" aria-hidden="true" />
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
