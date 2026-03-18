import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampaignPro AI - 30-Day Social Media Campaign Generator | Built by Edwin McCain",
  description: "Generate complete 30-day social media campaigns with AI-powered hooks, captions, CTAs, and hashtags for TikTok, Instagram, Pinterest, X, YouTube Shorts, and LinkedIn. Perfect for creators, marketers, and agencies.",
  keywords: [
    "AI campaign generator",
    "social media content",
    "content calendar",
    "TikTok content",
    "Instagram marketing",
    "social media automation",
    "viral hooks",
    "content creator tools",
    "marketing automation",
    "Edwin McCain",
    "CampaignPro AI"
  ],
  authors: [{ name: "Edwin McCain" }],
  creator: "Edwin McCain",
  publisher: "Edwin McCain",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CampaignPro AI - Turn One Idea Into 30 Days of Content",
    description: "AI-powered 30-day social media campaign generator. Create viral content for all platforms instantly.",
    url: "https://campaignpro.ai",
    siteName: "CampaignPro AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampaignPro AI - 30-Day Campaign Generator",
    description: "Turn one idea into 30 days of viral content. AI-powered campaign generator for all social platforms.",
    creator: "@edwinmccain",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
    }
