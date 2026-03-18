import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CampaignPro AI - 30-Day Social Media Campaign Generator",
  description: "Generate complete 30-day social media campaigns with AI-powered hooks, captions, CTAs, and hashtags. Built by Edwin McCain.",
  authors: [{ name: "Edwin McCain" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
