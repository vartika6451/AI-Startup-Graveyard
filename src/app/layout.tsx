import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/context/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Startup Graveyard | AI Startup Validation & Failure Intelligence Platform",
  description: "Analyze competitors, discover failure patterns, evaluate risks, and identify pivot opportunities using AI-powered startup intelligence. Learn from failed startups before building.",
  keywords: ["startup validation", "failed startups", "startup postmortems", "market intelligence", "venture capital due diligence", "failure patterns", "pivot opportunities"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
