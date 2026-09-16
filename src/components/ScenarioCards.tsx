import { GraduationCap, Award, Plane, CheckCircle2 } from "lucide-react";

interface Scenario {
  id: string;
  tag: string;
  title: string;
  billAmount: string;
  term: string;
  monthlyPayment: string;
  highlight: string;
  icon: typeof GraduationCap;
  categoryTone: "academic" | "certification" | "travel";
}

const SCENARIOS: Scenario[] = [
  {
    id: "university-tuition",
    tag: "Academic • College Sophomore",
    title: "University Midterm Down-Payment",
    billAmount: "₱32,000",
    term: "6 Months (Option A)",
    monthlyPayment: "₱6,294",
    highlight: "Direct university registrar payment prevented enrollment hold.",
    icon: GraduationCap,
    categoryTone: "academic",
  },
  {
    id: "nursing-board",
    tag: "Certification • Reviewee",
    title: "Nursing Board Exam Review",
    billAmount: "₱16,000",
    term: "3 Months (Option B)",
    monthlyPayment: "₱5,814",
    highlight: "Zero cash loan risk; paid review center directly.",
    icon: Award,
    categoryTone: "certification",
  },
  {
    id: "family-flights",
    tag: "Travel • Family of 4",
    title: "Family Holiday Flights",
    billAmount: "₱24,000",
    term: "6 Months (Option A)",
    monthlyPayment: "₱4,720",
    highlight: "Locked in airline promo fare without depleting emergency fund.",
    icon: Plane,
    categoryTone: "travel",
  },
];

export function ScenarioCards() {
  return (
    <section
      id="real-world-scenarios"
      aria-labelledby="scenarios-heading"
      className="py-20 md:py-32 bg-[#FAFAFA] border-t border-slate-100"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs mb-4 text-xs font-bold uppercase tracking-wider text-[#1F6F94]">
            <span>Verified Customer Cases</span>
          </div>
          <h2
            id="scenarios-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3D454A] tracking-tight mb-4 text-balance"
          >
            How Others Use HAP Installments
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal text-balance">
            Real expenses settled directly with schools, review centers, and
            travel providers. No predatory cash disbursements—just fixed,
            predictable installments.
          </p>
        </div>

        {/* Tactile Scenario Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SCENARIOS.map((scenario) => {
            const Icon = scenario.icon;

            return (
              <article
                key={scenario.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#1F6F94]/40 motion-reduce:transition-none motion-reduce:transform-none hover:motion-reduce:translate-y-0 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center text-xs font-bold tracking-tight px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                      {scenario.tag}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1F6F94]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#3D454A] tracking-tight mb-6">
                    {scenario.title}
                  </h3>

                  {/* Financial Breakdown Table */}
                  <div className="rounded-2xl bg-[#FAFAFA] border border-slate-200/70 p-4 mb-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 font-medium">
                        Bill Amount
                      </span>
                      <span className="font-bold text-[#1E2326] tabular-nums">
                        {scenario.billAmount}
                      </span>
                    </div>
                    <div className="h-px bg-slate-200/60" aria-hidden="true" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 font-medium">
                        Repayment Term
                      </span>
                      <span className="font-bold text-[#1E2326] tabular-nums">
                        {scenario.term}
                      </span>
                    </div>
                  </div>

                  {/* Monthly Payment Well */}
                  <div className="rounded-2xl border border-blue-100 bg-[#F0F7FB] p-5 text-center mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1F6F94] mb-1">
                      Monthly Payment
                    </p>
                    <p className="text-3xl sm:text-4xl font-black text-[#1E2326] tracking-tight tabular-nums">
                      {scenario.monthlyPayment}{" "}
                      <span className="text-sm sm:text-base font-semibold text-slate-600">
                        / mo
                      </span>
                    </p>
                  </div>
                </div>

                {/* Highlight Callout */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#1F6F94] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                      {scenario.highlight}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Direct Remittance Reassurance Banner */}
        <div className="mt-12 rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            <strong className="text-slate-900">Direct Vendor Settlement:</strong>{" "}
            All payments are remitted directly to registered universities,
            review centers, or travel providers upon agreement.
          </p>
        </div>
      </div>
    </section>
  );
}
