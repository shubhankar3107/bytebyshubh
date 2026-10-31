import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: "Byte by Shubh — Building Tomorrow, One Byte at a Time",

  description:
    "A curious mind exploring AI, software, automation and the future. Follow Shubh's experiments and the journey of building a personal AI assistant.",

  applicationName: "Byte by Shubh",

  keywords: [
    "Byte by Shubh",
    "Shubh",
    "Artificial Intelligence",
    "Applied AI",
    "Software Engineering",
    "AI Experiments",
    "JARVIS"
  ],

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Byte by Shubh",
    title: "Byte by Shubh — Building Tomorrow",
    description:
      "Exploring AI, software, automation and the future."
  },

  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080b10",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}