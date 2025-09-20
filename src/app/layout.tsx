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
  title: "Idraxiom – AI, Big Data & Smart Solutions",
  description:
    "Idraxiom provides AI-powered solutions, Big Data analytics, UI/UX design, and system analysis for smarter businesses in Saudi Arabia.",
  keywords: [
    "AI Saudi Arabia",
    "Big Data Riyadh",
    "UI/UX Design KSA",
    "Idraxiom",
    "AI Solutions Saudi",
    "System Analysis Saudi",
    "Data Analytics KSA",
  ],
  openGraph: {
    title: "Idraxiom – AI, Big Data & Smart Solutions",
    description:
      "Transforming businesses in Saudi Arabia with AI, Big Data, and innovative solutions.",
    url: "https://idraxiom.com",
    siteName: "Idraxiom",
    images: [
      {
        url: "https://idraxiom.com/brand/full-logo.png", // ✅ رابط كامل
        width: 1200,
        height: 630,
        alt: "Idraxiom Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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