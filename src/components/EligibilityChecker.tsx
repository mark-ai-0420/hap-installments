"use client";

import { useState } from "react";
import {
  GraduationCap,
  Award,
  Plane,
  Building2,
  CheckCircle2,
  Clock,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  FileCheck,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpenseOption {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof GraduationCap;
}

const EXPENSE_OPTIONS: ExpenseOption[] = [
  {
    id: "tuition",
    title: "College / University Tuition",
    subtitle: "Semestral tuition, midterm down-payments, and laboratory fees",
    icon: GraduationCap,
  },
  {
    id: "board-review",
    title: "Board Review / Certification",
    subtitle: "Licensure examination review centers and professional training",
    icon: Award,
  },
  {
    id: "flights",
    title: "Flights & Vacation Packages",
    subtitle: "Domestic and international airline tickets and travel packages",
    icon: Plane,
  },
  {
    id: "hotel-tour",
    title: "Hotel & Tour Bookings",
    subtitle: "Resort bookings, group itinerary packages, and registered tours",
    icon: Building2,
  },
];

type BillStatus = "ready" | "waiting";

export function EligibilityChecker() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedExpense, setSelectedExpense] = useState<string | null>(null);
  const [billStatus, setBillStatus] = useState<BillStatus | null>(null);

  const selectedExpenseObj = EXPENSE_OPTIONS.find(
    (opt) => opt.id === selectedExpense
  );

  const handleSelectExpense = (id: string) => {
    setSelectedExpense(id);
  };

  const handleSelectBillStatus = (status: BillStatus) => {
    setBillStatus(status);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedExpense(null);
    setBillStatus(null);
  };

  return (
    <section
      id="eligibility"
      aria-labelledby="eligibility-heading"
      className="py-16 sm:py-24 bg-white border-t border-slate-100"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4 text-xs font-bold uppercase tracking-wider text-[#1F6F94]">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Instant Pre-Qualification</span>
          </div>
          <h2
            id="eligibility-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3D454A] tracking-tight mb-4 text-balance"
          >
            Check Your Eligibility in 15 Seconds
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-balance">
            Answer two quick questions to confirm if your expense is ready for
            direct vendor payment through HAP Installments.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <nav
          aria-label="Eligibility Checker Steps"
          className="mb-8 max-w-xl mx-auto"
        >
          <ol className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600">
            <li className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors motion-reduce:transition-none ${
                  step === 1
                    ? "bg-[#1F6F94] text-white ring-4 ring-[#1F6F94]/15"
                    : step > 1
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {step > 1 ? "✓" : "1"}
              </span>
              <span
                className={step === 1 ? "font-bold text-[#1E2326]" : "text-slate-600"}
              >
                Expense Type
              </span>
            </li>
            <div
              className={`flex-1 h-0.5 mx-3 sm:mx-4 transition-colors motion-reduce:transition-none ${
                step >= 2 ? "bg-emerald-500" : "bg-slate-200"
              }`}
              aria-hidden="true"
            />
            <li className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors motion-reduce:transition-none ${
                  step === 2
                    ? "bg-[#1F6F94] text-white ring-4 ring-[#1F6F94]/15"
                    : step > 2
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {step > 2 ? "✓" : "2"}
              </span>
              <span
                className={step === 2 ? "font-bold text-[#1E2326]" : "text-slate-600"}
              >
                Quotation
              </span>
            </li>
            <div
              className={`flex-1 h-0.5 mx-3 sm:mx-4 transition-colors motion-reduce:transition-none ${
                step === 3 ? "bg-[#1F6F94]" : "bg-slate-200"
              }`}
              aria-hidden="true"
            />
            <li className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors motion-reduce:transition-none ${
                  step === 3
                    ? "bg-[#1F6F94] text-white ring-4 ring-[#1F6F94]/15"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                3
              </span>
              <span
                className={step === 3 ? "font-bold text-[#1E2326]" : "text-slate-600"}
              >
                Result
              </span>
            </li>
          </ol>
        </nav>

        {/* Interactive Card Surface */}
        <div className="rounded-3xl border border-slate-200/90 bg-[#FAFAFA] p-6 sm:p-10 shadow-xs">
          {/* STEP 1 */}
          {step === 1 && (
            <fieldset>
              <legend className="text-xl sm:text-2xl font-bold text-[#3D454A] tracking-tight mb-2">
                What expense do you want to finance?
              </legend>
              <p className="text-sm sm:text-base text-slate-600 mb-6 font-normal">
                Select the category of the upcoming fee or booking.
              </p>

              <div
                role="radiogroup"
                aria-label="Expense type options"
                className="grid sm:grid-cols-2 gap-4 mb-8"
              >
                {EXPENSE_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedExpense === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectExpense(option.id)}
                      className={`flex items-start gap-4 p-5 rounded-2xl border text-left min-h-[56px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                        isSelected
                          ? "bg-white border-[#1F6F94] shadow-sm ring-1 ring-[#1F6F94]"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors motion-reduce:transition-none ${
                          isSelected
                            ? "bg-blue-50 text-[#1F6F94]"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-bold text-[#1E2326]">
                            {option.title}
                          </p>
                          <span
                            className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#1F6F94] bg-[#1F6F94]"
                                : "border-slate-300 bg-white"
                            }`}
                            aria-hidden="true"
                          >
                            {isSelected && (
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                          {option.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  disabled={!selectedExpense}
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-8 py-3 min-h-[48px] font-semibold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 motion-reduce:transition-none"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </fieldset>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <fieldset>
              <legend className="text-xl sm:text-2xl font-bold text-[#3D454A] tracking-tight mb-2">
                Do you have your bill or quotation?
              </legend>
              <p className="text-sm sm:text-base text-slate-600 mb-6 font-normal">
                HAP Installments remits disbursements directly to schools and
                registered agencies based on an official statement.
              </p>

              <div
                role="radiogroup"
                aria-label="Billing document status"
                className="space-y-4 mb-8"
              >
                {/* Option Ready */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={billStatus === "ready"}
                  onClick={() => handleSelectBillStatus("ready")}
                  className={`w-full flex items-start gap-4 p-5 rounded-2xl border text-left min-h-[56px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                    billStatus === "ready"
                      ? "bg-white border-[#1F6F94] shadow-sm ring-1 ring-[#1F6F94]"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors motion-reduce:transition-none ${
                      billStatus === "ready"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold text-[#1E2326]">
                        Yes, I have an assessment / quotation ready
                      </p>
                      <span
                        className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                          billStatus === "ready"
                            ? "border-[#1F6F94] bg-[#1F6F94]"
                            : "border-slate-300 bg-white"
                        }`}
                        aria-hidden="true"
                      >
                        {billStatus === "ready" && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      I have an official tuition assessment form, billing
                      invoice, or formal travel reservation quotation showing the
                      total payable.
                    </p>
                  </div>
                </button>

                {/* Option Waiting */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={billStatus === "waiting"}
                  onClick={() => handleSelectBillStatus("waiting")}
                  className={`w-full flex items-start gap-4 p-5 rounded-2xl border text-left min-h-[56px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F94] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                    billStatus === "waiting"
                      ? "bg-white border-amber-500 shadow-sm ring-1 ring-amber-500"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors motion-reduce:transition-none ${
                      billStatus === "waiting"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold text-[#1E2326]">
                        Still waiting for my bill / quotation
                      </p>
                      <span
                        className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                          billStatus === "waiting"
                            ? "border-amber-600 bg-amber-600"
                            : "border-slate-300 bg-white"
                        }`}
                        aria-hidden="true"
                      >
                        {billStatus === "waiting" && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      I am waiting for my school registrar to release the
                      assessment or for the travel agency to send the final
                      itinerary quotation.
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto rounded-full px-6 py-3 min-h-[48px] font-semibold text-[#3D454A] border-slate-300 hover:bg-white transition-all motion-reduce:transition-none"
                >
                  Back to Step 1
                </Button>
                <Button
                  type="button"
                  disabled={!billStatus}
                  onClick={() => setStep(3)}
                  className="w-full sm:w-auto bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-8 py-3 min-h-[48px] font-semibold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 motion-reduce:transition-none"
                >
                  <span>See Eligibility Result</span>
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </fieldset>
          )}

          {/* STEP 3 (RESULT) */}
          {step === 3 && (
            <div>
              {billStatus === "ready" ? (
                /* READY OUTCOME */
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      Ready for Review
                    </span>
                    {selectedExpenseObj && (
                      <span className="text-xs font-semibold text-slate-600">
                        {selectedExpenseObj.title}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1E2326] tracking-tight mb-3">
                      You&apos;re Pre-Qualified to Inquire!
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed font-normal">
                      Great news! Having your official quotation or billing
                      statement means we can generate your exact 3 or 6-month
                      repayment schedule immediately upon messaging our team.
                    </p>
                  </div>

                  {/* Checklist */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-4">
                      Simple Requirements Checklist
                    </h4>
                    <ul
                      role="list"
                      className="space-y-3.5 text-sm sm:text-base text-slate-700"
                    >
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-bold text-[#1E2326]">
                            1 Government Valid ID
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600">
                            Passport, UMID, Driver&apos;s License, PhilID, Postal
                            ID, or equivalent primary ID.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                          <FileCheck className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-bold text-[#1E2326]">
                            Official Assessment or Quotation
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600">
                            Clear photo or PDF copy of your tuition billing from
                            the registrar or reservation quote from your travel
                            agency.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <Button
                      asChild
                      className="w-full sm:w-auto bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-8 py-3.5 min-h-[48px] font-bold shadow-sm transition-all duration-300 hover:shadow-md motion-reduce:transition-none"
                    >
                      <a
                        href="https://www.facebook.com/hap.installments"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <span>Proceed to Messenger Assessment</span>
                        <ExternalLink
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="w-full sm:w-auto rounded-full px-6 py-3 min-h-[48px] font-semibold text-slate-700 border-slate-300 hover:bg-white transition-colors motion-reduce:transition-none"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Check Another Expense</span>
                    </Button>
                  </div>
                </div>
              ) : (
                /* WAITING OUTCOME */
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      Document Needed
                    </span>
                    {selectedExpenseObj && (
                      <span className="text-xs font-semibold text-slate-600">
                        {selectedExpenseObj.title}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1E2326] tracking-tight mb-3">
                      You&apos;ll Need a Billing Statement First
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed font-normal">
                      HAP Installments does not issue unrestricted cash loans.
                      Instead, we remit payment directly to your school registrar
                      or travel provider. Because of this, an official assessment
                      or formal quotation is required before we can disburse
                      funds.
                    </p>
                  </div>

                  {/* Guidance Box */}
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900 mb-3">
                      What to do next:
                    </h4>
                    <ol className="space-y-3 text-sm sm:text-base text-slate-700 list-decimal list-inside">
                      <li className="font-medium">
                        <strong className="text-slate-900">
                          Request an Assessment Form:
                        </strong>{" "}
                        Visit your school registrar or student portal to download
                        your official semestral fee breakdown, or request a
                        written quotation from your travel agency or airline.
                      </li>
                      <li className="font-medium">
                        <strong className="text-slate-900">
                          Verify Payee Details:
                        </strong>{" "}
                        Ensure the statement shows the exact school/agency bank
                        account or merchant payment instructions.
                      </li>
                      <li className="font-medium">
                        <strong className="text-slate-900">
                          Message Us on Messenger:
                        </strong>{" "}
                        Send us the document once received, and we will process
                        your installment plan within 24 hours.
                      </li>
                    </ol>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <Button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-8 py-3.5 min-h-[48px] font-bold shadow-sm transition-all duration-300 hover:shadow-md motion-reduce:transition-none"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Reset Checker</span>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto rounded-full px-6 py-3 min-h-[48px] font-semibold text-slate-700 border-slate-300 hover:bg-white transition-colors motion-reduce:transition-none"
                    >
                      <a
                        href="https://www.facebook.com/hap.installments"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <span>Have questions? Ask on Messenger</span>
                        <ExternalLink
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
