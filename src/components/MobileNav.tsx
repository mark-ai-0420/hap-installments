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
                        className="text-slate-600 hover:text-slate-900"
                    >
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-white px-0 pt-0">
                    <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
                        <VisuallyHidden.Root>
                            <SheetTitle>Navigation Menu</SheetTitle>
                        </VisuallyHidden.Root>
                        <LogoLink className="transition-opacity hover:opacity-90" />
                    </SheetHeader>
                    <nav className="flex flex-col gap-1 px-4 pt-6">
                        <Link
                            href="#how-it-works"
                            onClick={() => setOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                        >
                            How it works
                        </Link>
                        <Link
                            href="#about-us"
                            onClick={() => setOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                        >
                            About Us
                        </Link>
                        <div className="pt-4">
                            <Button
                                asChild
                                className="w-full bg-[#3D454A] hover:bg-slate-800 text-white rounded-full px-7 py-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <a
                                    href="https://www.facebook.com/hap.installments"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setOpen(false)}
                                >
                                    Get Started
                                </a>
                            </Button>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
