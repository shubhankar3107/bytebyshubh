import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byte by Shubh — Building Tomorrow, One Byte at a Time",
  description:
    "A curious mind exploring AI, software, automation and the future. Follow Shubh's experiments and the journey of building a personal AI assistant.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
