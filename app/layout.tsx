import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// rc-tooltip styles for Tooltip component used in some pages
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

export const metadata: Metadata = {
  title: "Student Life - Iskustva studenata",
  description:
    "Dijeli i čitaj iskustva studenata o fakultetu, domu i životu u gradu",
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
        {children}
      </body>
    </html>
  );
}
