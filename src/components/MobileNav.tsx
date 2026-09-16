"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { LogoLink } from "@/components/LogoLink";

export function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open navigation menu"
                        className="min-h-[44px] min-w-[44px] text-slate-700 hover:text-slate-900 motion-reduce:transition-none"
                    >
                        <Menu className="w-6 h-6" aria-hidden="true" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-white px-0 pt-0">
                    <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
                        <VisuallyHidden.Root>
                            <SheetTitle>Navigation Menu</SheetTitle>
                        </VisuallyHidden.Root>
                        <LogoLink className="transition-opacity hover:opacity-90 motion-reduce:transition-none" />
                    </SheetHeader>
                    <nav className="flex flex-col gap-1 px-4 pt-6">
                        <Link
                            href="#about-us"
                            onClick={() => setOpen(false)}
                            className="flex items-center px-4 py-3 min-h-[44px] rounded-xl text-base font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors motion-reduce:transition-none"
                        >
                            Coverage
                        </Link>
                        <Link
                            href="#how-it-works"
                            onClick={() => setOpen(false)}
                            className="flex items-center px-4 py-3 min-h-[44px] rounded-xl text-base font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors motion-reduce:transition-none"
                        >
                            How it works
                        </Link>
                        <Link
                            href="#sample-computation"
                            onClick={() => setOpen(false)}
                            className="flex items-center px-4 py-3 min-h-[44px] rounded-xl text-base font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors motion-reduce:transition-none"
                        >
                            Calculator
                        </Link>
                        <Link
                            href="#eligibility"
                            onClick={() => setOpen(false)}
                            className="flex items-center px-4 py-3 min-h-[44px] rounded-xl text-base font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors motion-reduce:transition-none"
                        >
                            Eligibility
                        </Link>
                        <Link
                            href="#faq"
                            onClick={() => setOpen(false)}
                            className="flex items-center px-4 py-3 min-h-[44px] rounded-xl text-base font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors motion-reduce:transition-none"
                        >
                            FAQ
                        </Link>
                        <div className="pt-4">
                            <Button
                                asChild
                                className="w-full min-h-[44px] bg-[#1F6F94] hover:bg-[#175775] text-white rounded-full px-7 py-3 shadow-sm transition-all duration-300 hover:shadow-md motion-reduce:transition-none motion-reduce:transform-none"
                            >
                                <a
                                    href="https://www.facebook.com/hap.installments"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpen(false)}
                                >
                                    Inquire on Messenger
                                </a>
                            </Button>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
