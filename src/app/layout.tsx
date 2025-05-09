import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HWADB - Hubworld: Aidalon Database",
  description: "A fan-made database app for Hubworld: Aidalon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen min-h-screen flex flex-col`}
      >
        <nav>
          <Link href="/">HWADB</Link>
          <Link href="/decks">My Decks</Link>
          <Link href="/cards">Sets</Link>
          <Link href="/signin">Sign in</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
