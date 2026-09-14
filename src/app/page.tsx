import Link from "next/link";
import { LogoLink } from "@/components/LogoLink";
import { MobileNav } from "@/components/MobileNav";
import { SampleInstallmentCalculator } from "@/components/SampleInstallmentCalculator";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, Briefcase, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-[#FAFAFA] selection:bg-[#1F6F94]/20 selection:text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-md transition-all duration-300 motion-reduce:transition-none">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <LogoLink className="transition-opacity hover:opacity-90 motion-reduce:transition-none" />
          <div className="hidden md:flex items-center gap-8">
            <Button asChild variant="ghost" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors motion-reduce:transition-none">
              <Link href="#how-it-works">How it works</Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors motion-reduce:transition-none">
              <Link href="#about-us">About Us</Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors motion-reduce:transition-none">
              <Link href="#sample-computation">Sample Computation</Link>
            </Button>
            <Button asChild className="bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-6 py-2.5 min-h-[44px] shadow-sm transition-all duration-300 hover:shadow-md motion-reduce:transition-none motion-reduce:transform-none">
              <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer">
                Inquire on Messenger
              </a>
            </Button>
          </div>
          <MobileNav />
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40 bg-[#FAFAFA] bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(31,111,148,0.08),rgba(250,250,250,0))] border-b border-slate-200/50">
          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-5xl">
            {/* Credible Status Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs mb-8 text-sm font-medium text-slate-700 motion-reduce:transition-none">
              <ShieldCheck className="w-4 h-4 text-[#1F6F94]" aria-hidden="true" />
              <span>Direct Vendor Payment Assistance • Fast Messenger Assessment</span>
            </div>

            {/* Responsive Fluid Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-black tracking-tight mb-8 leading-[1.08] text-[#3D454A] break-words">
              Tuition &amp; Travel <br className="hidden sm:block" />
              <span className="text-[#1F6F94]">Pay Monthly</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-[1.35rem] text-slate-600 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Split tuition and travel expenses into predictable monthly installments. We settle directly with schools and travel providers on your behalf.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <Button asChild className="w-full sm:w-auto text-base sm:text-lg bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-8 sm:px-10 py-6 sm:py-7 h-auto font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:transform-none">
                <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Inquire via Messenger
                  <ArrowRight className="ml-2 w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto text-base sm:text-lg rounded-full px-8 sm:px-10 py-6 sm:py-7 h-auto font-semibold text-[#3D454A] border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:motion-reduce:translate-y-0 bg-white shadow-xs motion-reduce:transition-none motion-reduce:transform-none">
                <Link href="#how-it-works">
                  How it works
                </Link>
              </Button>
            </div>

            {/* Semantic Value Props List */}
            <ul role="list" className="mt-14 sm:mt-16 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-sm sm:text-base text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1F6F94]" aria-hidden="true" />
                <span>Clear fixed terms</span>
              </li>
              <li className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" aria-hidden="true"></li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1F6F94]" aria-hidden="true" />
                <span>Transparent 3% monthly rate</span>
              </li>
              <li className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" aria-hidden="true"></li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1F6F94]" aria-hidden="true" />
                <span>Zero hidden charges</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Introduction Section */}
        <section id="about-us" className="py-20 md:py-32 bg-white relative border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3D454A] tracking-tight mb-4 text-balance">Tuition &amp; Travel Financing</h2>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal text-balance">
                We remit payments directly to accredited institutions and travel providers, so you can manage major bills without the upfront lump sum.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:transform-none flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50 text-[#1F6F94] rounded-2xl flex items-center justify-center ring-1 ring-blue-100" aria-hidden="true">
                      <GraduationCap className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700">Academic</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#3D454A] mb-3 tracking-tight">Tuition &amp; School Fees</h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
                    We remit directly to universities and colleges nationwide so students stay enrolled without a lump-sum cash burden.
                  </p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F6F94] shrink-0" aria-hidden="true" />
                    <span><strong>Disbursement:</strong> Directly to your school registrar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F6F94] shrink-0" aria-hidden="true" />
                    <span><strong>Requirement:</strong> School assessment form + 1 Valid ID</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F6F94] shrink-0" aria-hidden="true" />
                    <span><strong>Repayment:</strong> Fixed 3 or 6-month monthly schedule</span>
                  </li>
                </ul>
              </div>

              <div className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:transform-none flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-100 text-[#3D454A] rounded-2xl flex items-center justify-center ring-1 ring-slate-200" aria-hidden="true">
                      <Briefcase className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700">Travel &amp; Flights</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#3D454A] mb-3 tracking-tight">Travel &amp; Flight Bookings</h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
                    Lock in flights, tour packages, and hotel reservations through accredited agencies without depleting your monthly cash flow.
                  </p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F6F94] shrink-0" aria-hidden="true" />
                    <span><strong>Disbursement:</strong> Remitted directly to airlines or agencies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F6F94] shrink-0" aria-hidden="true" />
                    <span><strong>Requirement:</strong> Official booking quotation + 1 Valid ID</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1F6F94] shrink-0" aria-hidden="true" />
                    <span><strong>Repayment:</strong> Fixed 3 or 6-month monthly schedule</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <SampleInstallmentCalculator />

        {/* Features Section */}
        <section id="how-it-works" className="py-20 md:py-32 bg-[#FAFAFA] border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3D454A] tracking-tight text-balance">How It Works</h2>
            </div>

            <ol className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  phase: "Submit",
                  title: "Send Your Assessment",
                  desc: "Send your tuition assessment form or travel quotation on Messenger. We review and verify the payable total."
                },
                {
                  step: "02",
                  phase: "Choose",
                  title: "Select Your Plan",
                  desc: "Pick 3 or 6 months with Option A or B. Receive your exact repayment calendar before confirming."
                },
                {
                  step: "03",
                  phase: "Disburse",
                  title: "Direct Disbursement",
                  desc: "We remit the payment directly to your school or travel vendor. You repay in fixed monthly installments."
                }
              ].map((feature, i) => (
                <li key={i} className="flex flex-col relative text-left p-8 bg-white rounded-3xl shadow-xs border border-slate-200/90 hover:border-[#1F6F94]/40 transition-colors duration-300 motion-reduce:transition-none motion-reduce:transform-none">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#1F6F94] border border-blue-100">
                      Step {feature.step}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{feature.phase}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#3D454A] mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-normal text-sm sm:text-base">{feature.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-36 relative overflow-hidden bg-[#3D454A] border-t border-slate-700/40">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl relative z-10">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 mb-8 text-xs font-medium text-slate-200">
              <span>Fast Response • Direct Messenger Consultation</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white tracking-tight leading-tight">
              Ready to split your upcoming expense?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-10 font-medium leading-relaxed">
              Send us your tuition assessment form or travel quotation on Facebook Messenger for an immediate calculation.
            </p>
            <Button asChild className="text-lg sm:text-xl bg-[#1F6F94] hover:bg-[#175775] text-white border-0 rounded-full px-10 sm:px-12 py-6 sm:py-7 min-h-[48px] font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:transform-none">
              <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <MessageSquare className="mr-3 w-6 h-6" strokeWidth={2} aria-hidden="true" />
                Inquire on Facebook Messenger
              </a>
            </Button>
            <p className="mt-6 text-xs text-slate-400 font-medium">No hidden application fees • We remit directly to schools and registered travel agencies</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E2326] text-slate-300 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 pb-12 border-b border-white/10">
            <LogoLink
              className="opacity-90 hover:opacity-100 transition-opacity duration-300 block motion-reduce:transition-none"
              logoClassName="scale-90 md:origin-left"
            />
            <div className="flex gap-8 text-sm font-semibold tracking-wide">
              <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors motion-reduce:transition-none">How it works</Link>
              <Link href="#about-us" className="text-slate-300 hover:text-white transition-colors motion-reduce:transition-none">About Us</Link>
              <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors motion-reduce:transition-none">Contact</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400 font-medium">
            <p>© {new Date().getFullYear()} HAP Installments. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors motion-reduce:transition-none">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors motion-reduce:transition-none">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
