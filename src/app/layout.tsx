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
        <nav className="max-w-9/10 w-full mx-auto py-8 flex gap-4">
          <Link href="/">HWADB</Link>
          {/* <Link href="/decks">My Decks</Link> */}
          <Link href="/cards">Cards</Link>
          {/* <Link href="/signin" className="ml-auto"> */}
          {/*   Sign in */}
          {/* </Link> */}
        </nav>
        {children}
      </body>
    </html>
  );
}
