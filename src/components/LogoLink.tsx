"use client";
import Link from "next/link";
import { Logo } from "./Logo";

export function LogoLink({
    className = "",
    logoClassName = "",
    variant = "default",
    ariaLabel
}: {
    className?: string;
    logoClassName?: string;
    variant?: "default" | "inverted";
    ariaLabel?: string;
}) {
    return (
        <Link
            href="/"
            {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
            className={className}
            onClick={() => {
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }}
        >
            <Logo className={logoClassName} variant={variant} />
        </Link>
    );
}
