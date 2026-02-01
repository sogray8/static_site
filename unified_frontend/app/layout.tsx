import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unified | One Conversation. Every Yield. Complete Privacy.",
  description:
    "The intelligent DeFi yield optimization platform. AI agents navigate complexity while you maintain complete control and privacy.",
  keywords: [
    "DeFi",
    "yield optimization",
    "AI agents",
    "privacy",
    "Pendle",
    "Morpho",
    "Aave",
    "Curve",
  ],
  authors: [{ name: "Unified" }],
  openGraph: {
    title: "Unified | Intelligent DeFi Yield Optimization",
    description:
      "One conversation to access every yield opportunity. AI-powered, privacy-first.",
    type: "website",
    locale: "en_US",
    siteName: "Unified",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unified | One Conversation. Every Yield.",
    description:
      "The intelligent DeFi yield optimization platform with complete privacy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
