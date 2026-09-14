import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hapinstallments.com'), // Replace with actual domain when available
  title: {
    default: "HAP Installments | Premium Monthly Payments",
    template: "%s | HAP Installments"
  },
  description: "Short-term monthly installment plans for tuition and travel without hidden fees. Simple, transparent, and direct vendor payments.",
  keywords: [
    "Installment plans",
    "Monthly payments",
    "Tuition payments",
    "Travel installments",
    "Short-term loans",
    "No hidden fees",
    "HAP Installments",
    "Pay monthly for travel",
    "Pay monthly for tuition"
  ],
  authors: [{ name: "HAP Installments" }],
  creator: "HAP Installments",
  publisher: "HAP Installments",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hapinstallments.com",
    title: "HAP Installments | Premium Monthly Payments",
    description: "Short-term monthly installment plans for tuition and travel without hidden fees. Simple, transparent, and direct vendor payments.",
    siteName: "HAP Installments",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HAP Installments - Tuition & Travel Monthly Installments",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HAP Installments | Premium Monthly Payments",
    description: "Short-term monthly installment plans for tuition and travel without hidden fees.",
    images: ["/og-image.jpg"],
    creator: "@hapinstallments",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans scroll-smooth`}>
      <body className={`${inter.className} font-sans antialiased bg-surface-bg text-brand-charcoal`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
