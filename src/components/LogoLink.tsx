"use client";
import Link from "next/link";
import { Logo } from "./Logo";

export function LogoLink({ className = "", logoClassName = "" }: { className?: string, logoClassName?: string }) {
    return (
        <Link
            href="/"
            aria-label="HAP Installments Homepage"
            className={className}
            onClick={() => {
                if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }}
        >
            <Logo className={logoClassName} />
        </Link>
    );
}
