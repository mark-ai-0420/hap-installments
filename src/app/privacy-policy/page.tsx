import type { Metadata } from "next";
import Link from "next/link";
import { LogoLink } from "@/components/LogoLink";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "HAP Installments Privacy Policy — how we collect, use, and protect your personal information in the Philippines.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-[#FAFAFA]">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <LogoLink className="transition-opacity hover:opacity-90" />
                    <Button asChild className="bg-[#3D454A] hover:bg-slate-800 text-white rounded-full px-7 py-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer">
                            Get Started
                        </a>
                    </Button>
                </div>
            </nav>

            <main className="flex-1">
                <div className="container mx-auto px-6 py-16 md:py-24 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-black text-[#3D454A] tracking-tight mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500 font-medium mb-12 text-lg">Last updated: February 2026</p>

                    <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">
                        <p className="text-lg">
                            HAP Installments (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information in the Philippines.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">1. Information We Collect</h2>
                            <p className="mb-3">We collect only information necessary to evaluate and process installment requests, including:</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Full name</li>
                                <li>Contact details (mobile number, email, Facebook account)</li>
                                <li>Basic identification information</li>
                                <li>Expense details (tuition, travel, or similar)</li>
                                <li>Payment-related information voluntarily provided</li>
                            </ul>
                            <p className="mt-3">We do not collect unnecessary or excessive personal data.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">2. How We Use Your Information</h2>
                            <p className="mb-3">Your information is used strictly to:</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Review and process installment requests</li>
                                <li>Communicate with you regarding your application</li>
                                <li>Prepare agreements and payment schedules</li>
                                <li>Release payments directly to schools or vendors</li>
                                <li>Maintain basic business records</li>
                            </ul>
                            <p className="mt-3">We do not sell, trade, or rent your personal information.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">3. Sharing of Information</h2>
                            <p className="mb-3">We may share limited information only when required to:</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Complete payments with schools or vendors</li>
                                <li>Comply with applicable Philippine laws or lawful requests</li>
                            </ul>
                            <p className="mt-3">We do not share your information with third parties for marketing purposes.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">4. Data Protection</h2>
                            <p>
                                We take reasonable measures to protect your personal information against unauthorized access, misuse, or disclosure. Access is limited to what is necessary for business operations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">5. Data Retention</h2>
                            <p>
                                Personal information is retained only for as long as needed to complete transactions, manage records, or comply with basic legal and operational requirements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">6. Your Rights</h2>
                            <p className="mb-3">You may request to:</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Review your personal information</li>
                                <li>Correct inaccurate or outdated details</li>
                                <li>Ask questions about how your data is handled</li>
                            </ul>
                            <p className="mt-3">Requests may be made by contacting us through our official Facebook Page.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">7. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">8. Contact Us</h2>
                            <p>
                                For privacy-related questions or concerns, please contact us via our{" "}
                                <a
                                    href="https://www.facebook.com/hap.installments"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#66B3D6] hover:underline font-semibold"
                                >
                                    official Facebook Page
                                </a>
                                .
                            </p>
                        </section>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200">
                        <Link href="/" className="text-[#66B3D6] hover:underline font-semibold text-sm">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="bg-[#1E2326] text-slate-400 py-10">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-60 font-medium">
                    <p>© {new Date().getFullYear()} HAP Installments. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
