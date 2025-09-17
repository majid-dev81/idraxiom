// app/layout.tsx

import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "800"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "Idraxiom for Technology",
  description: "AI-Powered Solutions for Modern Businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${exo2.variable} scroll-smooth font-exo`}>
      <body>{children}</body>
    </html>
  );
}