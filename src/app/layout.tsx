// app/layout.tsx

import type { Metadata } from "next";
import { Exo_2, Cairo } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "800"],
  variable: "--font-exo2",
});

// Arabic-capable font used site-wide when the visitor switches to العربية.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-cairo",
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
        url: "https://idraxiom.com/brand/idraxiom-social-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Idraxiom – AI, Computer Vision & SaaS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Idraxiom – AI, Big Data & Smart Solutions",
    description:
      "Transforming businesses in Saudi Arabia with AI, Big Data, and innovative solutions.",
    images: ["https://idraxiom.com/brand/idraxiom-social-v2.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${exo2.variable} ${cairo.variable} scroll-smooth font-exo`}>
      <head>
        {/* ✅ JSON-LD Schema.org لإخبار Google عن الشعار */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Idraxiom",
              url: "https://idraxiom.com",
              logo: "https://idraxiom.com/brand/full-logo.png",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}