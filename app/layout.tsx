import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wenqian Zhao — LLM Data Engineer & Writer",
  description: "Wenqian Zhao works on LLM data engineering, algorithm engineering, and writing about AI, taste, and life.",
  openGraph: {
    title: "Wenqian Zhao — LLM Data Engineer & Writer",
    description: "Data, models, and the questions around them.",
    type: "website",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "Wenqian Zhao — LLM data engineer and writer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wenqian Zhao — LLM Data Engineer & Writer",
    description: "Data, models, and the questions around them.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
