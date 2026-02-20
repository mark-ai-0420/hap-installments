import Link from "next/link";
import { LogoLink } from "@/components/LogoLink";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, Briefcase, GraduationCap, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-[#FAFAFA] selection:bg-[#66B3D6]/20 selection:text-slate-900">
      {/* Navigation - Glassmorphic */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <LogoLink className="transition-opacity hover:opacity-90" />
          <div className="hidden md:flex items-center gap-8">
            <Button asChild variant="ghost" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              <Link href="#how-it-works">How it works</Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              <Link href="#about-us">About Us</Link>
            </Button>
            <Button asChild className="bg-[#3D454A] hover:bg-slate-800 text-white rounded-full px-7 py-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>
          <MobileNav />
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-36 md:pb-48">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          {/* Glowing Orbs */}
          <div className="absolute top-0 right-1/4 -translate-y-24 w-[30rem] h-[30rem] bg-[#66B3D6]/20 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-70"></div>
          <div className="absolute bottom-0 left-1/4 translate-y-1/4 w-[40rem] h-[40rem] bg-blue-100/40 rounded-full blur-[140px] -z-10 mix-blend-multiply opacity-60"></div>

          <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] mb-10 text-sm font-semibold text-slate-600">
              <Sparkles className="w-4 h-4 text-[#66B3D6]" fill="#66B3D6" fillOpacity={0.2} />
              Simple, transparent installment plans
            </div>

            <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter mb-8 leading-[1.05] text-[#3D454A]">
              Tuition & Travel <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66B3D6] to-[#529CBE]">
                Pay Monthly
              </span>
            </h1>

            <p className="text-xl md:text-[1.4rem] text-slate-500 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              Achieve your goals without the upfront burden.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button asChild className="text-lg bg-gradient-to-br from-[#529CBE] to-[#66B3D6] hover:brightness-105 text-white rounded-full px-10 py-7 h-auto font-semibold shadow-[0_8px_30px_rgb(102,179,214,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(102,179,214,0.4)]">
                <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer">
                  Message us to ask
                  <ArrowRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
                </a>
              </Button>
              <Button asChild variant="outline" className="text-lg rounded-full px-10 py-7 h-auto font-semibold text-[#3D454A] border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 bg-white shadow-sm">
                <Link href="#how-it-works">
                  Learn more
                </Link>
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-6 text-sm md:text-base text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#66B3D6]" /> Clear
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#66B3D6]" /> Transparent
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#66B3D6]" /> No hidden fees
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section id="about-us" className="py-24 md:py-32 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-[#3D454A] tracking-tight mb-6">Empowering Your Expenses</h2>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                HAP Installments helps families and individuals manage important expenses like tuition and travel through short-term monthly payment plans. Designed for those who value clear terms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="group relative bg-white rounded-[2rem] p-10 md:p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                  <GraduationCap className="w-48 h-48 text-[#66B3D6]" strokeWidth={1} />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 text-[#66B3D6] rounded-2xl flex items-center justify-center mb-8 shadow-inner ring-1 ring-blue-100">
                  <GraduationCap className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-bold text-[#3D454A] mb-4 tracking-tight">Tuition</h3>
                <p className="text-lg text-slate-500 leading-relaxed relative z-10 font-medium">
                  Focus on education without the immediate financial burden. We handle the direct payments to schools, leaving you worry-free.
                </p>
              </div>

              <div className="group relative bg-white rounded-[2rem] p-10 md:p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                  <Briefcase className="w-48 h-48 text-[#3D454A]" strokeWidth={1} />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 text-[#3D454A] rounded-2xl flex items-center justify-center mb-8 shadow-inner ring-1 ring-slate-100">
                  <Briefcase className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-bold text-[#3D454A] mb-4 tracking-tight">Travel</h3>
                <p className="text-lg text-slate-500 leading-relaxed relative z-10 font-medium">
                  Plan your important trips with predictable monthly payments. We pay the vendors directly while you pack your bags.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-24 md:py-32 bg-[#FAFAFA] border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-black text-center text-[#3D454A] tracking-tight mb-24">Here&apos;s how we keep it simple</h2>

            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              {[
                { title: "Fixed monthly payments", desc: "Know exactly what you owe each month. No surprises, just consistent, manageable payments." },
                { title: "No hidden fees", desc: "We believe in utter transparency. You get exactly what you sign up for with zero hidden costs or gotchas." },
                { title: "We pay directly", desc: "We handle the transaction directly with your school or travel vendor so you never have to play the middleman." }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col relative text-center items-center px-8 py-12 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:border-[#66B3D6]/30 transition-colors duration-300">
                  <div className="absolute -top-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-50">
                    <span className="text-[#66B3D6] font-black text-xl">{i + 1}</span>
                  </div>
                  <CheckCircle2 className="w-14 h-14 text-[#66B3D6] mb-8 stroke-[1.5]" />
                  <h3 className="text-2xl font-bold text-[#3D454A] mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 md:py-40 relative overflow-hidden bg-[#3D454A]">
          <div className="absolute inset-0 bg-[#3D454A] bg-[radial-gradient(#4F5961_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-40"></div>
          <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-[#66B3D6]/20 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-white tracking-tight leading-tight">
              Ready to manage your expenses?
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium leading-relaxed">
              Have questions or want to know if this fits your situation? Send us a message — we&apos;re happy to explain.
            </p>
            <Button asChild className="text-xl bg-[#66B3D6] hover:bg-[#529CBE] hover:brightness-110 text-white border-0 rounded-full px-12 py-8 h-auto font-bold shadow-[0_12px_40px_rgb(102,179,214,0.3)] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2">
              <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <MessageSquare className="mr-3 w-7 h-7" strokeWidth={2} />
                Send us a message
              </a>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E2326] text-slate-400 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 pb-12 border-b border-white/10">
            <LogoLink
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 block"
              logoClassName="scale-90 md:origin-left"
            />
            <div className="flex gap-8 text-sm font-semibold tracking-wide">
              <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
              <Link href="#about-us" className="hover:text-white transition-colors">About Us</Link>
              <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-60 font-medium">
            <p>© {new Date().getFullYear()} HAP Installments. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
