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
      className={`rounded-3xl border bg-white p-6 shadow-[0_18px_60px_rgb(15,23,42,0.05)] ${
        isOrange
          ? "border-amber-200 bg-amber-50/50"
          : "border-[#66B3D6]/25"
      }`}
    >
      <div
        className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${
          isOrange
            ? "bg-gradient-to-br from-amber-500 to-orange-400 shadow-amber-200"
            : "bg-gradient-to-br from-[#529CBE] to-[#66B3D6] shadow-blue-100"
        }`}
      >
        <Icon className="h-8 w-8" strokeWidth={1.8} />
      </div>
      <p className="text-base font-semibold text-slate-500">{label}</p>
      <p
        className={`mt-3 text-4xl font-black tracking-tight md:text-5xl ${
          isOrange ? "text-amber-600" : "text-[#3D454A]"
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
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#66B3D6]/30 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#66B3D6]">
            Sample computation
          </p>
          <h2 className="text-4xl font-black tracking-tight text-[#3D454A] md:text-5xl">
            Preview a simple payment plan
          </h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-slate-500">
            Adjust the sample amount and see how the monthly schedule changes
            before sending us a message.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-[#FAFAFA] p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#3D454A] text-white">
                  <WalletCards className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="amount-financed"
                    className="text-sm font-bold text-slate-500"
                  >
                    Amount Financed (PHP)
                  </label>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      aria-label="Decrease amount"
                      disabled={!canDecrease}
                      onClick={() =>
                        setAmount((value) =>
                          Math.max(MIN_AMOUNT, value - AMOUNT_STEP),
                        )
                      }
                      className="rounded-full border-slate-200 bg-white"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      id="amount-financed"
                      type="number"
                      min={MIN_AMOUNT}
                      max={MAX_AMOUNT}
                      step="any"
                      value={amount}
                      onChange={(event) => {
                        const nextAmount = Number(event.target.value);
                        if (!Number.isNaN(nextAmount)) {
                          setAmount(
                            Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, nextAmount)),
                          );
                        }
                      }}
                      className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-2xl font-black text-[#3D454A] outline-none transition focus:border-[#66B3D6] focus:ring-4 focus:ring-[#66B3D6]/15"
                    />
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      aria-label="Increase amount"
                      disabled={!canIncrease}
                      onClick={() =>
                        setAmount((value) =>
                          Math.min(MAX_AMOUNT, value + AMOUNT_STEP),
                        )
                      }
                      className="rounded-full border-slate-200 bg-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#FAFAFA] p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#66B3D6] text-white">
                  <CalendarDays className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-500">Tenure</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[3, 6].map((months) => (
                      <Button
                        key={months}
                        type="button"
                        variant={tenure === months ? "default" : "outline"}
                        onClick={() => setTenure(months)}
                        className={`h-12 rounded-2xl text-base font-bold ${
                          tenure === months
                            ? "bg-[#3D454A] text-white hover:bg-slate-700"
                            : "border-slate-200 bg-white text-[#3D454A]"
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
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#66B3D6] text-white">
                    <HandCoins className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <p className="text-sm font-bold text-slate-500">
                    Upfront Option
                  </p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-2">
                  {(["A", "B"] as const).map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant={upfrontOption === option ? "default" : "outline"}
                      onClick={() => setUpfrontOption(option)}
                      className={`h-12 rounded-2xl text-base font-bold ${
                        upfrontOption === option
                          ? "bg-[#66B3D6] text-white hover:bg-[#529CBE]"
                          : "border-slate-200 bg-white text-[#3D454A]"
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
                  ? "Upfront (Option A)"
                  : "Service Fee (Option B)"
              }
              value={currency.format(schedule.upfrontDue)}
              tone="orange"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_70px_rgb(15,23,42,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-[#3D454A] text-white">
                  {["Month", "Due Date", "Principal", "Monthly Payment"].map(
                    (heading) => (
                      <th
                        key={heading}
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
                    <td className="px-6 py-5 text-center text-lg font-black text-[#3D454A]">
                      Month {row.month}
                      {row.isUpfront && (
                        <span className="ml-2 text-sm font-bold text-amber-500">
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
                        row.isUpfront ? "text-amber-500" : "text-[#529CBE]"
                      }`}
                    >
                      {currency.format(row.payment)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#FAFAFA]">
                  <td className="px-6 py-5 text-center text-xl font-black text-[#3D454A]">
                    Total
                  </td>
                  <td className="px-6 py-5" />
                  <td className="px-6 py-5 text-center text-xl font-black text-[#3D454A]">
                    {currency.format(amount)}
                  </td>
                  <td className="px-6 py-5 text-center text-xl font-black text-[#529CBE]">
                    {currency.format(schedule.totalRepayment)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-[#66B3D6]/25 bg-[#66B3D6]/10 p-5 text-[#3D454A] sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#66B3D6] text-white">
            <Info className="h-7 w-7" />
          </div>
          <p className="text-base font-semibold leading-relaxed">
            Add-on rate is applied to the original principal. Late payment fee:
            PHP 300 flat fee after a 3-day grace period. Default monthly add-on
            rate: 3%.
          </p>
        </div>
      </div>
    </section>
  );
}
