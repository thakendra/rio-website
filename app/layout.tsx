import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "./scroll-reveal";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rio Overseas Pvt. Ltd. — Global Opportunities for Nepalese Talent",
  description:
    "Ethical, government-licensed recruitment connecting Nepalese talent with jobs across the Gulf, Europe and beyond.",
  verification: {
    google: "BcO8dWwe2RCWvyW-lZ8Oq0z1S_y_ouVqCbnG4SBTlYY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        {/* keep content visible if JavaScript is unavailable */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;translate:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
