import Link from "next/link";
import { ArrowLeft, Home, Calculator, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/LogoLink";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <LogoLink className="transition-opacity hover:opacity-90 motion-reduce:transition-none" />
          <Link
            href="/"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#1F6F94] transition-colors motion-reduce:transition-none"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-20 my-auto text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-[#1F6F94] mb-6">
          <span>Error 404 • Page Not Found</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-[#3D454A] tracking-tight mb-4">
          Looking for an installment calculation?
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 text-balance">
          The link you followed may be broken or the page may have moved. You can return to our homepage, calculate your monthly plans, or talk directly with our team on Messenger.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-[#1F6F94] hover:bg-[#175775] text-white font-bold rounded-xl shadow-xs transition-colors">
            <Link href="/" className="inline-flex items-center justify-center gap-2">
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Return to Home</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto min-h-[48px] px-6 py-3 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-xl transition-colors">
            <Link href="/#sample-computation" className="inline-flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" aria-hidden="true" />
              <span>Try Calculator</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto min-h-[48px] px-6 py-3 border-blue-200 text-[#1F6F94] bg-blue-50/50 hover:bg-blue-50 font-semibold rounded-xl transition-colors">
            <a
              href="https://www.facebook.com/hap.installments"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Ask on Messenger</span>
            </a>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} HAP Installments. Simple, transparent installments for tuition and travel.</p>
      </footer>
    </div>
  );
}
