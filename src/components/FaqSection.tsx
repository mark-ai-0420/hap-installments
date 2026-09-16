"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you release cash directly to clients?",
    answer:
      "No. HAP Installments is strictly a direct vendor payment service. We remit payments directly to your accredited school registrar, college cashier, or registered travel agency. We do not offer cash loans.",
  },
  {
    question: "What are the requirements to apply?",
    answer:
      "The requirements are simple: (1) One valid government-issued ID, and (2) An official school assessment form / Statement of Account or official travel booking quotation. No credit card required.",
  },
  {
    question: "How fast is the verification and approval process?",
    answer:
      "Evaluation typically takes 24 to 48 hours once complete and clear documents are submitted via Facebook Messenger.",
  },
  {
    question: "What repayment methods do you accept?",
    answer:
      "We accept payments through GCash, Maya, online bank transfers (BDO, BPI, UnionBank, and any InstaPay-enabled bank), and over-the-counter channels.",
  },
  {
    question: "Can I pay off my balance early?",
    answer:
      "Yes. You can settle your remaining balance early at any time with zero pre-termination penalties.",
  },
  {
    question: "Can I finance tuition or travel from any school or agency?",
    answer:
      "Yes, provided the university, college, review center, airline, or travel agency can issue an official assessment or quotation and accept direct bank or merchant payment.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 md:py-32 bg-[#FAFAFA] border-b border-slate-200/60 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FB] border border-[#66B3D6]/30 text-xs font-bold uppercase tracking-wider text-[#1F6F94] mb-4">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E2326] tracking-tight mb-4 text-balance"
          >
            Clear answers to common questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal text-balance max-w-2xl mx-auto">
            Everything you need to know about our direct disbursement model, document requirements, and installment policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" role="presentation">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-200 motion-reduce:transition-none ${
                  isOpen
                    ? "bg-white border-[#1F6F94]/40 shadow-xs ring-1 ring-[#1F6F94]/15"
                    : "bg-white border-slate-200/90 shadow-2xs hover:border-slate-300"
                }`}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 rounded-2xl sm:rounded-3xl group focus-visible:outline-2 focus-visible:outline-[#1F6F94] focus-visible:outline-offset-2 min-h-[48px]"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#1E2326] group-hover:text-[#1F6F94] transition-colors motion-reduce:transition-none">
                      {item.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 motion-reduce:transition-none motion-reduce:transform-none ${
                        isOpen
                          ? "bg-[#1F6F94] text-white rotate-180"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/80"
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 md:px-7 pb-6 sm:pb-7 pt-1 border-t border-slate-100 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supplementary Support Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold text-[#1E2326] mb-1">
              Have a specific question about your assessment?
            </h4>
            <p className="text-sm text-slate-600 font-normal">
              Our team reviews documents and provides custom repayment schedules directly on Messenger.
            </p>
          </div>
          <Button
            asChild
            className="flex-shrink-0 bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-6 py-2.5 min-h-[44px] font-semibold shadow-xs transition-all duration-300 hover:shadow-md motion-reduce:transition-none motion-reduce:transform-none"
          >
            <a
              href="https://www.facebook.com/hap.installments"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Ask on Messenger</span>
              <ArrowRight className="w-4 h-4 ml-0.5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
