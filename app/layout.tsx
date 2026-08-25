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
  title: "Wenqian Zhao — Data Scientist & Writer",
  description: "Wenqian Zhao explores better ways to understand machines and ourselves through data, AI, and writing.",
  openGraph: {
    title: "Wenqian Zhao — Data Scientist & Writer",
    description: "Exploring better ways to understand machines and ourselves.",
    type: "website",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "Wenqian Zhao — Data scientist, AI builder, and writer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wenqian Zhao — Data Scientist & Writer",
    description: "Exploring better ways to understand machines and ourselves.",
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
