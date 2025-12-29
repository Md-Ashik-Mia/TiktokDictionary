import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "TikTokDictionary",
  description: "Search any TikTok word, slang, or trend.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen overflow-x-hidden bg-[#f4f6fb] text-brand-dark antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
