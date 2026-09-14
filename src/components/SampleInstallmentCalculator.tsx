"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck2,
  CalendarDays,
  Calculator,
  HandCoins,
  Info,
  Minus,
  Plus,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const START_DUE_DATE = new Date(2026, 5, 21);
const MONTHLY_ADD_ON_RATE = 0.03;
const MIN_AMOUNT = 0;
const MAX_AMOUNT = 100000;
const AMOUNT_STEP = 1000;

function addMonths(date: Date, months: number) {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);
  return nextDate;
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
          isOrange ? "text-amber-700" : "text-[#1E2326]"
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

  const schedule = useMemo(() => {
    const addOnRate = MONTHLY_ADD_ON_RATE * tenure;
    const totalRepayment = Math.round(amount * (1 + addOnRate));
    const monthlyPayment = Math.ceil(totalRepayment / tenure);
    const monthlyPrincipal = Math.round(amount / tenure);
    const oneMonthInterest = Math.round(amount * MONTHLY_ADD_ON_RATE);
    const upfrontDue = upfrontOption === "A" ? monthlyPayment : oneMonthInterest;

    return {
      totalRepayment,
      monthlyPayment,
      monthlyPrincipal,
      upfrontDue,
      rows: Array.from({ length: tenure }, (_, index) => ({
        month: index + 1,
        dueDate: dueDateFormatter.format(addMonths(START_DUE_DATE, index)),
        principal: monthlyPrincipal,
        payment: monthlyPayment,
        isUpfront: upfrontOption === "A" && index === 0,
      })),
    };
  }, [amount, tenure, upfrontOption]);

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
                    value={amount}
                    onChange={(event) => {
                      const nextAmount = Number(event.target.value);
                      if (!Number.isNaN(nextAmount)) {
                        setAmount(
                          Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, nextAmount)),
                        );
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
              </div>

              {/* Quick Amount Presets */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-500 mr-1">Presets:</span>
                {[10000, 20000, 35000, 50000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors motion-reduce:transition-none ${
                      amount === preset
                        ? "bg-[#1F6F94] text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    ₱{(preset / 1000).toFixed(0)}k
                  </button>
                ))}
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
                        className={`h-12 rounded-2xl text-base font-bold motion-reduce:transition-none motion-reduce:transform-none ${
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
                    <p className="text-xs text-slate-500 font-normal">
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
                      className={`h-12 rounded-2xl text-base font-bold motion-reduce:transition-none motion-reduce:transform-none ${
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
                    <td className="px-6 py-5 text-center text-lg font-semibold text-slate-700">
                      {currency.format(row.principal)}
                    </td>
                    <td
                      className={`px-6 py-5 text-center text-xl font-black ${
                        row.isUpfront ? "text-amber-700" : "text-[#1F6F94]"
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
                  <td className="px-6 py-5" />
                  <td className="px-6 py-5 text-center text-xl font-black text-[#1E2326]">
                    {currency.format(amount)}
                  </td>
                  <td className="px-6 py-5 text-center text-xl font-black text-[#1F6F94]">
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
                    <p className="text-xs font-semibold text-slate-500">Principal</p>
                    <p className="mt-0.5 font-bold text-slate-700">
                      {currency.format(row.principal)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-500">Monthly Payment</p>
                    <p
                      className={`mt-0.5 text-base font-black ${
                        row.isUpfront ? "text-amber-700" : "text-[#1F6F94]"
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
                  <p className="mt-0.5 text-lg font-black text-[#1E2326]">
                    {currency.format(amount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Total Repayment
                  </p>
                  <p className="mt-0.5 text-xl font-black text-[#1F6F94]">
                    {currency.format(schedule.totalRepayment)}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
    </section>
  );
}

