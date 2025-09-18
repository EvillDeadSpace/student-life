import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "rc-tooltip/assets/bootstrap.css";
import "./globals.css";

import Header from "@/components/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Assumption: base URL for the site (used for absolute URLs in metadata)
const SITE_URL = new URL("https://student-life-orpin.vercel.app");

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Student Life - Iskustva studenata",
    template: "%s | Student Life",
  },
  description:
    "Dijeli i čitaj iskustva studenata o fakultetu, domu i životu u gradu",
  openGraph: {
    title: "Student Life - Iskustva studenata",
    description:
      "Dijeli i čitaj iskustva studenata o fakultetu, domu i životu u gradu",
    url: SITE_URL.toString(),
    siteName: "Student Life",
    images: [
      {
        url: "/student-hero.svg",
        width: 1200,
        height: 630,
        alt: "Student Life",
      },
    ],
    locale: "bs-BA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Life - Iskustva studenata",
    description:
      "Dijeli i čitaj iskustva studenata o fakultetu, domu i životu u gradu",
    images: ["/student-hero.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/studentLogo.png",
    shortcut: "/studentLogo.png",
    apple: "/studentLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='sr' className='scroll-smooth'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-gradient-to-b from-[#0b0b0d] to-[#111214]`}
      >
        <Header />
        {/* Structured data for search engines (JSON-LD) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Student Life",
            "url": "${SITE_URL}",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${SITE_URL}/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `,
          }}
        />

        {children}
      </body>
    </html>
  );
}
