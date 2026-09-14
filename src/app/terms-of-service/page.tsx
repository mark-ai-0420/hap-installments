import type { Metadata } from "next";
import Link from "next/link";
import { LogoLink } from "@/components/LogoLink";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "HAP Installments Terms of Service — understand the terms governing our installment plans for tuition and travel.",
};

export default function TermsOfServicePage() {
    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-[#FAFAFA]">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <LogoLink className="transition-opacity hover:opacity-90" />
                    <Button asChild className="bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-6 py-2.5 min-h-[44px] shadow-sm transition-all duration-300 hover:shadow-md motion-reduce:transition-none motion-reduce:transform-none">
                        <a href="https://www.facebook.com/hap.installments" target="_blank" rel="noopener noreferrer">
                            Inquire on Messenger
                        </a>
                    </Button>
                </div>
            </nav>

            <main className="flex-1">
                <div className="container mx-auto px-6 py-16 md:py-24 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-black text-[#3D454A] tracking-tight mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-slate-500 font-medium mb-6 text-lg">Last updated: February 2026</p>
                    <p className="text-slate-600 leading-relaxed mb-12 text-lg">
                        By using HAP Installments, you agree to the following Terms of Service. Please read them carefully before proceeding.
                    </p>

                    <div className="space-y-10 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">1. Nature of the Service</h2>
                            <p className="mb-3">
                                HAP Installments provides short-term installment-based payment assistance for specific expenses such as tuition fees and travel bookings.
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>HAP Installments is not a bank, financing company, or licensed lending institution.</li>
                                <li>We do not offer cash loans. Payments are made directly to schools or vendors, not to clients.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">2. Eligibility</h2>
                            <p className="mb-3">To use our service, you must:</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Provide accurate and truthful information</li>
                                <li>Agree to fixed monthly payments</li>
                                <li>Review and accept all terms before confirmation</li>
                            </ul>
                            <p className="mt-3">All requests are subject to review and approval.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">3. Installment Terms</h2>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Available tenures: 3 months or 6 months only</li>
                                <li>Monthly add-on interest is disclosed upfront</li>
                                <li>Monthly payments are fixed and known in advance</li>
                                <li>No hidden fees or changing rates apply</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">4. Upfront Requirement</h2>
                            <p className="mb-3">Before any payment is released, clients must pay either:</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>The first monthly installment, or</li>
                                <li>A one-time service fee equivalent to one month</li>
                            </ul>
                            <p className="mt-3">This requirement helps ensure predictable and timely payments.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">5. Payments & Due Dates</h2>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Monthly payments must be made on the agreed due dates</li>
                                <li>A short grace period may apply</li>
                                <li>Late payments may result in a flat late fee as stated in the agreement</li>
                                <li>No compounding or daily interest is charged</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">6. Early Payment</h2>
                            <p>
                                Clients may request early settlement. Any applicable interest adjustment will be explained clearly at the time of request.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">7. Cancellations & Refunds</h2>
                            <p>
                                Once payment has been released to a school or vendor, cancellations and refunds are subject to the third party&apos;s own policies. HAP Installments is not responsible for vendor refund decisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">8. Client Responsibilities</h2>
                            <p className="mb-3">Clients agree to:</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Provide complete and accurate information</li>
                                <li>Pay installments on time</li>
                                <li>Communicate early if payment difficulties arise</li>
                            </ul>
                            <p className="mt-3">Failure to comply may result in account restriction or follow-up.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">9. Limitation of Liability</h2>
                            <p className="mb-3">HAP Installments is not responsible for:</p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>The quality of services provided by schools or vendors</li>
                                <li>Changes in third-party policies</li>
                                <li>Delays beyond our control</li>
                            </ul>
                            <p className="mt-3">Our responsibility is limited to the installment arrangement described in the agreement.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">10. Changes to These Terms</h2>
                            <p>
                                We may update these Terms of Service from time to time. Updated terms will apply to future transactions and will be posted on this page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#3D454A] mb-4">11. Contact Us</h2>
                            <p>
                                For questions regarding these Terms of Service, please contact us through our{" "}
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
